import React from 'react';
import './styles.scss';
import Repo from '../img/repo';
import { useHistory } from 'react-router';

function SideBarColaborador () {

  const history = useHistory();

  const routeFormC = () => {
    history.push("/requestFormC");
  }

  const routeHistory = () => {
    history.push("/historyDefault");
  }

  return (
    <div className="sidebarC">
      <Repo />

      <div className="buttonsC">
        <button className="buttonC" onClick={routeFormC}>Solicitar Impressão</button>
        <button className="buttonC" onClick={routeHistory}>Histórico</button>
      </div>
    </div>
  );
};

export default SideBarColaborador;