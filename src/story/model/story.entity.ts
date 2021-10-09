import { AdvertiseEntity } from './../../advertise/model/advertise.entity';
import {
    Column,
    Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, OneToOne,

} from 'typeorm';
import {BaseEntity} from "../../utils/model/base.entity";
import {CategoryEntity} from "../../category/model/category.entity";
import {CategoryEntry} from "../../category/interface/category.entry";
import {UserInterface} from "../../user/interface/user.interface";
import {UserEntity} from "../../user/model/user.entity";
import {CommentEntity} from "../../comment/model/comment.entity";
import {IComment} from "../../comment/interface/IComment";

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

    @Column({default: false})
    featured: boolean;

    @Column('simple-array', { default: [] })
    tags: string[];

    @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    publishedDate: Date;

    @Column({ nullable: false, default: false })
    isPublished: boolean;

    @ManyToOne((type) => UserEntity, (user: UserInterface) => user.stories)
    author: UserEntity;

    @ManyToOne(
        () => CategoryEntity,
        (category: CategoryEntry) => category.stories,
        {
            cascade: true,
        },
    )
    @JoinTable()
    category: CategoryEntry;

    @OneToMany(() => CommentEntity, (comment: IComment) => comment)
    comments: IComment[];

    @OneToOne(() => AdvertiseEntity)
    @JoinColumn()
    advertise: AdvertiseEntity;
}
