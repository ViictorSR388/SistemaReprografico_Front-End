import React from 'react';
import '../../styles/userInfo.scss';

import LoginContainer from '../../components/loginContainer';

const userInfo = () => {
  return (
    <div className="content">
      <LoginContainer />
      <div className="container">
        <h2 id="h2" className="ui-subTitle">Informações pessoais</h2>
        <form action="/" method="POST">
          <input className="input-box" name="nameUser" type="text" placeholder="Nome" />
          <input className="input-box" name="emailUser" type="email" placeholder="E-mail" />
          <input className="input-box" name="senhaUser" type="password" placeholder="Senha" />
          <input className="input-box" name="nifUser" type="text" placeholder="NIF" />
          <input className="input-box" name="deptoUser" type="text" placeholder="Departamento" />
          <div className="btns">
            <input type="submit" className="ui-button" id="btn" value="Enviar" />
            <input type="submit" className="ui-button" id="btn" value="Voltar" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default userInfo;