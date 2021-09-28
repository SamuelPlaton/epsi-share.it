import React, {useEffect} from 'react';
import './../styles/Register.css';
import './../models/User'

function Register() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [name, setName] = React.useState("");
    const [numen, setNumen] = React.useState("");


    const handleSubmit = (event: { preventDefault: () => void; }) => {
        console.log(`
      Name: ${name}
      Numen: ${numen}
      Email: ${email}
      Password: ${password}
    `);
        alert('Votre compte a bien été créé');
        event.preventDefault();
    }
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
                        <input placeholder="Votre numen" className="input"
                               onChange={e => setNumen(e.target.value)}
                               required/>
                    </div>
                    <div className="form-group">
                        <label className="label">Mot de passe : </label>
                        <input placeholder="Votre mot de passe" className="input" value={password}
                               onChange={e => setPassword(e.target.value)}
                               required />
                    </div>

                    <div className="form-group">
                        <button type="submit" className="button">Inscription</button>
                    </div>
                </form>
            );
        }

export default Register;


/*// variables used in html
let dateString = '1968-11-16T00:00:00'
let newDate = new Date(dateString);

// format date in typescript
getFormatedDate(date: Date, format: string) {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(date, format);*/
