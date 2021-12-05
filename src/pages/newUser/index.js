import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "../../styles/newUser.scss";
import { Form } from 'react-bootstrap';
import ProfileContainer from "../../components/profileContainer";
import { FaCloudUploadAlt } from "react-icons/fa";

function NewUser(props) {
  var history = useHistory();

  //nome
  const [nameUser, setNameUser] = useState("Nome do usuário");
  //email
  const [emailUser, setEmailUser] = useState("");
  //nif
  const [nifUser, setNifUser] = useState("");
  //cfp
  const [cfpUser, setCfpUser] = useState("");
  //telefone
  const [telefoneUser, setTelefoneUser] = useState("");
  //departamento
  const [deptoUser, setDeptoUser] = useState("");

  const [admin, setAdmin] = useState(0);

  const [mensagem, setMensagem] = useState("");

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
  } else if (deptoUser === "8") {
    departamento = 8;
  }

  //imagem
  const [image, setImage] = useState({
    raw: "",
    preview: "http://localhost:3002/src/uploads/user-img/default/usuario.png",
  });

  const handleChange = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("image", image.raw);
    formData.append("nome", nameUser);
    formData.append("email", emailUser);
    formData.append("nif", nifUser);
    formData.append("cfp", cfpUser);
    formData.append("telefone", telefoneUser);
    formData.append("depto", departamento);
    formData.append("admin", admin);

    if (departamento === undefined || departamento === 0) {
      setMensagem("Por favor selecione um departamento!");
    } else {
      axios
        .post("http://localhost:3002/newUser", formData, {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        })
        .then((result) => {
          if(result.data.status === "error"){
            setMensagem(result.data.message);
          }
          else{
            setMensagem(result.data.message);
            setTimeout(() => {
              history.push("/management");
            }, 1500);
          }
        });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleUpload();
  };

  return (
    <div className="content">
      <ProfileContainer
        newUser={true}
        title="Exemplo do perfil do usuário"
        image={image.preview}
        name={nameUser}
        requestsNoInfo={true}
        nif={props.nif}
      />
      <div className="container-newUser">
        <h2 id="h2" className="nu-subTitle">
          Criar novo usuário
        </h2>
        <form onSubmit={onSubmit}>
          <h4>Onde houver "*" o preenchimento é obrigatório</h4>
          <input
            className="input-box"
            name="nameUser"
            type="text"
            placeholder="Nome*"
            required
            onChange={(e) => {
              setNameUser(e.target.value);
            }}
          />
          <input
            className="input-box"
            name="emailUser"
            type="email"
            placeholder="E-mail*"
            required
            onChange={(e) => {
              setEmailUser(e.target.value);
            }}
          />
          <input
            className="input-box"
            name="nifUser"
            type="text"
            placeholder="NIF*"
            required
            onChange={(e) => {
              setNifUser(e.target.value);
            }}
          />
          <input
            className="input-box"
            name="cfpUser"
            type="text"
            placeholder="CFP*"
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
            re
            onChange={(e) => {
              setTelefoneUser(e.target.value);
            }}
          />
          <div className="radio-typeUser">
            <Form.Check
              className="classRadio"
              type="radio"
              name="admin"
              id="admin"
              checked={admin === 1}
              value="1"
              onChange={() => {
                setAdmin(1);
              }}
            ></Form.Check>
            <Form.Check.Label>
              Criar como administrador?
            </Form.Check.Label>
          </div>

          <div className="radio-typeUser">
            <Form.Check
              className="classRadio"
              type="radio"
              name="user"
              id="user"
              checked={admin === 0}
              value="0"
              onChange={() => {
                setAdmin(0);
              }}
            ></Form.Check>
            <Form.Check.Label>
              Criar como usuário comum?
            </Form.Check.Label>
          </div>

          <label className="customize">
            <input
              type="file"
              name="image"
              onChange={handleChange}
              accept="image/*"
            />
            <FaCloudUploadAlt className="uploud" />
            Upload
          </label>
          <h3 className="input-title">DEPARTAMENTO</h3>
          <select
            className="select"
            id="deptoUser"
            name="deptoUser"
            required
            onChange={(e) => {
              setDeptoUser(e.target.value);
            }}
          >
            <option value="0" name="null" id="null">
              Nenhuma Opção Selecionada*
            </option>
            <option value="1" name="AIP" id="AIP">
              Aprendizagem Industrial Presencial
            </option>
            <option value="2" name="TNMP" id="TNMP">
              Técnico de Nível Médio Presencial
            </option>
            <option value="3" name="GTP" id="GTP">
              Graduação Tecnológica Presencial
            </option>
            <option value="4" name="PGP" id="PGP">
              Pós-Graduação Presencial
            </option>
            <option value="5" name="EP" id="EP">
              Extensão Presencial
            </option>
            <option value="6" name="IPP" id="IPP">
              Iniciação Profissional Presencial
            </option>
            <option value="7" name="QPP" id="QPP">
              Qualificação Profissional Presencial
            </option>
            <option value="8" name="AEPP" id="AEPP">
              Aperfeiç./Especializ. Profis. Presencial
            </option>
          </select>
          <h4>{mensagem}</h4>
          <div className="btns">
            <input
              type="submit"
              className="nu-send-button"
              id="btn"
              value="Enviar"
            />
            <button className="btn-back-user" id="btn" onClick={() => history.push("/management")}>
              Voltar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewUser;
