import axios from "axios";
import React, { useState } from "react";
import "./Login.css";

function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [user, setUser] = useState({});

  const handleReset = () => {
    setPassword("");
    setName("");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const body = {
      name: name,
      password: password
    };
    if (name && password) {
      axios
        .post("/login", body)
        .then((res) => setUser(res.data))
        .catch((err) => console.log(err));
    } else {
      setError(true);
    }
    handleReset();
  };

  const handleRegister = () => {
    const body = {
      name: name,
      password: password
    };
    axios
      .post("/register", body)
      .then((res) => setUser(res.data))
      .catch((err) => alert(`You already have an account, Please login!`));
    handleReset();
  };

  const handleLogout = () => {
    axios
      .delete("/logout")
      .then((res) => setUser(res.data))
      .catch((err) => alert(err));
  };

  return (
    <div className='login'>
      {user.profile_pic ? <img src={user.profile_pic} alt='robot' /> : null}

      <input
        value={name}
        placeholder='Name'
        onChange={(e) => setName(e.target.value)}
      />
      <input
        value={password}
        placeholder='Password'
        type='password'
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className='button-container'>
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleRegister}>Register</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Login;
