import { client } from '../client/';
import {Workspace} from "../../models";
import {toast} from "../../toast-manager";

interface DataCreation {
  name: string;
  type: string;
  content: string;
  workspace: Workspace;
}

const DatasApi = {
  get: (id: string) => client.get(`/datas/all/${id}`).then(response => {
    console.log('datas from then :', response.data);
    return response.data;
  }).catch(err => toast(err.response.data.message, err.response.data.error)),

  create: (dataCreation: DataCreation) => client.post(`/datas`, { ...dataCreation }).then(response => {
    return response.data;
  }).catch(err => err),

}

export default DatasApi;
