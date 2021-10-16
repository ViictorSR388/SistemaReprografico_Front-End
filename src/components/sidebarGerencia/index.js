import React from "react";
import "./styles.scss";

import Repo from '../img/repo'

function SideBarGerencia () {
    return(
        <div className="sidebarG">
             <Repo />
            <div className="buttonsG">
                <button className="buttonG">Solicitar Impressão</button>
                <button className="buttonG">Gerencia de usuários</button>
                <button className="buttonG">Histórico</button>
                <button className="buttonG">Estatística</button>
            </div>
        </div>
    );
}

export default SideBarGerencia;