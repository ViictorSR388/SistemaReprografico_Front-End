import React from 'react';
import { FaHome } from 'react-icons/fa';
import { FaUserAlt } from 'react-icons/fa';
import { FaSignOutAlt } from 'react-icons/fa';
import { FaTelegram } from 'react-icons/fa';
import { FaBookReader } from 'react-icons/fa';

export const SidebarData = [
  {
    title: 'Home',
    path: '/requestFormC',
    icon: <FaHome />,
    cName: 'nav-text'
  },
  {
    title: 'Usuário',
    path: '/userInfo',
    icon: <FaUserAlt />,
    cName: 'nav-text'
  },
  {
    title: 'Solicitar impressão',
    path: '/requestFormC',
    icon: <FaTelegram />,
    cName: 'nav-text'
  },
  {
    title: 'Sair',
    path: '/',
    icon: <FaSignOutAlt />,
    cName: 'nav-text'
  }
];