import React, {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Register from "./components/Register";
import People from "./components/People";
import {session} from "./store";
import Messages from "./components/Messages";
import {observer} from "proxily";
import Sleep from "./components/Sleep";

function App() {

  useEffect(() => {
     session.init().then(() => {});
  }, [])

  return (
      <Container fluid>
          {!!session.name ?
              <>
                  {session.sleeping ?
                      <Sleep />
                  :
                      <Row className='subContainer'>
                          <Col><People/></Col>
                          <Col><Messages/></Col>
                      </Row>
                  }
              </>
          :
              <Row>
                  <Col>
                      <Register/>
                  </Col>
              </Row>
          }
      </Container>
  );
}



export default observer(App);