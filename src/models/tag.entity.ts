import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { BlogTag } from './blog-tag.entity';

@Table
export class Tag extends Model {
  @Column
  name: string;

  @HasMany(() => BlogTag)
  blogTags: BlogTag[];
}
