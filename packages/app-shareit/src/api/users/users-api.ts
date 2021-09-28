import { client } from '../client/';

interface UserConnexion {
  identifier: string;
  password: string;
}

interface UserCreation {
  identifier: string;
  email: string;
  password: string;
  name: string;
}

const UsersApi = {
  get: (id: string) => client.get(`/users/get/${id}`).then(response => {
    return response.data;
  }).catch(err => err),

  list: (ids: string[]) => client.get(`/users/list?ids=${ids.join(',')}`).then((response) => {
    return response.data;
  }).catch(err => err),

  connect: (userConnexion: UserConnexion) => client.post('/users/connect', { userConnexion }).then((response) => {
    return response.data;
  }).catch(err => err),

  create: (userCreation: UserCreation) => client.post('/users/create', { userCreation }).then((response) => {
    return response.data;
  }).catch(err => err),

}

export default UsersApi;
