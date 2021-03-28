import { Module } from '@nestjs/common';
import {CommentService} from "./service/comment.service";
import {CommentController} from "./controller/comment.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CommentEntity} from "./model/comment.entity";


@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity])],
  providers: [CommentService],
  controllers: [CommentController]
})
export class CommentModule {}
