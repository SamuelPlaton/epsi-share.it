import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User, UserWorkspace, Workspace} from 'src/entities';
import {Repository} from 'typeorm';
import {JoinUserWorkspaceDto} from './dto';
import {UserWorkspaceStatus} from "../../entities/user-workspace.entity";

@Injectable()
export class UsersWorkspacesService {
  constructor(
    @InjectRepository(UserWorkspace)
    private usersWorkspacesRepository: Repository<UserWorkspace>,
    private usersRepository: Repository<User>,
    private workspacesRepository: Repository<Workspace>,
  ) {}

  async join(
    joinUserWorkspaceDto: JoinUserWorkspaceDto,
  ): Promise<UserWorkspace> {
    const user = await this.usersRepository.findOne(joinUserWorkspaceDto.user);
    const workspace = await this.workspacesRepository.findOne(
      joinUserWorkspaceDto.workspace,
    );
    const newUserWorkspace: UserWorkspace = {
      id: 'uuid-to-generate',
      user: user,
      workspace: workspace,
      status: UserWorkspaceStatus.GUEST,
    };
    return this.usersWorkspacesRepository.create(newUserWorkspace);
  }
}
