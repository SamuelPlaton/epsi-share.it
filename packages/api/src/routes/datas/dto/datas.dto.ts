import {Workspace} from '../../../entities';

export class CreateDataDto {
  user: string;
  type: string;
  content: string;
  workspace: Workspace;
  code?: string;
}
