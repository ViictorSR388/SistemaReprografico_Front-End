<<<<<<< HEAD
import React, {useEffect, useState, useContext} from 'react';
import '../../styles/management.scss';
import { Router, Redirect } from 'react-router-dom'
import axios from 'axios';
=======
import React, { useEffect } from 'react';
import '../../styles/management.scss';
import Menu from '../../components/hamburgerButton';
import Header from '../../components/header';
import SideBarColaborador from '../../components/sidebarColaborador';

>>>>>>> 616657c417821a4e02c3793b762e245a69acb74d
import { FaSearch } from 'react-icons/fa';
import { AuthContext } from './../../helpers/AuthContext';

<<<<<<< HEAD
function Management () {
  const [redirect, setRedirect] = useState(false);
  const { setAuthState } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("http://localhost:3002/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
        validateStatus: () => true
      })
      .then((response) => {
        if (response.status == 500 || response.data.error) {
          setAuthState({ status: false });
          setRedirect(true)
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
            setRedirect(true)
        }
      }
    })
  }, []);

=======
function Management() {
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3002/auth/signin", {
  //       headers: {
  //         accessToken: localStorage.getItem("accessToken"),
  //       },
  //     })
  //     .then((response) => {
  //       if (response.data.error) {
  //         setAuthState(false);
  //       } else {
  //         setAuthState(true);
  //       }
  //     });
  // }, []);
>>>>>>> 616657c417821a4e02c3793b762e245a69acb74d

  return (
    <>
      <Menu />
      <Header />
      <SideBarColaborador />

      <div className="container-management">
    {/* <Router>
      {redirect ? (<Redirect push to="/404" />) : null}     
       </Router> */}
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
