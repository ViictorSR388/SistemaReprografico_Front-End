import React, { useState } from 'react';
import LoginContainer from '../../components/loginContainer';
import '../../styles/forgotPassword.scss';
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  function ForgotPasswordPost() {
    const data = { email: email};
    axios.post("http://localhost:3000/forgotPassword/", data)
  }

    return(
      <div className="content">
        <LoginContainer />
        <div className="container">
          <h2 id="h2" className="fp-subTitle">Insira o seu e-mail</h2>

          <form action="/" method="POST">
            <input
              id="email"
              type="email" 
              className="input-box" 
              name="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="E-mail"
              required 
            />
            <input
              id="forgot-password-button"
              className="fp-button" 
              type="submit" 
              name="forgot-password-button"
              onClick={ForgotPasswordPost()} // Tirar duvidas sobre esse botão de login (VERIFICAR com o back)
              value="Enviar"
            />
          </form>

          <h4>Um link será enviado ao seu e-mail para a recuperação de senha</h4>
        </div>
    </div>
    );
}