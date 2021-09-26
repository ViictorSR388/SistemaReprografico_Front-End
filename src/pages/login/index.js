import React, { useState } from 'react';
import '../../styles/login.scss';
import axios from "axios";
// import { FaEnvelope } from "react-icons/fa";
// import { FaLock } from "react-icons/fa";

import LoginContainer from '../../components/loginContainer'

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function LoginPost() {
    const data = { email: email, password: password };
    axios.post("http://localhost:3000/login/", data)
  }
  
  return (
    <>
    <div className="content">
      <LoginContainer />
      <div className="container">
        <h2 id="h2" className="login-subTitle">Login</h2>

        <form action="/" method="POST">
          <input
              id="email" 
              className="login-input-box"
              type="email" 
              name="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="E-mail" 
              required
          />
          <input 
              id="password" 
              className="login-input-box" 
              type="password" 
              name="password" 
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Senha"
              required  
          />

          <div className="link-box">
            <a className="newPassword" href="http://localhost:3000/forgotPassword">Esqueci a senha</a>
          </div>

          <input 
              id="login-button" 
              className="login-button" 
              type="submit" 
              name="login-button"
              onClick={LoginPost()} // Tirar duvidas sobre esse botão de login (VERIFICAR com o back)
              value="Entrar" />
        </form>
      </div>
    </div>
    </>
  );
}