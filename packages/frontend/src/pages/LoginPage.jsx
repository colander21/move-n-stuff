import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";
import "../styles/global.css";
import logo from "../images/image.png";

function LoginPage() {
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-left-panel">
          <LoginForm />
        </div>
        <div className="login-right-panel">
          <h1 className="welcome-msg">Welcome to Move-n-Stuff!</h1>
          <img src={logo} alt="Move-n-Stuff Logo" className="login-logo" />
          <p className="new-mover-label">New mover?</p>
          <button className="sign-up-button">Sign Up</button>
        </div>
      </div>
    </div>
  );
}

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    navigate("/containers");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-login-group">
        <label htmlFor="usernameInput">Username</label>
        <input
          type="text"
          id="usernameInput"
          placeholder="Type your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="form-login-group">
        <label htmlFor="passwordInput">Password</label>
        <input
          type="password"
          id="passwordInput"
          placeholder="Type your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="sign-in-wrapper">
        <button className="sign-in-button">Sign In</button>
        <p>Forgot Password?</p>
      </div>
    </form>
  );
}

export default LoginPage;
