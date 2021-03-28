import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from '../model/comment.entity';
import { Equal, Repository } from 'typeorm';
import { from, Observable } from 'rxjs';
import { IComment } from '../interface/IComment';
import {UserInterface} from "../../user/interface/user.interface";


@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
  ) {}

  findAllComments(storyId: number) {
    return this.commentRepository.find({
        relations: ['author'],
        where: {
          story: {
            id: Equal(storyId),
          },
        },
      })
  }
  create(user: UserInterface, commentEntry: IComment) {
    commentEntry.author = user;
    return this.commentRepository.save(commentEntry)
  }

  findComment(id: number) {
    return this.commentRepository.findOne(id, { relations: ['author'] });
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  updateComment(id: number, commentEntry: IComment)  {
    return this.commentRepository.save( {...commentEntry, id})
  }

  deleteComment(id: number) {
    return this.commentRepository.delete(id);
  }
}
