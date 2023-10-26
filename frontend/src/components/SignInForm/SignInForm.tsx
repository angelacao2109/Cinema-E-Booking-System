import React, { useState } from "react";
import axios from "axios";
import "./SignInForm.css";

const SignInForm: React.FC<{ setIsLoggedIn: (value: boolean) => void; onSuccessfulLogin: (email: string) => void; }> = ({ setIsLoggedIn, onSuccessfulLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
    
      const response = await axios.post("http://localhost:8080/api/login", {
        email,
        password,
        rememberMe,
      });
      if (response.data.success) {
        setFeedbackMessage("Successfully signed in.");
        setIsLoggedIn(true);
        onSuccessfulLogin(email); 

      } else {
        setFeedbackMessage(
          "Error signing in. Please check your credentials and try again."
        );
      }
    } catch (error) {
      setFeedbackMessage(
        "Error signing in. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="centerContainer">
      <div className="modalContent">
        <h2>Sign In</h2>
        {feedbackMessage && <p>{feedbackMessage}</p>}
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
