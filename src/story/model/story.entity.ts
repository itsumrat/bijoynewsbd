import {
    Column,
    Entity, ManyToMany, JoinTable,

} from 'typeorm';
import {BaseEntity} from "../../utils/model/base.entity";
import {CategoryEntity} from "../../category/model/category.entity";
import {CategoryEntry} from "../../category/interface/category.entry";

@Entity('story')
export class StoryEntity extends BaseEntity{
    @Column()
    title: string;

    @Column()
    slug: string;

    @Column({ default: '' })
    description: string;

    @Column({ type: 'text' })
    body: string;


    @Column({ default: 0 })
    likes: number;

    @Column({ nullable: true })
    featuredImg: string;

    @Column('simple-array', { default: [] })
    tags: string[];

    @Column({ nullable: true })
    publishedDate: Date;

    @Column({ nullable: false, default: false })
    isPublished: boolean;

    @ManyToMany(
        () => CategoryEntity,
        (category: CategoryEntry) => category.stories,
        {
            cascade: true,
        },
    )
    @JoinTable()
    categories: CategoryEntry[];

}
