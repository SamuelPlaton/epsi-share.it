import { Module } from '@nestjs/common';
import { UsersWorkspacesController } from './users-workspaces.controller';
import { UsersWorkspacesService } from './users-workspaces.service';

@Module({
  controllers: [UsersWorkspacesController],
  providers: [UsersWorkspacesService]
})
export class UsersWorkspacesModule {}
