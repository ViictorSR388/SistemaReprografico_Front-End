import React from 'react';
import './styles.scss';
import { useHistory } from 'react-router';
import Profile from "../img/profile"

function ProfileContainer(props) {

    var history = useHistory();

    return (
        <div className="left-container" >
            <div className="icon-container" >
                <div className="profile-div">
                <Profile image={props.image} />                
                </div>
            </div>
            <h2 className="subTitle" onClick={() => {history.push("/userInfo")}}>{props.name}</h2>
            <div className="profile-links" >
                {props.requestsNoInfo ? <></>: 
                <> 
                <button className="button-edit" onClick={() => { history.push("/myRequests") }}>
                    Meus Pedidos
                </button>
                </>
                }
                <button className="button-edit" onClick={props.changePassword}>
                    Alterar Senha
                </button>
            </div>
        </div>

    );
}

export default ProfileContainer;