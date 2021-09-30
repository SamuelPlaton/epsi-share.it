import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Data, User } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateDataDto } from './dto';

@Injectable()
export class DatasService {
  constructor(
    @InjectRepository(Data) private datasRepository: Repository<Data>,
  ) {}

  async find(id: string): Promise<Data> {
    return this.datasRepository.findOne(id);
  }

  async getAll(user: User): Promise<Data[]> {
    return this.datasRepository.find({ where: { user: user } });
  }

  async create(createDataDto: CreateDataDto, user: User): Promise<Data> {
    const data = new Data();
    data.user = user;
    data.workspace = createDataDto.workspace;
    data.type = createDataDto.type;
    data.content = createDataDto.content;
    data.code = 'salut';
    data.name = createDataDto.name;
    return await this.datasRepository.save(data);
  }
}
