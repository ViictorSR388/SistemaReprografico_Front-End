import React from 'react';
import './styles.scss';
import { FaHome } from 'react-icons/fa';
import { FaUserAlt } from 'react-icons/fa';
import { FaSignOutAlt } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import axios from "axios";
import { useHistory } from "react-router";


import Logo from '../img/logo';

function Header () {
  const history = useHistory();

  const [authState, setAuthState] = useState({
    email: "",
    nif: 0,
    status: false,
  });

  useEffect(() => {
    axios.get("http://localhost:3002/auth/", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            email: response.data.email,
            nif: response.data.id,
            status: true,
          });
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState(false);
    history.push('/')
  }; 
  
  return (
    <header>
      <Logo />
      {/* <img src={`http://localhost:3002` + imagem}  /> */}
      <div className="icons">
        <FaHome className="icon" />
        <FaUserAlt className="icon" />
        <FaSignOutAlt className="icon" onClick={logout} />
      </div>
    </header>
  );
};

export default Header;
