import React, { useEffect, useState } from "react";
import { Redirect } from 'react-router-dom';


const LoginButton = () => {
  const [redirect, setRedirect] = useState(false)

  const onLogin = () => {
    setRedirect(true)
  };

  useEffect(() => {
    setRedirect(false)
  }, [redirect])

  function redirectToLogin() {
    if (redirect) {
      return <Redirect to='/login' />
    }
  }

  return (
    <button className="navbar__button__logout" onClick={onLogin}>{redirectToLogin()}Login</button>
  )
};

export default LoginButton;
