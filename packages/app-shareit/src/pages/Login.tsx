import React, {useState} from 'react';
import NavigationLayout from "../components/NavigationLayout";
import IdentifierInput from "../components/inputs/identifier-input/IdentifierInput";


function Login() {
    const [identifier, setIdentifier] = useState<Array<number>>([]);
    const [password, setPassword] = useState<string>("");


    const handleSubmit = (event: { preventDefault: () => void; }) => {
        console.log(`
      Email: ${identifier}
      Password: ${password}
    `);

        event.preventDefault();
    }

    return (
      <NavigationLayout title="Connexion">
          <form className="flex flex-col items-center w-1/4 mx-auto">
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
      </NavigationLayout>
    );
}

export default Login;
