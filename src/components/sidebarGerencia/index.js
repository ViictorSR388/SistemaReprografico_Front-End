import React from "react";
import "./styles.scss";
import { useHistory } from 'react-router';

import Repo from '../img/repo'

function SideBarGerencia() {

    const history = useHistory();

    const routeFormG = () => {
        history.push("/requestFormG");
    }

    const routeManagement = () => {
        history.push("/management");
    }

    const routeHistory = () => {
        history.push("/historyAdmin");
    }

    const routeStatistics = () => {
        history.push("/statistics");
    }

    return (
        <div className="sidebarG">
            <Repo />
            <div className="buttonsG">
                <button className="buttonG" onClick={routeFormG}>Solicitar Impressão</button>
                <button className="buttonG" onClick={routeManagement}>Gerencia de usuários</button>
                <button className="buttonG" onClick={routeHistory}>Histórico</button>
                <button className="buttonG" onClick={routeStatistics}>Estatística</button>
            </div>
        </div>
    );
}

export default SideBarGerencia;