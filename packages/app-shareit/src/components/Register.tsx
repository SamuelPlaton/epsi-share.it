import React, {useEffect} from 'react';
import './../styles/Register.css';
import './../models/User'
import {getCurrentDate} from './../components/getCurrentDate'




function Register() {
    const [password, setPassword] = React.useState({
        firstPassword: '',
        secondPassword: ''
    });
    const [email, setEmail] = React.useState("");
    const [name, setName] = React.useState("");
    const [numen, setNumen] = React.useState("");

    const [validLength, setValidLength] = React.useState(false);
    const [hasNumber, setHasNumber] = React.useState(false);
    const [upperCase, setUpperCase] = React.useState(false);
    const [lowerCase, setLowerCase] = React.useState(false);
    const [specialChar, setSpecialChar] = React.useState(false);
    const [match, setMatch] = React.useState(false);
    const [requiredLength, setRequiredLength] = React.useState(8)


    const handleSubmit = (event: { preventDefault: () => void; }) => {
        console.log(`
      Name: ${name}
      Numen: ${numen}
      Email: ${email}
      Password: ${password}
      Status : activate
      ${getCurrentDate()}
    `);
        alert('Votre compte a bien été créé');
        event.preventDefault();
    }

    const inputChange: (event: React.ChangeEvent<HTMLInputElement>) => void = (event) => {
        const { value, name } = event.target;
        setPassword({
            ...password,
            [name]: value
        })
    }

    useEffect(() => {
        setValidLength(password.firstPassword.length >= requiredLength ? true : false);
        setUpperCase(password.firstPassword.toLowerCase() !== password.firstPassword);
        setLowerCase(password.firstPassword.toUpperCase() !== password.firstPassword);
        setHasNumber(/\d/.test(password.firstPassword));
        setMatch(!!password.firstPassword && password.firstPassword === password.secondPassword)
        setSpecialChar(/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(password.firstPassword));

    }, [password, requiredLength]);

// @ts-ignore
    return (
                <form className="form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="label">Nom : </label>
                        <input placeholder="Votre nom" className="input"
                               onChange={e => setName(e.target.value)}
                               required/>
                    </div>
                    <div className="form-group">
                        <label className="label">Email : </label>
                        <input type="email" placeholder="Votre email" className="input" value={email}
                               onChange={e => setEmail(e.target.value)}
                               required />
                    </div>
                    <div className="form-group">
                        <label className="label">NUMEN : </label>
                        <input placeholder="Votre numen" type="number" className="input"
                               onChange={e => setNumen(e.target.value)}
                               required/>
                    </div>
                    <div >
                        <label htmlFor="firstPassword">Mot de passe</label>
                        <br />
                        <input onChange={inputChange} name="firstPassword" placeholder="Votre mot de passe" type='password' required/>
                        <br />
                        <label htmlFor="secondPassword">Confirmation de votre mot de passe</label>
                        <br />
                        <input onChange={inputChange} name="secondPassword" type='password' placeholder="Confirmation de votre mot de passe" required/>
                        <br />
                        <br />
                        <ul>
                            <li>
                                Longueur (8 caractères) : {validLength ? <span>Vrai</span> : <span>Faux</span>}
                            </li>
                            <li>
                                Contient au moins un chiffre : {hasNumber ? <span>Vrai</span> : <span>Faux</span>}
                            </li>
                            <li>
                                Contient au moins une majuscule : {upperCase ? <span>Vrai</span> : <span>Faux</span>}
                            </li>
                            <li>
                                Contient au moins une minuscule : {lowerCase ? <span>Vrai</span> : <span>Faux</span>}
                            </li>
                            <li>Confirmation du mot de passe : {match ? <span>Vrai</span> : <span>Faux</span>}</li>
                            <li>
                                Contient au moins un caractère spécial : {specialChar ? <span>Vrai</span> : <span>Faux</span>}
                            </li>
                        </ul>
                    </div>

                    <div className="form-group">
                        <button type="submit" className="button" >Inscription</button>
                    </div>
                </form>
            );
        }

export default Register;

