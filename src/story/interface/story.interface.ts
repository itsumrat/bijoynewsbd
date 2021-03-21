import {CategoryEntry} from "../../category/interface/category.entry";
import {UserInterface} from "../../user/interface/user.interface";

export interface StoryInterface {
    id?: number;
    title?: string;
    slug?: string;
    description?: string;
    body?: string;
    createdAt?: Date;
    updatedAt?: Date;
    likes?: number;
    featuredImg?: string;
    author?: UserInterface;
    publishedDate?: Date;
    isPublished?: boolean;
    category: CategoryEntry;
}
