import React from 'react';
import './../styles/Login.css';

function Login() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");


    const handleSubmit = (event: { preventDefault: () => void; }) => {
        console.log(`
      Email: ${email}
      Password: ${password}
    `);

        event.preventDefault();
    }
// @ts-ignore
    return (
    <form className="form">
        <div className="form-group">
            <label className="label">Email : </label>
            <input type="email" placeholder="Votre email" className="input"
                   onChange={e => setEmail(e.target.value)}
                   required/>
        </div>
        <div className="form-group">
            <label className="label">Mot de passe : </label>
            <input placeholder="Votre mot de passe" className="input"
                   type="password"
                   onChange={e => setPassword(e.target.value)}
                   required/>
        </div>

        <div className="form-group">
            <button type="submit" className="button">Connexion</button>
        </div>
    </form>
    );
}

export default Login;
