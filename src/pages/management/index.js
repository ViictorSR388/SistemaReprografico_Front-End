import React, {useEffect, useState, useContext} from 'react';
import '../../styles/management.scss';
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import { AuthContext } from './../../helpers/AuthContext';
import ManagerImg from '../../components/managerImg';

import MenuG from './../../components/hamburgerButtonG'
import Header from './../../components/header'
import SideBarGerencia from './../../components/sidebarGerencia'

function Management () {
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
        if (response.status == 500 || response.data.error) {
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
          if (resposta == false) {
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
{/* {isLoading ? <><h1>Carregando</h1></>: <></>} */}
      <div className="container-management">
        <div className="management">
          <h1 className="management-title">Gerência de Usuários</h1>
          <label htmlFor="search">
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Filtro"
            />
          </label>
          <FaSearch className="icon-management" />
        </div>
        <div className="section">
          <ManagerImg />

          <input className="input-management" type="text" placeholder="Nome" />
          <input
            className="input-management"
            type="email"
            placeholder="Email"
          />
          <input
            className="input-management nif"
            type="number"
            placeholder="NIF"
          />
          <input
            className="input-management dp"
            type="text"
            placeholder="Departamento"
          />
          <input
            className="input-management cfp"
            type="number"
            placeholder="CFP"
          />
          <input
            className="input-management tel"
            type="text"
            placeholder="TEL"
          />

          <div className="btn-management">
            <button className="btn-management-E">Editar</button>
            <button className="btn-management-D">Apagar</button>
          </div>
        </div>
        <div className="section">
          <ManagerImg />

          <input className="input-management" type="text" placeholder="Nome" />
          <input
            className="input-management"
            type="email"
            placeholder="Email"
          />
          <input
            className="input-management nif"
            type="number"
            placeholder="NIF"
          />
          <input
            className="input-management dp"
            type="text"
            placeholder="Departamento"
          />
          <input
            className="input-management cfp"
            type="number"
            placeholder="CFP"
          />
          <input
            className="input-management tel"
            type="text"
            placeholder="TEL"
          />
          <div className="btn-management">
            <button className="btn-management-E">Editar</button>
            <button className="btn-management-D">Apagar</button>
          </div>
        </div>
        <div className="section">
          <ManagerImg />

          <input className="input-management" type="text" placeholder="Nome" />
          <input
            className="input-management"
            type="email"
            placeholder="Email"
          />
          <input
            className="input-management nif"
            type="number"
            placeholder="NIF"
          />
          <input
            className="input-management dp"
            type="text"
            placeholder="Departamento"
          />
          <input
            className="input-management cfp"
            type="number"
            placeholder="CFP"
          />
          <input
            className="input-management tel"
            type="text"
            placeholder="TEL"
          />
          <div className="btn-management">
            <button className="btn-management-E">Editar</button>
            <button className="btn-management-D">Apagar</button>
          </div>
        </div>
        <div className="btn-newUser">
          <button>Criar novo usuário</button>
        </div>
      </div>
    </>
  );
}

export default Management;
