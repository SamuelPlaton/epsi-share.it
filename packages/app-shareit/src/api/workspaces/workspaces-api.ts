import { client } from '../client/';

export interface WorkspaceCreation {
  name: string;
}

const WorkspacesApi = {
  get: (id: string) => client.get(`/workspaces/get/${id}`).then(response => {
    return response.data;
  }).catch(err => err),

  list: () => client.get('/workspaces').then(response => {
    return response.data;
  }).catch(err => err),

  create: (workspaceCreation: WorkspaceCreation) => client.post('/workspaces', { ...workspaceCreation }).then((response) => {
    return response.data;
  }).catch(err => err),

}


export default WorkspacesApi;
