import React from "react";
import "./styles.scss";


const SideBarGerencia = () => {
    return(
        <div className="sidebar">
            <div className="circle">
                <img className="repo" src="assets/img/repo.png"></img>
            </div>

            <div className="buttons">
                <button className="button">Solicitar Impressão</button>
                <button className="button">Gerencia de usuários</button>
                <button className="button">Histórico</button>
                <button className="button">Estatística</button>
            </div>
        </div>
    );
}

export default SideBarGerencia;