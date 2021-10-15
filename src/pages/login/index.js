import React, { useCallback, useContext, useState } from 'react';
import '../../styles/login.scss';
import axios from "axios";
import { useHistory } from "react-router";
import { AuthContext } from './../../helpers/AuthContext';

import LoginContainer from '../../components/loginContainer'

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  // const {setAuthState} = useContext(AuthContext)
  const [authState, setAuthState] = useState(false);
  

  const [mensagem, setMensagem] = useState("")

  let history = useHistory();

  const LoginPost = () => {
  const data = { email: email, senha: senha };
  axios.post("http://localhost:3002/logar", data).then((result) => {
    console.log(result)
    if (result.data.error) {
        setMensagem(result.data.error)
    }
    else {
      localStorage.setItem("accessToken", result.data.accessToken);
      setAuthState(true)
      
      var resposta = result.data.roles.includes("3_ROLE_ADMIN");

      if (resposta == true) {
        history.push('management')
      } else {
        history.push('requestFormC')
      }
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
      <AuthContext.Provider value={{ authState, setAuthState }}>
      <div className="container">
        <h2 id="h2" className="login-subTitle">Login</h2>

        <form onSubmit={onSubmit}>
          <input
            id="email" 
            className="login-input-box"
            type="text" 
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
            value="Entrar" />
        </form>
        <h4>{mensagem}</h4>
      </div>
      </AuthContext.Provider>
    </div>
    </>
  );
}