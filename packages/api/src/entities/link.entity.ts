import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Data } from './data.entity';

export enum LinkStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Entity()
export class Link {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: Date.now() })
  createdAt: Date;

  @Column({ default: LinkStatus.ACTIVE })
  status: LinkStatus;

  @ManyToOne((type) => Data, (data) => data.links)
  data: Data;
}
