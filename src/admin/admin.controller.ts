import {Controller, Get, Render} from '@nestjs/common';
import {CategoryService} from "../category/category.service";

@Controller('admin')
export class AdminController {
    constructor(private categoryService: CategoryService){};

    @Render('admin/category')
    @Get()
    public async getAdminCategoryPage(){
        let categories: any[] = [];
        await this.categoryService.findAll().then(r=>{
            categories = r;
        })
       return {
            categories
       };
    }
}
