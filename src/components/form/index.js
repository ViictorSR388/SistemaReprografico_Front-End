import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { FaCloudUploadAlt, FaFileImport } from 'react-icons/fa';
import { FaPrint } from 'react-icons/fa';
import './styles.scss';
import axios from 'axios';
import { Button, Card, Form } from 'react-bootstrap';

export default function RequestForm() {
  //cursos
  const [course, setCourse] = useState(0);
  const [posGraduacao, setPosGraduacao] = useState('');
  const [message, setMessage] = useState('');

  var history = useHistory();

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
  } else if (cc === "8") {
    centro_custos = 8;
  }

  //card item
  const [title, setTitle] = useState('');
  const [pages, setPages] = useState('');
  const [copy, setCopy] = useState('');


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

  const [pdfFile, setPdfFile] = useState({
    raw: ""
  });
  const [pdfFileError, setPdfFileError] = useState('');

  const handleChange = (e) => {
    if (e.target.files.length) {
      setPdfFile({
        raw: e.target.files[0],
      });
    }
  };

  const FormPost = () => {
    const formData = new FormData();

    formData.append("file", pdfFile.raw);
    formData.append("curso", curso);
    formData.append("centro_custos", centro_custos);

    formData.append("servicoCT", servicoCT);
    formData.append("servicoCA", servicoCA);

    formData.append("titulo_pedido", title);
    formData.append("num_paginas", pages);
    formData.append("num_copias", copy);

    formData.append("modo_envio", modo_envio);
    formData.append("observacoes", observacao_envio);

    console.log(pdfFileError)
    if (pdfFileError === 'Selecione um arquivo') {
      setMessage(pdfFileError)
    }
    else {
      axios.post('http://localhost:3002/request', formData, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        }
      }).then((result) => {
        console.log(result)
        setMessage(result.data.message)
        if (result.data.message === "Pedido realizado com sucesso!") {
          setTimeout(() => {
            history.push("/myRequests")
          }, 1500);
        }
      })
        .catch((error) => {
          console.error('Error:', error);
        });

      console.log(handleChange)
    };
  }

  const onSubmit = (e) => {
    e.preventDefault();
    FormPost();
  };

  // const nextStep = (e) => {
  //   e.preventDefault();
  // }

  var total = pages * copy;

  const [step, setStep] = useState(1);

  const [servicos, setServicos] = useState({
    servicosCA: [],
    servicosCT: [],
  })

  var [servicoCA, setServicoCA] = useState();
  var [servicoCT, setServicoCT] = useState();
  var [messageServ, setMessageServ] = useState('');

  useEffect(() => {
    onLoad();
    return () => {
      setServicos({});
    };
  }, [])

  const onLoad = async () => {
    var config = {
      method: 'get',
      url: `http://localhost:3002/services/enabled=1`,
      headers: {
        'accessToken': localStorage.getItem("accessToken"),
      },
    };
    try {
      const response = await axios(config);
      console.log(response)
      if (response) {
        if (response.data.servicosCA === undefined && response.data.servicosCT === undefined) {
          setMessageServ(response.data.message)
        }
       // else if (response.data.servicosCA.length < 1 || response.data.servicosCT.lenght < 1) {
        
        //}
        else{
          setServicos({
            servicosCA: response.data.servicosCA,
            servicosCT: response.data.servicosCT
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

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
                        required
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
                        required
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
                        required
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
                        required
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
                      placeholder="Especifique a Graduação"
                      name="posGraduacao"
                      id="posGraduacao"
                      onChange={(e) => {
                        setPosGraduacao(e.target.value);
                      }}
                      required
                    />
                  )}

                  <Card.Title className="cardTitle-CC" id="centro_custos" htmlFor="cost">Centro de custos</Card.Title>
                  <div className="select-container">
                    <Form.Select
                      className="select"
                      id="cc"
                      name="cc"
                      onChange={(e) => {
                        setCc(e.target.value);
                      }}
                      required
                    >
                      <option value="0" name="null" id="null" selected={cc === "0"}>
                        Nenhuma Opção Selecionada
                      </option>
                      <option value="1" name="AIP" id="AIP" selected={cc === "1"}>
                        Aprendizagem Industrial Presencial
                      </option>
                      <option value="2" name="TNMP" id="TNMP" selected={cc === "2"}>
                        Técnico de Nível Médio Presencial
                      </option>
                      <option value="3" name="GTP" id="GTP" selected={cc === "3"}>
                        Graduação Tecnológica Presencial
                      </option>
                      <option value="4" name="PGP" id="PGP" selected={cc === "4"}>
                        Pós-Graduação Presencial
                      </option>
                      <option value="5" name="EP" id="EP" selected={cc === "5"}>
                        Extensão Presencial
                      </option>
                      <option value="6" name="IPP" id="IPP" selected={cc === "6"}>
                        Iniciação Profissional Presencial
                      </option>
                      <option value="7" name="QPP" id="QPP" selected={cc === "7"}>
                        Qualificação Profissional Presencial
                      </option>
                      <option value="8" name="AEPP" id="AEPP" selected={cc === "8"}>
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
                  <Card.Title className="cardTitle">Item</Card.Title>
                  <label className="label" htmlFor="title">Titulo</label>
                  <input
                    className="input-minor"
                    type="text"
                    name="title"
                    id=""
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    required
                  />
                  <label className="label" htmlFor="page-request">Páginas</label>
                  <input
                    type="number"
                    name="pages"
                    id="pages"
                    value={pages}
                    onChange={(e) => {
                      setPages(e.target.value);
                    }}
                    required
                  />
                  <label className="label" htmlFor="copy">Cópias</label>
                  <input
                    type="number"
                    name="copy"
                    id="copy"
                    value={copy}
                    onChange={(e) => {
                      setCopy(e.target.value);
                    }}
                    required
                  />
                  <label className="label" htmlFor="total">Total de Paginas</label>
                  <span className="total-pages" name="total">
                    {total}
                  </span>
                  <Button className="step-btn" onClick={() => {
                    setStep(3);
                  }}>
                    Próximo
                  </Button>
                  <Button className="step-btn-back" onClick={() => {
                    setStep(1);
                  }}>
                    Anterior
                  </Button>
                </Card>
              )}

              {step === 3 && (
                <div className="card medium">
                  <Card.Title className="cardTitle">Formato e Cor</Card.Title>
                  {messageServ !== "" ? <>{messageServ}</> : <>
                    {servicos.servicosCT.map((data) => (
                      <React.Fragment key={data.id_servico}>
                        <div className="radioName">
                          <Form.Check
                            className="check classRadio"
                            type="radio"
                            name="typePaper"
                            id="a3pb"
                            value={data.id_servico}
                            checked={servicoCT === `${data.id_servico}`}
                            onChange={(e) => {
                              setServicoCT(e.target.value)
                            }}
                            required
                          />
                          <label className="labelName" htmlFor="typePaper">
                            {data.descricao}
                          </label>
                        </div>
                      </React.Fragment>
                    ))}
                  </>}
                  <Button className="step-btn" onClick={(e) => {
                    setStep(4);
                  }}>
                    Próximo
                  </Button>
                  <Button className="step-btn-back" onClick={(e) => {
                    setStep(2);
                  }}>
                    Anterior
                  </Button>
                </div>
              )}
              {step === 4 && (
                <Card className="card medium">
                  <Card.Title className="cardTitle">Tipos de Capa e Encadernação</Card.Title>
                  {messageServ !== "" ? <>{messageServ}</> : <>
                    {servicos.servicosCA.map((data) => (
                      <React.Fragment key={data.id_servico}>
                        <div className="radioName">
                            <Form.Check
                            className="check classRadio"
                            type="radio"
                            name="typePaper"
                            id="a3pb"
                            value={data.id_servico}
                            checked={servicoCA === `${data.id_servico}`}
                            onChange={(e) => {
                              setServicoCA(e.target.value)
                            }}
                            required
                          />
                          <label className="labelName" htmlFor="typePaper">
                            {data.descricao}
                          </label>
                        </div>
                      </React.Fragment>
                    ))}
                  </>}
                  <Button className="step-btn" onClick={() => {
                    setStep(5);
                  }}>
                    Próximo
                  </Button>
                  <Button className="step-btn-back" onClick={() => {
                    setStep(3);
                  }}>
                    Anterior
                  </Button>
                </Card>
              )}
              {step === 5 && (
                <div className="card">
                  <Card.Title className="cardTitle">Modo de envio</Card.Title>
                  <div className="radioName">
                    <Form.Check
                      type="radio"
                      name="typeSend"
                      id="digital"
                      checked={typeSend === "1"}
                      value="1"
                      onChange={(e) => {
                        const newValue = e.target.value;
                        setTypeSend(newValue);
                      }}
                      required
                    />
                    <label className="labelName" htmlFor="type-paper">
                      Envio digital
                    </label>
                  </div>
                  <div className="radioName">
                    <Form.Check
                      className="classRadio"
                      type="radio"
                      name="typeSend"
                      id="presencial"
                      checked={typeSend === "2"}
                      value="2"
                      onChange={(e) => {
                        const newValue = e.target.value;
                        setTypeSend(newValue);
                      }}
                      required
                    />
                    <label className="labelName" htmlFor="typePaper">
                      Envio presencial
                    </label>
                  </div>
                  {typeSend === "2" && (
                    <Form.Control
                      className="sendTextInput"
                      as="textarea"
                      id="observacoes"
                      name="observacoes"
                      placeholder="observações"
                      value={observacao}
                      onChange={(e) => {
                        setObservacao(e.target.value);
                      }}
                      required
                    />
                  )}
                  <div className="contentButton">
                    <div className="bootstrap-buttons">
                      <Button className="functionButton" onClick={() => {
                        setStep(4);
                      }}>
                        Anterior
                      </Button>
                      {typeSend === "1" && (
                        <label className="upload-form">
                          <input
                            type="file"
                            name="pdfFile"
                            onChange={handleChange}
                            accept="application/pdf"
                          />
                          <FaCloudUploadAlt />
                          Upload PDF
                        </label>
                      )}

                      {pdfFileError && <div className='error-msg'>{pdfFileError}</div>}

                      <Button className="functionButton" type="submit">
                        Solicitar <FaPrint />
                      </Button>
                    </div>
                  </div>
                  {message}
                </div>
              )}
            </section>
          </div>
        </div>
      </Form>
    </>
  );
}