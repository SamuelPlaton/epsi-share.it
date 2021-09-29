import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Data} from 'src/entities';
import {Repository} from 'typeorm';
import {CreateDataDto} from "./dto";

@Injectable()
export class DatasService {
  constructor(@InjectRepository(Data) private datasRepository: Repository<Data>) {
  }

  find(id: string): Promise<Data> {
    return this.datasRepository.findOne(id);
  }

  getAll(): Promise<Data[]> {
    return this.datasRepository.find();
  }

  create(createDataDto: CreateDataDto): Data {
    const data = new Data();
    return this.datasRepository.create(data);
  }
}
