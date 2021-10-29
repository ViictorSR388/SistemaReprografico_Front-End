import React, { useState } from 'react';
import { FaFileImport } from 'react-icons/fa';
import { FaPrint } from 'react-icons/fa';
import './styles.scss';
import axios from 'axios';
import { Button, Card, Form } from 'react-bootstrap';

export default function RequestForm() {
  //cursos
  const [course, setCourse] = useState(0);
  const [posGraduacao, setPosGraduacao] = useState('');

  var curso;
  // var detalheGraduacao;

  if (course === "1") {
    curso = 1;
    // detalheGraduacao = '';
  } else if (course === "2") {
    curso = 2;
    // detalheGraduacao = '';
  } else if (course === "3") {
    curso = 3;
    // detalheGraduacao = '';
  } else if (course === "4") {
    curso = 4;
    // detalheGraduacao = posGraduacao;
  }

  // centro de custos
  const [cc, setCc] = useState('');

  var centro_custos;

  if (cc === "1") {
    centro_custos = 1;
  } else if (cc === "2") {
    centro_custos = 2;
  } else if (cc === "3") {
    centro_custos = 3;
  } else if (cc === "4") {
    centro_custos = 4;
  } else if (cc === "5") {
    centro_custos = 5;
  } else if (cc === "6") {
    centro_custos = 6;
  } else if (cc === "7") {
    centro_custos = 7;
  }

  // function enableText() {
  //   document.getElementById('graduacao').value = 'on';
  //   let value = (document.getElementById('graduacao').value = 'on');
  //   if (value === 'on') {
  //     document.getElementById('posObservacao').disabled = false;
  //   }
  // }

  // function disableText() {
  //   document.getElementById('graduacao').value = 'off';
  //   let value = document.getElementById('graduacao').value = 'off';
  //   if (value === 'off') {
  //     document.getElementById('posObservacao').disabled = true;
  //   }
  // }

  //card item
  const [title, setTitle] = useState('');
  const [pages, setPages] = useState('');
  const [copy, setCopy] = useState('');

  //card encardenação
  const [attachment, setAttachment] = useState(0);

  var acabamento;
  var capa;

  if (attachment === "1") {
    acabamento = 1;
    capa = 1;
  } else if (attachment === "2") {
    acabamento = 2;
    capa = 1;
  } else if (attachment === "3") {
    acabamento = 3;
    capa = 1;
  } else if (attachment === "4") {
    acabamento = 3;
    capa = 2;
  }

  //card outros detalhes
  // const [grampear, setGrampear] = useState(0);
  // const [frenteVerso, setFrenteVerso] = useState(0);
  // const [frente, setFrente] = useState(0);
  // const [cortar, setCortar] = useState(0);

  // var detalhes;

  // if (grampear == 1) {
  //   detalhes = 1
  // } else if (frenteVerso == 1) {
  //   detalhes = 2
  // } else if (frente == 1) {
  //   detalhes = 3
  // } else if (cortar == 1) {
  //   detalhes = 4
  // }

  //card formato e cor
  const [typePaper, setTypePaper] = useState(0);

  var formato;
  var cor;

  if (typePaper === "1") {
    formato = 1;
    cor = 1;
  } else if (typePaper === "2") {
    formato = 2;
    cor = 1;
  } else if (typePaper === "3") {
    formato = 3;
    cor = 1;
  } else if (typePaper === "4") {
    formato = 4;
    cor = 1;
  } else if (typePaper === "5") {
    formato = 5;
    cor = 1;
  }

  //card suporte
  // const [zipDrive, setZipDrive] = useState(0);
  // const [papel, setPapel] = useState(0);
  // const [cd, setCd] = useState(0);
  // const [email, setEmail] = useState(0);
  // const [outros, setOutros] = useState(0);
  // const [outrosObservacao, setOutrosObservacao] = useState("");

  // var suporte;

  // if (zipDrive == 1) {
  //   suporte = 1
  // } else if (papel == 1) {
  //   suporte = 2
  // } else if (cd == 1) {
  //   suporte = 3
  // } else if (email == 1) {
  //   suporte = 4
  // } else if (outros == 1) {
  //   suporte = 5
  // }

  // var coffee = document.forms[0];
  //   var txt = "";
  //   var i;
  //   for (i = 0; i < coffee.length; i++) {
  //     if (coffee[i].checked) {
  //       txt = txt + coffee[i].value + " ";
  //     }
  //   }

  // modo de envio
  const [typeSend, setTypeSend] = useState(0);
  const [observacao, setObservacao] = useState('');

  var modo_envio;
  var observacao_envio;

  if (typeSend === "1") {
    modo_envio = 1;
    observacao_envio = '';
  } else if (typeSend === "2") {
    modo_envio = 2;
    observacao_envio = observacao;
  }

  // const [file, setFile] = useState();

  // const handleChange = e => {
  //   if (e.target.files.length) {
  //     setFile(
  //       e.target.files[0]
  //     );
  //   }
  // }

  // const handleUpload = () => {
  //   const formData = new FormData();
  //   formData.append("file", file);
  //   formData.append("curso", curso);
  //   formData.append("centro_custos", centro_custos);

  //   formData.append("titulo", title);
  //   formData.append("num_paginas", pages);
  //   formData.append("num_copias", copy);

  //   formData.append("acabamento", acabamento);
  //   formData.append("tipos_capa", capa);

  //   formData.append("tamanho_pagina", formato);
  //   formData.append("tipos_copia", cor);

  //   formData.append("modo_envio", modo_envio);
  //   formData.append("observacoes", observacao_envio);

  //   axios.post('http://localhost:3002/pedido', formData, {
  //     headers: {
  //       accessToken: localStorage.getItem("accessToken"),
  //     }
  //   }).then((result) => {
  //     console.log(result);
  //   })
  // };


  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   handleUpload();
  // };

  var total = pages * copy;

  const FormPost = () => {
    const data = {
      curso: curso,
      // detalheGraduacao,

      centro_custos: centro_custos,

      titulo_pedido: title,
      num_paginas: pages,
      num_copias: copy,

      acabamento: acabamento,
      tipos_capa: capa,

      // outros detalhes

      tamanho_pagina: formato,
      tipos_copia: cor,

      // suporte

      modo_envio: modo_envio,
      observacoes: observacao_envio,
    };
    axios.post('http://localhost:3002/pedido', data, {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      }
    }).then((result) => {
      console.log(result);
    })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    FormPost();
  };

  const [step, setStep] = useState(1);

  return (
    <>
      <Form onSubmit={onSubmit}>
        <div className="containerForm">
          <div className="title-repro">
            <h1>Solicitação de reprografia</h1>
          </div>
          <div className="containerWrapper">
            <section className="card-wrapper">
              {step === 1 && (
                <Card className="card">
                  <Card.Title className="cardTitle">Curso</Card.Title>
                  <div className="radio-container">
                    <div className="radioName">
                      <Form.Check
                        className="classRadio"
                        type="radio"
                        name="course"
                        id="curso"
                        checked={course === "1"}
                        value="1"
                        onChange={(e) => {
                          const newValue = e.target.value;
                          setCourse(newValue);
                        }}
                      />
                      <Form.Check.Label htmlFor="cai" className="radio-label">
                        CT-DS
                      </Form.Check.Label>
                    </div>
                    <div className="radioName">
                      <Form.Check
                        className="classRadio"
                        type="radio"
                        name="course"
                        id="curso"
                        checked={course === "2"}
                        value="2"
                        onChange={(e) => {
                          const newValue = e.target.value;
                          setCourse(newValue);
                        }}
                      />
                      <Form.Check.Label htmlFor="ct">CT-MP</Form.Check.Label>
                    </div>
                    <div className="radioName">
                      <Form.Check
                        className="classRadio"
                        type="radio"
                        name="course"
                        id="curso"
                        checked={course === "3"}
                        value="3"
                        onChange={(e) => {
                          const newValue = e.target.value;
                          setCourse(newValue);
                        }}
                      />
                      <Form.Check.Label htmlFor="fc">CST-MP</Form.Check.Label>
                    </div>
                    <div className="radioName">
                      <Form.Check
                        className="classRadio"
                        type="radio"
                        name="course"
                        id="graduacao"
                        checked={course === "4"}
                        value="4"
                        onChange={(e) => {
                          const newValue = e.target.value;
                          setCourse(newValue);
                        }}
                      />
                      <Form.Check.Label className="input-pos" htmlFor="pos">
                        Pós Graduação
                      </Form.Check.Label>
                    </div>
                  </div>
                  {course === '4' && (
                    <Form.Control
                      className="textInput"
                      as="textarea"
                      // disabled={true}
                      name="posGraduacao"
                      id="posGraduacao"
                      onChange={(e) => {
                        setPosGraduacao(e.target.value);
                      }}
                    />
                  )}

                  <Card.Title className="cardTitle" htmlFor="cost">Centro de custos</Card.Title>
                  <div className="radio-container">
                    <Form.Select
                      className="select"
                      id="cc"
                      name="cc"
                      onChange={(e) => {
                        setCc(e.target.value);
                      }}
                    >
                      <option value="0" name="nothing" id="nothing" selected={cc === "0"} >
                        Nenhuma Selecionada
                      </option>
                      <option value="1" name="AIP" id="AIP" selected={cc === "1"} >
                        Aprendizagem Industrial Presencial
                      </option>
                      <option value="2" name="GTP" id="GTP" selected={cc === "2"} >
                        Graduação Tecnológica Presencial
                      </option>
                      <option value="3" name="PGP" id="PGP" selected={cc === "3"} >
                        Pós-Graduação Presencial
                      </option>
                      <option value="4" name="EP" id="EP" selected={cc === "4"} >
                        Extensão Presencial
                      </option>
                      <option value="5" name="IPP" id="IPP" selected={cc === "5"} >
                        Iniciação Profissional Presencial
                      </option>
                      <option value="6" name="QPP" id="QPP" selected={cc === "6"} >
                        Qualificação Profissional Presencial
                      </option>
                      <option value="7" name="AEPP" id="AEPP" selected={cc === "7"} >
                        Aperfeiç./Especializ. Profis. Presencial
                      </option>
                    </Form.Select>
                  </div>
                  <Button className="step-btn" onClick={() => {
                    setStep(2);
                  }}>
                    Próximo
                  </Button>
                </Card>
              )}
              {step === 2 && (
                <Card className="card">
                  <h3 className="cardTitle">Item</h3>
                  <label htmlFor="title">Titulo</label>
                  <input
                    className="input-minor"
                    type="text"
                    name="title"
                    id=""
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                  <label htmlFor="page-request">Páginas</label>
                  <input
                    className="short"
                    type="number"
                    name="pages"
                    id="pages"
                    value={pages}
                    onChange={(e) => {
                      setPages(e.target.value);
                    }}
                  />
                  <label htmlFor="copy">Cópias</label>
                  <input
                    className="short"
                    type="number"
                    name="copy"
                    id="copy"
                    value={copy}
                    onChange={(e) => {
                      setCopy(e.target.value);
                    }}
                  />
                  <label htmlFor="total">Total de Paginas</label>
                  <span className="total-pages" name="total">
                    {total}
                  </span>
                  <Button className="step-btn" onClick={() => {
                    setStep(3);
                  }}>
                    Próximo
                  </Button>
                  <Button className="step-btn" onClick={() => {
                    setStep(1);
                  }}>
                    Anterior
                  </Button>
                </Card>
              )}

              {step === 3 && (
                <Card className="card">
                  <h3 className="cardTitle">Encadernação</h3>
                  <div className="radioName">
                    <label className="labelName" htmlFor="attachment">
                      Capa em Papel 150g - 2 Grampos a Cavalo
                    </label>
                    <input
                      className="check classRadio"
                      type="radio"
                      name="attachment"
                      id="gcCapaPapel"
                      checked={attachment === "1"}
                      value="1"
                      onChange={(e) => {
                        const newValue = e.target.value;
                        setAttachment(newValue);
                      }}
                    />
                  </div>
                  <div className="radioName">
                    <label className="labelName" htmlFor="attachment">
                      Capa em Papel 150g - 2 Grampo Laterais
                    </label>
                    <input
                      className="check classRadio"
                      type="radio"
                      name="attachment"
                      id="glCapaPapel"
                      checked={attachment === "2"}
                      value="2"
                      onChange={(e) => {
                        const newValue = e.target.value;
                        setAttachment(newValue);
                      }}
                    />
                  </div>
                  <div className="radioName">
                    <label className="labelName" htmlFor="spiral-binding">
                      Capa em Papel 150g - Espiral de Plástico
                    </label>
                    <input
                      className="check classRadio"
                      type="radio"
                      name="attachment"
                      id="epCapa150g"
                      checked={attachment === "3"}
                      value="3"
                      onChange={(e) => {
                        const newValue = e.target.value;
                        setAttachment(newValue);
                      }}
                    />
                  </div>
                  <div className="radioName">
                    <label className="labelName" htmlFor="front-cover">
                      Capa em PVC - Espiral de Plástico
                    </label>
                    <input
                      className="check classRadio"
                      type="radio"
                      name="attachment"
                      id="epCapaPVC"
                      checked={attachment === "4"}
                      value="4"
                      onChange={(e) => {
                        const newValue = e.target.value;
                        setAttachment(newValue);
                      }}
                    />
                  </div>
                  <Button className="step-btn" onClick={() => {
                    setStep(4);
                  }}>
                    Próximo
                  </Button>
                  <Button className="step-btn" onClick={() => {
                    setStep(2);
                  }}>
                    Anterior
                  </Button>
                </Card>
              )}

              {step === 4 && (
                <div className="card medium">
                  <h3 className="cardTitle">Formato e Cor</h3>
                  <div className="radioName">
                    <label className="labelName" htmlFor="type-paper">
                      A3 Preto e Branco
                    </label>
                    <input
                      className="check classRadio"
                      type="radio"
                      name="typePaper"
                      id="a3pb"
                      checked={typePaper === "1"}
                      value="1"
                      onChange={(e) => {
                        const newValue = e.target.value;
                        setTypePaper(newValue);
                      }}
                    />
                  </div>
                  <div className="radioName">
                    <label className="labelName" htmlFor="type-paper">
                      A4 Preto e Branco
                    </label>
                    <input
                      className="check classRadio"
                      type="radio"
                      name="typePaper"
                      id="a4pb"
                      checked={typePaper === "2"}
                      value="2"
                      onChange={(e) => {
                        const newValue = e.target.value;
                        setTypePaper(newValue);
                      }}
                    />
                  </div>
                  <div className="radioName">
                    <label className="labelName" htmlFor="type-paper">
                      A5 Preto e Branco
                    </label>
                    <input
                      className="check classRadio"
                      type="radio"
                      name="typePaper"
                      id="a5pb"
                      checked={typePaper === "3"}
                      value="3"
                      onChange={(e) => {
                        const newValue = e.target.value;
                        setTypePaper(newValue);
                      }}
                    />
                  </div>
                  <div className="radioName">
                    <label className="labelName" htmlFor="type-paper">
                      Reduzida Preto e Branco
                    </label>
                    <input
                      className="check classRadio"
                      type="radio"
                      name="typePaper"
                      id="redpb"
                      checked={typePaper === "4"}
                      value="4"
                      onChange={(e) => {
                        const newValue = e.target.value;
                        setTypePaper(newValue);
                      }}
                    />
                  </div>
                  <div className="radioName">
                    <label className="labelName" htmlFor="type-paper">
                      Ampliada Preto e Branco
                    </label>
                    <input
                      className="check classRadio"
                      type="radio"
                      name="typePaper"
                      id="amppb"
                      checked={typePaper === "5"}
                      value="5"
                      onChange={(e) => {
                        const newValue = e.target.value;
                        setTypePaper(newValue);
                      }}
                    />
                  </div>
                  <Button className="step-btn" onClick={(e) => {
                    setStep(5);
                  }}>
                    Próximo
                  </Button>
                  <Button className="step-btn" onClick={(e) => {
                    setStep(3);
                  }}>
                    Anterior
                  </Button>
                </div>
              )}
              {step === 5 && (
                <div className="card">
                  <h3 className="cardTitle">Modo de envio</h3>
                  <div className="radioName">
                    <label className="labelName" htmlFor="type-paper">
                      Envio digital
                    </label>
                    <input
                      className="check classRadio"
                      type="radio"
                      name="typeSend"
                      id="digital"
                      checked={typeSend === "1"}
                      value="1"
                      onChange={(e) => {
                        const newValue = e.target.value;
                        setTypeSend(newValue);
                      }}
                    />
                  </div>
                  <div className="radioName">
                    <label className="labelName" htmlFor="type-paper">
                      Envio presencial
                    </label>
                    <input
                      className="check classRadio"
                      type="radio"
                      name="typeSend"
                      id="presencial"
                      checked={typeSend === "2"}
                      value="2"
                      onChange={(e) => {
                        const newValue = e.target.value;
                        setTypeSend(newValue);
                      }}
                    />
                    <textarea
                      className="observation"
                      // disabled={true}
                      id="observacoes"
                      name="observacoes"
                      value={observacao}
                      onChange={(e) => {
                        setObservacao(e.target.value);
                      }}
                    />
                  </div>
                  <div className="contentButton">
                    <Form.Group controlId="formFile" className="mb-3">
                    {/* <Form.Control className="functionButton" type="file">Adicionar Item</Form.Control>
                    <Form.Label htmlFor="file" className="functionButton">
                      Anexar
                      <FaFileImport />
                    </Form.Label> */}
                      <Form.Label>Default file input example</Form.Label>
                      <Form.Control type="file" />
                    </Form.Group>
                    <input type="file" name="file" accept="application/pdf" />
                    <Button className="functionButton" type="submit">
                      Solicitar <FaPrint />
                    </Button>
                    <Button className="functionButton" onClick={() => {
                      setStep(4);
                    }}>
                      Anterior
                    </Button>
                  </div>
                </div>
              )}
            </section>


          </div>

        </div>
      </Form>
    </>
  );
}