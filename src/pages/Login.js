import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import host from "../dbConfig";

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const navigate = useNavigate();
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    if (json.success) {
      // redirect to home
      localStorage.setItem("auth-token", json.authToken);
      window.location.replace("/");
    } else {
      alert(json.error);
    }
  };
  return (
    <>
      <div className="notification py-2 px-4 is-link is-light">
        First you need an account to add your notes
      </div>
      <div className="column is-6">
        <form action="" onSubmit={handleLogin}>
          <div className="field">
            <label htmlFor="" className="label">
              Email*
            </label>
            <p className="control ">
              <input
                className="input"
                name="email"
                type="email"
                required
                placeholder="Email"
                onChange={onChange}
              />
            </p>
          </div>
          <div className="field">
            <p className="control ">
              <label htmlFor="" className="label">
                Password*
              </label>
              <input
                className="input"
                name="password"
                type="password"
                required
                placeholder="Password"
                onChange={onChange}
              />
            </p>
          </div>
          <div className="field">
            <p className="control">
              <input
                className="button is-success"
                type="submit"
                value="login"
              ></input>
            </p>
          </div>
          <div className="is-flex is-justify-content-end">
            <p>
              Don't have an account,{" "}
              <Link to="/signup">
                <b> create one </b>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
