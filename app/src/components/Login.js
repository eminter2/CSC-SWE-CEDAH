import React, {useState} from 'react';
import {Form, Button, Spinner, Nav} from 'react-bootstrap';
import {withRouter, Redirect} from 'react-router-dom';

import Header from './Header';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [checked, setChecked] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState(false);

    let formUser = {
        username: username,
        password: password
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

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
            })
            .then((response) => {
                let authHeader = response.headers.get("Authorization")
                setLoading(false)
                if(authHeader === null){
                    setMessage("Username or Password are incorrect")
                    setTimeout(() => {
                        setMessage("")
                    }, 3000);
                }
                else{
                    let token = authHeader.split("Bearer ")[1]
                    localStorage.setItem("token", token)
                    setRedirect(true)    
                } 
            })
            .catch((error) => {
                console.log('Request Failed: ', error)
            })
        }

        //Register new user
        else {
            let url = '/users/sign-up'
            fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formUser)
            })
            .then(response => {
                //Registered user, post login now
                if(response.ok){
                    console.log('Account created...logging in...')
                    fetch('/login' , {
                        method: 'POST',
                        cache: 'no-cache',
                        credentials: 'same-origin',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formUser)
                    })
                    .then(response => {
                        let authHeader = response.headers.get("Authorization")
                        setLoading(false)
                        if(authHeader === null){
                            setMessage("Username or Password are invalid")
                            setTimeout(() => {
                                setMessage("")
                            }, 3000);
                        }
                        else{
                            let token = authHeader.split("Bearer ")[1]
                            localStorage.setItem("token", token)
                            setRedirect(true)    
                        } 
                    })
                    .catch(err => {
                        console.log('Something went wrong', err)
                    })
                }
            })
            .catch((error) => {
                console.log("Error from server: ", error)
            })
        }

    }

    if(redirect) return <Redirect push to={{pathname: '/dashboard', state: { user: formUser} }}/>

    else {
        return (
            <div className="page login">
                {!localStorage.token ? 
                    <Header />:
                    <Header isAuthenticated={true}/>
                }
                <h1>Login</h1>
                <div className="login-form">
                    <Form 
                        style={{
                            width: '30%',
                            maxWidth: 500,
                            minWidth: 250
                        }}
                        onSubmit={handleSubmit}>
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
                                onChange={e => setUsername(e.target.value)}
                                autoFocus={true}/>
                        </Form.Group>
            
                        <Form.Group controlId="formGroupPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Password" 
                                value={password}
                                onChange={e => setPassword(e.target.value)}/>
                        </Form.Group>

                        {isLoading ?
                            <Button variant="primary" type="submit"> 
                                <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                        />
                                Loading...
                                <span className="sr-only">Loading...</span>
                            </Button>
                            :
                            <Button variant="primary" type="submit">Submit</Button>
                        }
                    </Form>
                    <p style={{padding: 30}}>
                        Don't have an account?
                        <Nav.Link to="/signup" bsPrefix="mylink" style={{marginLeft: 10}}>Sign up</Nav.Link>
                    </p>
                </div>
            </div>
        )
    }
}

export default withRouter(Login);