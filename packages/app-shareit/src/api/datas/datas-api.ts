import { client } from '../client/';
import {Workspace} from "../../models";

interface DataCreation {
  name: string;
  type: string;
  content: string;
  workspace: Workspace;
}

const DatasApi = {
  get: (id: string) => client.get(`/datas/get/${id}`).then(response => {
    return response.data;
  }).catch(err => err),

  create: (dataCreation: DataCreation) => client.post(`/datas`, { ...dataCreation }).then(response => {
    return response.data;
  }).catch(err => err),

}

export default DatasApi;
