import React, { useCallback, useContext, useState, useEffect } from 'react';
import '../../styles/login.scss';
import axios from "axios";
import { useHistory } from "react-router";
import { AuthContext } from './../../helpers/AuthContext';

import LoginContainer from '../../components/loginContainer'

export default function Login() {
  const [emailOrNif, setEmailOrNif] = useState("");
  const [ senha, setSenha ] = useState("");
  const { setAuthState } = useContext(AuthContext);

  const [mensagem, setMensagem] = useState("")

  let history = useHistory();

  const LoginPost = () => {
    const data = { emailOrNif: emailOrNif, senha: senha };
    axios.post("http://localhost:3002/login", data).then((result) => {
      if (result.data.status === "error"){
        setMensagem(result.data.message)
      }
      else {
        setAuthState({
          nif: result.data.nif,
          nome: result.data.nome,
          roles: result.data.roles,
          imagem: "http://localhost:3002/" + result.data.imagem,
          redirect: false
        });
        localStorage.setItem("accessToken", result.data.accessToken);
        if(result.data.primeiro_acesso === 1){
          history.push("/firstAccess")
        }
        else if(result.data.roles){
          var resposta = result.data.roles.includes("2_ROLE_ADMIN");
          if (resposta === true) {
            history.push('management')
          } else {
            history.push('requestForm')
          }
        }
      }
    });
  };

  useEffect(() => {
    axios
      .get("http://localhost:3002/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.roles) {
          var resposta = response.data.roles.includes("2_ROLE_ADMIN");
          if (resposta === true) {
            history.push('management')
          } else {
            history.push('requestForm')
          }
        }
      }
      )
  }, []);

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
              name="email"
              onChange={(e) => {
                setEmailOrNif(e.target.value);
              }}
              placeholder="E-mail ou NIF"
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
              <p className="newPassword" onClick={() => history.push(`/forgotPassword`)}>Esqueci a senha</p>
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
      </div>
    </>
  );
}