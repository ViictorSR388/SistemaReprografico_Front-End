import React from 'react';
import './styles.scss';
import Profile from '../img/profile.js';

function profileContainer(props) {
    return (
        <div className="left-container" >
            <div className="icon-container" >
                {/* <Profile /> */}

                <div className="profile-div">
                    <img className="profile-image" src={props.source} id="profile-image" name="profile-image" alt="imagem de perfil" />
                </div>
            </div>
            <h2 className="subTitle">Perfil de Usuário</h2>
        </div>
    );
}

export default profileContainer;