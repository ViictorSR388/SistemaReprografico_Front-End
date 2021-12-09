import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import '../../styles/review.scss';
import Header from '../../components/header';
import Menu from '../../components/hamburgerButton';
import SideBar from '../../components/formSideBar';
import { Form } from 'react-bootstrap';
import axios from 'axios';

function Review(props) {

  var history = useHistory();

  var { id } = useParams();

  var [feedBack, setFeedBack] = useState();

  var [atendInput, setAtendInput] = useState();

  var [mensagem, setMensagem] = useState();

  const port = process.env.REACT_APP_PORT || 3002;

  const reprografia_url = `${process.env.REACT_APP_REPROGRAFIA_URL}:${port}`;

  const avaliaPost = (e) => {
    e.preventDefault();

    axios.put(`${reprografia_url}/rating/` + id, { avaliacao_obs: feedBack, id_avaliacao_pedido: atendInput }, {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    }).then((result) => {
      setMensagem(result.data.message)
      if (result.data.status !== "error") {
        //Redireciona para página de meusPedidos em 1,5seg
        setTimeout(() => {
          history.push("/myRequests")
        }, 1500);
      }
    })
  }


  return (
    <>
      <Menu />
      <Header nif={props.nif} />
      <SideBar image={props.image} admin={props.admin} name={props.name} nif={props.nif} />

      <div id="main-container">

        <form id="review-container" onSubmit={avaliaPost}>
          <div id="review-title">
            <h3>Avaliação de Reprografia</h3>
          </div>

          <div id="review-content">
            <div id="feedback-radio">
              <div className="radio">
                <label className="title-review" htmlFor="nao-atendeu">Atendeu</label>
                <Form.Check
                  type="radio"
                  name="radio-option"
                  id="nao-atendeu"
                  className="checkbox-avaliacao"
                  checked={atendInput === 1}
                  onChange={() => {
                    setAtendInput(1)
                  }}
                />
              </div>

              <div className="radio">
                <label className="title-review" htmlFor="superou">Não Atendeu</label>
                <Form.Check
                  type="radio"
                  name="radio-option"
                  id="superou"
                  className="checkbox-avaliacao"
                  checked={atendInput === 2}
                  onChange={() => {
                    setAtendInput(2)
                  }}

                />
              </div>
            </div>

            <div id="feedback-text">
              <textarea placeholder=" digite seu feedback" onChange={(e) => {
                setFeedBack(e.target.value);
              }}></textarea>
            </div>
          </div>
          <div id="button-review">
            <button id="review-button" type="submit"> Enviar Avaliação</button>
          </div>
          <h4>{mensagem}</h4>
        </form>
      </div>
    </>
  );
}

export default Review;
