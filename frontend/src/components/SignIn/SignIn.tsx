import React from 'react';  
import SignInForm from '../SignInForm/SignInForm';

type SignInProps = {
  setIsLoggedIn: (value: boolean) => void;
  onSuccessfulLogin: (email: string) => void;
  refetchMovies: () => void;
};

const SignIn: React.FC<SignInProps> = ({ setIsLoggedIn, onSuccessfulLogin, refetchMovies }) => {
    return (
        <div>
            <SignInForm 
                setIsLoggedIn={setIsLoggedIn} 
                onSuccessfulLogin={onSuccessfulLogin} 
                refetchMovies={refetchMovies}
            />
        </div>
    );
};

export default SignIn;
