import React from 'react';
import '../../styles/login.scss';

import Header from "../../components/header";
// import SideBarColaborador from "../../components/sidebarColaborador";
import SideBarGerencia from "../../components/sidebarGerencia";

const login = () => {
    return(
      <div>
      <Header />
      {/* <SideBarColaborador /> */}
      <SideBarGerencia />
      
      </div>
    );
}

export default login;