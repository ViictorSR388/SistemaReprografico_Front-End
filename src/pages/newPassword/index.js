import React, { useState } from 'react';
import '../../styles/newPassword.scss';
import axios from "axios";

import LoginContainer from '../../components/loginContainer';

export default function NewPassword() {
  const [newSenha, setNewSenha] = useState("");

  function NewPasswordPost() {
    const data = { password1: newSenha, password2: newSenha};
    axios.post("http://localhost:3002/reset-password", data)
  }

  const onSubmit = (e) => {
    e.preventDefault();
    NewPasswordPost();
  }
  return (
    <div className="content">
      <LoginContainer />
      <div className="container">
        <h2 id="h2" className="np-subTitle">Digite a sua nova senha</h2>

        <form action="http://localhost:3002/reset-password" method="Post">
          <input
            id="new-senha"
            className="input-box"
            type="password"
            name="password1"
            onChange={(e) => {
              setNewSenha(e.target.value);
            }}
            placeholder="Senha"
            required
          />
          <input
            id="new-senha"
            className="input-box"
            type="password"
            name="password2"
            onChange={(e) => {
              setNewSenha(e.target.value);
            }}
            placeholder="Senha"
            required
          />

          <div className="link-box">
          </div>
          <input
            id="new-password-button"
            className="np-button"
            name="new-password-button"
            type= "submit"
            // onClick={NewPasswordPost} // Tirar duvidas sobre esse botão de login (VERIFICAR com o back)
            value="Enviar" />
        </form>
      </div>
    </div>
  );
}