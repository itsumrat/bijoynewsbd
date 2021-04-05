import { Injectable} from '@nestjs/common';
import {CategoryEntity} from "./model/category.entity";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {IPaginationOptions, paginate, Pagination} from "nestjs-typeorm-paginate";
import {StoryEntity} from "../story/model/story.entity";
import {CategoryEntry} from "./interface/category.entry";
@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(CategoryEntity)
        private readonly categoryEntityRepository: Repository<CategoryEntity>
    ){}


    async findOne(name: string): Promise<any>{
        return await this.categoryEntityRepository
            .createQueryBuilder("category") // first argument is an alias. Alias is what you are selecting - categorys. You must specify it.
            .where("category.name = :name", { name })
            .leftJoinAndSelect("category.stories", "story")
            .orderBy("story.id", "DESC")
            .getOne();

        // return this.categoryEntityRepository.findOne({name},{
        //     relations: ['stories'],
        //     order: {
        //         stories:1
        //     }
        // });
    }
    create (body: any): any{

       return  this.categoryEntityRepository.save(body)

    }
    deleteOne(id: number): any{
        return this.categoryEntityRepository.delete(id);
    }

    updateOne(id: number, body: any): any{
        return this.categoryEntityRepository.update(id, body);
    }

    findAll(options: IPaginationOptions): Promise<Pagination<StoryEntity>>{


        const queryBuilder = this.categoryEntityRepository.createQueryBuilder('categories');
        // queryBuilder.orderBy('categories.id', 'DESC'); // Or whatever you need to do
            queryBuilder.leftJoinAndSelect("categories.stories", "story" )
            queryBuilder.orderBy('story.id', 'DESC')
        return paginate<any>(queryBuilder, options);
     // return paginate<any>(this.categoryEntityRepository, options, {relations: ['stories'], });

    }
}
