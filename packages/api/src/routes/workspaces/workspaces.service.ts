import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Workspace } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateWorkspaceDto } from './dto';

@Injectable()
export class WorkspacesService {
  constructor(
    @InjectRepository(Workspace)
    private workspacesRepository: Repository<Workspace>,
  ) {}

  find(id: string): Promise<Workspace> {
    return this.workspacesRepository.findOne(id);
  }

  list(ids: string[]): Promise<Workspace[]> {
    return this.workspacesRepository.findByIds(ids);
  }

  create(createWorkspaceDto: CreateWorkspaceDto): Workspace {
    return this.workspacesRepository.create(createWorkspaceDto);
  }
}
