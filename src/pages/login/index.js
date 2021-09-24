import React from 'react';
import '../../styles/login.scss';
// import { FaEnvelope } from "react-icons/fa";
// import { FaLock } from "react-icons/fa";

import LoginContainer from '../../components/loginContainer';

export default function login() {
  return(
    <div className="content">
        <LoginContainer />
        <div className="container">
          <h2 id="h2" className="login-subTitle">Login</h2>
          <form action="/" method="POST">
            <input className="login-input-box" name="emailUser" type="email" placeholder="E-mail" /> 
            <input className="login-input-box" name="senhaUser" type="password" placeholder="Senha" />
            <div className="link-box">
              <a className="newPassword" href="http://localhost:3000/forgotPassword">Esqueci a senha</a>
            </div>
            <input type="submit" className="login-button" id="btn" value="Entrar" />
          </form>
        </div>
    </div>
  );
}