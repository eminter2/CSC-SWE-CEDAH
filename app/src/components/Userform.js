import React, {useState} from 'react';
import {Form, Button, Spinner} from 'react-bootstrap';

const Userform = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [newUser, setnewUser] = useState(false);

    let formUser = {
        username: username,
        password: password,
    }

    if(props.signup){
        return (
            <div className="login-form">
                <Form 
                    style={{
                        width: '30%',
                        maxWidth: 500,
                        minWidth: 250
                    }}
                    onSubmit={e => props.handleSubmit(e, formUser, newUser)}>
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
            </div>
        )
    }
    else {
        return (
            <div className="login-form">
                <Form 
                    style={{
                        width: '30%',
                        maxWidth: 500,
                        minWidth: 250
                    }}
                    onSubmit={e => props.handleSubmit(e, formUser, newUser)}>
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
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="I'm a New User" onChange={e => setnewUser(!newUser)}/>
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
            </div>
        )
    }
}

export default Userform;