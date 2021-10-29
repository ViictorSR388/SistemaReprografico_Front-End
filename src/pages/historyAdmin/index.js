import React, {useEffect, useContext} from 'react';
import { AuthContext } from './../../helpers/AuthContext';
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios';
import '../../styles/historyAdmin.scss';

import Header from '../../components/header';
import SideBar from '../../components/formSideBar';

import MenuG from '../../components/hamburgerButtonG';

function HistoryAdmin (props) {
  const { setAuthState } = useContext(AuthContext);
  var history = useHistory();

  var { nif } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:3002/pedido/nif" + nif, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((result) => {
        console.log(result)
      })
  }, []);
  
  return (
    <>
      <MenuG />
      <Header />
      <SideBar image={props.image} name={props.name} admin={true}/>

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