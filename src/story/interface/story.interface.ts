import {CategoryEntry} from "../../category/interface/category.entry";

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
    publishedDate?: Date;
    isPublished?: boolean;
    categories?: CategoryEntry[];
}
