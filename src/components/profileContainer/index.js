import React from 'react';
import './styles.scss';
import Profile from '../img/profile.js';
import { useHistory } from 'react-router';
import { Button } from 'react-bootstrap';

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
            <div className="profile-btns" >
                <Button className="profile-btn" variant="secondary" size="lg" onClick={() => { history.push("/myRequests") }}>
                    Meus Pedidos
                </Button>
                <Button className="profile-btn" variant="secondary" size="lg" onClick={props.changePassword}>
                    Alterar Senha
                </Button>
            </div>
        </div>

    );
}

export default ProfileContainer;