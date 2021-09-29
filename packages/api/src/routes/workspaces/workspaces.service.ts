import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User, Workspace} from 'src/entities';
import {Repository} from 'typeorm';
import {CreateWorkspaceDto} from './dto';

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
}
