import React from 'react';
import '../../styles/review.scss';

import Header from "../../components/header";
import Menu from "../../components/hamburgerButton"
import SideBarColaborador from '../../components/sidebarColaborador';

const review = () => {
    return(

     <div id="global-container">
      
     
       <SideBarColaborador />
       <Header/> 
       <Menu/>

      
      
      
      
       
       
       <div id="main-container">
          


          <div id="review-container">
            <div id="review-title">
              <h3>Avaliação de Reprografia</h3>
            </div>

            <div id="review-content">
             
              <div id="feedback-radio">
                
                <div className="radio">
                  <label for="nao-atendeu">Não Atendeu</label>
                  <input type="radio" name="radio-option" id="nao-atendeu" className="checkbox-avaliacao" value="Não Atendeu"/>
                </div>

                <div className="radio" id="teste">
                  
                  <div id="container-label" >

                    <label for="atendeu">Atendeu Parcialmente</label>
                  </div>
                  <input type="radio" name="radio-option" id="atendeu" className="checkbox-avaliacao" value= "Atendeu"/>
                </div>

                <div className="radio">
                  <label for="superou">Atendeu</label>
                  <input type="radio" name="radio-option" id="superou" className="checkbox-avaliacao" value="Superou"/>
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