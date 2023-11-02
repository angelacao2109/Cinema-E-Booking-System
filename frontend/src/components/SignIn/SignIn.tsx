import React, { useState } from 'react'; 
import SignInForm from '../SignInForm/SignInForm';

type SignInProps = {
  setIsLoggedIn: (value: boolean) => void;
  onSuccessfulLogin: (email: string) => void;
  refetchMovies: () => void;
  setIsAdmin: (isAdmin: boolean) => void;  
};

const SignIn: React.FC<SignInProps> = ({ setIsLoggedIn, onSuccessfulLogin, refetchMovies, setIsAdmin }) => {
    return (
        <div>
            <SignInForm 
   setIsAdmin={setIsAdmin}
   setIsLoggedIn={setIsLoggedIn} 
   onSuccessfulLogin={onSuccessfulLogin} 
   refetchMovies={refetchMovies}
/>

        </div>
    );
};

export default SignIn;
