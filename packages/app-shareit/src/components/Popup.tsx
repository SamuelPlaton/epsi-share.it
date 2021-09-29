import React, {FunctionComponent} from "react";

interface Props {
    onClose: () => void;
}
const Popup: FunctionComponent<Props> = ({ children, onClose }) => {
    return (
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50 flex">
            <div className="relative flex rounded-lg bg-white mx-auto my-auto">
                <div className="absolute top-3 left-3">
                    <button onClick={onClose}>
                        <img className="h-3 w-3" src="cross.svg" alt="Close"/>
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}

export default Popup;