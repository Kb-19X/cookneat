import React from 'react'
import './Forgetmdp.css'
import logo from '../../assets/ImageHomePage/logo.png';

const Forgetmdp = () => {
  return (
    <div>
        
        <div className='Forgetmdp-background'>
        <a href="./Homepage"><img src={logo} alt="" /></a>
        <div className='forget-container'>
        <h1>Mot de passe oublié ?</h1>
        <p>Pour récupérer votre mot de passe, veuillez saisir votre pseudo ou adresse email associé à votre compte. Un lien de réinitialisation vous sera envoyé par email si les informations sont correctes.</p>
        </div>
        <div className='input-forget'>
            <input type="text" placeholder='Votre e-mail' />
            <p>ou</p>
            <input type="text" placeholder='Pseudo' />
            <a href="">Valider</a>
        </div>
        </div>
    </div>
  )
}

export default Forgetmdp;
