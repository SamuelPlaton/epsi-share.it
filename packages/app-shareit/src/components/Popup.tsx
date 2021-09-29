import {FunctionComponent} from "react";


const Popup: FunctionComponent = ({ children }) => {
    return (
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50 flex">
            <div className="relative flex rounded-lg bg-white mx-auto my-auto">
                {children}
            </div>
        </div>
    );
}

export default Popup;