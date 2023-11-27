import React, { useState } from "react";
import axios from "axios";
import "./SignInForm.css";
import { useNavigate } from "react-router-dom";

type SignInFormProps = {
  setIsLoggedIn: (value: boolean) => void;
  onSuccessfulLogin: (email: string) => void;
  refetchMovies: () => void;
  setIsAdmin: (isAdmin: boolean) => void;
};

const SignInForm: React.FC<SignInFormProps> = ({ setIsLoggedIn, onSuccessfulLogin, refetchMovies }) => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
    
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        "email":email,
        "password":password,
      });
      if (response.status == 200) {
        const token = response.data.token;
        document.cookie = `authToken=${token}; max-age=86400; path=/`;
        document.cookie = `userEmail=${email}; max-age=86400; path=/`;
        setFeedbackMessage("Successfully signed in.");
        setIsLoggedIn(true);
        onSuccessfulLogin(email); 
        const admin_response = await axios.get('http://localhost:8080/api/user',          
          {headers: {
            'Authorization': token
        }});
        if (response.status == 200){
          if (admin_response.data.roles == "Admin"){
            setIsAdmin(true)
          }
        }
        refetchMovies(); 
        navigate("/"); 
      } else {
        setFeedbackMessage("Error signing in. Please check your credentials and try again.");
    }
  } catch (error: any) {
    if (error && "response" in error && error.response) {
      switch (error.response.status) {
        case 401:
          setFeedbackMessage("Wrong password or email.");
          break;
          case 409:
            setFeedbackMessage("Account not verified. Please verify your email before logging in.");
            break;
            case 404:
              setFeedbackMessage("User does not exist.");
              break;
        default:
          setFeedbackMessage("Error signing in. Please try again.");
      }
    } else {
      setFeedbackMessage("Error signing in. Please check your connection and try again.");
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="centerContainer">
      <div className="modalContent">
        <h2>Sign In</h2>
       
        {feedbackMessage && <p className="feedbackMessage">{feedbackMessage}</p>}
            
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Email address"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="Password"
          />
          <div className="actionContainer">
            <div className="checkboxContainer">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label htmlFor="rememberMe">Remember me</label>
            </div>
            <button type="submit" disabled={loading}>
              {loading ? "Processing..." : "Sign In"}
            </button>
          </div>
          <div className="forgotPasswordLink">
            <a href="/forgot-password">Forgot Password?</a>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignInForm;