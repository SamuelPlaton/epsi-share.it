import { Module } from '@nestjs/common';
import { DatasService } from './datas.service';
import { DatasController } from './datas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Data } from '../../entities';

@Module({
  imports: [TypeOrmModule.forFeature([Data])],
  controllers: [DatasController],
  providers: [DatasService],
})
export class DatasModule {}
