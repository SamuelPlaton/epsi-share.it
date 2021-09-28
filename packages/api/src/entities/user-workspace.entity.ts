import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Workspace } from './workspace.entity';
import { User } from './user.entity';

export enum UserWorkspaceStatus {
  ADMIN = 'admin',
  GUEST = 'guest',
}

@Entity()
export class UserWorkspace {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  status: UserWorkspaceStatus;

  @Column({ default: Date.now() })
  createdAt?: Date;

  @ManyToOne((type) => Workspace, (workspace) => workspace.userWorkspaces)
  workspace: Workspace;

  @ManyToOne((type) => User, (user) => user.userWorkspaces)
  user: User;
}
