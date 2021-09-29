import React, {FunctionComponent, useState} from "react";
import Popup from "../Popup";
import WorkspacesApi from "../../api/workspaces/workspaces-api";
import {Workspace} from "../../models";

interface Props {
    onSubmit: (_: Workspace) => void;
}
const CreateWorkspace: FunctionComponent<Props> = ({ onSubmit }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [newWorkspaceName, setNewWorkSpaceName] = useState<string>("");

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        const workspace = await WorkspacesApi.create({
            name: newWorkspaceName
        });
        if (workspace?.id) {
            onSubmit(workspace);
            setIsPopupOpen(false);
        }

    }

    return (
        <div>
            <button type="button" className="border-4 shadow-md rounded-md border-blue-500 p-4 bg-white" onClick={() => setIsPopupOpen(true)}>
                <p>Créer un dossier partagé</p>
            </button>
            {isPopupOpen &&
                <Popup onClose={() => setIsPopupOpen(false)}>
                    <div>
                         <form className="flex flex-col items-center mx-8 my-8">
                            <label className="mb-3 text-lg">Créer un espace de travail</label>
                            <input placeholder="Entrez un nom" className="p-2"
                                   type="text"
                                   onChange={(e) => setNewWorkSpaceName(e.target.value)}
                                   required/>
                             <div className="form-group mt-4">
                                 <button type="submit"
                                         className="bg-blue-500 p-2 rounded-md shadow-md text-white"
                                         onClick={handleSubmit}
                                 >Valider</button>
                             </div>
                         </form>
                    </div>
                </Popup>
                }
        </div>


    );
}

export default CreateWorkspace;