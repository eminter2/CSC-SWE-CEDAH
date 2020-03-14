import React from 'react';
import {Nav, Navbar, NavDropdown, Carousel} from 'react-bootstrap';
import meeting1 from '../assets/meeting1.jpeg';
import meeting2 from '../assets/meeting2.jpeg';
import meeting3 from '../assets/meeting3.jpg';


const Header = (props) => {

    return (
        <div className="header">
            <Carousel style={{height: 400, background: 'black'} } controls={false} indicators={false}>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={meeting1}
                    alt="First slide"
                    style={{
                        height: 400,
                        minWidth: 660,
                        maxWidth: 2000,
                        margin: 'auto'
                    }}
                    />                
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={meeting2}
                    alt="Third slide"
                    style={{
                        height: 400,
                        minWidth: 660,
                        maxWidth: 2000,
                        margin: 'auto'
                    }}
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={meeting3}
                    alt="Third slide"
                    style={{
                        height: 400,
                        minWidth: 660,
                        maxWidth: 2000,
                        margin: 'auto'
                    }}
                    />
                </Carousel.Item>
                </Carousel>
                
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="#home">MeetUP</Navbar.Brand>
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
                        <Nav.Link onClick={props.login}>Login</Nav.Link>
                        <Nav.Link onClick={props.logout}>Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )

}

export default Header;