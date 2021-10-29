import React from 'react';
import './repo.scss';

function Repo(props) {

  return (
    <>
      <div className="circle">
        <img src={props.image} className="repo" alt="repo" />
      </div>
    </>
  );
}

export default Repo;