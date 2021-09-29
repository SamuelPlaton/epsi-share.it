import React, {useState} from "react";
import Popup from "../Popup";
import WorkspacesApi from "../../api/workspaces/workspaces-api";

const CreateWorkspace = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [newWorkspaceName, setNewWorkSpaceName] = useState<string>("");

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        WorkspacesApi.create({
            name: newWorkspaceName
        });
        event.preventDefault();
    }

    return (
        <div>
            <button type="button" onClick={() => setIsPopupOpen(true)}>
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
                                 >Créer</button>
                             </div>
                         </form>
                    </div>
                </Popup>
                }
        </div>


    );
}

export default CreateWorkspace;