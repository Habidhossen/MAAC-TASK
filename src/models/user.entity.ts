import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Blog } from './blog.entity';

@Table
export class User extends Model {
  @Column
  name: string;

  @Column
  email: string;

  @Column
  password: string;

  @HasMany(() => Blog)
  blogs: Blog[];
}
