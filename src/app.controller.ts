import {Controller, Get, Param, Query, Render, HttpException, HttpStatus} from '@nestjs/common';
import {StoryService} from "./story/service/story.service";
import {CategoryService} from "./category/category.service";
import {CommentService} from "./comment/service/comment.service";
import {IComment} from "./comment/interface/IComment";
import {constants} from "../constants";

@Controller()
export class AppController {
  constructor(
      private storyService: StoryService,
      private categoryService: CategoryService,
      private  commentService: CommentService
              ){}

  @Render('home')
  @Get()
  public async index(@Query('page') page: number = 1,
                     @Query('limit') limit: number = 10,) {
      limit = limit > 100 ? 100 : limit;
    let stories: any = {};
    let categories: any = [];
    await this.storyService.getStories({
        page,
        limit,
        route: constants.BASE_URL,
    }, true)
        .then(res=>{
          stories = res;
        });
    await this.categoryService.findAll({
        page,
        limit,
        route: constants.BASE_URL,
    })
        .then(cats=>{
            categories = cats;
        })
    return { stories, categories };
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
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
    let comments: IComment[] = [];

    try {
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
    }catch (e) {
        throw new HttpException(
            "Couldn't found",
            HttpStatus.NOT_FOUND,
        );
    }



   return {
      story,
      category,
      comments
   };
  }

}
