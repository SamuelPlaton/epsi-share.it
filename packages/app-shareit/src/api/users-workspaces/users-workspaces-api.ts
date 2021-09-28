import { client } from '../client/';

interface UserWorkspaceJoin {
  workspace: string;
  user: string;
  token: string;
}

const UsersWorkspacesApi = {
  join: (userWorkspaceJoin: UserWorkspaceJoin) => client.post(`/usersWorkspaces/join`, { userWorkspaceJoin }).then(response => {
    return response.data;
  }).catch(err => err),

}

export default UsersWorkspacesApi;
