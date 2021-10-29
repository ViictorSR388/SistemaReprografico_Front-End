import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import '../../styles/newUser.scss';
import Header from '../../components/header';
import Menu from '../../components/hamburgerButton';
import SideBar from '../../components/formSideBar';

// import NewUserContainer from '../../components/newUserContainer';

function NewUser(props) {
  var history = useHistory();

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
  //departamento
  const [deptoUser, setDeptoUser] = useState('');

  var departamento;

  if (deptoUser === "1") {
    departamento = 1;
  } else if (deptoUser === "2") {
    departamento = 2;
  } else if (deptoUser === "3") {
    departamento = 3;
  } else if (deptoUser === "4") {
    departamento = 4;
  } else if (deptoUser === "5") {
    departamento = 5;
  } else if (deptoUser === "6") {
    departamento = 6;
  } else if (deptoUser === "7") {
    departamento = 7;
  }

  //imagem
  const [image, setImage] = useState();

  const handleChange = e => {
    if (e.target.files.length) {
      setImage(
        e.target.files[0]
      );
    }
  }

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("nome", nameUser);
    formData.append("email", emailUser);
    formData.append("senha", senhaUser);
    formData.append("nif", nifUser);
    formData.append("cfp", cfpUser);
    formData.append("telefone", telefoneUser);
    formData.append("depto", departamento);

    axios.post('http://localhost:3002/registrar', formData, {
      headers: {
        accessToken: localStorage.getItem("accessToken")
      }
    }).then((result) => {
      console.log(result)
    })
  };

  // const CreateUserPost = () => {
  //   const data = {
  //     nome: nameUser,

  //     email: emailUser,

  //     senha: senhaUser,

  //     nif: nifUser,

  //     cfp: cfpUser,

  //     telefone: telefoneUser,

  //     depto:  departamento,
  //   }
  //   axios.post('http://localhost:3002/registrar', data, {
  //     headers: {
  //       accessToken: localStorage.getItem("accessToken"),        
  //     }
  //   }).then((result) => {
  //     console.log(result);
  //   })
  // }

  const onSubmit = (e) => {
    e.preventDefault();
    handleUpload();
    // CreateUserPost();
  }

  return (
    <div className="content">

      <Menu />
      <Header />
      <SideBar image={props.image} name={props.name} admin={true}/>

      <div className="container">
        <h2 id="h2" className="nu-subTitle">
          Criar novo usuário
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
          <label className="customize">
            <input
              type="file"
              name="image"
              onChange={handleChange}
              accept="image/*"
            />
            Upload
          </label>
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
            <option value="0" name="nothing" id="nothing">
              Nenhuma Selecionada
            </option>
            <option value="1" name="AIP" id="AIP">
              Aprendizagem Industrial Presencial
            </option>
            <option value="2" name="GTP" id="GTP">
              Graduação Tecnológica Presencial
            </option>
            <option value="3" name="PGP" id="PGP">
              Pós-Graduação Presencial
            </option>
            <option value="4" name="EP" id="EP">
              Extensão Presencial
            </option>
            <option value="5" name="IPP" id="IPP">
              Iniciação Profissional Presencial
            </option>
            <option value="6" name="QPP" id="QPP">
              Qualificação Profissional Presencial
            </option>
            <option value="7" name="AEPP" id="AEPP">
              Aperfeiç./Especializ. Profis. Presencial
            </option>
          </select>
          <div className="btns">
            <input
              type="submit"
              className="nu-button"
              id="btn"
              value="Enviar"
            />
            <input
              className="nu-button"
              id="btn"
              value="Voltar"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewUser;