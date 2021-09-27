import React, { useState } from 'react';
import '../../styles/login.scss';
import axios from "axios";
import { useHistory } from "react-router";
// import { FaEnvelope } from "react-icons/fa";
// import { FaLock } from "react-icons/fa";

import LoginContainer from '../../components/loginContainer'

export default function Login() {
  const history = useHistory();
  const [nif, setNif] = useState("");
  const [senha, setSenha] = useState("");

  const LoginPost = () => {
    const data = { nif: nif, senha: senha };
    axios.post("http://localhost:3002/auth/signin", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error)
      }
      else {
        localStorage.setItem("accessToken", response.data.token);
        // setAuthState({
        //   username: response.data.username,
        //   id: response.data.id,
        //   gerencia: response.data.gerencia,
        //   status: true,
        // });
        history.push('/request')
        // window.location.reload();
      }
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    LoginPost();
  }

  
  return (
    <>
    <div className="content">
      <LoginContainer />
      <div className="container">
        <h2 id="h2" className="login-subTitle">Login</h2>

        <form onSubmit={onSubmit}>
          <input
              id="email" 
              className="login-input-box"
              type="text" 
              name="nif"
              onChange={(e) => {
                setNif(e.target.value);
              }}
              placeholder="E-mail" 
              required
          />
          <input 
              id="password" 
              className="login-input-box" 
              type="password" 
              name="senha" 
              onChange={(e) => {
                setSenha(e.target.value);
              }}
              placeholder="Senha"
              required  
          />

          <div className="link-box">
            <a className="newPassword" onClick={() => history.push(`/forgotPassword`)}>Esqueci a senha</a>
          </div>

          <input 
              id="login-button" 
              className="login-button" 
              name="login-button"
              type="submit"
              // onClick={LoginPost} // Tirar duvidas sobre esse botão de login (VERIFICAR com o back)
              value="Entrar" />
        </form>
      </div>
    </div>
    </>
  );
}