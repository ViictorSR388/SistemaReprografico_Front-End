import React, { useState } from 'react';
import LoginContainer from '../../components/loginContainer';
import '../../styles/forgotPassword.scss';
import axios from "axios";

export default function ForgotPassword() {

  const [email, setEmail] = useState("");
  const [enviado, setEnviado] = useState();

  const ForgotPasswordPost = () => {
    if (email === '') {
      console.log("Insira um email!!!!")
    }
    else {
      const data = { mail: email };
      axios.post("http://localhost:3002/forgot-password/", data).then((response) => {
        setEnviado(true)
      });
    }
  }

  const onSubmit = e => {
    e.preventDefault();
    ForgotPasswordPost();
  }



  return (
    <div className="content">
      <LoginContainer />
      <div className="container">
        <h2 id="h2" className="fp-subTitle">Insira o seu e-mail</h2>

        <form onSubmit={onSubmit}>
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
          {enviado ? <p>Email enviado com sucesso para {email}</p>
              : <input
                type="submit"
                id="forgot-password-button"
                className="fp-button"
                name="forgot-password-button"
                onClick={ForgotPasswordPost} // Tirar duvidas sobre esse botão de login (VERIFICAR com o back)
                value="Enviar"
              />
          }

        </form>

        <h4>Um link será enviado ao seu e-mail para a recuperação de senha</h4>
      </div>
    </div>
  );
}