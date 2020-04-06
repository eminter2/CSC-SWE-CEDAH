import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {checkIfFamiliar} from './redux/actions/actions';
import Welcome from './components/Welcome';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Logout from './components/Logout';
import {
  BrowserRouter as Router, 
  Route, 
  NavLink, 
  Redirect
} from 'react-router-dom';
import {Navbar, Nav, NavDropdown, Button} from 'react-bootstrap';


const App = (props) => {

  useEffect(() => {
    props.checkIfFamiliar()
  })

  return (
     <Router>
        <div className="App">
          <Navbar 
            sticky="top" 
            collapseOnSelect 
            expand="lg" 
            bg="dark" 
            variant="dark">
            <Navbar.Brand as={NavLink} to="/">
              Brand link
            </Navbar.Brand>
            <Navbar.Brand as={NavLink} to="/">
              {props.isAuthenticated}
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
                  <>
                    <Button as={NavLink} 
                            to="/dashboard"
                            variant="success"
                            style={{margin: '0px 10px'}}>Dashboard</Button>
                    <Button as={NavLink} to="/logout">Logout</Button>
                  </>
                  :
                  <>
                    <Button as={NavLink} 
                            to="/login"
                            variant="light" 
                            style={{margin: '0px 10px'}}>Login</Button>
                    <Button as={NavLink} to="/signup">Signup</Button>
                  </>
                }
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Route href="" path="/" exact component={Welcome}/>
          <Route href="" path="/login" exact component={Login}/>
          <Route href="" path="/signup" exact component={Signup}/>
          <Route href="" path="/dashboard" exact render={() => (
            props.isAuthenticated ? (
              <Dashboard/> ) : <Redirect push to="/login"/>
          )}/>
          <Route href="" path="/logout" exact component={Logout} />
        </div>
    </Router>
  )
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.reducer.isAuthenticated
})

const mapDispatchToProps = dispatch => ({
  checkIfFamiliar: () => dispatch(checkIfFamiliar())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);