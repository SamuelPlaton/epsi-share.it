import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Data, User} from 'src/entities';
import {Repository} from 'typeorm';
import {CreateDataDto} from "./dto";

@Injectable()
export class DatasService {
  constructor(@InjectRepository(Data) private datasRepository: Repository<Data>) {
  }

  async find(id: string): Promise<Data> {
    return this.datasRepository.findOne(id);
  }

  async getAll(workspaceId: string, folder: string = null): Promise<Data[]> {
    return this.datasRepository.find({
      where: {
        workspace: workspaceId,
        parent: folder
      }
    });
  }

  async create(createDataDto: CreateDataDto, user: User): Promise<Data> {
    const data = new Data();
    data.user = user;
    data.workspace = createDataDto.workspace;
    data.type = createDataDto.type;
    data.content = createDataDto.content;
    data.code = createDataDto.code ? createDataDto.code : null;
    data.name = createDataDto.name;
    if (createDataDto.parent) {
      if (createDataDto.parent.type !== 'folder') {
        throw new Error('Parent must be a folder')
      }
      data.parent = createDataDto.parent ? createDataDto.parent : null;
    }
    return await this.datasRepository.save(data);
  }
}
