import React from 'react';
import '../../styles/newPassword.scss';

import LoginContainer from '../../components/loginContainer';

const newPassword = () => {
    return(
      <div className="content">
        <LoginContainer />
        <div className="container">
          <h2 id="h2" className="np-subTitle">Digite a sua nova senha</h2>
          <form action="/" method="POST">
            <input className="input-box" name="senhaUser" type="password" placeholder="Senha" />
            <input className="input-box" name="senhaUser" type="password" placeholder="Confirme a sua senha" />
            <div className="link-box">
            </div>
            <input type="submit" className="np-button" id="btn" value="Enviar" />
          </form>
        </div>
      </div>
    );
}

export default newPassword;