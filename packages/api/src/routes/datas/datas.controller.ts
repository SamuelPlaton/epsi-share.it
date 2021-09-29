import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {Data} from '../../entities';
import {DatasService} from './datas.service';
import {CreateDataDto} from './dto';
import {AuthGuard} from '@nestjs/passport';

@Controller('datas')
export class DatasController {
  constructor(private datasService: DatasService) {
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  find(@Param('id') id: string): Promise<Data> {
    return this.datasService.find(id);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getAll(): Promise<Data[]> {
    return this.datasService.getAll();
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createDataDto: CreateDataDto): Data {
    return this.datasService.create(createDataDto);
  }
}
