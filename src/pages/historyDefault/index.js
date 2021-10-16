import React from 'react';
import '../../styles/historyDefault.scss';

import Header from "../../components/header";
import SideBarColaborador from "../../components/sidebarColaborador";
import Menu from "../../components/hamburgerButton";

function HistoryDefault() {
  
  const history = useHistory();

  const routeReview = () => {
    history.push("/review");
  }

  const routeFormDetails = () => {
    history.push("/formDetails");
  }

  return (
    <>
      <Menu />
      <Header />
      <SideBarColaborador />

      <div className="container-history-default">

        <div className="history-default-title">
          <h1>Histórico</h1>
        </div>
        <div className="div-itens-default">
          <div className="history-default-item">
            ID= 1   |  Funcionário  |  Titulo da Reprografia  |  Total: R$50
            <div className="btns-default">
              <button className="btn-review-default" onClick={routeReview}>Avaliar</button>
              <button className="btn-details-default" onClick={routeFormDetails}>Detalhes</button>
            </div>
          </div>
          <div className="history-default-item">
            ID= 1   |  Funcionário  |  Titulo da Reprografia  |  Total: R$50
            <div className="btns-default">
              <button className="btn-review-default" onClick={routeReview}>Avaliar</button>
              <button className="btn-details-default" onClick={routeFormDetails}>Detalhes</button>
            </div>
          </div>
          <div className="history-default-item">
            ID= 1   |  Funcionário  |  Titulo da Reprografia  |  Total: R$50
            <div className="btns-default">
              <button className="btn-review-default" onClick={routeReview}>Avaliar</button>
              <button className="btn-details-default" onClick={routeFormDetails}>Detalhes</button>
            </div>
          </div>
          <div className="history-default-item">
            ID= 1   |  Funcionário  |  Titulo da Reprografia  |  Total: R$50
            <div className="btns-default">
              <button className="btn-review-default" onClick={routeReview}>Avaliar</button>
              <button className="btn-details-default" onClick={routeFormDetails}>Detalhes</button>
            </div>
          </div>
          <div className="history-default-item">
            ID= 1   |  Funcionário  |  Titulo da Reprografia  |  Total: R$50
            <div className="btns-default">
              <button className="btn-review-default" onClick={routeReview}>Avaliar</button>
              <button className="btn-details-default" onClick={routeFormDetails}>Detalhes</button>
            </div>
          </div>
          <div className="history-default-item">
            ID= 1   |  Funcionário  |  Titulo da Reprografia  |  Total: R$50
            <div className="btns-default">
              <button className="btn-review-default" onClick={routeReview}>Avaliar</button>
              <button className="btn-details-default" onClick={routeFormDetails}>Detalhes</button>
            </div>
          </div>
          <div className="history-default-item">
            ID= 1   |  Funcionário  |  Titulo da Reprografia  |  Total: R$50
            <div className="btns-default">
              <button className="btn-review-default" onClick={routeReview}>Avaliar</button>
              <button className="btn-details-default" onClick={routeFormDetails}>Detalhes</button>
            </div>
          </div>
          <div className="history-default-item">
            ID= 1   |  Funcionário  |  Titulo da Reprografia  |  Total: R$50
            <div className="btns-default">
              <button className="btn-review-default" onClick={routeReview}>Avaliar</button>
              <button className="btn-details-default" onClick={routeFormDetails}>Detalhes</button>
            </div>
          </div>
          <div className="history-default-item">
            ID= 1   |  Funcionário  |  Titulo da Reprografia  |  Total: R$50
            <div className="btns-default">
              <button className="btn-review-default" onClick={routeReview}>Avaliar</button>
              <button className="btn-details-default" onClick={routeFormDetails}>Detalhes</button>
            </div>
          </div>
          <div className="history-default-item">
            ID= 1   |  Funcionário  |  Titulo da Reprografia  |  Total: R$50
            <div className="btns-default">
              <button className="btn-review-default" onClick={routeReview}>Avaliar</button>
              <button className="btn-details-default" onClick={routeFormDetails}>Detalhes</button>
            </div>
          </div>
          <div className="history-default-item">
            ID= 1   |  Funcionário  |  Titulo da Reprografia  |  Total: R$50
            <div className="btns-default">
              <button className="btn-review-default" onClick={routeReview}>Avaliar</button>
              <button className="btn-details-default" onClick={routeFormDetails}>Detalhes</button>
            </div>
          </div>
          <div className="history-default-item">
            ID= 1   |  Funcionário  |  Titulo da Reprografia  |  Total: R$50
            <div className="btns-default">
              <button className="btn-review-default" onClick={routeReview}>Avaliar</button>
              <button className="btn-details-default" onClick={routeFormDetails}>Detalhes</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HistoryDefault;