import React, { useEffect, useContext } from 'react';
import { AuthContext } from './../../helpers/AuthContext';
import { useHistory } from 'react-router-dom'
import axios from 'axios';

import MenuG from '../../components/hamburgerButton';

import Header from '../../components/header';
import SideBarGerencia from '../../components/sidebarGerencia';

import Form from '../../components/form';

function FormGerencia() {

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
      <Form />
    </>
  );
}

export default FormGerencia;
