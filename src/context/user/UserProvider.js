import React, { useState, useEffect } from "react";
import userContext from "./userContext";

const UserProvider = (props) => {
  const host = process.env.REACT_APP_HOST;
  const [user, setUser] = useState(null);

  const getUser = async () => {
    const response = await fetch(`${host}/api/auth/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
    });
    const json = await response.json();

    setUser(json);
  };

  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      getUser();
    }
  }, [localStorage.getItem("auth-token")]);

  return (
    <userContext.Provider value={{ user }}>
      {props.children}
    </userContext.Provider>
  );
};

export default UserProvider;
