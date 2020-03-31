import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import {Nav, Navbar, NavDropdown, Button} from 'react-bootstrap';

const Header = (props) => {
    const [loginRedirect, setLoginRedirect] = useState(false);
    const [homeRedirect, setHomeRedirect] = useState(false);

    const login = () => {
        setLoginRedirect(true)
    }

    const logout = () => {
        localStorage.removeItem("token")
        homeRedirect(true)
    }

    //TODO: broken. If you hit login/logout on certain pages it'll break
    if (loginRedirect) return <Redirect push to="/login"/>
    else if (homeRedirect) return <Redirect to="/"/>
    else {
        return (
            <Navbar sticky="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand>
                    <Nav.Link onClick={() => setHomeRedirect(true)}>MeetUP</Nav.Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                    <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                    <Nav>
                    {props.isAuthenticated ? 
                            <Button variant="primary" onClick={logout}>Logout</Button>
                            :
                            <div>
                                <Button 
                                    variant="light" 
                                    onClick={login}
                                    style={{margin: '0px 10px'}}>Login</Button>
                                <Button variant="primary" onClick={login}>Sign Up</Button>
                            </div>
                    }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Header;