import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Data, User, Workspace} from 'src/entities';
import { Repository } from 'typeorm';
import { CreateDataDto } from './dto';

@Injectable()
export class DatasService {
  constructor(
    @InjectRepository(Data) private datasRepository: Repository<Data>,
    @InjectRepository(Workspace) private workspacesRepository: Repository<Workspace>,
  ) {}

  async find(id: string): Promise<Data> {
    return this.datasRepository.findOne(id);
  }

  async getAll(workspaceId: string, folder: string = null): Promise<Data[]> {
    console.log('WORKSPACE ID : ', workspaceId);
    const workspace = await this.workspacesRepository.findOne({
      id: workspaceId,
    });

    if (!workspace) {
      throw new NotFoundException('Workspace not found');
    }

    const data = await this.datasRepository.find({
      where: {
        workspace: workspace,
      },
    });
    console.log(data);
    return data;
  }

  async create(createDataDto: CreateDataDto, user: User): Promise<Data> {
    const data = new Data();
    data.user = user;
    data.workspace = createDataDto.workspace;
    data.type = createDataDto.type;
    data.content = createDataDto.content;
    data.code = 'salut';
    data.name = createDataDto.name;
    if (createDataDto.parentId) {
      const parent = await this.datasRepository.findOne({
        id: createDataDto.parentId,
      });
      if (!parent) {
        throw new NotFoundException();
      }
      if (parent && parent.type !== 'folder') {
        throw new Error('Parent must be a folder');
      }
      data.parentId = createDataDto.parentId ? createDataDto.parentId : null;
    }
    return await this.datasRepository.save(data);
  }
}
