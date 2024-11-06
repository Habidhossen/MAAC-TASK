import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Blog } from './blog.entity';
import { Tag } from './tag.entity';

@Table
export class BlogTag extends Model {
  @ForeignKey(() => Blog)
  @Column
  blogId: number;

  @ForeignKey(() => Tag)
  @Column
  tagId: number;
}
