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
  const [creds, setCreds] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleChange(e) {
    // Stores the name and value attribute from the target input element
    const { name, value } = e.target;
    if (name === "username") {
      setCreds({ ...creds, username: value });
    } else if (name === "password") {
      // Bcrypt or hash this later
      setCreds({ ...creds, password: value });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Resets the credential values being stored
    setCreds({ username: "", password: "" });

    // Will use this later
    // navigate("/containers");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-login-group">
        <label htmlFor="usernameInput">Username</label>
        <input
          type="text"
          id="usernameInput"
          name="username"
          placeholder="Type your username"
          value={creds.username}
          onChange={handleChange}
        />
      </div>

      <div className="form-login-group">
        <label htmlFor="passwordInput">Password</label>
        <input
          type="password"
          id="passwordInput"
          name="password"
          placeholder="Type your password"
          value={creds.password}
          onChange={handleChange}
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
