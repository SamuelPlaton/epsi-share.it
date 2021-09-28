import {Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import { Data, UserWorkspace } from './index';


export enum UserStatus {
  NOT_CONFIRMED = 'not-confirmed',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  identifier: string;

  @Column()
  email: string;

  @Column()
  token: string;

  @Column()
  name: string;

  @Column({ default: UserStatus.NOT_CONFIRMED })
  status: UserStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany((type) => Data, (data) => data.user)
  data: Data[];

  @OneToMany((type) => UserWorkspace, (userWorkspace) => userWorkspace.user)
  userWorkspaces: UserWorkspace[];
}
