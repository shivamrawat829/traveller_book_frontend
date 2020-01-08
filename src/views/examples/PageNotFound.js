import React, {useEffect, useState} from "react";
import {
  Container,
  Row,
  Col, Spinner
} from "reactstrap";
import logo from '../../assets/img/404.gif'

function PageNotFound() {
  return (
    <>
      <div className="wrapper">
        <div className="section">
        <Container>
          <Row>
          <Col  className="ml-auto mr-auto" md="10">
          {/* <h1>NOT FOUND</h1> */}
          <img src={logo} alt="loading..." />
          </Col>
          </Row>
  
          </Container>
      </div>
      </div>
    </>
  );
}

export default PageNotFound;
