import React from 'react';
import './styles.scss';



const LoginContainer = () => {
    return (
        <>
            <div className="left-container-login" >
                <div className="icon-container" >
                    <img className="iconImg" src="../../assets/img/repo.png" alt="Ícone de uma impressora" title="icon" />
                </div>
                <h2 className="subTitle">Sistema Reprográfico</h2>
                <img className="senaiLogo" src="../../assets/img/logo.jpg" alt="Logo do SENAI" title="logo" />
            </div>
            <div className="turma">
                <h2>Esse projeto foi desenvolvido pela turma 3DM - 2021</h2>
            </div>
        </>
    );
}

export default LoginContainer;
