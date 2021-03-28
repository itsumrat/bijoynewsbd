import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';

import { CommentService } from '../service/comment.service';
import {JwtAuthGuard, Public} from "../../auth/jwt-auth.guard";
import {RolesGuard} from "../../auth/roles.guard";
import {IComment} from "../interface/IComment";

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Public()
  @Get()
  findAllComments(@Query('storyId') storyId: number) {
    return this.commentService.findAllComments(storyId);
  }
  @Post()
  create(@Body() commentEntry: IComment, @Request() req: any) {
    const user = req.user;
    return this.commentService.create(user, commentEntry);
  }

  @Get(':id')
  findComment(@Param('id') id: number){
    return this.commentService.findComment(id);
  }

  @Put(':id')
  updateComment(@Body() commentEntry: IComment, @Param('id') id: number) {
    return this.commentService.updateComment(id, commentEntry);
  }

  @Delete(':id')
  deleteComment(@Param('id') id: number) {
    return this.commentService.deleteComment(id);
  }
}
