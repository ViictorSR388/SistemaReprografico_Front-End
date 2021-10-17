import React, {useEffect, useContext} from 'react';
import '../../styles/statistics.scss';
import { Pie, Bar, Doughnut } from "react-chartjs-2";
import { AuthContext } from './../../helpers/AuthContext';
import { useHistory } from 'react-router-dom'
import axios from 'axios';

import Header from "../../components/header";
import SideBarGerencia from "../../components/sidebarGerencia";
import MenuG from "../../components/hamburgerButtonG";

const Statistics = () => {
  const { setAuthState } = useContext(AuthContext);
  var history = useHistory()
  
  useEffect(() => {
    axios
      .get("http://localhost:3002/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.status == 500 || response.data.error) {
          setAuthState({ status: false });
          history.push('./')
        }
        else {
          setAuthState({
            nif: response.data.nif,
            email: response.data.email,
            nome: response.data.nome,
            imagem: "http://localhost:3002/" + response.data.imagem,
            roles: response.data.roles,
            status: true
          });
          var resposta = response.data.roles.includes("3_ROLE_ADMIN");
          if (resposta == false) {
            setAuthState({ status: false });
            history.push('./notAuthorized')
        }
      }
    })
  }, []);

  return (
    <>
      <MenuG />
      <Header />
      <SideBarGerencia />
      
      <div className="statistics-container">
        <div className="statistics-title">
          <h1>Estatísticas Gerais</h1>
        </div>

        <div className="statistics">
          <section className="line1">
            <div className="cards">
              <h4 className="statics-subtitle" >Total de cópias mensais</h4>
              <BarChart />
            </div>
            <div className="cards">
              <h4 className="statics-subtitle" >Cores</h4>
              <PieChart />
            </div>
            <div className="cards">
              <h4 className="statics-subtitle" >Custos</h4>
              <BarChart2 />
            </div>
          </section>

          <section className="line2">
            <div className="cards2">
            <h4 className="statics-subtitle" >Cópias e encadernações</h4>
              <PieChart2 />
            </div>
            <div className="cards2">
              <h4 className="statics-subtitle" >Departamentos que mais solicitam</h4>
              <DoughnutChart />
            </div>
            <div className="cards2">
              <h4 className="statics-subtitle" >Cursos que mais solicitam</h4>
              <PieChart3 />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

const BarChart = () => {
  const state = {
    labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
    datasets: [{
      label: 'Cópias Mensais',
      data: [65, 59, 80, 81, 56, 55, 40, 38, 30, 21, 14, 2],
      backgroundColor: [
        'rgba(6, 90, 158, 0.527)'
      ],
      borderColor: [
        'rgba(11, 67, 112, 0.527)'
      ],
      borderWidth: 1,
    }],
  }
  return (
    <div>
      <Bar data={state} id="monthly-copys" width="210" height="105" />
    </div>
  );
}

const PieChart = () => {
  const state = {
    labels: ['Cópias Coloridas', 'Cópias P&B'],
    datasets: [{
      data: [20, 80],
      backgroundColor: [
        'rgba(213, 81, 253, 0.822)',
        'rgba(181, 72, 214, 0.904)'
      ],
      borderColor: [
        'rgba(141, 141, 141, 0.562)'
      ],
      hoverOffset: 4,
    }]
  }
  return (
    <div>
      <Pie data={state} id="pages-colors" width="180" height="105" />
    </div>
  );
}

const BarChart2 = () => {
  const state = {
    labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
    datasets: [{
      label: 'Total de Custos',
      data: [43, 71, 80, 14, 26, 55, 40, 38, 18, 21, 38, 20],
      backgroundColor: [
        'rgba(3, 194, 153, 0.541)'
      ],
      borderColor: [
        'rgba(9, 194, 103, 0.999)'
      ],
      borderWidth: 1,
    }]
  }
  return (
    <div>
      <Bar data={state} id="total-cost" width="210" height="105" />
    </div>
  );
}

const PieChart2 = () => {
  const state = {
    labels: ['Cópias', 'Encadernações'],
    datasets: [{
      data: [60, 40],
      backgroundColor: [
        'rgba(236, 217, 39, 0.986)',
        'rgba(231, 178, 33, 0.986)'
      ],
      borderColor: [
        'rgba(141, 141, 141, 0.562)'
      ],
      hoverOffset: 4,
    }]
  }
  return (
    <div>
      <Pie data={state} id="copy-binding" width="180" height="105" />
    </div>
  );
}

const DoughnutChart = () => {
  const state = {
    labels: [
      'Informática', 'Mecânica', 'Redes'
    ],
    datasets: [{
      data: [300, 200, 500],
      backgroundColor: [
        'rgba(241, 94, 26, 0.733)',
        'rgba(240, 150, 108, 0.829)',
        'rgba(207, 107, 61, 0.829)'
      ],
      borderColor: [
        'rgba(141, 141, 141, 0.562)'
      ],
      hoverOffset: 4
    }],
  }
  return (
    <div>
      <Doughnut data={state} id="department-request" width="150" height="105" />
    </div>
  );
}

const PieChart3 = () => {
  const state = {
    labels: ['CAI', 'CT', 'FC', 'CST'],
    datasets: [{
      data: [30, 20, 30, 40],
      backgroundColor: [
        'rgba(245, 45, 128, 0.986)',
        'rgba(253, 38, 164, 0.986)',
        'rgba(247, 77, 176, 0.986)',
        'rgba(255, 136, 205, 0.986)'
      ],
      borderColor: [
        'rgba(141, 141, 141, 0.562)'
      ],
      hoverOffset: 4,
    }]
  }
  return (
    <div>
      <Pie data={state} id="course-request" width="180" height="105" />
    </div>
  );
}

export default Statistics;