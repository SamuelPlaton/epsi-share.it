import {FunctionComponent} from "react";
import {Workspace} from "../models";
import FileUpload from "./FileUpload";

interface Props {
    workspace?: Workspace,
}

const DisplayWorkspace: FunctionComponent<Props> = ({workspace}) => {

    return (
        <div>
            <div className=" m-2 p-1 border-b-2 border-blue-300 text-center text-2xl">
                <h2>{workspace?.name}</h2>
            </div>
                <div className="flex flex-row">
                    <div className="m-2 p-2 pt-4 shadow p-7 rounded-md  flex flex-col items-center ">
                        <img
                            className="w-36"
                            src="file.svg"
                            alt="folder"
                        />
                        <div className="mt-4">
                            <p>file</p>
                        </div>
                    </div>
                </div>
            <div className="fixed top-2/3 left-1/2 transform -translate-x-8 translate-y-2/3">
                <FileUpload/>
            </div>
        </div>
    );
}

export default DisplayWorkspace;