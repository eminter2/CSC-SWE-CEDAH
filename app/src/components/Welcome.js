import React from 'react';
import {withRouter} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import './Welcome.css';

const Welcome = () => {
    return (
      <div className="page welcome">
        <section className="section 1" href="#about" >
          <h1>About things</h1>
        </section>
        <section className="section 2" href="#about">
          <h1>About things</h1>
        </section>
        <section className="section 3" href="#">
          <h1>About things</h1>
        </section>

        <Container fluid className="footer">
          <Row>
            <Col>
              <h1>Branding</h1>
            </Col>
            <Col>
              <p>Something</p>
              <p>Something</p>
              <p>Something</p>
              <p>Something</p>
              <p>Something</p>
              <p>Something</p>
            </Col>
            <Col>
              <p>Something</p>
              <p>Something</p>
              <p>Something</p>
              <p>Something</p>
              <p>Something</p>
              <p>Something</p>
            </Col>
            <Col>
              <p>Something</p>
              <p>Something</p>
              <p>Something</p>
              <p>Something</p>
              <p>Something</p>
              <p>Something</p>
            </Col>
          </Row>
        </Container>
      </div>
    );
}

export default withRouter(Welcome);