import { client } from '../client/';
import {toast} from '../../toast-manager';


interface UserConnexion {
  identifier: string;
  password: string;
}

interface UserConfirmConnexion {
  identifier: string;
  securityCode: string;
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
  }).catch(err => toast(err.response.data.message, err.response.data.error)),

  list: (ids: string[]) => client.get(`/users/list?ids=${ids.join(',')}`).then((response) => {
    return response.data;
  }).catch(err => toast(err.response.data.message, err.response.data.error)),

  connect: (userConnexion: UserConnexion) => client.post('/users/login', { ...userConnexion }).then((response) => {
    return response.data;
  }).catch((err) => toast(err.response.data.message, err.response.data.error)),

  confirmConnexion: (userConfirmConnexion: UserConfirmConnexion) => client.post('/users/confirm', { ...userConfirmConnexion }).then((response) => {
    return response.data;
  }).catch((err) => console.log(err)),

  create: (userCreation: UserCreation) => client.post('/users', { ...userCreation }).then((response) => {
    return response.data;
  }).catch(err => toast(err.response.data.message, err.response.data.error)),

}

export default UsersApi;
