import React, { useState } from 'react';
import '../../styles/newPassword.scss';
import axios from "axios";

import LoginContainer from '../../components/loginContainer';

export default function NewPassword() {
  const [newSenha, setNewSenha] = useState("");

  function NewPasswordPost() {
    const data = { newSenha: newSenha };
    axios.post("http://localhost:3000/newPassword/", data)
  }

  return (
    <div className="content">
      <LoginContainer />
      <div className="container">
        <h2 id="h2" className="np-subTitle">Digite a sua nova senha</h2>

        <form action="/" method="POST">
          <input
            id="new-senha"
            className="input-box"
            type="password"
            name="newSenha"
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
            name="newSenha"
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
            type="submit"
            name="new-password-button"
            onClick={NewPasswordPost()} // Tirar duvidas sobre esse botão de login (VERIFICAR com o back)
            value="Enviar" />
        </form>
      </div>
    </div>
  );
}