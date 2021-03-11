import React from "react";
import "./Login.css";
import GoogleLogin from "react-google-login";
import { actionTypes } from "./Reducer";
import { useStateValue } from "./StateProvider";

function Login() {
  const [{}, dispatch] = useStateValue();

  const responseGoogle = (response) => {
    dispatch({
      type: actionTypes.SET_USER,
      user: response.profileObj,
    });
  };
  //ClientId:193889789553-pt2m1crgkr0852rlerpriqdmro7v5l25.apps.googleusercontent.com
  //193889789553-pt2m1crgkr0852rlerpriqdmro7v5l25.apps.googleusercontent.com

  return (
    <div className="login">
      <div className="login__container">
        <img
          alt=""
          src="https://i.pinimg.com/originals/93/b5/c9/93b5c9ea47985cf8769c89f90ac06af7.jpg"
        />
        <div className="login_text">
          <h1>Sign In To Animal-Aid Admin</h1>
        </div>
        <GoogleLogin
          className="google__login"
          clientId="193889789553-pt2m1crgkr0852rlerpriqdmro7v5l25.apps.googleusercontent.com"
          buttonText="Login With Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
      </div>
    </div>
  );
}

export default Login;
