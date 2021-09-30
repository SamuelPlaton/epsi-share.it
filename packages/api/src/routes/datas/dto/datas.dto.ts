import {Data, Workspace} from '../../../entities';

export class CreateDataDto {
  name: string;
  type: string;
  content: string;
  workspace: Workspace;
  code?: string;
  parent?: Data;
}
