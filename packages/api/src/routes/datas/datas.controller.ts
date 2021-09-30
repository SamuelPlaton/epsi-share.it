import {Body, Controller, Get, HttpException, Param, Post, Query, Req, UseGuards} from '@nestjs/common';
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

  @Get(':workspaceId')
  @UseGuards(AuthGuard('jwt'))
  async getAll(@Param() workspaceId: string, @Query() folder: string): Promise<Data[]> {
    try {
      return await this.datasService.getAll(workspaceId, folder);
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
