import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

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
  numen: string;

  @Column()
  email: string;

  @Column()
  token: string;

  @Column()
  name: string;

  @Column({default: UserStatus.NOT_CONFIRMED})
  status: UserStatus;

  @Column()
  createdAt: Date;

  /*@OneToMany((type) => Date, (file) => file.owner)
  files: string[];

  @OneToMany((type) => Date, (userWorkspace) => userWorkspace.user)
  workspaces: string[];*/
}
