import React from 'react';
import '../../styles/historyAdmin.scss';

import Header from '../../components/header';
import SideBarGerencia from '../../components/sidebarGerencia';

import Menu from '../../components/hamburgerButton';

function HistoryAdmin () {
  return (
    <>
      <Menu />
      <Header />
      <SideBarGerencia />

      <div className="container-history-admin">
        <div className="history-admin-title">
          <h1>Histórico</h1>
        </div>

        <div className="div-search">
          <input
            type="search"
            className="search-user"
            placeholder="Pesquisar Usuários"
          />
        </div>

        <div className="div-itens-admin">
          <div className="history-admin-item">
            ID= 1 | Funcionário | Titulo da Reprografia | Total: R$50
            <div className="btns-admin">
              <button className="btn-review-admin">Avaliar</button>
              <button className="btn-details-admin">Detalhes</button>
            </div>
          </div>
          <div className="history-admin-item">
            ID= 1 | Funcionário | Titulo da Reprografia | Total: R$50
            <div className="btns-admin">
              <button className="btn-review-admin">Avaliar</button>
              <button className="btn-details-admin">Detalhes</button>
            </div>
          </div>
          <div className="history-admin-item">
            ID= 1 | Funcionário | Titulo da Reprografia | Total: R$50
            <div className="btns-admin">
              <button className="btn-review-admin">Avaliar</button>
              <button className="btn-details-admin">Detalhes</button>
            </div>
          </div>
          <div className="history-admin-item">
            ID= 1 | Funcionário | Titulo da Reprografia | Total: R$50
            <div className="btns-admin">
              <button className="btn-review-admin">Avaliar</button>
              <button className="btn-details-admin">Detalhes</button>
            </div>
          </div>
          <div className="history-admin-item">
            ID= 1 | Funcionário | Titulo da Reprografia | Total: R$50
            <div className="btns-admin">
              <button className="btn-review-admin">Avaliar</button>
              <button className="btn-details-admin">Detalhes</button>
            </div>
          </div>
          <div className="history-admin-item">
            ID= 1 | Funcionário | Titulo da Reprografia | Total: R$50
            <div className="btns-admin">
              <button className="btn-review-admin">Avaliar</button>
              <button className="btn-details-admin">Detalhes</button>
            </div>
          </div>
          <div className="history-admin-item">
            ID= 1 | Funcionário | Titulo da Reprografia | Total: R$50
            <div className="btns-admin">
              <button className="btn-review-admin">Avaliar</button>
              <button className="btn-details-admin">Detalhes</button>
            </div>
          </div>
          <div className="history-admin-item">
            ID= 1 | Funcionário | Titulo da Reprografia | Total: R$50
            <div className="btns-admin">
              <button className="btn-review-admin">Avaliar</button>
              <button className="btn-details-admin">Detalhes</button>
            </div>
          </div>
          <div className="history-admin-item">
            ID= 1 | Funcionário | Titulo da Reprografia | Total: R$50
            <div className="btns-admin">
              <button className="btn-review-admin">Avaliar</button>
              <button className="btn-details-admin">Detalhes</button>
            </div>
          </div>
          <div className="history-admin-item">
            ID= 1 | Funcionário | Titulo da Reprografia | Total: R$50
            <div className="btns-admin">
              <button className="btn-review-admin">Avaliar</button>
              <button className="btn-details-admin">Detalhes</button>
            </div>
          </div>
          <div className="history-admin-item">
            ID= 1 | Funcionário | Titulo da Reprografia | Total: R$50
            <div className="btns-admin">
              <button className="btn-review-admin">Avaliar</button>
              <button className="btn-details-admin">Detalhes</button>
            </div>
          </div>
          <div className="history-admin-item">
            ID= 1 | Funcionário | Titulo da Reprografia | Total: R$50
            <div className="btns-admin">
              <button className="btn-review-admin">Avaliar</button>
              <button className="btn-details-admin">Detalhes</button>
            </div>
          </div>
          <div className="history-admin-item">
            ID= 1 | Funcionário | Titulo da Reprografia | Total: R$50
            <div className="btns-admin">
              <button className="btn-review-admin">Avaliar</button>
              <button className="btn-details-admin">Detalhes</button>
            </div>
          </div>
          <div className="history-admin-item">
            ID= 1 | Funcionário | Titulo da Reprografia | Total: R$50
            <div className="btns-admin">
              <button className="btn-review-admin">Avaliar</button>
              <button className="btn-details-admin">Detalhes</button>
            </div>
          </div>
          <div className="history-admin-item">
            ID= 1 | Funcionário | Titulo da Reprografia | Total: R$50
            <div className="btns-admin">
              <button className="btn-review-admin">Avaliar</button>
              <button className="btn-details-admin">Detalhes</button>
            </div>
          </div>
          <div className="history-admin-item">
            ID= 1 | Funcionário | Titulo da Reprografia | Total: R$50
            <div className="btns-admin">
              <button className="btn-review-admin">Avaliar</button>
              <button className="btn-details-admin">Detalhes</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HistoryAdmin;