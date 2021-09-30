import {Workspace} from "../../../models";
import {FunctionComponent} from "react";

interface Props {
  activeWorkspace?: Workspace
  onClick: (_: Workspace) => void;
  workspaces: Workspace[];
}

const WorkspacesList: FunctionComponent<Props> = ({ activeWorkspace, onClick, workspaces }) => {
    return (
      <div className='flex flex-col mt-4 items-center'>
        <p>Mes workspaces :</p>
        {workspaces.map((workspace) => (
          <button
            className={`m-2 p-1 border-2 ${activeWorkspace && activeWorkspace.id === workspace.id ? 'border-blue-300' : 'border-gray-300'} rounded-sm flex flex-row items-center`}
            onClick={() => onClick(workspace)}
            type="button"
          >
            <img
              className="w-8 mr-4"
              src="folder.png"
              alt="folder"
            />
            <p className="font-semibold">{workspace.name}</p>
          </button>
        ))}
    </div>
    );
}

export default WorkspacesList;
