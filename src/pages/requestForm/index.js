import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import axios from 'axios';

import MenuG from '../../components/hamburgerButton';

import Header from '../../components/header';
import SideBar from '../../components/formSideBar';

import Form from '../../components/form';

function RequestForm() {

  var [loading, setLoading] = useState(false);
  var [admin, setAdmin] = useState();
  var requestForm = true;

  var history = useHistory();

  useEffect(() => {
    setLoading(true)
    axios
      .get("http://localhost:3002/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((result) => {
        var resposta = result.data.roles.includes("3_ROLE_ADMIN");
        if (resposta === true) {
          setAdmin(true)
        }
        else {
          setAdmin(false)
        }
        setLoading(false)
      })
  }, []);
  return (
    <>
      {loading ? <>Loading...</> :
        <>
          <MenuG />
          <Header />
          <SideBar admin = {admin} requestForm = {requestForm}/>
          <Form />
        </>
      }
    </>
  );
}

export default RequestForm;
