import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import axios from 'axios';

import MenuG from '../../components/hamburgerButtonG';

import Header from '../../components/header';
import SideBar from '../../components/formSideBar';

import Form from '../../components/form';

function RequestForm(props) {

  var [loading, setLoading] = useState(false);
  var [admin, setAdmin] = useState(false);
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
        var resposta = result.data.roles.includes("2_ROLE_ADMIN");
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
          <Header nif={props.nif}/>
          <SideBar image={props.image} name={props.name} admin={admin} requestForm={requestForm} nif={props.nif} />
          <Form />
        </>
      }
    </>
  );
}

export default RequestForm;