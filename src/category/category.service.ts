import { Injectable} from '@nestjs/common';
import {CategoryEntity} from "./model/category.entity";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(CategoryEntity)
        private readonly categoryEntityRepository: Repository<CategoryEntity>
    ){}


    create (body: any): any{

       return  this.categoryEntityRepository.save(body)

    }
    deleteOne(id: number): any{
        return this.categoryEntityRepository.delete(id);
    }

    updateOne(id: number, body: any): any{
        return this.categoryEntityRepository.update(id, body);
    }

    findAll(){
     return this.categoryEntityRepository.find();

    }
}
