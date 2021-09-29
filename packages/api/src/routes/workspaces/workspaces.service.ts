import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, Workspace } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateWorkspaceDto } from './dto';
import { InviteWorkspaceDto } from './dto/workspaces.dto';
import { sendMail } from '../helpers/mailHandler';

@Injectable()
export class WorkspacesService {
  constructor(
    @InjectRepository(Workspace)
    private workspacesRepository: Repository<Workspace>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async find(id: string): Promise<Workspace> {
    return this.workspacesRepository.findOne(id);
  }

  async getAll(user: User): Promise<Workspace[]> {
    return this.workspacesRepository.find({ user: user });
  }

  async create(
    createWorkspaceDto: CreateWorkspaceDto,
    user: User,
  ): Promise<Workspace> {
    let identifier = Math.floor(100000 + Math.random() * 900000).toString();
    let foundWorkspace = await this.workspacesRepository.findOne({
      identifier: identifier,
    });
    while (foundWorkspace) {
      identifier = Math.floor(100000 + Math.random() * 900000).toString();
      foundWorkspace = await this.workspacesRepository.findOne({
        identifier: identifier,
      });
    }
    const workspace = new Workspace();
    workspace.name = createWorkspaceDto.name;
    workspace.identifier = identifier;
    workspace.user = user;
    return this.workspacesRepository.save(workspace);
  }

  async invite(inviteWorkspaceDto: InviteWorkspaceDto): Promise<boolean> {
    const workspace = await this.workspacesRepository.findOne(
      inviteWorkspaceDto.workspaceId,
    );
    if (!workspace) {
      throw new NotFoundException('Workspace not found');
    }
    const user = await this.userRepository.findOne({
      identifier: inviteWorkspaceDto.userIdentifier,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await sendMail(user.email, `http://localhost:3000/join/${workspace.id}`);
    return true;
  }
}
