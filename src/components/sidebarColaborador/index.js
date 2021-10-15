import React from 'react';
import './styles.scss';

import Repo from '../img/repo'

function SideBarColaborador () {
  return (
    <div className="sidebarC">
      <Repo />

      <div className="buttonsC">
        <button className="buttonC">Solicitar Impressão</button>
        <button className="buttonC">Histórico</button>
      </div>
    </div>
  );
};

export default SideBarColaborador;