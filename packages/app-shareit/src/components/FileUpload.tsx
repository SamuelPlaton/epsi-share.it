import {FunctionComponent, useState} from "react";
import CryptoJS from 'crypto-js';
import {Workspace} from "../models";
import {Api} from "../api";

interface Props {
    workspace: Workspace;
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

const FileUpload: FunctionComponent<Props> = ({ workspace }) => {
    const [fileName, setFileName] = useState("");
    const [blob, setBlob] = useState(new Blob());

    const handleFile = (files : FileList | null) =>{
        if(files !== null) {
           setFileName(files[0].name);
           encryptFile(files[0]);
        }
    }

    const encryptFile = (file: File) => {
        // Encrypt
        const reader = new FileReader();
        reader.onload = async () => {
            const key = 'oui';
            // @ts-ignore
            const wordArray = CryptoJS.lib.WordArray.create(reader.result);
            const encrypted = CryptoJS.AES.encrypt(wordArray, key).toString();
            const blob = new Blob([encrypted]);
            await Api.DatasApi.create({
                content: encrypted,
                name: file.name,
                type: "pdf",
                workspace: workspace
            })
        }
        if(file)
            reader.readAsArrayBuffer(file);

    }

    const decrypt = (aFile: File | undefined) => {
        const reader = new FileReader();
        reader.onload = () => {
            const key = "oui";

            // @ts-ignore
            const decrypted = CryptoJS.AES.decrypt(reader.result, key);
            const typedArray = convertWordArrayToUint8Array(decrypted);
            const myBlob = new Blob([typedArray]);
            setBlob(myBlob);
        };
        if(aFile)
            reader.readAsText(aFile);

    }

    const download = () => {
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(
            new Blob([blob], { type: "application/octet-stream" })
        );
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
    }

    return (
      <div className="p-7 bg-white">
          <form>
              <div className="grid grid-cols-1 space-y-4">
                  <div>
                      <p>Entrez un fichier</p>
                  </div>
                  <div className="">
                      <input type="file"
                             onChange={(e) => handleFile(e.target.files)}
                      />
                  </div>
              </div>
          </form>

      </div>
    );
}

export default FileUpload;