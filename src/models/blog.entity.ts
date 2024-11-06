import {
  BelongsTo,
  BelongsToMany,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { BlogTag } from './blog-tag.entity';
import { Comment } from './comment.entity';
import { Tag } from './tag.entity';
import { User } from './user.entity';

@Table
export class Blog extends Model {
  @Column
  title: string;

  @Column
  content: string;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Comment)
  comments: Comment[];

  @BelongsToMany(() => Tag, () => BlogTag)
  tags: Tag[];
}
