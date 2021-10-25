import React, { useState, useEffect, useContext } from 'react';
import '../../styles/management.scss';
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import { AuthContext } from './../../helpers/AuthContext';
import ManagerImg from '../../components/managerImg';

import MenuG from './../../components/hamburgerButtonG'
import Header from './../../components/header'
import SideBarGerencia from './../../components/sidebarGerencia'

function Management() {
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

  var [users, setUsers] = useState({
    status: false,
    list: [],
    message: ""
  });

  useEffect(() => {
    axios
      .get("http://localhost:3002/clientes", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((result) => {
        console.log(result)
        if (result.data.length > 0) {
          result.data.map((data) => {
            if (data.usuarios === "Sem usuários.") {
              data.usuarios = "Sem usuários cadastrados."
            }
            else {
              data.usuarios += " | Atualizado em:" + data.atualizado
            }
            // console.log(result.data.avaliacao_pedido)
            return null;
          })
          setUsers({
            nif: result.data.nif,
            email: result.data.email,
            nome: result.data.nome,
            imagem: "http://localhost:3002/" + result.data.imagem,
            cfp: result.data.cfp,
            telefone: result.data.telefone,
            depto: result.data.depto,

            list: result.data,
            status: true
          })
        }
        else {
          setUsers({
            message: result.data.message
          })
        }
      });
  }, []);


  return (
    <>
      <MenuG />
      <Header />
      <SideBarGerencia />

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
          {users.status ?
          <>
        {users.list.map((data) => (
          <React.Fragment key={data.nif}>
            <div>
              <h2>Imagem:<span>{data.imagem}</span></h2>
              <h2>Nome:<span>{data.nome}</span></h2>
              <h2>Email:<span>{data.email}</span></h2>
              <h2>CPF:<span>{data.cfp}</span></h2>
              <h2>telefone:<span>{data.telefone}</span></h2>
              <h2>Departamento:<span>{data.depto}</span></h2>
            </div>
            <h3>--------------------------------------------------</h3>  
          </React.Fragment>
        ))}
          </> :
          <>
            <h1>{users.message}</h1>
          </>
        }
        </div>


        {/* <div className="section">
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
        </div> */}
        <div className="btn-newUser">
          <button>Criar novo usuário</button>
        </div>
      </div>
    </>
  );
}

export default Management;
