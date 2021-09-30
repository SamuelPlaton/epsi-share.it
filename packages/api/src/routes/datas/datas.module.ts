import { Module } from '@nestjs/common';
import { DatasService } from './datas.service';
import { DatasController } from './datas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Data } from '../../entities';
import { UsersModule } from '../users';
import { WorkspacesModule } from '../workspaces';

@Module({
  imports: [TypeOrmModule.forFeature([Data]), WorkspacesModule, UsersModule],
  controllers: [DatasController],
  providers: [DatasService],
})
export class DatasModule {}
