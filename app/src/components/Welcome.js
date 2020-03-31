import React from 'react';
import {withRouter} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import './Welcome.css';
import Header from './Header';

const Welcome = () => {
    return (
      <div className="welcome">
        {!localStorage.token ? 
          <Header />:
          <Header isAuthenticated={true}/>
        }
        <section className="section 1" href="#about" >
          <h1>About things</h1>
        </section>

        <section className="section 2" href="#about">
          <h1>About things</h1>
        </section>
        <section className="section 3" href="#">
        <h1>About things</h1>


        </section>

        <section className="section 4">
        <h1>About things</h1>

        </section>

        <section className="footer">
          <div className="links">
              <p>Something</p>
              <p>Somethin2</p>
              <p>Something3</p>
          </div>
          <div className="certs">
              <p>Something</p>
              <p>Somethin2</p>
              <p>Something3</p>
          </div>
          <div className="space">
              <p>Something</p>
              <p>Somethin2</p>
              <p>Something3</p>
          </div>
        </section>
      </div>
    );
}

export default withRouter(Welcome);