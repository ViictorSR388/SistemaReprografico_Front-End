import React from 'react';
import './repo.scss';
import { useHistory } from 'react-router';

function Repo(props) {

  const history = useHistory();
  
  return (
    <>
      <div onClick = {() => {history.push(`/user/${props.nif}`)}} className="circle">
        <img src={props.image} className="repo" alt="imagem do usuário" />
      </div>
    </>
  );
}

export default Repo;