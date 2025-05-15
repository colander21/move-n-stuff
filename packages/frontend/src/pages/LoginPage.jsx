import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";
import "../styles/global.css";
import logo from "../images/image.png";

function LoginPage() {
  // Used to alter css based on if logging in or signing up
  const [mode, setMode] = useState("login");
  const [loginCreds, setLoginCreds] = useState({
    username: "",
    password: "",
  });

  const [signupCreds, setSignupCreds] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(e) {
    // Stores the name and value attribute from the target input element
    const { name, value } = e.target;
    if (mode === "login") {
      setLoginCreds({ ...loginCreds, [name]: value });
    } else if (mode === "signup") {
      setSignupCreds({ ...signupCreds, [name]: value });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Resets the credential values being stored & displayed
    if (mode === "login") {
      setLoginCreds({ username: "", password: "" });
    } else if (mode === "signup") {
      setSignupCreds({ username: "", password: "", confirmPassword: "" });
    }
    // Will use this later
    // navigate("/containers");
  }

  return (
    <div className="login-page">
      {/* If mode is set to signup, add blur to login container */}
      <div className={`login-container ${mode === "signup" ? "blurred" : ""}`}>
        <div className="login-left-panel">
          <LoginForm
            onChange={handleChange}
            onSubmit={handleSubmit}
            creds={loginCreds}
          />
        </div>
        <div className="login-right-panel">
          <SignUpPanel changeMode={setMode} />
        </div>
      </div>
      {/* If mode is set to signup, display the signup modal */}
      {mode === "signup" && (
        <div className="signup-modal-wrapper">
          <SignUpModal
            changeMode={setMode}
            creds={signupCreds}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </div>
      )}
    </div>
  );
}

function LoginForm({ onChange, onSubmit, creds }) {
  const navigate = useNavigate();

  return (
    <form onSubmit={onSubmit}>
      <div className="form-login-group">
        <label htmlFor="loginUsername">Username</label>
        <input
          type="text"
          id="loginUsername"
          name="username"
          placeholder="Type your username"
          value={creds.username}
          onChange={onChange}
        />
      </div>

      <div className="form-login-group">
        <label htmlFor="loginPassword">Password</label>
        <input
          type="password"
          id="loginPassword"
          name="password"
          placeholder="Type your password"
          value={creds.password}
          onChange={onChange}
        />
      </div>

      <div className="sign-in-wrapper">
        <button className="sign-in-button">Sign In</button>
        <p>Forgot Password?</p>
      </div>
    </form>
  );
}

function SignUpPanel({ changeMode }) {
  return (
    <>
      <h1 className="welcome-msg">Welcome to Move-n-Stuff!</h1>
      <img src={logo} alt="Move-n-Stuff Logo" className="login-logo" />
      <p className="new-mover-label">New mover?</p>
      <button className="sign-up-button" onClick={() => changeMode("signup")}>
        Sign Up Here!
      </button>
    </>
  );
}

function SignUpModal({ onChange, onSubmit, creds, changeMode }) {
  return (
    <div className="modal-background">
      <form onSubmit={onSubmit}>
        <div className="form-signup-group">
          <label htmlFor="signupUsername">Username</label>
          <input
            type="text"
            id="signupUsername"
            name="username"
            placeholder="Type your username"
            value={creds.username}
            onChange={onChange}
          />
        </div>

        <div className="form-signup-group">
          <label htmlFor="signupPassword">Password</label>
          <input
            type="password"
            id="signupPassword"
            name="password"
            placeholder="Type your password"
            value={creds.password}
            onChange={onChange}
          />
        </div>

        <div className="form-signup-group">
          <label htmlFor="signupConfirmPassword">Confirm Password</label>
          <input
            type="password"
            id="signupConfirmPassword"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={creds.confirmPassword}
            onChange={onChange}
          />
        </div>

        <div className="sign-in-wrapper">
          <button className="sign-in-button">Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
