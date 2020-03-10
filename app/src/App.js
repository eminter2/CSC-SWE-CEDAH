import React, {useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import './App.css';
import Header from './components/Header';


function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Fetching with username: ', username)
    const response = await fetch(`/api/login/${username}`)
    const returnBody = await response.json();
    console.log("Returned", returnBody)
  }

  return (
    <div className="App">
      <Header/>
      <h1>Login / SignUP</h1>
      <div className="login-form">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter username" 
              value={username}
              onChange={e => setUsername(e.target.value)}/>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={e => setPassword(e.target.value)}/>
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="I'm a New User" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;