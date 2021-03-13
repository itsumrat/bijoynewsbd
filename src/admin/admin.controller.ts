import {Controller, Get, Param, Render} from '@nestjs/common';
import {CategoryService} from "../category/category.service";
import {StoryService} from "../story/service/story.service";

@Controller('admin')
export class AdminController {
    constructor(private categoryService: CategoryService,
                private storyService: StoryService,){};


    @Render('admin/[slug]/edit')
    @Get('/:slug/edit')
    public async EditStory(@Param('slug') slug: string) {
        let story: any = [];
        await  this.storyService.findBySlug(slug)
            .then(r=>{
                story = r;
            })
        return {
            story
        };
    }

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

    @Render('admin/new-story')
    @Get('new-story')
    public async NewStory() {
        let categories: any = [];
        await  this.categoryService.findAll()
            .then(r=>{
                categories = r;
            })
        return {
            categories
        };
    }

    @Render('admin/posts')
    @Get('posts')
    public async Posts() {
        let stories: any = [];
        await  this.storyService.getStories()
            .then(r=>{
                stories = r;
            })
        return {
            stories
        };
    }


}
