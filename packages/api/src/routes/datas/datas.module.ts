import {Module} from '@nestjs/common';
import {DatasService} from './datas.service';
import {DatasController} from './datas.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Data} from '../../entities';
import {UsersModule} from '../users';

@Module({
  imports: [TypeOrmModule.forFeature([Data]),
    UsersModule],
  controllers: [DatasController],
  providers: [DatasService],
})
export class DatasModule {
}
