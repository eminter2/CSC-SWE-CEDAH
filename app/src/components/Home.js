import React, {useState, useEffect} from 'react';
import {Form, Button} from 'react-bootstrap';
import './Home.css';
import Header from './Header';
import {withCookies} from 'react-cookie';


function Home(props) {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [message, setMessage] = useState("");
  const [checked, setChecked] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  let formUser = {
    username: username,
    password: password
  }

  let {cookies} = props;
  let csrfToken = cookies.get('XSRF-TOKEN');


  //taking place of componentDidMount since this is a functional component
  useEffect(() => {
    console.log('Checking to see if you are familiar... 👀')
    fetchUser()
  }, [])

  const fetchUser = async () => {
    const response = await fetch('/api/user', {credentials: 'include'});
    const body = await response.text();
    if (body === '') {
      console.log('Cookie NOT found. Get out of mah swamp')
      setisAuthenticated(false)
    }
    else {
      console.log('Cookie found, I know you')
      setisAuthenticated(true)
      console.log(JSON.parse(body)["given_name"])
      setCurrentUser(JSON.parse(body)["given_name"])
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    //Login existing user
    if(!checked){
      login()
      // let url = '/api/login'
      // console.log('Fetching with username: ', formUser.username)
      // fetch(url , {
      //   method: 'POST',
      //   cache: 'no-cache',
      //   credentials: 'same-origin',
      //   headers: {
      //       'Accept': 'application/json',
      //       'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(formUser)
      // }).then((response) => {
      //   // console.log('Response', response)      
      //   if(response.ok) setisAuthenticated(true)
      //   else {
      //     setMessage("Username or Password are incorrect")
      //     setTimeout(() => {
      //       setMessage("")
      //     }, 3000);
      //   }
      // }).catch((error) => {
      //   console.log('Request Failed: ', error)
      // })
    }
    
    //Register new user
    else {
      let url = '/api/register'
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

  const login = () => {
    let port = (window.location.port ? ':' + window.location.port : '');
      if (port === ':3000'){
        port = ':8080';
      }
      window.location.href = '//' + window.location.hostname + port + '/private';
  }

  const logout = () => {
    console.log('csrfToken: ', csrfToken)
    fetch('/api/logout', {method: 'POST', credentials: 'include',
      headers: {'X-XSRF-TOKEN': csrfToken}}).then(res => res.json())
      .then(response => {
        window.location.href = response.logoutUrl + "?id_token_hint=" +
          response.idToken + "&post_logout_redirect_uri=" + window.location.origin;
      });
  }

  return (
    <div className="Home">
      <Header login={login} logout={logout}/>
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
                <Button variant="light" type="submit" onClick={logout}>
                  Log Out
                </Button>   
              </Form>
              </div>
            </div> : <div>
              <h1>Welcome, {currentUser}</h1>
            </div>
      }
    </div>
  );
}

export default withCookies(Home);