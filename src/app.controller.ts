import {Controller, Get, Param, Query, Render} from '@nestjs/common';
import {StoryService} from "./story/service/story.service";
import {CategoryService} from "./category/category.service";
import {CommentService} from "./comment/service/comment.service";
import {IComment} from "./comment/interface/IComment";

@Controller()
export class AppController {
  constructor(
      private storyService: StoryService,
      private categoryService: CategoryService,
      private  commentService: CommentService
              ){}

  @Render('home')
  @Get()
  public async index() {
    let stories: any = [];
    let categories: any = [];
    await this.storyService.getStories()
        .then(res=>{
          stories = res;
        });
    await this.categoryService.findAll()
        .then(cats=>{
            categories = cats;
        })
    return { stories, categories };
  }


  @Render('category')
  @Get('news/:category')
  public async Category(@Param('category') cat: string) {
      let category: any = null;
      await this.categoryService.findOne(cat)
          .then((res: any)=>{
              category = res;
          })
    return {
          category: category
    };
  }

    @Render('login')
    @Get('login')
    private Login(): any{
        return {};
    }

    @Render('signup')
    @Get('signup')
    private Signup(): any{
        return {};
    }


  @Render('[newsCategory]/[newsSlug]')
  @Get('news/:category/:slug')
  public async News(@Param() param: any) {
    let story: any={};
    let category: any = {};
    let comments: IComment[];
    await this.storyService.findBySlug(param.slug).then(r=>{
      story = r;
    });
    await this.categoryService.findOne(param.category)
        .then((res: any)=>{
            category = res;
        });
    await this.commentService.findAllComments(story.id)
        .then((re:any)=>{
            comments = re;
        })


   return {
      story,
      category,
      comments
   };
  }

}
