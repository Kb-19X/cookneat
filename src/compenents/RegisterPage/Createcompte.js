import React from 'react'
import './Createcompte.css'

const Createcompte = () => {
  return (
    <div className='form'>


    <div className='login-container'>
      <div >
        <form  className='login-form' action="">
            
              <h1>Inscription</h1>

            <div className='container-form'>
          
            <input type="text" placeholder='Pseudo' />
          
              
               <input type="text" placeholder='Email'  />
              
               <input type="password" placeholder='Mot de passe'   />
              <div className='create-account'>
               <p>Vous n'avez pas de compte ?</p> <a href="./Register">Créer un compte</a>
               </div>
               <a className='login-btn' href="#">S'inscire</a>
            </div>


        </form>
    </div>
    </div>

</div>
  )
}

export default Createcompte
