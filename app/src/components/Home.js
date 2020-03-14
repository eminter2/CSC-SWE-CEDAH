import React, {useState} from 'react';
import { withRouter } from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';
import './Home.css';
import Header from './Header';


function Home(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [checked, setChecked] = useState(false);
  const [isAuthenticated, setisAuthenticated] = useState(false);

  let formUser = {
    username: username,
    password: password
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    //Login existing user
    if(!checked){
      let url = '/api/login'
      console.log('Fetching with username: ', formUser.username)

      const response = await fetch(url, {
          method: 'POST',
          cache: 'no-cache',
          credentials: 'omit',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(formUser)
        }
      );
      const body = await response.text();
      if (body === '') {
        setMessage("Username or Password are incorrect")
        setTimeout(() => {
          setMessage("")
        }, 3000);
      } 
      else {
          setisAuthenticated(true)
          setTimeout(() => {
            props.history.push('/dashboard')
          }, 1000)
        }
    }
    
    //Register new user
    else {
      let url = '/api/register'
      console.log(`Attempting registration for ${formUser.username}, password ${formUser.password}`)
      
      const response = await fetch(url, {
        method: 'POST',
        cache: 'no-cache',
        credentials: 'omit',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formUser)
      });

      const body = await response.text();
      console.log('Registered user return body: ', body)
      if (body === '') {
        setMessage("Username already exists")
        setTimeout(() => {
          setMessage("")
        }, 3000);
      } 
      else {
        setisAuthenticated(true)
        setTimeout(() => {
          props.history.push('/dashboard')
        }, 1000)
      }   
  }
}

  return (
    <div className="Home">
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
                  <Form.Check type="checkbox" label="I'm a New User" onChange={e => setChecked(!checked)}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>    
              </Form>
              </div>
            </div> : <div>
              <h1>Welcome, {username}!</h1>
              <h3>Loading your information...</h3>
              <p>Did you know belhblebelheb?</p>
            </div>
      }
    </div>
  );
}

export default withRouter(Home);