import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [test, setTest] = useState(0);

  var valor = 0;

  if(test === "1") {
    valor = 1
  }
  else if (test === "2") {
    valor = 2
  }
  else if (test === "3") {
    valor = 3
  }
  else if (test === "4") {
    valor = 4
  }

  const TestPost = () => {
    const data = {
      curso: valor
    };
  axios.post('http://localhost:3002/pedido', data, {
    headers: {
      accessToken:localStorage.getItem("accessToken")
    }
  })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    TestPost();
  }

  return (
    <>
    <form onSubmit={onSubmit}>
      <label>Opção 1</label>
      <input
        className="classRadio"
        type="radio"
        name="test"
        id="test"
        value="1"
        onChange={(e) => {
          const newValue = e.target.value;
          setTest(newValue);
        }}
      />
      <label>Opção 2</label>
      <input
        className="classRadio"
        type="radio"
        name="test"
        id="test"
        value="2"
        onChange={(e) => {
          const newValue = e.target.value;
          setTest(newValue);
        }}
      />
      <label>Opção 3</label>
      <input
        className="classRadio"
        type="radio"
        name="test"
        id="test"
        value="3"
        onChange={(e) => {
          const newValue = e.target.value;
          setTest(newValue);
        }}
      />
      <label>Opção 4</label>
      <input
        className="classRadio"
        type="radio"
        name="test"
        id="test"
        value="4"
        onChange={(e) => {
          const newValue = e.target.value;
          setTest(newValue);
        }}
      />
      
      <button type="submit">Testar</button>
    </form>
    </>
  );
}

export default App;
