import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {Link, User, Workspace} from './index';

export enum DataType {
  FILE = 'file',
  FOLDER = 'folder',
}

@Entity()
export class Data {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;

  @Column()
  code: string;

  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @ManyToOne(() => Workspace, (workspace) => workspace.id)
  workspace: Workspace;

  @OneToMany(() => Link, (link) => link.id)
  links: Link[];
}
