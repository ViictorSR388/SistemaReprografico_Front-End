import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios';
import '../../styles/addService.scss';
import LoginContainer from '../../components/loginContainer';

export default function AddService() {

  var history = useHistory();

  var { type, id } = useParams();

  const [descricao, setDescricao] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [custo, setCusto] = useState("");
  const [message, setMessage] = useState();

  const EditService = () => {
    const data = {
      descricao: descricao,
      quantidade: quantidade,
      valor_unitario: custo,
    }
    axios.put(`http://localhost:3002/service/${id}/type=${type}`, data, {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      }
    }).then((result) => {
      console.log(result);
      if (result.data.status === "error") {
        setMessage(result.data.message)
      }
      else {
        setMessage(result.data.message)
        setTimeout(() => {
          history.push("/services")
        }, 1500);
      }
    })
  }

  const voltar = () => {
    axios
      .get("http://localhost:3002/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
        // setAuthState({
      }).then((result) => {
        //   nif: result.data.nif,
        //   nome: result.data.nome,
        //   roles: result.data.roles,
        //   imagem: "http://localhost:3002/" + result.data.imagem,
        //   redirect: false
        // });

        // ativado: 1
        // descricao: "Capa em papel 150g e espirais de plástico"
        // id_servico: 3
        // quantidade: 100
        // valor_unitario: 0.5

        history.push("/services");
      })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    EditService()
  }

  useEffect(() => {
    axios
      .get(`http://localhost:3002/service/${id}/type=${type}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((result) => {
        setDescricao(result.data.descricao)
        setQuantidade(result.data.quantidade)
        setCusto(result.data.valor_unitario)
        console.log(result);
      });
  }, []);

  return (
    <>
      <LoginContainer />
      <div className="finishing">
        <form onSubmit={onSubmit}>
          <h2 id="h2" className="service-subTitle">
            Editar Serviço
          </h2>
          <h2 className="title">{descricao}</h2>
          <input
            className="input-service"
            name="quantidade"
            type="number"
            placeholder={quantidade}
            onChange={(e) => {
              setQuantidade(e.target.value);
            }}
          />
          <input
            className="input-service"
            name="custo"
            type="number"
            step="any"
            placeholder={custo}
            onChange={(e) => {
              setCusto(e.target.value);
            }}
          />
          <h3>{message}</h3>
          <div className="btns-edit-services">
            <input
              type="submit"
              className="nu-send-button"
              id="btn"
              value="Editar"
            />
            <button
              className="btn-back-user"
              id="btn"
              onClick={voltar}>Voltar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}