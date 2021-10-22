import React from 'react';
import './styles.scss';
import Profile from '../img/profile.js';
import { useHistory } from 'react-router';

function ProfileContainer(props) {


    var history = useHistory();

    return (
        <div className="left-container" >
            <div className="icon-container" >
                {/* <Profile /> */}
                <div className="profile-div">
                    <img className="profile-image" src={props.source} id="profile-image" name="profile-image" alt="imagem de perfil" />
                </div>

            </div>
            <h2 className="subTitle">{props.name}</h2>
            <div>
                <button onClick={() => { history.push("/myRequests") }}>
                    <h2>Meus Pedidos</h2>
                </button>
            </div>
                <button>
                    <h2 onClick={props.changePassword}>Alterar Senha</h2>
                </button>
        </div>

    );
}

export default ProfileContainer;