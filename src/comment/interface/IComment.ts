import {StoryInterface} from "../../story/interface/story.interface";
import {UserInterface} from "../../user/interface/user.interface";


export interface IComment {
  id?: number;
  message: string;
  author?: UserInterface;
  blog?: StoryInterface;
  createdAt?: Date;
  updatedAt?: Date;
}
