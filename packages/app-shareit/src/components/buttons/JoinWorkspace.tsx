import React, {FunctionComponent, useState} from "react";
import Popup from "../Popup";

const JoinWorkspace: FunctionComponent = ({}) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    return (
        <div className='flex flex-col flex-grow'>
            <button
            className="bg-blue-500 p-4 rounded-md shadow-md text-lg text-white mb-2"
            onClick={() => setIsPopupOpen(true)}
            >
            Rejoindre un espace de travail
            </button>
            {isPopupOpen &&
            <Popup onClose={() => setIsPopupOpen(false)}>
                <div>
                    <form className="flex flex-col items-center mx-8 my-8">
                        <label className="mb-3 text-lg">Veuillez entrer l'identifiant du workspace</label>
                        <input placeholder="Entrez un identifiant" className="p-2"
                               type="text"
                               required/>
                        <div className="form-group mt-4">
                            <button type="submit"
                                    className="bg-blue-500 p-2 rounded-md shadow-md text-white"
                            >Rejoindre</button>
                        </div>
                    </form>
                </div>
            </Popup>
            }
        </div>
    )
}

export default JoinWorkspace;
