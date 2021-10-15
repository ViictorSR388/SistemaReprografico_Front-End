import React from 'react';

import MenuG from '../../components/hamburgerButtonG';

import Header from '../../components/header';
import SideBarGerencia from '../../components/sidebarGerencia';

import Form from '../../components/form';

function FormGerencia() {
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
