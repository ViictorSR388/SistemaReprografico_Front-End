import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useHistory } from "react-router";
import { Form } from 'react-bootstrap';
import ProfileContainer from "../../components/profileContainer";
import Loading from "../../components/loading";
import "../../styles/editUser.scss";

function EditUser() {

  const { nif } = useParams();

  const [image, setImage] = useState({ raw: "", preview: "" });

  const [nameUser, setNameUser] = useState("");

  const [emailUser, setEmailUser] = useState("");

  const [adminUser, setAdminUser] = useState({
    list: []
  });

  const [senhaUser, setSenhaUser] = useState("");

  const [cfpUser, setCfpUser] = useState("");

  const [telefoneUser, setTelefoneUser] = useState("");

  const [deptoUser, setDeptoUser] = useState("0");

  const [admin, setAdmin] = useState(0);

  const [mensagem, setMensagem] = useState("");

  var id_depto = deptoUser;

  const port = process.env.REACT_APP_PORT || 3002;
  
  const reprografia_url = `${process.env.REACT_APP_REPROGRAFIA_URL}:${port}`;

  //estrutura de decisão para exibir corretamente o departamento

  if (deptoUser === "1") {
    id_depto = "Aprendizagem Industrial Presencial";
  } else if (deptoUser === "2") {
    id_depto = "Técnico de Nível Médio Presencial";
  } else if (deptoUser === "3") {
    id_depto = "Graduação Tecnológica Presencial";
  } else if (deptoUser === "4") {
    id_depto = "Pós-Graduação Presencial";
  } else if (deptoUser === "5") {
    id_depto = "Extensão Presencial";
  } else if (deptoUser === "6") {
    id_depto = "Iniciação Profissional Presencial";
  } else if (deptoUser === "7") {
    id_depto = "Qualificação Profissional Presencial";
  } else if (deptoUser === "8") {
    id_depto = "Aperfeiç./Especializ. Profis. Presencial";
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

    if (deptoUser === "0") {
      departamento = "0";
    } else if (deptoUser === "1") {
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

    if (departamento === undefined) {
      departamento = "0"
    }

    const formData = new FormData();
    formData.append("image", image.raw);
    if (nameUser !== "") {
      formData.append("nome", nameUser);
    }
    if (emailUser !== "") {
      formData.append("email", emailUser);
    }
    if (senhaUser !== "") {
      formData.append("senha", senhaUser);
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
    formData.append("admin", admin);


    axios
      .put(`${reprografia_url}/user/` + nif, formData, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((result) => {
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
  };

  useEffect(() => {
    axios
      .get(`${reprografia_url}/user/` + nif, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((result) => {
        console.log(result);
        setAdminUser({
          list: result.data.roles
        });
        setNameUser(result.data.nome);
        setEmailUser(result.data.email);
        setCfpUser(result.data.cfp);
        setTelefoneUser(result.data.telefone);
        setDeptoUser(result.data.id_depto);
        setImage({ preview: `${reprografia_url}/` + result.data.imagem });
      });
  }, []);

  var [loading, setLoading] = useState(Loading);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1300);
  }, []);

  return (
    <div className="content">
      {loading ? <> <Loading /> </> :
        <>
          <ProfileContainer
            title="Exemplo do perfil do usuário"
            image={image.preview}
            name={nameUser}
            nif={nif}
          />
          <div className="container-editUser">
            <h2 className="ui-subTitle">Informações pessoais</h2>
            <h3 className="input-title">NOME</h3>
            <form onSubmit={handleUpload}>
              <input
                className="input-box"
                name="nameUser"
                type="text"
                placeholder={nameUser}
                onChange={(e) => {
                  setNameUser(e.target.value);
                }}
              />
              <h3 className="input-title">EMAIL</h3>
              <input
                className="input-box"
                name="emailUser"
                type="email"
                placeholder={emailUser}
                onChange={(e) => {
                  setEmailUser(e.target.value);
                }}
              />
              <h3 className="input-title">SENHA</h3>
              <input
                className="input-box"
                name="senhaUser"
                type="password"
                placeholder="Insira a Nova Senha"
                onChange={(e) => {
                  setSenhaUser(e.target.value);
                }}
              />
              <h3 className="input-title">CFP</h3>
              <input
                className="input-box"
                name="cfpUser"
                type="text"
                placeholder={cfpUser}
                onChange={(e) => {
                  setCfpUser(e.target.value);
                }}
              />
              <h3 className="input-title">TELEFONE</h3>
              <input
                className="input-box"
                name="telefoneUser"
                type="text"
                placeholder={telefoneUser}
                onChange={(e) => {
                  setTelefoneUser(e.target.value);
                }}
              />
              <h3 className="input-title">IMAGEM</h3>
              <label className="customize">
                <input
                  className="input-box"
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
                defaultValue="0"
                onChange={(e) => {
                  setDeptoUser(e.target.value);
                }}
              >
                <option value="0" name="null" id="null">
                  Nenhuma Opção Selecionada
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

              {adminUser.list.map((data) => (
                <>
                  {data.descricao === "user" ?
                    <>
                      <Form.Check
                        className="radioOpcoes"
                        type="radio"
                        name="admin"
                        id="admin"
                        checked={admin === "1"}
                        onChange={() => {
                          setAdmin("1")
                          console.log(admin)
                        }}
                      />
                      <h2 className="opcoes">Alterar para usuário administrador?</h2>
                    </>
                    :
                    <>
                      <Form.Check
                        className="radioOpcoes"
                        type="radio"
                        name="admin"
                        id="admin2"
                        checked={admin === "0"}
                        onChange={() => {
                          setAdmin("0")
                          console.log(admin)
                        }}
                      />
                      <h2 className="opcoes">Alterar para usuário comum?</h2>
                    </>
                  }
                </>
              ))}
              <h4 className="mensagem-edit">{mensagem}</h4>
              <div className="btns">
                <input
                  type="submit"
                  className="nu-send-button"
                  id="btn"
                  value="Enviar"
                />
                <button
                  className="btn-back-user"
                  onClick={() => history.push("/management")}
                >
                  Voltar
                </button>
              </div>
            </form>
          </div>
        </>
      }
    </div >
  );
}

export default EditUser;
