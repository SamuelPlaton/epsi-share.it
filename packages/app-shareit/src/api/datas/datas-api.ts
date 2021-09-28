import { client } from '../client/';

interface DataCreation {
  user: string;
  token: string;
  data: any;
  workspace?: string
}

const DatasApi = {
  get: (id: string) => client.get(`/datas/get/${id}`).then(response => {
    return response.data;
  }).catch(err => err),

  create: (dataCreation: DataCreation) => client.post(`/datas`, { dataCreation }).then(response => {
    return response.data;
  }).catch(err => err),

}

export default DatasApi;
