import React from 'react'
import './Loginform.css'




const Connexion = () => {
  return (
    <div className='form'>


        <div className='login-container'>
          <div >
            <form  className='login-form' action="">
                
                  <h1>Connexion</h1>

                <div className='container-form'>
              
                   <input type="text"  placeholder='Email'/>
               
                   <input type="password"  placeholder='Mot de passe'  />
                   <div className='forgetmdp'>
                   <a href="./ForgetPassword">Mot de passe oublié ?</a>
                   </div>
                  <div className='create-account'>
                   <p>Vous n'avez pas de compte ?</p> <a href="./Register">Créer un compte</a>
                   </div>
                   <a className='login-btn' href="">Se connecter</a>
                </div>


            </form>
        </div>
        </div>

    </div>
  )
}

export default Connexion
