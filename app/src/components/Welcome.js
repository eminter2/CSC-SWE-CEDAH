import React from 'react';
import {withRouter} from 'react-router-dom';
import {Jumbotron, Button} from 'react-bootstrap';
import './Welcome.css';
import Header from './Header';

const Welcome = () => {
    return (
      <div className="welcome">
        {!localStorage.token ? 
          <Header />:
          <Header isAuthenticated={true}/>
        }
        <Jumbotron>
          <h1>Welcome to MeetUP!</h1>
          <p>
            This is our way of simplifying collaboration.
            Let AI do the work. We want to give you your time back.
          </p>
            <Button variant="primary" size="lg">Learn more</Button>
        </Jumbotron>
      </div>
    );
}

export default withRouter(Welcome);