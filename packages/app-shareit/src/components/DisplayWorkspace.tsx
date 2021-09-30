import {FunctionComponent, useEffect, useState} from "react";
import {Data, Workspace} from "../models";
import FileUpload from "./FileUpload";
import {DataStatus} from "../models/Data";
import Popup from "./Popup";
import {Api} from "../api";
import {toast} from "../toast-manager";
import CryptoJS from "crypto-js";

interface Props {
    workspace: Workspace,
}

function convertWordArrayToUint8Array(wordArray : any) {
    const arrayOfWords = wordArray.hasOwnProperty("words") ? wordArray.words : [];
    const length = wordArray.hasOwnProperty("sigBytes") ? wordArray.sigBytes : arrayOfWords.length * 4;

    let uInt8Array = new Uint8Array(length), index=0, word, i;

    for (i=0; i<length; i++) {
        word = arrayOfWords[i];
        uInt8Array[index++] = word >> 24;
        uInt8Array[index++] = (word >> 16) & 0xff;
        uInt8Array[index++] = (word >> 8) & 0xff;
        uInt8Array[index++] = word & 0xff;
    }
    return uInt8Array;
}

const DisplayWorkspace: FunctionComponent<Props> = ({workspace}) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [blob, setBlob] = useState<Blob>();
    const [fileName, setFileName] = useState<string>();

    const [datas, setDatas] = useState<Data[]>([]);

    const getDatas = async () => {
        const tempDatas = await Api.DatasApi.get(workspace.id);
        setDatas(tempDatas);
    }

    useEffect(() => {
        getDatas();
    }, [workspace]);

    const handleSubmit = () => {
        toast('Succès', 'Fichier envoyé', 'green');
        setIsPopupOpen(false);
    }

    const downloadData = (data: Data) => {
        const reader = new FileReader();
        reader.onload = () => {
            console.log('ON DECRYPTE');
            const key = "ee4e5d0c-7a43-4818-b53b-a3166149d819";
            // @ts-ignore
            const decrypted = CryptoJS.AES.decrypt(reader.result, key);
            const typedArray = convertWordArrayToUint8Array(decrypted);
            const myBlob = new Blob([typedArray]);
            setBlob(myBlob);
            setFileName(data.name);
        };

        if(data) {
            reader.readAsText(new Blob([data.content]));
        }
    }

    useEffect(() => {
        if (blob && fileName) {
            // we download
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(
              new Blob([blob], { type: "application/octet-stream" })
            );
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            setFileName(undefined);
            setBlob(undefined);
        }
    }, [blob, fileName])
    return (
        <div>
            <div className=" m-2 p-1 border-b-2 border-blue-300 text-center text-2xl">
                <h2>{workspace?.name}</h2>
                <button className="border-2 border-blue-300 rounded-md p-2 m-4 text-sm" type="button" onClick={() => setIsPopupOpen(true)}>Ajouter un fichier</button>
            </div>
            <div className="flex flex-row max-w-full flex-wrap px-3">
                {datas.map((data) =>(
                    <button
                      className="m-2 p-2 pt-4 shadow p-7 rounded-md  flex flex-col items-center w-36"
                      key={data.id}
                      onClick={() => downloadData(data)}
                    >
                        <img
                            className=""
                            src="file.svg"
                            alt="folder"
                        />
                        <div className="mt-4">
                            <p>{ data.name }</p>
                        </div>
                    </button>
                    ))
                }
            </div>
            {isPopupOpen &&
                <Popup onClose={() => setIsPopupOpen(false)}>
                    <FileUpload workspace={workspace} onSubmit={handleSubmit}/>
                </Popup>
            }
        </div>
    );
}

export default DisplayWorkspace;