import React from 'react';
import '../../styles/review.scss';

import Header from "../../components/header";
import SideBar from "../../components/sidebar";

const review = () => {
    return(

     <div id="global-container">
      
         <Header/>
       

       <div id="main-container">
          

          <SideBar/>

          <div id="review-container">
            <div id="review-title">
              <h3>Avaliação de Reprografia</h3>
            </div>

            <div id="review-content">
              <div id="feedback-checkbox">
                
                <div className="checkbox">
                  <label for="nao-atendeu">Não Atendeu</label>
                  <input type="checkbox" name="nao-atendeu" id="nao-atendeu" className="checkbox-avaliacao"/>
                </div>

                <div className="checkbox">
                  <label for="atendeu">Atendeu</label>
                  <input type="checkbox" name="atendeu" id="atendeu" className="checkbox-avaliacao"/>
                </div>

                <div className="checkbox">
                  <label for="superou">Superou</label>
                  <input type="checkbox" name="superou" id="superou" className="checkbox-avaliacao"/>
                </div>

              </div>

              <div id="feedback-text">
                <textarea placeholder=" digite seu feedback"></textarea>
              </div>
                
            </div>
            <div id="button-review">

              <button id="review-button"> Enviar Avaliação</button>
            </div>
          </div>
       </div>
     </div>
 
    );
}

export default review;