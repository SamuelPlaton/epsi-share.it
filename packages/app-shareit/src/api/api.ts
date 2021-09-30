import { default as UsersApi } from './users/users-api';
import { default as WorkspacesApi } from './workspaces/workspaces-api';
import DatasApi from "./datas/datas-api";

const Api = {
  DatasApi: DatasApi,
  UsersApi: UsersApi,
  WorkspacesApi: WorkspacesApi,
}

export default Api;
