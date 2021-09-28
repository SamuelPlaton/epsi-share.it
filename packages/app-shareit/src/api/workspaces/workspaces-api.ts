import { client } from '../client/';

interface WorkspaceCreation {
  name: string;
}

const WorkspacesApi = {
  get: (id: string) => client.get(`/workspaces/get/${id}`).then(response => {
    return response.data;
  }).catch(err => err),

  create: (workspaceCreation: WorkspaceCreation) => client.post('/workspaces/create', { workspaceCreation }).then((response) => {
    return response.data;
  }).catch(err => err),

}

export default WorkspacesApi;
