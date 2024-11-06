import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Blog } from './blog.entity';
import { User } from './user.entity';

@Table
export class Comment extends Model {
  @Column
  content: string;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Blog)
  @Column
  blogId: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Blog)
  blog: Blog;
}
