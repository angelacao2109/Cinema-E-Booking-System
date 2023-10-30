import React, { useState } from "react";
import axios from "axios";
import "./ResetPasswordPostLink.css";

const ResetPasswordPostLink: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setFeedbackMessage("Passwords do not match. Please try again.");
      return;
    }

    setLoading(true);
    try {
      // Assuming you send the token as a query parameter, for example: /change-password?token=YOUR_TOKEN
      const token = new URLSearchParams(window.location.search).get("token");

      const response = await axios.post(
        "http://localhost:8080/api/user/reset-password?token="+token,
        {
          "newPassword":password,
        })
      if (response.data.success) {
        setFeedbackMessage("Password changed successfully.");
      } else {
        setFeedbackMessage("Error changing password. Please try again.");
      }
    } catch (error) {
      setFeedbackMessage(
        "Error changing password. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="centerContainer">
      <div className="modalContent">
        <h2>Change Password</h2>
        {feedbackMessage && <p className="feedback-message">{feedbackMessage}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            name="password"
            placeholder="New Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="New password"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            aria-label="Confirm new password"
          />
          <button type="submit" disabled={loading}>
            {loading ? "Processing..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPostLink;
