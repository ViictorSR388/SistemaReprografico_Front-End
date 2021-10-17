import React, { useState } from 'react';
import '../../styles/userInfo.scss';
import axios from 'axios';

import ProfileContainer from '../../components/profileContainer';

function UserInfo() {
  //nome
  const [nameUser, setNameUser] = useState('');
  //email
  const [emailUser, setEmailUser] = useState('');
  //senha
  const [senhaUser, setSenhaUser] = useState('');
  //nif
  const [nifUser, setNifUser] = useState('');
  //cfp
  const [cfpUser, setCfpUser] = useState('');
  //telefone
  const [telefoneUser, setTelefoneUser] = useState('');
  //imagem
  const [imageSelected, setImageSelected] = useState('');
  //departamento
  const [deptoUser, setDeptoUser] = useState('');

  var departamento;

  if (deptoUser === 'AIP') {
    departamento = 1;
  } else if (deptoUser === 'GTP') {
    departamento = 2;
  } else if (deptoUser === 'PGP') {
    departamento = 3;
  } else if (deptoUser === 'EP') {
    departamento = 4;
  } else if (deptoUser === 'IPP') {
    departamento = 5;
  } else if (deptoUser === 'QPP') {
    departamento = 6;
  } else if (deptoUser === 'AEPP') {
    departamento = 7;
  }

  //Sugerir esta forma e mostrar para o back
  const uploadImage = () => {
    const formData = new FormData();
    formData.append('file', imageSelected);

    axios.put('http://localhost:3002/user/:nif', formData).then((response) => {
      console.log(response);
    });
  };
  
  const UpdateUserPost = () => {
    const data = [
      {
        nome: nameUser,

        email: emailUser,

        senha: senhaUser,

        nif: nifUser,

        cfp: cfpUser,

        telefone: telefoneUser,

        depto: departamento,

        image: imageSelected,
      }
    ];
    const userNif = new Map();
    for (const datas of data) {
      const { nifUser } = datas;
      userNif.set(nifUser, { ...datas });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    UpdateUserPost();
  };

  return (
    <div className="content">
      <ProfileContainer />
      <div className="container">
        <h2 id="h2" className="ui-subTitle">
          Informações pessoais
        </h2>
        <form onSubmit={onSubmit}>
          <input
            className="input-box"
            name="nameUser"
            type="text"
            placeholder="Nome"
            required
            onChange={(e) => {
              setNameUser(e.target.value);
            }}
          />
          <input
            className="input-box"
            name="emailUser"
            type="email"
            placeholder="E-mail"
            required
            onChange={(e) => {
              setEmailUser(e.target.value);
            }}
          />
          <input
            className="input-box"
            name="senhaUser"
            type="password"
            placeholder="Senha"
            required
            onChange={(e) => {
              setSenhaUser(e.target.value);
            }}
          />
          <input
            className="input-box"
            name="nifUser"
            type="text"
            placeholder="NIF"
            required
            onChange={(e) => {
              setNifUser(e.target.value);
            }}
          />
          <input
            className="input-box"
            name="cfpUser"
            type="text"
            placeholder="CFP"
            required
            onChange={(e) => {
              setCfpUser(e.target.value);
            }}
          />
          <input
            className="input-box"
            name="telefoneUser"
            type="text"
            placeholder="Telefone"
            required
            onChange={(e) => {
              setTelefoneUser(e.target.value);
            }}
          />
          <h3 className="departamento">DEPARTAMENTO</h3>
          <select
            className="select"
            id="deptoUser"
            name="deptoUser"
            required
            onChange={(e) => {
              setDeptoUser(e.target.value);
            }}
          >
            <option value="AIP" name="AIP" id="AIP">
              Aprendizagem Industrial Presencial
            </option>
            <option value="GTP" name="GTP" id="GTP">
              Graduação Tecnológica Presencial
            </option>
            <option value="PGP" name="PGP" id="PGP">
              Pós-Graduação Presencial
            </option>
            <option value="EP" name="EP" id="EP">
              Extensão Presencial
            </option>
            <option value="IPP" name="IPP" id="IPP">
              Iniciação Profissional Presencial
            </option>
            <option value="QPP" name="QPP" id="QPP">
              Qualificação Profissional Presencial
            </option>
            <option value="AEPP" name="AEPP" id="AEPP">
              Aperfeiç./Especializ. Profis. Presencial
            </option>
          </select>

          {/* <input 
            type="file" 
            className="changeButton" 
            id="btn" 
            value="Alterar imagem"
            onChange={(e) => {
              setImageSelected(e.target.files[0]);
            }}             
          /> */}

          <button onClick={uploadImage}>Upload Image</button>

          <div className="btns">
            <input
              type="submit"
              className="nu-button"
              id="btn"
              value="Enviar"
            />
            <input
              type="submit"
              className="nu-button"
              id="btn"
              value="Voltar"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserInfo;
