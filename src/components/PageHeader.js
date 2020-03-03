import React from 'react'
import {Button, Navbar, NavDropdown, Nav, Carousel} from 'react-bootstrap'
import meeting1 from '../asssets/meeting1.jpeg'
import meeting2 from '../asssets/meeting2.jpeg'
import meeting3 from '../asssets/meeting3.jpg'

function PageHeader(){
    return(
        <div>
        <Carousel controls={false} indicators={false} interval={2500}>
            <Carousel.Item>
            <img
                className="d-block w-100"
                src={meeting2}
                alt="First slide"
            />
            </Carousel.Item>
            <Carousel.Item>
            <img
                className="d-block w-100"
                src={meeting3}
                alt="Third slide"
            />
            </Carousel.Item>
            <Carousel.Item>
            <img
                className="d-block w-100"
                src={meeting1}
                alt="Third slide"
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
                    <Nav.Link href="#deets" style={{marginRight: 15}}>Log In</Nav.Link>
                    <Button>SignUP</Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        </div>
    )
}

export default PageHeader;
