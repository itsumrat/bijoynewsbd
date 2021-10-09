import { AdvertiseEntry } from './interface/advertise.entry';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AdvertiseEntity } from './model/advertise.entity';
import { Injectable, Logger } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

import {
    paginate,
    Pagination,
    IPaginationOptions,
} from 'nestjs-typeorm-paginate';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

@Injectable()
export class AdvertiseService {
    constructor(
        @InjectRepository(AdvertiseEntity)
        private readonly advertiseEntityRepository: Repository<AdvertiseEntity>
        ){}

        async getAdvertises(options: IPaginationOptions): Promise<Pagination<AdvertiseEntity>> {
            return  paginate<AdvertiseEntity>(this.advertiseEntityRepository, options, {
                order:{
                    id: "DESC"
                }
            })
        }
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        findOne(id: number){
            return this.advertiseEntityRepository.findOne(id);
        }

        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        create(body: AdvertiseEntry){
            return this.advertiseEntityRepository.save(body);
        }
    
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        updateOne(id: number, body: AdvertiseEntry ){
            return this.advertiseEntityRepository.update(id,body);
        }
    
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        deleteOne(id: number){
            return this.advertiseEntityRepository.delete(id);
        }
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        async upload(file: { buffer?: any; originalname?: any }) {
            const bucketS3 = 'bijoynew-bucket/images';
            const filename: string =
                path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
            const extension: string = path.parse(file.originalname).ext;
            return this.uploadS3(file.buffer, bucketS3, `${filename}${extension}`);
        }
    
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
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
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        getS3() {
            return new S3({
                accessKeyId: 'AKIASHTP2APLJWQ7TUDO',
                secretAccessKey: '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',
            });
        }
    
}

