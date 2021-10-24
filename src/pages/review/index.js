import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import '../../styles/review.scss';
import Header from '../../components/header';
import Menu from '../../components/hamburgerButton';
import SideBarColaborador from '../../components/sidebarColaborador';
import axios from 'axios';

function Review() {

  var { id } = useParams();

  var [feedBack, setFeedBack] = useState();

  var [atendInput, setAtendInput] = useState();
  
  var [mensagem, setMensagem] = useState();

  const avaliaPost = (e) => {
    e.preventDefault();

    axios.put("http://localhost:3002/avaliacao/" + id, {avaliacao_obs: feedBack, id_avaliacao_pedido: atendInput}, {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    }).then((result) => {
      if(result.data.error){
        setMensagem(result.data.error)
      }
      else{
        setMensagem(result.data.message)
      }
    })
  }

  return (
    <>
      <Menu />
      <Header />
      <SideBarColaborador />
     
      <div id="main-container">
        
        <form id="review-container" onSubmit={avaliaPost}>
          <div id="review-title">
            <h3>Avaliação de Reprografia</h3>
          </div>
 
          <div id="review-content">
            <div id="feedback-radio">
              <div className="radio">
                <label htmlFor="nao-atendeu">Atendeu</label>
                <input
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
                <label htmlFor="superou">Não Atendeu</label>
                <input
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
