import React from 'react';
import './styles.scss';

const SideBarColaborador = () => {
  return (
    <div className="sidebar">
      <div className="circle">
        <img className="repo" src="assets/img/repo.png"></img>
      </div>

      <div className="buttons">
        <button className="button">Solicitar Impressão</button>
        <button className="button">Histórico</button>
      </div>
    </div>
  );
};

export default SideBarColaborador;
