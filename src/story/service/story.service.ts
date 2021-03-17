import { Injectable, Logger } from '@nestjs/common';
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

import {StoryInterface} from "../interface/story.interface";
import {StoryEntity} from "../model/story.entity";

import { S3 } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');


const slugify = (str: string)=>{
    return str.replace(/\s/g, '-')
}

@Injectable()
export class StoryService {
    constructor(
    @InjectRepository(StoryEntity)
    private readonly storyEntityRepository: Repository<StoryEntity>
    ){}

    getStories(){
        return this.storyEntityRepository.find({relations: ['category']});
    }

    findOne(id: number){
        return this.storyEntityRepository.findOne(id);
    }

    findBySlug(slug: string){
        return this.storyEntityRepository.findOne({slug}, {relations: ['category']})
    }

    create(body: StoryInterface){
        body.slug = this.generateSlug(body.title);
        return this.storyEntityRepository.save(body);
    }

    updateOne(id: number, body: StoryInterface){
        body.slug = this.generateSlug(body.title);
        console.log('============');
        console.log({id, ...body})
        return this.storyEntityRepository.save({id, ...body});
    }

    deleteOne(id: number){
        return this.storyEntityRepository.delete(id);
    }

    generateSlug(title: string): string{
        return slugify(title)
    }

    async upload(file: { buffer?: any; originalname?: any }) {
        const bucketS3 = 'bijoynew-bucket/images';
        const filename: string =
            path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
        const extension: string = path.parse(file.originalname).ext;
        return this.uploadS3(file.buffer, bucketS3, `${filename}${extension}`);
    }

    async uploadS3(file: any, bucket: string, name: any) {
        const s3 = this.getS3();
        const params = {
            Bucket: bucket,
            Key: String(name),
            Body: file,
        };
        return new Promise((resolve, reject) => {
            s3.upload(params, (err: { message: any }, data: unknown) => {
                if (err) {
                    Logger.error(err);
                    reject(err.message);
                }
                resolve(data);
            });
        });
    }
    getS3() {
        return new S3({
            accessKeyId: 'AKIASHTP2APLJWQ7TUDO',
            secretAccessKey: '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',
        });
    }

}
