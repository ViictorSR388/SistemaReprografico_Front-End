import React, { useEffect, useState } from 'react';
import Menu from '../../components/hamburgerButton';
import Loading from '../../../src/components/loading';

import Header from '../../components/header';
import SideBar from '../../components/formSideBar';

import Form from '../../components/form';

function RequestForm(props) {

  var [loading, setLoading] = useState(Loading);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1300);
  }, [])

  return (
    <>
      {loading ? <> <Loading /> </> :
        <>
          <Menu admin={props.admin} />
          <Header nif={props.nif} />
          <SideBar image={props.image} name={props.name} admin={props.admin} requestForm={true} nif={props.nif} />
          <Form />
        </>
      }
    </>
  );
}
export default RequestForm;