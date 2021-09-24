import React from 'react';
import { FaHome } from 'react-icons/fa';
import { FaUserAlt } from 'react-icons/fa';
import { FaSignOutAlt } from 'react-icons/fa';
import { FaTelegram } from 'react-icons/fa';
import { FaBookReader } from 'react-icons/fa';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <FaHome/>,
    cName: 'nav-text'
  },
  {
    title: 'Usuário',
    path: '/user',
    icon: <FaUserAlt />,
    cName: 'nav-text'
  },
  {
    title: 'Solicitar impressão',
    path: '/request',
    icon: <FaTelegram />,
    cName: 'nav-text'
  },
  {
    title: 'Histórico',
    path: '/history',
    icon: <FaBookReader />,
    cName: 'nav-text'
  },
  {
    title: 'Sair',
    path: '/exit',
    icon: <FaSignOutAlt />,
    cName: 'nav-text'
  }
];