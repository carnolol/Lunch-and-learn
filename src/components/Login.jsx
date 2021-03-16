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
      name,
      password
    };
    if (name && password) {
      setError(false);
      axios
        .post("/login", body)
        .then((res) => {
          console.log(res);
          setUser(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      setError(true);
    }
    handleReset();
  };

  const handleRegister = () => {
    const body = {
      name,
      password
    };
    axios
      .post("/register", body)
      .then((res) => setUser(res.data))
      .catch((err) => alert(err));
    handleReset();
  };

  const handleLogout = () => {
    axios
      .delete("/logout")
      .then((res) => setUser(res.data))
      .catch((err) => alert(err));
  };

  console.log("FRONT END USER", user);

  return (
    <div className='login'>
      {user.profile_pic && (
        <div>
          <h2 className='profile-header'>{`${user.name} has logged in!`}</h2>
          <img className='profile-pic' src={user.profile_pic} alt='robot' />
        </div>
      )}

      <input
        value={name}
        placeholder='Name'
        onChange={(e) => setName(e.target.value)}
      />
      {error && <h1>Fill out the inputs nerd</h1>}
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
