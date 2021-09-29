import { default as UsersApi } from './users/users-api';
import { default as WorkspacesApi } from './workspaces/workspaces-api';

const Api = {
  UsersApi: UsersApi,
  WorkspacesApi: WorkspacesApi,
}

export default Api;
