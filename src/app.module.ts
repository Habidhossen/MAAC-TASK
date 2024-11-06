import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import databaseConfig from './config/database.config';

import { AuthModule } from './auth/auth.module';
import { BlogModule } from './blog/blog.module';
import { BlogTag } from './models/blog-tag.entity';
import { Blog } from './models/blog.entity';
import { Comment } from './models/comment.entity';
import { Tag } from './models/tag.entity';
import { User } from './models/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      models: [User, Blog, Comment, Tag, BlogTag],
      autoLoadModels: true,
      synchronize: true,
    }),
    AuthModule,
    BlogModule,
  ],
})
export class AppModule {}
