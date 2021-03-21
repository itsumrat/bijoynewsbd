import { Module } from '@nestjs/common';
import { RenderModule } from 'nest-next';
import Next from 'next';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { BlogController } from './blog/blog.controller';
import { BlogService } from './blog/blog.service';
import { CategoryController } from './category/category.controller';
import { CategoryService } from './category/category.service';
import { CategoryModule } from './category/category.module';
import { AdminController } from './admin/admin.controller';
import { AdminService } from './admin/admin.service';
import { AdminModule } from './admin/admin.module';
import { CategoryEntity } from './category/model/category.entity';
import { StoryController } from './story/controller/story.controller';
import { StoryService } from './story/service/story.service';
import { StoryModule } from './story/story.module';
import {StoryEntity} from "./story/model/story.entity";
import { UserController } from './user/controller/user.controller';
import { UserService } from './user/service/user.service';
import { UserModule } from './user/user.module';
import {UserEntity} from "./user/model/user.entity";
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';



@Module({
  imports: [
    RenderModule.forRootAsync(
      Next({
        dev: process.env.NODE_ENV !== 'production',
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
        conf: { useFilesystemPublicRoutes: false },
      }),
    ),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'bijoynews-database.cnwhvy4mvhdr.ap-southeast-1.rds.amazonaws.com',
      // host: 'localhost',
      port: 5432,
      username: 'bijoynews',
      password: 'bijoynews',
      database: 'bijoynews',
      entities: [CategoryEntity],
      synchronize: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([CategoryEntity, StoryEntity, UserEntity]),
    CategoryModule,
    AdminModule,
    StoryModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController, BlogController, CategoryController, AdminController, StoryController, UserController, AuthController],
  providers: [BlogService, CategoryService, AdminService, StoryService, UserService, AuthService],
})
export class AppModule {}
