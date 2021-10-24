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
            
            
            <h2 className="subTitle" onClick={() => { history.push("/userInfo")}} style={{cursor: "pointer"}}>{props.name}</h2>
            {props.requestsNoInfo ? <></> :
             <>             
            <div>
                <button onClick={() => { history.push("/myRequests") }}>
                    <h2 style={{cursor: "pointer"}}>Meus Pedidos</h2>
                </button>
            </div>
            <div>
            <button>
                <h2 onClick={props.changePassword} style={{cursor: "pointer"}}>{props.title}</h2>
                </button>
            </div> 
            </>}

        </div>

    );
}

export default ProfileContainer;