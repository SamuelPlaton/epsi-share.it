import './../styles/FileLoader.css'
import { useEffect, useState} from "react";
var CryptoJS = require("crypto-js");



function FileUpload(){
    const [file, setFile] = useState<File>();
    const [encryptedData, setEncryptedData] = useState<string>();
    const [decryptedFile, setDecryptedFile] = useState<File>();


    const handleFile = (files : FileList | null) =>{
        if(files !== null) {
            setFile(files[0])
            console.log(files[0])
        }

        if (file !== null){
            encryptFile(file);
        }

       decryptFile(encryptedData);

    }

    const encryptFile = (file: File | undefined) => {
        // Encrypt
        const cypherText = CryptoJS.AES.encrypt(JSON.stringify(file?.arrayBuffer()), 'my-secret-key@123').toString();
        setEncryptedData(cypherText);

    }

    const decryptFile = (data: string | undefined) => {
        // Decrypt
        const bytes = CryptoJS.AES.decrypt(data, 'my-secret-key@123');
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        console.log(decryptedData)
    }

    useEffect(() => {
        console.log('data:: ' + encryptedData);
    }, [encryptedData]);

    useEffect(() => {
        console.log('file2:: ' + decryptedFile);
    }, [decryptedFile]);

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

      </div>
    );
}

export default FileUpload;