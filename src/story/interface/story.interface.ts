import {CategoryEntry} from "../../category/interface/category.entry";
import {UserInterface} from "../../user/interface/user.interface";
import {IComment} from "../../comment/interface/IComment";

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
    featured?: boolean;
    author?: UserInterface;
    publishedDate?: Date;
    isPublished?: boolean;
    category: CategoryEntry;
    comments?: IComment[];
}
