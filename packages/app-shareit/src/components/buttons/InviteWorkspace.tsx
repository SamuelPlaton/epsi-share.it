import React, {FunctionComponent, useState} from "react";
import Popup from "../Popup";
import WorkspacesApi from "../../api/workspaces/workspaces-api";
import {Workspace} from "../../models";

interface Props {
    workspace: Workspace;
}

const InviteWorkspace: FunctionComponent<Props> = ({ workspace }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [joinUserIdentifier, setJoinUserIdentifier] = useState<string>("");

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        await WorkspacesApi.invite({
            workspaceId: workspace.id,
            userIdentifier: joinUserIdentifier
        });
        setIsPopupOpen(false);
    }

    return (
        <div>
            <button type="button" className="border-4 shadow-md rounded-md border-blue-500 p-4 bg-white w-full" onClick={() => setIsPopupOpen(true)}>
                <p>Inviter un utilisateur</p>
            </button>
            {isPopupOpen &&
            <Popup onClose={() => setIsPopupOpen(false)}>
                <div>
                    <form className="flex flex-col items-center mx-8 my-8">
                        <label className="mb-3 text-lg">Inviter un utilisateur dans l'espace de travail</label>
                        <input placeholder="Entrez un identifiant" className="p-2"
                               type="text"
                               onChange={(e) => setJoinUserIdentifier(e.target.value)}
                               required/>
                        <div className="form-group mt-4">
                            <button type="button"
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

export default InviteWorkspace;
