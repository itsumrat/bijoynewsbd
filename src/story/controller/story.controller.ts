import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UploadedFile,
    UseInterceptors,
    Request,
    UseGuards, Query,
} from '@nestjs/common';
import {StoryInterface} from "../interface/story.interface";
import {StoryService} from "../service/story.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {UserInterface} from "../../user/interface/user.interface";
import {JwtAuthGuard, Public} from "../../auth/jwt-auth.guard";
import {RolesGuard} from "../../auth/roles.guard";
import { Pagination } from 'nestjs-typeorm-paginate';
import {StoryEntity} from "../model/story.entity";
import {constants} from "../../../constants";

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('stories')
export class StoryController {
    constructor(
        private storyService: StoryService
    ){}


    // @Get()
    // getStories(){
    //     return this.storyService.getStories();
    // }
    @Public()
    @Get('')
    async index(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ): Promise<Pagination<StoryEntity>> {
        limit = limit > 100 ? 100 : limit;
        return this.storyService.getStories({
            page,
            limit,
            route: constants.BASE_URL,
        });
    }

    @Public()
    @Get(':slug')
    getOne(@Param('slug') slug: string){
      return this.storyService.findBySlug(slug);
    }

    @Post()
    create(@Body() body: StoryInterface, @Request() req: UserInterface){
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const user = req.user;
        return this.storyService.create(user, body);
    }

    @Put(':id')
    updateOne(@Body() body: any, @Param('id')  id: number, @Request() req: UserInterface){
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const user = req.user;
        return this.storyService.updateOne(id, body, user)
    }

    @Delete(':id')
    deleteOne(@Param('id') id: number){
        return this.storyService.deleteOne(id);
    }

    @Post('image/upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: any): Promise<any> {
        return await this.storyService.upload(file);
    }


}
