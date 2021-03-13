import {
    Column,
    Entity,
    OneToMany,
} from 'typeorm';
import {BaseEntity} from "../../utils/model/base.entity";
import {StoryInterface} from "../../story/interface/story.interface";
import {StoryEntity} from "../../story/model/story.entity";

@Entity('category')
export class CategoryEntity extends  BaseEntity{
    @Column()
    name: string;

    @OneToMany(
        () => StoryEntity,
        (story: StoryInterface) => story.category,
    )
    public stories: StoryInterface[];


}
