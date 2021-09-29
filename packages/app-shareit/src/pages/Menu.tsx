import {FunctionComponent, useEffect} from "react";
import { useHistory } from "react-router-dom";
import NavigationLayout from "../components/NavigationLayout";
import CreateWorkspace from "../components/buttons/CreateWorkspace";
import {Api} from "../api";

const Menu: FunctionComponent = () => {

  const isUserActive = localStorage.getItem('auth');
  const history = useHistory();
  if (!isUserActive) {
    history.replace('/');
  }

  const getWorkspaces = async () => {
    return await Api.WorkspacesApi.list();
  }

  const workspaces = getWorkspaces();
  console.log('workspaces : ', workspaces)

  return (
    <NavigationLayout title="Menu">
      <div className="flex flex-row min-h-screen">
        <div className="border-2 border-gray-300 m-4 p-4">
          <CreateWorkspace/>
        </div>
        <div className="flex-grow border-2 border-gray-300 m-4 p-4">
          <p> Hello 2</p>
        </div>
      </div>
    </NavigationLayout>
  );
}

export default Menu;
