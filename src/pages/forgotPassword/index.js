import React from 'react';
import LoginContainer from '../../components/loginContainer';
import '../../styles/forgotPassword.scss';

const forgotPassword = () => {
    return(
      <div className="content">
        <LoginContainer />
        <div className="container">
          <h2 id="h2" className="fp-subTitle">Insira o seu e-mail</h2>
          <form action="/" method="POST">
            <input className="input-box" name="emailUser" type="email" placeholder="E-mail" />
            <input type="submit" className="fp-button" id="btn" value="Enviar" />
          </form>
          <h4>Um link será enviado ao seu e-mail para a recuperação de senha</h4>
        </div>
    </div>
    );
}

export default forgotPassword;