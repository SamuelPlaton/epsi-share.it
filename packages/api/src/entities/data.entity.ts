import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Link, User } from './index';

export enum DataType {
  FILE = 'file',
  FOLDER = 'folder',
}

@Entity()
export class Data {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  path: string;

  @Column()
  type: DataType;

  @ManyToOne((type) => User, (user) => user.data)
  user: User;

  @OneToMany((type) => Link, (link) => link.data)
  links: Link[];
}
