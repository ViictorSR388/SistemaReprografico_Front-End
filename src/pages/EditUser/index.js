import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useHistory } from 'react-router';

function EditUser() {

  const [image, setImage] = useState({ raw: "", preview: "" });

  const [nameUser, setNameUser] = useState("");

  const [nifUser, setNifUser] = useState("");

  const [emailUser, setEmailUser] = useState("");

  const [cfpUser, setCfpUser] = useState("");

  const [telefoneUser, setTelefoneUser] = useState("");

  const [deptoUser, setDeptoUser] = useState("");

  var id_depto = deptoUser;

  //estrutura de decisão para exibir corretamente o departamento
  if (deptoUser === "1") {
    id_depto = "Aprendizagem Industrial Presencial"
  }
  else if (deptoUser === "2") {
    id_depto = "Graduação Tecnológica Presencial"
  }
  else if (deptoUser === "3") {
    id_depto = "Pós-Graduação Presencial"
  }
  else if (deptoUser === "4") {
    id_depto = "Extensão Presencial"
  }
  else if (deptoUser === "5") {
    id_depto = "Iniciação Profissional Presencial"
  }
  else if (deptoUser === "6") {
    id_depto = "Qualificação Profissional Presencial"
  }
  else if (deptoUser === "7") {
    id_depto = "Aperfeiç./Especializ. Profis. Presencial"
  }

  const handleChange = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  const history = useHistory();

  const handleUpload = (e) => {
    e.preventDefault();
    var departamento;

    //estrutura de decisão para enviar o valor para o back como numero inteiro
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

    const formData = new FormData();
    formData.append("image", image.raw);
    if (nameUser !== "") {
      formData.append("nome", nameUser);
    }
    if (emailUser !== "") {
      formData.append("email", emailUser);
    }
    if (cfpUser !== "") {
      formData.append("cfp", cfpUser);
    }
    if (telefoneUser !== "") {
      formData.append("telefone", telefoneUser);
    }
    if (deptoUser !== "") {
      formData.append("depto", departamento);
    }

    axios
      .put(`http://localhost:3002/meuUsuario`, formData, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((result) => {
        console.log(result);
      });
  };

  useEffect(() => {
    axios.get(`http://localhost:3002/meuUsuario`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((result) => {
        setNameUser(result.data.nome);
        setEmailUser(result.data.email);
        setCfpUser(result.data.cfp);
        setTelefoneUser(result.data.telefone);
        setDeptoUser(result.data.id_depto);
        setImage({ preview: "http://localhost:3002/" + result.data.imagem });
      });
  }, []);

  return (
    <div>
      <div>
        <h2 id="h2">
          Informações pessoais
        </h2>
        <h3>NOME</h3>
        <form onSubmit={handleUpload}></form>
        <input
          className="input-box"
          name="nameUser"
          type="text"
          placeholder={nameUser}
          onChange={(e) => {
            setNameUser(e.target.value);
          }}
        />
        <h3>EMAIL</h3>
        <input
          className="input-box"
          name="emailUser"
          type="email"
          placeholder={emailUser}
          onChange={(e) => {
            setEmailUser(e.target.value);
          }}
        />
        <h3>CFP</h3>
        <input
          className="input-box"
          name="cfpUser"
          type="text"
          placeholder={cfpUser}
          onChange={(e) => {
            setCfpUser(e.target.value);
          }}
        />
        <h3>TELEFONE</h3>
        <input
          className="input-box"
          name="telefoneUser"
          type="text"
          placeholder={telefoneUser}
          onChange={(e) => {
            setTelefoneUser(e.target.value);
          }}
        />
        <h3>IMAGEM</h3>
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
        <h3>DEPARTAMENTO</h3>
        <select
          className="select"
          id="deptoUser"
          name="deptoUser"
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
          <input type="submit" id="btn" value="Enviar"
          />
          <button> Voltar</button>
        </div>
      </div>
    </div>
  );
}

export default EditUser;