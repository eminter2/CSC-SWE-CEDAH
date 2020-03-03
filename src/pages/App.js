import React from 'react';
import '../styles/App.scss';
import PageHeader from '../components/PageHeader';
import {Form, Button} from 'react-bootstrap';

function App() {
  return (
    <div>
      <PageHeader/>
      <div className="welcome-box">
        <h1>Welcome to MeetUP</h1>
      </div>
      <div className="temp-access-box">
        <div className="form">
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control type="email" placeholder="Enter Username" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="formActions" className="user-actions">
              <Button variant="primary" type="submit">
                Log In
              </Button>
              <Button variant="success" type="submit">
                SignUP
              </Button>
            </Form.Group>
            
          </Form>
        </div>
      </div>
    </div>
  );
}

export default App;
