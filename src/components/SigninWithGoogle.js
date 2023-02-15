import React, { useEffect } from "react";
import jwt_decode from "jwt-decode";
import host from "../dbConfig";

export default function SigninWithGoogle() {
  // code for google login
  function handleCredentialResponse(response) {
    const decoded = jwt_decode(response.credential);
    const userObj = {
      name: decoded.name,
      email: decoded.email,
      googleId: decoded.sub,
      emailVerified: decoded.email_verified,
      picture: decoded.picture,
    };
    fetch(`${host}/api/auth/loginWithGoogle`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObj),
    }).then(async (res) => {
      const json = await res.json();
      console.log(json);
      if (json.success) {
        // redirect to home
        localStorage.setItem("auth-token", json.authToken);
        window.location.replace("/");
      } else {
        alert(json.error);
      }
    });
  }

  useEffect(() => {
    const google = window.google;
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" } // customization attributes
    );
    google.accounts.id.prompt(); // also display the One Tap dialog
  }, []);
  return <div id="buttonDiv"></div>;
}
