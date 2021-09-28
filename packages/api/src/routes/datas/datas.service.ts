import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Data, User} from 'src/entities';
import { Repository } from 'typeorm';
import {CreateUserDto} from "../users/dto";
import {CreateDataDto} from "./dto";

@Injectable()
export class DatasService {
  constructor(
    @InjectRepository(Data) private datasRepository: Repository<Data>,
  ) {}

  find(id: string): Promise<Data> {
    return this.datasRepository.findOne(id);
  }

  list(ids: string[]): Promise<Data[]> {
    return this.datasRepository.findByIds(ids);
  }

  create(createDataDto: CreateDataDto): Data {
    const data = new Data();
    // setup real datas objects
    return this.datasRepository.create(data);
  }
}
