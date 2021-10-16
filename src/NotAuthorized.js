import React from 'react';
import './styles/notFound.scss';

function NotFound() {
  return (
    <>
      <div id="not">
        <h1 className="notFound">Error 401 não autorizado!!!</h1>
      <a id="backLogin" href="/">Volte para a página de login</a>
      </div>
      </>
  );
}

export default NotFound;