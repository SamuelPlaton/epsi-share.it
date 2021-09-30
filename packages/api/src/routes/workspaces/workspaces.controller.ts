import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { Workspace } from 'src/entities';
import { CreateWorkspaceDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { InviteWorkspaceDto } from './dto/workspaces.dto';

@Controller('workspaces')
export class WorkspacesController {
  constructor(private workspacesService: WorkspacesService) {}

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
  async create(
    @Body() createWorkspaceDto: CreateWorkspaceDto,
    @Req() req: any,
  ): Promise<Workspace> {
    return await this.workspacesService.create(createWorkspaceDto, req.user);
  }

  @Get('join/:id')
  @UseGuards(AuthGuard('jwt'))
  async join(@Param('id') id: string, @Req() req: any): Promise<Workspace> {
    return await this.workspacesService
      .join({ id: id }, req.user)
      .catch((err) => {
        throw new HttpException(err.message, err.status);
      });
  }

  @Post('/invite')
  @UseGuards(AuthGuard('jwt'))
  async invite(
    @Body() inviteWorkspaceDto: InviteWorkspaceDto,
    @Req() req: any,
  ): Promise<boolean> {
    return await this.workspacesService.invite(inviteWorkspaceDto, req.user);
  }
}
