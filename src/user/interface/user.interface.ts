import {StoryInterface} from "../../story/interface/story.interface";


export interface UserInterface {
  id?: number;
  name?: string;
  domain?: string;
  email?: string;
  password?: string;
  type?: string;
  bio?: string;
  occupation?: string;
  role?: UserRole;
  profileImage?: string;
  stories?: StoryInterface[];
  createdAt?: Date;
  updatedAt?: Date;
  subscriptions?: any | null;
}

export enum UserRole {
  ADMIN = 'admin',
  AUTHOR = 'author',
  USER = 'user',
  MANAGER = 'manager',
  VIEWER = 'viewer',
}
