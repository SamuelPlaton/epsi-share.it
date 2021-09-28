import {Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

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

  @Column({default: UserStatus.NOT_CONFIRMED})
  status: UserStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  /*@OneToMany((type) => Date, (file) => file.owner)
  files: string[];

  @OneToMany((type) => Date, (userWorkspace) => userWorkspace.user)
  workspaces: string[];*/
}
