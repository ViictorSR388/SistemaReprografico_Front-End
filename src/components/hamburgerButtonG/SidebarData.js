import React from 'react';
import { FaHome } from 'react-icons/fa';
import { FaUserAlt } from 'react-icons/fa';
import { FaSignOutAlt } from 'react-icons/fa';
import { FaTelegram } from 'react-icons/fa';
import { FaBookReader } from 'react-icons/fa';
import { FaWrench } from 'react-icons/fa';
import { FaChartLine } from 'react-icons/fa';
import { useHistory } from 'react-router';

// export dfunction MenuData (props) {
//   const history = useHistory();

//   const routeUi = () => {
//     history.push(`/user/${props.nif}`)
//   }
  
  export const SidebarData = [
    {
      title: 'Usuário',
      path: '/userInfo',
      icon: <FaUserAlt />,
      cName: 'nav-text'
    },
    {
      title: 'Solicitar impressão',
      path: '/requestForm',
      icon: <FaTelegram />,
      cName: 'nav-text'
    },
    {
      title: 'Gerência de usuários',
      path: '/management',
      icon: <FaWrench />,
      cName: 'nav-text'
    },
    {
      title: 'Minhas Requisições',
      path: '/myRequests',
      icon: <FaBookReader />,
      cName: 'nav-text'
    },
    {
      title: 'Estatística',
      path: '/statistics',
      icon: <FaChartLine />,
      cName: 'nav-text'
    },
    {
      title: 'Sair',
      path: '/',
      icon: <FaSignOutAlt />,
      cName: 'nav-text'
    }
  ];
// }