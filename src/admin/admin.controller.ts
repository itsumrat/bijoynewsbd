import {Controller, Get, Param, Query, Render} from '@nestjs/common';
import {CategoryService} from "../category/category.service";
import {StoryService} from "../story/service/story.service";
import {constants} from "../../constants";


@Controller('admin')
export class AdminController {
    constructor(private categoryService: CategoryService,
                private storyService: StoryService,) {
    };


    @Render('admin/login')
    @Get('/login')
    private Login(): any {
        return {};
    }


    @Render('admin/[slug]/edit')
    @Get('/:slug/edit')
    public async EditStory(@Param('slug') slug: string) {
        let story: any = [];
        let categories: any = [];
        await this.categoryService.findAll(
            {
                page: 1,
                limit: 100,
                route: constants.BASE_URL,
            }
        )
            .then(r => {
                categories = r.items;
            })
        await this.storyService.findBySlug(slug)
            .then(r => {
                story = r;
            })
        return {
            story,
            categories
        };
    }

    @Render('admin/category')
    @Get()
    public async getAdminCategoryPage() {
        let categories: any[] = [];
        await this.categoryService.findAll({
            page: 1,
            limit: 100,
            route: constants.BASE_URL,
        }).then(r => {
            categories = r.items;
        })
        return {
            categories
        };
    }

    @Render('admin/new-story')
    @Get('new-story')
    public async NewStory() {
        let categories: any = [];
        await this.categoryService.findAll({
            page: 1,
            limit: 100,
            route: constants.BASE_URL,
        })
            .then(r => {
                categories = r.items;
            })
        return {
            categories
        };
    }

    @Render('admin/posts')
    @Get('posts')
    public async Posts(@Query('page') page: number = 1,
                       @Query('limit') limit: number = 10,) {
        limit = limit > 100 ? 100 : limit;
        let stories: any = {};
        await this.storyService.getStories({
            page,
            limit,
            route: `${constants.BASE_URL}/admin/posts`,
        })
            .then(r => {
                stories = r;
            })
        return {
            stories
        };
    }


}
