import React from 'react';
import './profile.scss';
import { useHistory } from 'react-router';


function Profile(props) {
  const history = useHistory();

    return (
      <>
        <div onClick = {() => {history.push(`/user/${props.nif}`)}}   className="profile-div">
          <img className="profile-image" src={props.image} id="profile-image" name="profile-image" alt="imagem de perfil"/>
        </div>
      </>
    );
  }
  
  export default Profile;