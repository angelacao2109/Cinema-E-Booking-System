import React from 'react';  
import SignInForm from '../SignInForm/SignInForm';

const SignIn: React.FC<{ setIsLoggedIn: (value: boolean) => void ;onSuccessfulLogin: (email: string) => void; 
}> = ({ setIsLoggedIn, onSuccessfulLogin }) => {
    return (
        <div>
        
<SignInForm setIsLoggedIn={setIsLoggedIn} onSuccessfulLogin={onSuccessfulLogin} />

        </div>
    );
};

export default SignIn;