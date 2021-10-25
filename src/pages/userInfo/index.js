import React, { useState, useEffect } from "react";
import "../../styles/userInfo.scss";
import axios from "axios";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useHistory } from 'react-router';
import { Button, ButtonGroup, Card, Form } from 'react-bootstrap';
// import { PassContext } from "../../helpers/changePassContext";

import ProfileContainer from "../../components/profileContainer";

function UserInfo() {

  const [image, setImage] = useState({ raw: "", preview: "" });

  const [nif, setNif] = useState("");

  const [nameUser, setNameUser] = useState("");

  const [emailUser, setEmailUser] = useState("");

  const [cfpUser, setCfpUser] = useState("");

  const [telefoneUser, setTelefoneUser] = useState("");

  const [deptoUser, setDeptoUser] = useState("");

  const [edit, setEdit] = useState(false);

  const [changePass, setChangePass] = useState();

  const [pastPassword, setPastPassword] = useState();

  const [newPassword, setNewPassowrd] = useState();

  const [message, setMessage] = useState();

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

  const userPath = () => {
    history.push("/management");
  }

  const routeUserInfo = () => {
    history.goBack();
  }

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
      .put("http://localhost:3002/meuUsuario", formData, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((result) => {
        console.log(result);
      });
  };

  const passwordPost = (e) => {
    e.preventDefault();

    axios.put("http://localhost:3002/mudarSenha", { senhaAntiga: pastPassword, senhaNova: newPassword }, {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    }).then((result) => {
      if(result.data.error){
        setMessage(result.data.error)
      }
      else{
        setMessage(result.data.message)
      }
    })
  }

  useEffect(() => {
    axios
      .get("http://localhost:3002/meuUsuario", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((result) => {
        setNif(result.data.nif)
        setNameUser(result.data.nome);
        setEmailUser(result.data.email);
        setCfpUser(result.data.cfp);
        setTelefoneUser(result.data.telefone);
        setDeptoUser(result.data.id_depto);
        setImage({ preview: "http://localhost:3002/" + result.data.imagem });
      });
  }, []);

  return (
    <div className="content">
      {/* <PassContext.Provider value={{ changePass, setChangePass }}> */}
      <ProfileContainer source={image.preview} name={nameUser} changePassword={() => { setChangePass(true) }} />
      <div className="container">

        {changePass ? <>         <h2 id="h2" className="ui-subTitle">
          Alterar senha
        </h2>
          <form onSubmit={passwordPost}>
            <div>
              <h2 id="h2" className="ui-subTitle">
                Senha antiga
              </h2>
              <input required type="password" className="input-box" placeholder="Insira sua senha antiga"
                onChange={(e) => {
                  setPastPassword(e.target.value);
                }}
              ></input>
            </div>
            <div>
              <h2 id="h2" className="ui-subTitle">
                Nova senha  
              </h2>
              <input required type="password" className="input-box" placeholder="Insira a nova senha"
                onChange={(e) => {
                  setNewPassowrd(e.target.value);
                }}
              ></input>
            </div>
            <button type="submit">Enviar</button>
          </form>
          <button onClick={() => { setChangePass(false) }}>Voltar</button>
          <h4>{message}</h4>
        </> : <>
          <Card.Title id="h2" className="ui-subTitle">
            Informações pessoais
          </Card.Title>
          {edit ? (
            <>
              {" "}
              <Form onSubmit={handleUpload}>
                <Card.Subtitle className="input-title">NOME</Card.Subtitle>
                <Form.Control
                  className="input-box"
                  name="nameUser"
                  type="text"
                  placeholder={nameUser}
                  onChange={(e) => {
                    setNameUser(e.target.value);
                  }}
                />
                <Card.Subtitle className="input-title">EMAIL</Card.Subtitle>
                <Form.Control
                  className="input-box"
                  name="emailUser"
                  type="email"
                  placeholder={emailUser}
                  onChange={(e) => {
                    setEmailUser(e.target.value);
                  }}
                />
                <Card.Subtitle className="input-title">CFP</Card.Subtitle>
                <Form.Control
                  className="input-box"
                  name="cfpUser"
                  type="text"
                  placeholder={cfpUser}
                  onChange={(e) => {
                    setCfpUser(e.target.value);
                  }}
                />
                <Card.Subtitle className="input-title">TELEFONE</Card.Subtitle>
                <Form.Control
                  className="input-box"
                  name="telefoneUser"
                  type="text"
                  placeholder={telefoneUser}
                  onChange={(e) => {
                    setTelefoneUser(e.target.value);
                  }}
                />
                <Card.Subtitle className="input-title">IMAGEM</Card.Subtitle>
                <Form.Text className="customize">
                  <Form.Control
                    type="file"
                    name="image"
                    onChange={handleChange}
                    accept="image/*"
                  />
                  <FaCloudUploadAlt />
                  Uploud
                </Form.Text>
                <Card.Subtitle className="input-title">DEPARTAMENTO</Card.Subtitle>
                <Form.Select
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
                </Form.Select>
                <ButtonGroup className="ui-btns">
                  <Button type="submit" className="btn-edit-user" id="btn" variant="primary" value="Enviar" >Enviar</Button>
                  <Button className="btn-back-user" id="btn" variant="primary" onClick={() => { setEdit(false) }}> Voltar</Button>
                </ButtonGroup>
              </Form>
            </>
          ) : (
            <>
              <Card.Subtitle className="input-title">NIF</Card.Subtitle>
              <Card.Text className="userInformation">{nif}</Card.Text>
              <Card.Subtitle className="input-title">EMAIL</Card.Subtitle>
              <Card.Text className="userInformation">{emailUser}</Card.Text>
              <Card.Subtitle className="input-title">CFP</Card.Subtitle>
              <Card.Text className="userInformation">{cfpUser}</Card.Text>
              <Card.Subtitle className="input-title">TELEFONE</Card.Subtitle>
              <Card.Text className="userInformation">{telefoneUser}</Card.Text>
              <Card.Subtitle className="input-title">DEPARTAMENTO</Card.Subtitle>
              <Card.Text className="userInformation">{id_depto}</Card.Text>
              <ButtonGroup className="ui-btns">
                <Button className="btn-edit-user" id="btn" variant="primary" onClick={() => { setEdit(true) }}> Editar </Button>
                <Button className="btn-back-user" id="btn" variant="primary" onClick={userPath}> Voltar</Button>
              </ButtonGroup>
            </>
          )}</>}

      </div>
      {/* </PassContext.Provider> */}
    </div>
  );
}

export default UserInfo;
