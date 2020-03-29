import React, {useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import './Home.css';
import Header from './Header';


function Home() {
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
      let url = '/login'
      console.log('Fetching with username: ', formUser.username)
      fetch(url , {
        method: 'POST',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formUser)
      }).then((response) => {
        // console.log('Response', response.headers.get("Authorization")) 
        let token = response.headers.get("Authorization").split("Bearer ")[1]
        // console.log(token)
        localStorage.setItem("token", token)    
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
    
    //Register new user
    else {
      let url = '/users/sign-up'
      console.log(`Attempting registration for ${formUser.username}, password ${formUser.password}`)
      fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formUser)
      }).then(response => {
          let data = response.json()
          setMessage(`Account Created for ${data}`)
      }).catch((error) => {
        console.log("Error from server: ", error)
      })
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
              <h1>Welcome, {username}</h1>
            </div>
      }
    </div>
  );
}

export default Home;