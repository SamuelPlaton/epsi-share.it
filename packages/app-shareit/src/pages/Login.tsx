import React, {useState} from 'react';
import NavigationLayout from "../components/NavigationLayout";
import IdentifierInput from "../components/inputs/identifier-input/IdentifierInput";
import {Api} from "../api";

import { default as Popup } from '../components/Popup';
import {useHistory} from "react-router-dom";

function Login() {
    const [identifier, setIdentifier] = useState<Array<number>>([]);
    const [password, setPassword] = useState<string>("");
    const [securityCode, setSecurityCode] = useState<string>("");
    const [isPopupOpened, setPopupOpened] = useState<boolean>(false);

    const isUserActive = localStorage.getItem('auth');
    const history = useHistory();
    if (isUserActive) {
        history.replace('/menu')
    }

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        const stringedIdentifier = identifier.join('');
        const connexionConfirmed = await Api.UsersApi.connect({
            identifier: stringedIdentifier,
            password: password,
        });
        if (connexionConfirmed === true) {
            setPopupOpened(true);
        }
    }

    const confirmConnexion = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        const stringedIdentifier = identifier.join('');
        const result = await Api.UsersApi.confirmConnexion({
            identifier: stringedIdentifier,
            securityCode: securityCode,
        });

        if (result?.auth) {
            localStorage.setItem('auth', result.auth);
            setPopupOpened(false);
            history.replace('/menu');
        }
    };

    return (
      <NavigationLayout title="Connexion">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center w-1/4 mx-auto"
          >
              <div className="flex flex-col mt-4 mb-2">
                  <div className='flex flex-row'>
                      <label className="label mr-2">Identifiant :</label>
                      <p className="font-semibold">{identifier.join('')}</p>
                  </div>
                  <IdentifierInput
                    onClick={(number) => setIdentifier(identifier.concat(number))}
                    onReset={() => setIdentifier([])}
                  />
              </div>
              <div className="flex flex-col mb-8 w-full">
                  <label className="mb-2">Mot de passe : </label>
                  <input placeholder="Votre mot de passe" className="p-2"
                         type="password"
                         onChange={e => setPassword(e.target.value)}
                         required/>
              </div>
              <div className="form-group">
                  <button type="submit" className="bg-blue-500 p-4 rounded-md shadow-md text-lg text-white mb-2">Connexion</button>
              </div>
          </form>
          {isPopupOpened && (
            <Popup onClose={() => setPopupOpened(false)}>
                <div className='p-2'>
                    <form
                      onSubmit={confirmConnexion}
                      className="flex flex-col items-center mx-auto"
                    >
                    <p className="my-2">Entrez votre code reçu par mail :</p>
                    <input placeholder="Code de sécurité"
                           className="p-1"
                           type="string"
                           onChange={e => setSecurityCode(e.target.value)}
                           required/>
                    <button className="bg-blue-500 p-2 my-2 rounded-md shadow-md text-lg text-white mb-2">Valider</button>
                    </form>
                    <p className="text-sm text-gray-400 text-center">Renvoyer l'email</p>
                </div>
            </Popup>
          )}
      </NavigationLayout>
    );
}

export default Login;
