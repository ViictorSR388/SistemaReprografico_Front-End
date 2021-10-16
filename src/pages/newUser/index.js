import React, {useEffect, useContext, useState} from 'react';
import { AuthContext } from './../../helpers/AuthContext';
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import '../../styles/newUser.scss';

import NewUserContainer from '../../components/newUserContainer';

function NewUser () {
  const { setAuthState } = useContext(AuthContext);
  var history = useHistory();

  useEffect(() => {
    axios
      .get("http://localhost:3002/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.status == 500 || response.data.error) {
          setAuthState({ status: false });
          history.push('./')
        }
        else {
          setAuthState({
            nif: response.data.nif,
            email: response.data.email,
            nome: response.data.nome,
            imagem: "http://localhost:3002/" + response.data.imagem,
            roles: response.data.roles,
            status: true
          });
          var resposta = response.data.roles.includes("3_ROLE_ADMIN");
          if (resposta == false) {
            setAuthState({ status: false });
            history.push('./notAuthorized')
        }
      }
    })
  }, []);

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

  const CreateUserPost = () => {
    const data = {
      nome: nameUser,

      email: emailUser,

      senha: senhaUser,

      nif: nifUser,

      cfp: cfpUser,

      telefone: telefoneUser,

      depto:  departamento,
    }
    axios.post('http://localhost:3002/registrar', data, {
      headers: {
        accessToken: localStorage.getItem("accessToken")
      }
    })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    CreateUserPost();
  }

  return (
    <div className="content">
      <NewUserContainer />
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