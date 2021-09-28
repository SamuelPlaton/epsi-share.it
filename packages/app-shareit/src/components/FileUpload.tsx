import './../styles/FileLoader.css'
import { useState} from "react";
const CryptoJS = require('crypto');


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

// @ts-ignore
function decrypt(input ) {
    var file = input.files[0];
    var reader = new FileReader();
    reader.onload = () => {
        const key = "oui";

        const decrypted = CryptoJS.AES.decrypt(reader.result, key);               // Decryption: I: Base64 encoded string (OpenSSL-format) -> O: WordArray
        const typedArray = convertWordArrayToUint8Array(decrypted);               // Convert: WordArray -> typed array

        const fileDec = new Blob([typedArray]);                                   // Create blob from typed array

        const a = document.createElement("a");
        const url = window.URL.createObjectURL(fileDec);
        const filename = file.name.substr(0, file.name.length - 4) + ".dec";
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
    };
    reader.readAsText(file);
}


function FileUpload(){
    const [selectedFile, setSelectedFile] = useState<File>();
    const [encryptedData, setEncryptedData] = useState<string>();
    const [encryptedFile, setEncryptedFile] = useState<File>();
    const [decryptedFile, setDecryptedFile] = useState<File>();


    const handleFile = (files : FileList | null) =>{
        if(files !== null) {
            setSelectedFile(files[0]);
        }
    }

    const encryptFile = () => {
        // Encrypt
        const file = selectedFile;

        const reader = new FileReader();
        reader.onload = () => {
            const key = 'oui';
            const wordArray = CryptoJS.lib.WordArray.create(reader.result);
            const encrypted = CryptoJS.AES.encrypt(wordArray, key).toString();
            setEncryptedData(encrypted);

            const fileEnc = new Blob([encrypted]);
            // Create blob from string

        }
        if(file)
            reader.readAsArrayBuffer(file);
    }

    return (
      <div className="shadow p-7 rounded-md bg-lime-100 ">
          <form>
              <div className="grid grid-cols-1 space-y-4">
                  <div>
                      <p>Select a file</p>
                  </div>
                  <div className="">
                      <input type="file"
                             onChange={(e) => handleFile(e.target.files)}
                      />
                  </div>
              </div>
          </form>
          <div className="mt-4">
              <button className="px-4 py-2 rounded-md text-sm font-medium border focus:outline-none focus:ring transition text-gray-600 border-gray-600 hover:text-white hover:bg-gray-600 active:bg-gray-700 focus:ring-gray-300"
                      onClick={() => console.log("oui")} >
                  Decrypt
              </button>
          </div>
          <div className="mt-4">
              <button className="px-4 py-2 rounded-md text-sm font-medium border focus:outline-none focus:ring transition text-gray-600 border-gray-600 hover:text-white hover:bg-gray-600 active:bg-gray-700 focus:ring-gray-300"
                      onClick={() => encryptFile()} >
                  Encrypt
              </button>
          </div>
      </div>
    );
}

export default FileUpload;