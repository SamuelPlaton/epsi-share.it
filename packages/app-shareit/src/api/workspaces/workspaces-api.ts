import { client } from '../client/';
import {toast} from "../../toast-manager";

export interface WorkspaceCreation {
  name: string;
}

export interface WorkspaceJoin {
  id: string;
}

export interface WorkspaceInvite {
  workspaceId: string;
  userIdentifier: string;
}

const WorkspacesApi = {
  get: (id: string) => client.get(`/workspaces/get/${id}`).then(response => {
    return response.data;
  }).catch(err => toast(err.response.data.message, err.response.data.error)),

  list: () => client.get('/workspaces', { headers: { Authorization: `Bearer ${localStorage.getItem('auth')}`}}).then(response => {
    return response.data;
  }).catch(err => err),

  create: (workspaceCreation: WorkspaceCreation) => client.post('/workspaces', { ...workspaceCreation }).then((response) => {
    return response.data;
  }).catch(err => toast(err.response.data.message, err.response.data.error)),

  join: (workspaceJoin: WorkspaceJoin) => client.get(`/workspaces/join/${workspaceJoin.id}`).then((response) => {
    return response.data;
  }).catch(err => toast(err.response.data.message, err.response.data.error)),

  invite: (workspaceInvite: WorkspaceInvite) => client.post(`/workspaces/invite`, { ...workspaceInvite }).then((response) => {
    return response.data;
  }).catch(err => toast(err.response.data.message, err.response.data.error)),

}


export default WorkspacesApi;
