import {Module} from '@nestjs/common';
import {WorkspacesService} from './workspaces.service';
import {WorkspacesController} from './workspaces.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Workspace} from 'src/entities';
import {UsersModule} from '../users';

@Module({
  imports: [TypeOrmModule.forFeature([Workspace]), UsersModule],
  controllers: [WorkspacesController],
  providers: [WorkspacesService],
})
export class WorkspacesModule {
}
