import React, {useEffect, useState} from 'react';
import '../models/User'
import {getCurrentDate} from '../components/getCurrentDate'
import NavigationLayout from "../components/NavigationLayout";

const checkPassword = (firstPassword: string, secondPassword: string): string|undefined => {
    if (firstPassword.length === 0) {
        return undefined;
    } else if (firstPassword.length < 8 && firstPassword.length !== 0) {
        return `Votre mot de passe doit contenir au minimum 8 caractères`;
    } else if (firstPassword.toLowerCase() === firstPassword) {
        return `Votre mot de passe doit contenir des majuscules`;
    }  else if (firstPassword.toUpperCase() === firstPassword) {
        return `Votre mot de passe doit contenir des minuscules`;
    } else if (!!firstPassword && firstPassword === secondPassword) {
        return `Vos mots de passe ne correspondent pas`;
    } else if (!/\d/.test(firstPassword)) {
        return `Votre mot de passe doit contenir des chiffres`;
    } else if (!/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(firstPassword)) {
        return `Votre mot de passe doit contenir des chiffres`;
    } else {
        return undefined;
    }
}

function Register() {
    const [password, setPassword] = React.useState({
        firstPassword: '',
        secondPassword: ''
    });
    const [email, setEmail] = React.useState("");
    const [name, setName] = React.useState("");
    const [identifier, setIdentifier] = React.useState("");

    const [wrongPassword, setWrongPassword] = useState<string|undefined>();


    const handleSubmit = (event: { preventDefault: () => void; }) => {
        const errorMessage = checkPassword(password.firstPassword, password.secondPassword)
        setWrongPassword(errorMessage);
        if (!errorMessage) {
            console.log(`
            Name: ${name}
            Identifier: ${identifier}
            Email: ${email}
            Password: ${password.firstPassword}
            Created at : ${getCurrentDate()}`);
            alert('Votre compte a bien été créé !');
            event.preventDefault();
        } else {
            event.preventDefault();
        }
    }

    useEffect(() => {
        if(wrongPassword) {
            setWrongPassword(undefined);
        }
    }, [password]);

    const inputChange: (event: React.ChangeEvent<HTMLInputElement>) => void = (event) => {
        const {value, name} = event.target;
        setPassword({
            ...password,
            [name]: value
        })
    }

// @ts-ignore
    return (
      <NavigationLayout title="Inscription">
        <form className="flex flex-col items-center w-64 mx-auto text-sm" onSubmit={handleSubmit}>
            <div className="w-full flex flex-col mt-4 mb-2">
                <label className="label">Nom : </label>
                <input placeholder="Votre nom" className="input"
                       onChange={e => setName(e.target.value)}
                       required/>
            </div>
            <div className="w-full flex flex-col mt-4 mb-2">
                <label className="label">Email : </label>
                <input type="email" placeholder="Votre email" className="input" value={email}
                       onChange={e => setEmail(e.target.value)}
                       required/>
            </div>
            <div className="w-full flex flex-col mt-4 mb-2">
                <label className="label">Identifiant : </label>
                <input placeholder="Identifiant" type="string" className="input"
                       onChange={e => setIdentifier(e.target.value)}
                       required/>
            </div>
            <div className="w-full flex flex-col mt-4 mb-2">
                <label htmlFor="firstPassword">Mot de passe :</label>
                <input onChange={inputChange} name="firstPassword" placeholder="Votre mot de passe" type='password'
                       required/>
            </div>
            <div className="w-full flex flex-col mt-4 mb-2">
                <label htmlFor="secondPassword">Confirmation de votre mot de passe :</label>
                <input onChange={inputChange} name="secondPassword" type='password' required/>
                {wrongPassword && <p className='text-xs text-red-500'>{wrongPassword}</p>}
            </div>
            <button type="submit" className="bg-blue-500 p-4 rounded-md shadow-md text-lg text-white my-4">Inscription</button>
        </form>
          <div className='text-center'>
              <p className="text-xs text-gray-400">En m'inscrivant, je déclare accepter les <a className="text-blue-300" href="/cgu">Conditions générales d'utilisation</a>.</p>
          </div>
      </NavigationLayout>
    );
}

export default Register;

