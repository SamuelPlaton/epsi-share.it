import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
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
  numen: string;

  @Column()
  email: string;

  @Column()
  token: string;

  @Column()
  name: string;

  @Column({ default: UserStatus.NOT_CONFIRMED })
  status: UserStatus;

  @Column({ default: Date.now() })
  createdAt?: Date;

  @OneToMany((type) => Data, (data) => data.user)
  data: Data[];

  @OneToMany((type) => UserWorkspace, (userWorkspace) => userWorkspace.user)
  userWorkspaces: UserWorkspace[];
}
