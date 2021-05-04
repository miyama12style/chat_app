import React, { useState } from "react";
import firebase from "../config/firebase";
import Radium from "radium";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const div = {
    margin: "40px",
  };

  const title = {
    color: "red",
  };

  const label = {
    fontWeight: "bold",
    color: "purple",
    marginRight: "30px",
  };

  const button = {
    borderRadius: "4px",
    backgroundColor: "green",
    padding: "5px 20px",
    fontWeight: "bold",
    marginTop: "20px",
    ":hover": {
      color: "white",
      opacity: "0.8",
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        user.updateProfile({
          displayName: name,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div style={div}>
      <h1 style={title}>SignUp</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label style={label} htmlFor="email">
            E-mail
          </label>
          <input
            type="email"
            placeholder="Email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <label style={label} htmlFor="password">
            Password
          </label>
          <input
            type="password"
            placeholder="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div>
          <label style={label} htmlFor="userId">
            UserID
          </label>
          <input
            type="text"
            placeholder="UserID"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <button style={button} type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Radium(SignUp);
