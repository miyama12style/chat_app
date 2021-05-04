import React, { useContext, useState } from "react";
import { Redirect } from "react-router";
import { AuthContext } from "../AuthService";
import firebase from "../config/firebase";
import "./Login.css";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user = useContext(AuthContext);

  if (user) {
    return <Redirect to="/" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        history.pushState("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <h1 className="title">Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="label" htmlFor="email">
            E-mail
          </label>
          <input
            className="input"
            type="email"
            placeholder="Email"
            id="email"
            name="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          />
        </div>
        <div>
          <label className="label" htmlFor="password">
            Password
          </label>
          <input
            className="input"
            type="password"
            placeholder="password"
            id="password"
            name="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
        </div>
        <button className="button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
