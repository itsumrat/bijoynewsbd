import {Controller, Get, Param, Query, Render} from '@nestjs/common';
import {StoryService} from "./story/service/story.service";
import {CategoryService} from "./category/category.service";

@Controller()
export class AppController {
  constructor(
      private storyService: StoryService,
      private categoryService: CategoryService
              ){}
  @Render('home')
  @Get()
  public async index() {
    let stories: any = [];
    await this.storyService.getStories()
        .then(res=>{
          stories = res;
        });
    return { stories };
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

  @Render('category')
  @Get('news/:category')
  public Category() {
    return {};
  }

  @Render('[newsCategory]/[newsSlug]')
  @Get('news/:category/:slug')
  public async News(@Param() param: any) {
    console.log(param)
    let story: any={};
    let stories: any = [];
    await this.storyService.findBySlug(param.slug).then(r=>{
      story = r;
    });
    await this.storyService.getStories()
        .then(res=>{
          stories = res;
        });
   return {
      story,
     stories
   };
  }
}
