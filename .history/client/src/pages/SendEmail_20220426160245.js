import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../service';




function SendEmail() {

    const [email, setEmail] = useState('');
  

    const submitReview = async (s) => {
        s.preventDefault();
        api.post('/resend', {
            email,
            
        })
            .then((response) => {

                localStorage.setItem('email-sess', email);
               
            })
            .catch((err) => {
                const message = err.response.data
                alert(message);
            })
    };


    return (


        <div className="login-dark">


            <div className='forms'>
                <h2 className="sr-only">Login Form</h2>
                  <p>Veuillez insérer votre adresse e-mail et un nouveau mot de passe vous sera envoyé</p>
           <br />
                <div className="form-group">
                    <input className="form-control" type="email" name="email" placeholder="Email" value={email} onChange={(e) => {
                        setEmail(e.target.value);
                    }
                    } />
                </div>
        
                <div className="form-group">
                    <button className="btn btn-primary btn-block" type="submit" onClick={submitReview}>Envoyer</button>
                </div>

                <a href="/register" className="forgot">Nouveau ici? Inscrivez-vous.</a>


            </div>

        </div>

    );

}

export default SendEmail;