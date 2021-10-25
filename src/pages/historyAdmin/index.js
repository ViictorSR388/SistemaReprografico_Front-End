import React, { useEffect, useContext } from 'react';
import { AuthContext } from './../../helpers/AuthContext';
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import '../../styles/historyAdmin.scss';

import Header from '../../components/header';
import SideBarGerencia from '../../components/sidebarGerencia';

import MenuG from '../../components/hamburgerButtonG';

function HistoryAdmin() {
  const { setAuthState } = useContext(AuthContext);
  var history = useHistory();

  useEffect(() => {
    axios
      .get("http://localhost:3002/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.status === 500 || response.data.error) {
          setAuthState({ status: false });
          history.push('./')
        }
        else {
          setAuthState({
            nif: response.data.nif,
            email: response.data.email,
            nome: response.data.nome,
            imagem: "http://localhost:3002/" + response.data.imagem,
            roles: response.data.roles,
            status: true
          });
          var resposta = response.data.roles.includes("3_ROLE_ADMIN");
          if (resposta === false) {
            setAuthState({ status: false });
            history.push('./notAuthorized')
          }
        }
      })
  }, []);

  return (
    <>
      <MenuG />
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
              <button className="btn-details-admin">Detalhes</button>
            </div>
          </div>
          <div className="history-admin-item">
            ID= 1 | Funcionário | Titulo da Reprografia | Total: R$50
            <div className="btns-admin">
              <button className="btn-details-admin">Detalhes</button>
            </div>
          </div>
          <div className="history-admin-item">
            ID= 1 | Funcionário | Titulo da Reprografia | Total: R$50
            <div className="btns-admin">
              <button className="btn-details-admin">Detalhes</button>
            </div>
          </div>
          <div className="history-admin-item">
            ID= 1 | Funcionário | Titulo da Reprografia | Total: R$50
            <div className="btns-admin">
              <button className="btn-details-admin">Detalhes</button>
            </div>
          </div>
          <div className="history-admin-item">
            ID= 1 | Funcionário | Titulo da Reprografia | Total: R$50
            <div className="btns-admin">
              <button className="btn-details-admin">Detalhes</button>
            </div>
          </div>
          <div className="history-admin-item">
            ID= 1 | Funcionário | Titulo da Reprografia | Total: R$50
            <div className="btns-admin">
              <button className="btn-details-admin">Detalhes</button>
            </div>
          </div>
          <div className="history-admin-item">
            ID= 1 | Funcionário | Titulo da Reprografia | Total: R$50
            <div className="btns-admin">
              <button className="btn-details-admin">Detalhes</button>
            </div>
          </div>
          <div className="history-admin-item">
            ID= 1 | Funcionário | Titulo da Reprografia | Total: R$50
            <div className="btns-admin">
              <button className="btn-details-admin">Detalhes</button>
            </div>
          </div>
          <div className="history-admin-item">
            ID= 1 | Funcionário | Titulo da Reprografia | Total: R$50
            <div className="btns-admin">
              <button className="btn-details-admin">Detalhes</button>
            </div>
          </div>
          <div className="history-admin-item">
            ID= 1 | Funcionário | Titulo da Reprografia | Total: R$50
            <div className="btns-admin">
              <button className="btn-details-admin">Detalhes</button>
            </div>
          </div>
          <div className="history-admin-item">
            ID= 1 | Funcionário | Titulo da Reprografia | Total: R$50
            <div className="btns-admin">
              <button className="btn-details-admin">Detalhes</button>
            </div>
          </div>
          <div className="history-admin-item">
            ID= 1 | Funcionário | Titulo da Reprografia | Total: R$50
            <div className="btns-admin">
              <button className="btn-details-admin">Detalhes</button>
            </div>
          </div>
          <div className="history-admin-item">
            ID= 1 | Funcionário | Titulo da Reprografia | Total: R$50
            <div className="btns-admin">
              <button className="btn-details-admin">Detalhes</button>
            </div>
          </div>
          <div className="history-admin-item">
            ID= 1 | Funcionário | Titulo da Reprografia | Total: R$50
            <div className="btns-admin">
              <button className="btn-details-admin">Detalhes</button>
            </div>
          </div>
          <div className="history-admin-item">
            ID= 1 | Funcionário | Titulo da Reprografia | Total: R$50
            <div className="btns-admin">
              <button className="btn-details-admin">Detalhes</button>
            </div>
          </div>
          <div className="history-admin-item">
            ID= 1 | Funcionário | Titulo da Reprografia | Total: R$50
            <div className="btns-admin">
              <button className="btn-details-admin">Detalhes</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HistoryAdmin;