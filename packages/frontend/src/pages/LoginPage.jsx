import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";
import "../styles/global.css";
import logo from "../images/logo.png";

function LoginPage({ createUser, loginUser }) {
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

  // Requirements for passwords
  const [reqs, setReqs] = useState({
    lengthCheck: false,
    lowerCheck: false,
    upperCheck: false,
    numberCheck: false,
    specialCheck: false,
  });

  const navigate = useNavigate();

  function validateRequirements(password) {
    // Converts string to array of characters
    const passArray = Array.from(password);

    // Checks password length req
    const hasLength = password.length >= 8;
    // Checks for at least one lowercase
    const hasLower = passArray.some((ch) => ch >= "a" && ch <= "z");
    // Checks for at least one uppercase
    const hasUpper = passArray.some((ch) => ch >= "A" && ch <= "Z");
    // Checks for at least one number
    const hasNumber = passArray.some((ch) => ch >= "0" && ch <= "9");
    // Checks for at least one special character
    const specials = "!@#$%^&*()_+-={}[]|:;'<>,.?/";
    const hasSpecial = passArray.some((ch) => specials.includes(ch));

    // Assign new pass/fails to object
    const updatedReqs = {
      lengthCheck: hasLength,
      lowerCheck: hasLower,
      upperCheck: hasUpper,
      numberCheck: hasNumber,
      specialCheck: hasSpecial,
    };

    // Updates the pass or fail of requirements to new values
    setReqs(updatedReqs);
  }

  function handleChange(e) {
    // Stores the name and value attribute from the target input element
    const { name, value } = e.target;
    if (mode === "login") {
      setLoginCreds({ ...loginCreds, [name]: value });
    } else if (mode === "signup") {
      setSignupCreds({ ...signupCreds, [name]: value });

      // Will update if password requirements get satisfied
      if (name === "password") {
        validateRequirements(value);
      }
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Resets the credential values being stored & displayed
    if (mode === "login") {
      loginUser(loginCreds)
        .then((res) => {
          if (res.status === 200) {
            navigate("/containers");
          } else {
            // MAKE THIS NICER LATER
            alert(res.errorMessage);
          }
        })
        .catch((err) => console.error(err));
      setLoginCreds({ username: "", password: "" });
      return;
    } else if (mode === "signup") {
      // Check if confirm password is a match
      if (signupCreds.password !== signupCreds.confirmPassword) {
        // MAKE THIS NICER LATER
        alert("Passwords must match");
        return;
      }

      // Turns all the values of reqs object into an array
      const requirements = Object.values(reqs);
      // Will only allow acct creation if all pass reqs satisfied
      if (requirements.every((val) => val === true)) {
        createUser(signupCreds)
          .then((res) => {
            if (res.status === 201) {
              navigate("/containers");
            } else {
              // MAKE THIS NICER LATER
              alert(res.errorMessage);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        // MAKE THIS NICER LATER
        alert("Not all password requirements are met");
      }
    }
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
            reqs={reqs}
          />
        </div>
      )}
    </div>
  );
}

function LoginForm({ onChange, onSubmit, creds }) {
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

function SignUpModal({ onChange, onSubmit, creds, changeMode, reqs }) {
  return (
    <div className="modal-background">
      <button className="back-to-login" onClick={() => changeMode("login")}>
        Back to Login
      </button>
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

        <div className="password-requirements">
          <p>Password must contain:</p>
          <ul>
            <li style={reqs.lengthCheck ? { color: "lime" } : { color: "red" }}>
              At least 8 characters
            </li>
            <li style={reqs.lowerCheck ? { color: "lime" } : { color: "red" }}>
              At least 1 lowercase
            </li>
            <li style={reqs.upperCheck ? { color: "lime" } : { color: "red" }}>
              At least 1 uppercase
            </li>
            <li style={reqs.numberCheck ? { color: "lime" } : { color: "red" }}>
              At least 1 number
            </li>
            <li
              style={reqs.specialCheck ? { color: "lime" } : { color: "red" }}
            >
              At least 1 special character (!@#$%^&...){" "}
            </li>
          </ul>
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
