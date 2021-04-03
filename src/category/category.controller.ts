import {Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query, Render} from '@nestjs/common';
import {CategoryService} from "./category.service";
import {constants} from "../../constants";

@Controller('/category')
export class CategoryController {
    constructor(private categoryService: CategoryService){};

    @Get()
    public findAll(@Query('page') page: number = 1,
                   @Query('limit') limit: number = 4,){
        limit = limit > 100 ? 100 : limit;
        return this.categoryService.findAll({
            page,
            limit,
            route: constants.BASE_URL,
        });
    }
    @Post()
    public  createCategory(@Body() body: any){
        return this.categoryService.create(body);
    }
    @Delete(':id')
    public  deleteCategory(@Param('id') id: number){
        return this.categoryService.deleteOne(id);
    }
    @Put(':id')
    public  update(@Param('id') id: number, @Body() body: any){
        return this.categoryService.updateOne(id, body);
    }

}
