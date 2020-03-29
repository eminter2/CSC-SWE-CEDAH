import React from 'react';
import {Nav, Navbar, NavDropdown, Button} from 'react-bootstrap';

const Header = (props) => {
    return (
        <div className="header">                
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand>MeetUP</Navbar.Brand>
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
                            <Button variant="primary" onClick={props.logout}>Logout</Button>
                            :
                            <div>
                                <Button 
                                    variant="light" 
                                    onClick={props.login}
                                    style={{margin: '0px 10px'}}>Login</Button>
                                <Button variant="primary" onClick={props.signup}>Sign Up</Button>
                            </div>
                    }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default Header;