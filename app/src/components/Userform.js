import React, {useState} from 'react';
import {Form, Button, Spinner} from 'react-bootstrap';

const Userform = (props) => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);


    let formData = {
        fullName: fullName,
        email: email,
        phone: phone,
        username: username,
        password: password,
    }

    const validateAndSubmit = (e) => {
        setLoading(true)
        e.preventDefault();
        if(password !== password2){
            setMessage("Passwords do not match")
        }
        else {
            props.handleSubmit(e, formData)
        }
    }

    if(props.signup){
        return (
            <Form 
                style={{
                    width: '30%',
                    maxWidth: 500,
                    minWidth: 250
                }}
                onSubmit={e => validateAndSubmit(e)}>
                <Form.Label 
                style={
                    { color: 'red', 
                    display: 'block', 
                    textAlign: 'center'}
                }>{props.message}</Form.Label>
                <Form.Group controlId="fname">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                        autoFocus={true}
                        required/>
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        type="email" 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        />
                </Form.Group>
                <Form.Group controlId="phone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control 
                        type="phone" 
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        required
                        />
                </Form.Group>
                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        type="text" 
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                        />
                </Form.Group>
                <Form.Label 
                    style={
                        { color: 'red', 
                        display: 'block', 
                        textAlign: 'center'}
                    }>{message}</Form.Label>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        value={password}
                        onChange={e => {setPassword(e.target.value); setMessage("")}}
                        required
                        />
                </Form.Group>
                <Form.Group controlId="password2">
                    <Form.Label>Re-enter Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        value={password2}
                        onChange={e => {setPassword2(e.target.value); setMessage("")}}
                        required
                        />
                </Form.Group>
                {props.isLoading ?
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
        )
    }
    else {
        return (
            <Form 
                style={{
                    width: '30%',
                    maxWidth: 500,
                    minWidth: 250
                }}
                onSubmit={e => props.handleSubmit(e, formData)}>
                <Form.Label 
                style={
                    { color: 'red', 
                    display: 'block', 
                    textAlign: 'center'}
                }>{props.message}</Form.Label>
                <Form.Group controlId="formGroupUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter username" 
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        autoFocus={true}
                        required/>
                </Form.Group>
                <Form.Group controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required/>
                </Form.Group>
                {props.isLoading ?
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
        )
    }
}

export default Userform;