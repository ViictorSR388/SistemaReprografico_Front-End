import React from 'react';
import Menu from '../../components/hamburgerButton';

import Header from '../../components/header';
import SideBar from '../../components/formSideBar';

import Form from '../../components/form';

function RequestForm(props) {

  return (
        <>
          <Menu admin={props.admin}/>
          <Header nif={props.nif}/>
          <SideBar image={props.image} name={props.name} admin={props.admin} requestForm={true} nif={props.nif} />
          <Form />
        </>
  );
}
export default RequestForm;