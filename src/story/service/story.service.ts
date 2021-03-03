import { Injectable } from '@nestjs/common';
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

import {StoryInterface} from "../interface/story.interface";
import {StoryEntity} from "../model/story.entity";

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
        return this.storyEntityRepository.find({relations: ['categories']});
    }

    findOne(id: number){
        return this.storyEntityRepository.findOne(id);
    }

    findBySlug(slug: string){
        return this.storyEntityRepository.findOne({slug}, {relations: ['categories']})
    }

    create(body: StoryInterface){
        body.slug = this.generateSlug(body.title);
        return this.storyEntityRepository.save(body);
    }

    updateOne(id: number, body: StoryInterface){
        body.slug = this.generateSlug(body.title);
        return this.storyEntityRepository.save({...body, id});
    }

    deleteOne(id: number){
        return this.storyEntityRepository.delete(id);
    }

    generateSlug(title: string): string{
        return slugify(title)
    }

}
