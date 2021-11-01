import React from 'react';
import './styles.scss';
import { FaHome } from 'react-icons/fa';
import { FaUserAlt } from 'react-icons/fa';
import { FaSignOutAlt } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import axios from "axios";
import { useHistory } from "react-router";


import Logo from '../img/logo';

function Header (props) {
  const history = useHistory();

  const routeUi = () => {
    history.push(`/user/${props.nif}`)
  }

  const logout = () => {
    localStorage.removeItem("accessToken");
    history.push('/')
  }; 
  
  
  return (
    <header>
      <Logo />
      {/* <img src={`http://localhost:3002` + imagem}  /> */}
      <div className="icons">
        <FaHome className="icon" />
        <FaUserAlt className="icon" onClick={routeUi} />
        <FaSignOutAlt className="icon" onClick={logout} />
      </div>
    </header>
  );
};

export default Header;
