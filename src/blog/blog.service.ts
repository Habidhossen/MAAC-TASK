import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { BlogTag } from '../models/blog-tag.entity';
import { Blog } from '../models/blog.entity';
import { Comment } from '../models/comment.entity';
import { Tag } from '../models/tag.entity';
import { CreateBlogDto } from './dto/create-blog.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog) private blogModel: typeof Blog,
    @InjectModel(Comment) private commentModel: typeof Comment,
    @InjectModel(Tag) private tagModel: typeof Tag,
    @InjectModel(BlogTag) private blogTagModel: typeof BlogTag,
  ) {}

  async createBlog(createBlogDto: CreateBlogDto): Promise<Blog> {
    const blog = await this.blogModel.create({
      title: createBlogDto.title,
      content: createBlogDto.content,
      userId: createBlogDto.userId,
    });

    if (createBlogDto.tags) {
      const tags = await Promise.all(
        createBlogDto.tags.map((tagName) =>
          this.tagModel.findOrCreate({ where: { name: tagName } }),
        ),
      );
      await blog.$set(
        'tags',
        tags.map(([tag]) => tag),
      );
    }

    return blog;
  }

  async updateBlog(id: number, updateBlogDto: UpdateBlogDto): Promise<Blog> {
    const blog = await this.blogModel.findByPk(id);
    if (!blog) throw new NotFoundException('Blog not found');

    await blog.update(updateBlogDto);

    if (updateBlogDto.tags) {
      const tags = await Promise.all(
        updateBlogDto.tags.map((tagName) =>
          this.tagModel.findOrCreate({ where: { name: tagName } }),
        ),
      );
      await blog.$set(
        'tags',
        tags.map(([tag]) => tag),
      );
    }

    return blog;
  }

  async findAll(): Promise<Blog[]> {
    return this.blogModel.findAll({ include: [Comment, Tag] });
  }

  async findOne(id: number): Promise<Blog> {
    return this.blogModel.findByPk(id, { include: [Comment, Tag] });
  }

  async deleteBlog(id: number): Promise<void> {
    const blog = await this.findOne(id);
    if (!blog) throw new NotFoundException('Blog not found');
    await blog.destroy();
  }

  async addComment(createCommentDto: CreateCommentDto): Promise<Comment> {
    return this.commentModel.create({ ...createCommentDto });
  }
}
