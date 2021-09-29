import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User, Workspace} from 'src/entities';
import {Repository} from 'typeorm';
import {CreateWorkspaceDto} from './dto';
import {JoinWorkspaceDto} from './dto/workspaces.dto';

@Injectable()
export class WorkspacesService {
  constructor(@InjectRepository(Workspace) private workspacesRepository: Repository<Workspace>) {
  }

  async find(id: string): Promise<Workspace> {
    return this.workspacesRepository.findOne(id);
  }

  async getAll(user: User): Promise<Workspace[]> {
    return this.workspacesRepository.find({user: user});
  }

  async create(createWorkspaceDto: CreateWorkspaceDto, user: User): Promise<Workspace> {
    const workspace = new Workspace();
    workspace.name = createWorkspaceDto.name;
    workspace.identifier = createWorkspaceDto.identifier;
    workspace.user = user;
    return this.workspacesRepository.save(workspace);
  }

  async join(joinWorkspaceDto: JoinWorkspaceDto, user: User): Promise<Workspace> {
    const workspaces = await this.workspacesRepository.find({
      where: {
        id: joinWorkspaceDto.id
      },
      relations: ['users']
    });
    if (!(workspaces.length === 1)) {
      throw new NotFoundException();
    }
    const workspace = workspaces[0];
    if (workspace.users.find(el => el.id === user.id)) {
      throw new Error('Already joined')
    }
    workspace.users.push(user);
    return await this.workspacesRepository.save(workspace);
  }
}
