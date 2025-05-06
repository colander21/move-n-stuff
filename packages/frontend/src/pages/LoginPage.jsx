import { useState } from "react";

function LoginPage() {
  return (
    <>
      <div className="login-container">
        <div className="login-left-panel">
          <LoginForm />
        </div>
        <div className="login-right-panel">
          
        </div>
      </div>
    </>
  );
}

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="usernameInput">Username</label>
      <input
        type="text"
        id="usernameInput"
        placeholder="Type your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <label htmlFor="passwordInput">Password</label>
      <input
        type="password"
        id="passwordInput"
        placeholder="Type your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="sign-in-wrapper">
        <button>Sign in</button>
        <p>Forgot password</p>
      </div>
    </form>
  );
}

export default LoginPage;
