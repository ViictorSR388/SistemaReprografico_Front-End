import React from 'react';
import Menu from '../../components/hamburgerButton';

import Header from '../../components/header';
import SideBarColaborador from '../../components/sidebarColaborador';

import Form from '../../components/form';

function FormColaborador() {
  return (
    <>
      <Menu />
      <Header />
      <SideBarColaborador />
      <Form />
    </>
  );
}

export default FormColaborador;