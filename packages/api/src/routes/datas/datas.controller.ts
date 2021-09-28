import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Data } from '../../entities';
import { DatasService } from './datas.service';
import { CreateDataDto } from './dto';

@Controller('datas')
export class DatasController {
  constructor(private datasService: DatasService) {}

  @Get(':id')
  find(@Param('id') id: string): Promise<Data> {
    return this.datasService.find(id);
  }

  @Get()
  list(@Query() ids: string[]): Promise<Data[]> {
    return this.datasService.list(ids);
  }

  @Post()
  create(@Body() createDataDto: CreateDataDto): Data {
    return this.datasService.create(createDataDto);
  }
}
