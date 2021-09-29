import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Data, Workspace } from './index';

export enum UserStatus {
  NOT_CONFIRMED = 'not-confirmed',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
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

  @Column({ nullable: true })
  securityCode?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;

  @OneToMany(() => Data, (data) => data.id)
  data: Data[];
  
  @ManyToMany(() => Workspace)
  workspaces: Workspace[];
}
