import { Column, Entity, ManyToOne } from 'typeorm';
import {StoryEntity} from "../../story/model/story.entity";
import {BaseEntity} from "../../utils/model/base.entity";
import {UserInterface} from "../../user/interface/user.interface";
import {UserEntity} from "../../user/model/user.entity";

@Entity('comments')
export class CommentEntity extends BaseEntity{

  @Column()
  message: string;

  @ManyToOne((type) => UserEntity, (user: UserInterface) => user)
  author: UserEntity;

  @ManyToOne((type) => StoryEntity, (story: StoryEntity) => story.comments)
  story: StoryEntity;

}
