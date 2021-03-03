import {Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Render} from '@nestjs/common';
import {CategoryService} from "./category.service";

@Controller('/category')
export class CategoryController {
    constructor(private categoryService: CategoryService){};

    @Post()
    public  createCategory(@Body() body: any){
        return this.categoryService.create(body);
    }
    @Delete(':id')
    public  deleteCategory(@Param('id') id: number){
        console.log(id)
        return this.categoryService.deleteOne(id);
    }
    @Put(':id')
    public  update(@Param('id') id: number, @Body() body: any){
        return this.categoryService.updateOne(id, body);
    }

}
