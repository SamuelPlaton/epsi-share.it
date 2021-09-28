import { Test, TestingModule } from '@nestjs/testing';
import { UsersWorkspacesController } from './users-workspaces.controller';

describe('UsersWorkspacesController', () => {
  let controller: UsersWorkspacesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersWorkspacesController],
    }).compile();

    controller = module.get<UsersWorkspacesController>(UsersWorkspacesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
