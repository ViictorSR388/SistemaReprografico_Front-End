import React, { useState, useEffect } from 'react';
import './repo.scss';
import { useHistory } from 'react-router';
import axios from 'axios';

function Repo(props) {

  // const [name, setName] = useState("");
  const [nif, setNif] = useState("");
  const [image, setImage] = useState("");
  const history = useHistory();


  useEffect(() => {
    axios
      .get("http://localhost:3002/myUser/" + nif, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
        validateStatus: () => true
      }).then((result) => {
        setNif(result.data.nif)
        setImage(result.data.imagem)
      })
  }, [])

  return (
    <>
      <div onClick={() => { history.push(`/user/${nif}`) }} className="circle">
        {console.log(" IMAGEM: " + image)}
        <img src={props.image} className="repo" alt="imagem do usuário" />
      </div>
    </>
  );
}

export default Repo;