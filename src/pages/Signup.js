import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import host from "../dbConfig";

export default function Signup() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [warning, setWarning] = useState("is-hidden");

  const navigate = useNavigate();
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSingnup = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // redirect to home
      localStorage.setItem("auth-token", json.authToken);
      navigate("/");
    } else {
      alert(json.errors[0].msg);
    }
  };
  return (
    <div className="column is-6">
      <div className={`notification is-danger is-light p-2 ${warning}`}>
        <button
          className="delete is-medium"
          onClick={() => {
            setWarning("is-hidden");
          }}
        ></button>
        Title should be of 3 length and description should be of 5 length
      </div>
      <form action="" onSubmit={handleSingnup}>
        <div className="field">
          <label htmlFor="" className="label">
            Name*
          </label>
          <p className="control ">
            <input
              className="input"
              type="text"
              name="name"
              required
              placeholder="Enter your name"
              onChange={onChange}
            />
          </p>
        </div>
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
          <label htmlFor="" className="label">
            Password*
          </label>
          <p className="control ">
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
              value="Signup"
            ></input>
          </p>
        </div>
        <div className="is-flex is-justify-content-end">
          <p>
            Already have an account,
            <Link to="/login">
              <b> login here </b>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
