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


    findOne(name: string): any{
        return this.categoryEntityRepository.findOne({name},{
            relations: ['stories'],
            order: {
                id: "DESC"
            }
        });
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
        queryBuilder.orderBy('categories.id', 'DESC'); // Or whatever you need to do
            queryBuilder.leftJoinAndSelect("categories.stories", "story" )
        return paginate<any>(queryBuilder, options);
     // return paginate<any>(this.categoryEntityRepository, options, {relations: ['stories'], });

    }
}
