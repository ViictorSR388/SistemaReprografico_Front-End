import React from 'react';
import './profile.scss';

function Profile(props) {
    return (
      <>
        <div className="profile-div">
          <img className="profile-image" src={props.image} id="profile-image" name="profile-image" alt="imagem de perfil"/>
        </div>
      </>
    );
  }
  
  export default Profile;