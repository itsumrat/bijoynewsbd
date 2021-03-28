import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserRole } from '../interface/user.interface';
import {StoryEntity} from "../../story/model/story.entity";
import {StoryInterface} from "../../story/interface/story.interface";

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ default: '' })
  username: string;

  @Column({ unique: true, nullable: false, default: '' })
  domain: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: 'user' })
  type: string;

  @Column()
  password: string;

  @Column({ type: 'text', default: '' })
  bio: string;

  @Column({ default: '' })
  occupation: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Column({ nullable: true })
  profileImage: string;

  @OneToMany(
    (type) => StoryEntity,
    (storyEntity) => storyEntity.author,
  )
  stories: StoryInterface[];

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;


  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }

  @BeforeInsert()
  createDomain() {
    this.domain = this.name.replace(/\s+/g, '').toLowerCase();
  }
}
