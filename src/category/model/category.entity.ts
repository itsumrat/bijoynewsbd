import {
    Column,
    Entity,
    ManyToMany,
} from 'typeorm';
import {BaseEntity} from "../../utils/model/base.entity";
import {StoryInterface} from "../../story/interface/story.interface";
import {StoryEntity} from "../../story/model/story.entity";

@Entity('category')
export class CategoryEntity extends  BaseEntity{
    @Column()
    name: string;

    @ManyToMany(
        () => StoryEntity,
        (story: StoryInterface) => story.categories,
    )
    public stories: StoryInterface[];


}
