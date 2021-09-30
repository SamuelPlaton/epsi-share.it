import {Workspace} from '../../../entities';

export class CreateDataDto {
  user: string;
  name: string;
  type: string;
  content: string;
  workspace: Workspace;
  code?: string;
}
