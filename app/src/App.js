import React, {useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import './App.css';
import Header from './components/Header';


function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isAuthenticated, setisAuthenticated] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let url = `/api/login/${username}&${password}`
    console.log('Fetching with username: ', username)
    fetch(url , {
      method: 'GET',
      cache: 'no-cache',
      credentials: 'same-origin',
    }).then((response) => {
      // console.log('Response', response)      
      if(response.ok) setisAuthenticated(true)
      else {
        setMessage("Username or Password are incorrect")
        setTimeout(() => {
          setMessage("")
        }, 3000);
      }
    }).catch((error) => {
      console.log('Request Failed: ', error)
    })
  }

  return (
    <div className="App">
      <Header/>
      { 
        !isAuthenticated ?
          <div>
            <h1>Login / SignUP</h1>
            <div className="login-form">
              <Form onSubmit={handleSubmit}>
                <Form.Label 
                  style={
                    { color: 'red', 
                      display: 'block', 
                      textAlign: 'center'}
                  }>{message}</Form.Label>
                <Form.Group controlId="formGroupUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Enter username" 
                    value={username}
                    onChange={e => setUsername(e.target.value)}/>
                </Form.Group>
      
                <Form.Group controlId="formGroupPassword">
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
            </div> : <div>
              <h1>Welcome, {username}</h1>
            </div>
      }
    </div>
  );
}

export default App;