import { default as UsersApi } from './users/users-api';
import { default as UsersWorkspacesApi } from './users-workspaces/users-workspaces-api';
import { default as WorkspacesApi } from './workspaces/workspaces-api';

const Api = {
  UsersApi: UsersApi,
  UsersWorkspacesApi: UsersWorkspacesApi,
  WorkspacesApi: WorkspacesApi,
}

export default Api;
