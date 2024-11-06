import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { BlogTag } from '../models/blog-tag.entity';
import { Blog } from '../models/blog.entity';
import { Comment } from '../models/comment.entity';
import { Tag } from '../models/tag.entity';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';

@Module({
  imports: [SequelizeModule.forFeature([Blog, Comment, Tag, BlogTag])],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
