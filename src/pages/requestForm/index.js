import React from 'react';
import MenuG from '../../components/hamburgerButtonG';

import Header from '../../components/header';
import SideBar from '../../components/formSideBar';

import Form from '../../components/form';

function RequestForm(props) {

  return (
        <>
          <MenuG />
          <Header nif={props.nif}/>
          <SideBar image={props.image} name={props.name} admin={props.admin} requestForm={true} nif={props.nif} />
          <Form />
        </>
  );
}
export default RequestForm;