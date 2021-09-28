import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserWorkspace } from './user-workspace.entity';

@Entity()
export class Workspace {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @OneToMany(
    (type) => UserWorkspace,
    (userWorkspace) => userWorkspace.workspace,
  )
  userWorkspaces: UserWorkspace[];
}
