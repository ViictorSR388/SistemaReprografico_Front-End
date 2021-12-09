import React, { useContext, useState, useEffect } from "react";
import "../../styles/login.scss";
import axios from "axios";
import { useHistory } from "react-router";
import { AuthContext } from "./../../helpers/AuthContext";

import LoginContainer from "../../components/loginContainer";

import Loading from '../../../src/components/loading';

export default function Login() {
  const [emailOrNif, setEmailOrNif] = useState("");
  const [senha, setSenha] = useState("");
  const { setAuthState } = useContext(AuthContext);

  const [mensagem, setMensagem] = useState("");

  const port = process.env.REACT_APP_PORT || 3002;

  const reprografia_url = `${process.env.REACT_APP_REPROGRAFIA_URL}:${port}`;

  let history = useHistory();

  const LoginPost = () => {
    const data = { emailOrNif: emailOrNif, senha: senha };
    axios.post(`${reprografia_url}/login`, data).then((result) => {
      if (result.data.status === "error") {
        setMensagem(result.data.message);
      } else {
        setAuthState({
          nif: result.data.nif,
          nome: result.data.nome,
          roles: result.data.roles,
          imagem: `${reprografia_url}/` + result.data.imagem,
          redirect: false,
          naoAutorizado: false
        });
        localStorage.setItem("accessToken", result.data.accessToken);
        if (result.data.roles) {
          var resposta = result.data.roles.includes("2_ROLE_ADMIN");

          if (resposta === false && result.data.primeiro_acesso === 1) {
            setAuthState({
              admin: false, firstAccess: true, nif: result.data.nif,
            });
            history.push("/firstAccess")
          }
          else if (resposta === true && result.data.primeiro_acesso === 0) {
            setAuthState({
              admin: true, firstAccess: false,
            });
            history.push("user/" + result.data.nif);
          }
          else if (resposta === true && result.data.primeiro_acesso === 1) {
            setAuthState({
              admin: true, firstAccess: true, nif: result.data.nif,
            });
            history.push("/firstAccess")
          }
          else {
            setAuthState({
              admin: false, firstAccess: false
            });
            history.push("user/" + result.data.nif);
          }
        }
      }
    });
  };

  var [loading, setLoading] = useState(Loading);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${reprografia_url}/myUser`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.roles) {
          if (response.data.primeiro_acesso === 1) {
            setAuthState({
              firstAccess: true,
              nif: response.data.nif
            });
            history.push("/firstAccess")
          }
          else if (response.data.roles[0].descricao === "admin") {
            history.push("/management");
            setAuthState({
              admin: true
            });
          } else {
            history.push("/requestForm");
            setAuthState({
              admin: false
            });
          }
        }
        setLoading(false);
      });
  }, [reprografia_url, history, setAuthState]);

  const onSubmit = (e) => {
    e.preventDefault();
    LoginPost();
  };

  return (
    <>
      <div className="content">
        {loading ? <> <Loading /> </> :
          <>
            <LoginContainer />
            <div className="container-login">
              <h2 id="h2" className="login-subTitle">
                Login
              </h2>

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
                  <p
                    className="newPassword"
                    onClick={() => history.push(`/forgotPassword`)}
                  >
                    Esqueceu a senha?
                  </p>
                </div>

                <input
                  id="login-button"
                  className="login-button"
                  name="login-button"
                  type="submit"
                  value="Entrar"
                />
              </form>
              <h4>{mensagem}</h4>
            </div>
          </>
        }
      </div>
    </>
  );
}