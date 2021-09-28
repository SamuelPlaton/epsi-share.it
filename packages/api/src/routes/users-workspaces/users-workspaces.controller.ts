import { Body, Controller, Post } from '@nestjs/common';
import { UsersWorkspacesService } from './users-workspaces.service';
import { UserWorkspace } from 'src/entities';
import { JoinUserWorkspaceDto } from './dto';

@Controller('users-workspaces')
export class UsersWorkspacesController {
  constructor(private usersWorkspacesService: UsersWorkspacesService) {}

  @Post()
  join(
    @Body() joinUserWorkspaceDto: JoinUserWorkspaceDto,
  ): Promise<UserWorkspace> {
    return this.usersWorkspacesService.join(joinUserWorkspaceDto);
  }
}
