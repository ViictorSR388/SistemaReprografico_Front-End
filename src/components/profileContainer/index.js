import React from 'react';
import './styles.scss';
import Profile from '../img/profile.js';

const profileContainer = () => {
    return(
        <div className="left-container" >
            <div className="icon-container" >
                <Profile />
            </div>
            <h2 className="subTitle">Perfil de Usuário</h2>
        </div>
    );
}

export default profileContainer;
