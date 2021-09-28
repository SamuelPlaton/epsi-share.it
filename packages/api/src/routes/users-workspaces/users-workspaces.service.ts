import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserWorkspace } from 'src/entities';
import { Repository } from 'typeorm';
import { JoinUserWorkspaceDto } from './dto';

@Injectable()
export class UsersWorkspacesService {
  constructor(
    @InjectRepository(UserWorkspace)
    private usersWorkspacesRepository: Repository<UserWorkspace>,
  ) {}

  /*join(joinUserWorkspaceDto: JoinUserWorkspaceDto): UserWorkspace {

    const newUserWorkspace: UserWorkspace = {
      id: 'uuid-to-generate',
      user: joinUserWorkspaceDto.user,
      workspace: joinUserWorkspaceDto.workspace,
    };
    return this.usersWorkspacesRepository.create(joinUserWorkspaceDto);
  }*/
}
