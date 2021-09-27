import React from "react";
import "./styles.scss";
import Repo from '../img/repo';


const SideBarColaborador = () => {
    return (
        <div className="sidebar">
            
                <Repo/>
            

            <div className="buttons">
                <button className="button">Solicitar Impressão</button>
                <button className="button">Histórico</button>
            </div>
        </div>
    );
}

export default SideBarColaborador;