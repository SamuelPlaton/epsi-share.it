import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { Workspace } from 'src/entities';
import { CreateWorkspaceDto } from './dto';

@Controller('workspaces')
export class WorkspacesController {
  constructor(private workspacesService: WorkspacesService) {}

  @Get(':id')
  find(@Param('id') id: string): Promise<Workspace> {
    return this.workspacesService.find(id).then((user) => user);
  }

  @Get()
  list(@Query() ids: string[]): Promise<Workspace[]> {
    return this.workspacesService.list(ids);
  }

  @Post()
  create(@Body() createWorkspaceDto: CreateWorkspaceDto): Workspace {
    return this.workspacesService.create(createWorkspaceDto);
  }
}
