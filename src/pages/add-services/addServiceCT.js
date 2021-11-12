import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import '../../styles/addService.scss';
import LoginContainer from '../../components/loginContainer';

export default function CopiaTamanho() {

  var history = useHistory();

  const [descricao, setDescricao] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [custo, setCusto] = useState("");

  const AddService = () => {
    const data = {
      descricao: descricao,
      quantidade: quantidade,
      valor_unitario: custo,
    }
    axios.post('http://localhost:3002/service/type=ct/', data, {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      }
    }).then((result) => {
      console.log(result);
    })
  }

  const voltar = () => {
    axios
      .get("http://localhost:3002/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((result) => {
        history.push("/services");
      })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    AddService();
  }
  return (
    <>
      <LoginContainer />
      <div className="finishing">
        <form onSubmit={onSubmit}>
          <h2 id="h2" className="service-subTitle">
            Adicionar Serviço
          </h2>
          <input
            className="input-service"
            name="descricao"
            type="text"
            placeholder="descrição de copia e tamanho"
            required
            onChange={(e) => {
              setDescricao(e.target.value);
            }}
          />
          <input
            className="input-service"
            name="quantidade"
            type="number"
            placeholder="quantidade do serviço"
            required
            onChange={(e) => {
              setQuantidade(e.target.value);
            }}
          />
          <input
            className="input-service"
            name="custo"
            type="number"
            placeholder="custo unitário do serviço"
            required
            onChange={(e) => {
              setCusto(e.target.value);
            }}
          />
            <input
              type="submit"
              className="nu-send-button"
              id="btn"
              value="Adicionar"
            />
        </form>
        <button
          className="btn-back-user"
          id="btn"
          onClick={voltar}>Voltar</button>
      </div>
    </>
  );
}