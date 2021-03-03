import {StoryInterface} from "../../story/interface/story.interface";

export interface CategoryEntry {
  id?: number;
  name?: string;
  stories?: StoryInterface[];
  createdAt?: Date;
  updatedAt?: Date;
}
