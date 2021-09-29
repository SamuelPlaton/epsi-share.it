import {Body, Controller, Get, Param, Post, Req, UseGuards} from '@nestjs/common';
import {WorkspacesService} from './workspaces.service';
import {Workspace} from 'src/entities';
import {CreateWorkspaceDto} from './dto';
import {AuthGuard} from '@nestjs/passport';

@Controller('workspaces')
export class WorkspacesController {
  constructor(private workspacesService: WorkspacesService) {
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  find(@Param('id') id: string): Promise<Workspace> {
    return this.workspacesService.find(id).then((user) => user);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll(@Req() req: any): Promise<Workspace[]> {
    return this.workspacesService.getAll(req.user);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() createWorkspaceDto: CreateWorkspaceDto, @Req() req: any): Promise<Workspace> {
    return await this.workspacesService.create(createWorkspaceDto, req.user);
  }
}
