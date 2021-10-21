import React, { useState } from 'react';
import '../../styles/userInfo.scss';
import axios from "axios";

import ProfileContainer from '../../components/profileContainer'

function UserInfo() {
  
  const [image, setImage] = useState();

  const [nameUser, setNameUser] = useState("");

  const [emailUser, setEmailUser] = useState("");

  const [cfpUser, setCfpUser] = useState("");

  const [telefoneUser, setTelefoneUser] = useState("");

  const [deptoUser, setDeptoUser] = useState("");

  const handleChange = e => {
    if (e.target.files.length) {
      setImage(
        e.target.files[0]
      );
    }
  }

    const handleUpload = async e => { 
      e.preventDefault();
      const formData = new FormData();
      formData.append("image", image);
      if (nameUser !== "") { formData.append("nome", nameUser) }
      if (emailUser !== "") { formData.append("email", emailUser); }
      if (cfpUser !== "") { formData.append("cfp", cfpUser); }
      if (telefoneUser !== "") { formData.append("telefone", telefoneUser); }
      if (deptoUser !== "") { formData.append("depto", deptoUser); }

      axios.put("http://localhost:3002/meuUsuario", formData, {
        headers: {
          accessToken: localStorage.getItem("accessToken")
        }
      }).then((result) => {
        console.log(result)
      })
    };

    return (
      <div className="content">
        <ProfileContainer />
        <div className="container">
          <h2 id="h2" className="ui-subTitle">Informações pessoais</h2>
          <form onSubmit={handleUpload}>
            <input
              className="input-box"
              name="nameUser"
              type="text"
              placeholder="Nome"
              onChange={(e) => {
                setNameUser(e.target.value);
              }}
            />
            <input
              className="input-box"
              name="emailUser"
              type="email"
              placeholder="Email"
              onChange={(e) => {
                setEmailUser(e.target.value);
              }}
            />
            <input
              className="input-box"
              name="cfpUser"
              type="text"
              placeholder="CFP"
              onChange={(e) => {
                setCfpUser(e.target.value);
              }}
            />
            <input
              className="input-box"
              name="telefoneUser"
              type="text"
              placeholder="Telefone"
              onChange={(e) => {
                setTelefoneUser(e.target.value);
              }}
            />
            <input type="file" name="image" onChange={handleChange} accept="image/*" />
            <h3 className="departamento">DEPARTAMENTO</h3>
            <select
              className="select"
              id="deptoUser"
              name="deptoUser"
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