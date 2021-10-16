import React from 'react';
import './profile.scss';

function Profile() {
    return (
      <>
        <div className="profile-div">
          <img className="profile-image" src="assets/img/usuario.png" id="profile-image" name="profile-image" alt="imagem de perfil"/>
        </div>
      </>
    );
  }
  
  export default Profile;