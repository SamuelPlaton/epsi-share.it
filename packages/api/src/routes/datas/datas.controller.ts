import {Body, Controller, Get, HttpException, Param, Post, Req, UseGuards} from '@nestjs/common';
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
  async find(@Param('id') id: string): Promise<Data> {
    try {
      return await this.datasService.find(id);
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getAll(@Req() req: any): Promise<Data[]> {
    try {
      return await this.datasService.getAll(req.user);
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() createDataDto: CreateDataDto, @Req() req: any): Promise<Data> {
    try {
      return await this.datasService.create(createDataDto, req.user);
    } catch (e) {
      throw new HttpException(e.message, e.status);

    }
  }
}
