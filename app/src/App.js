import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {checkIfFamiliar} from './redux/actions/user';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Logout from './pages/Logout';
import AddGroup from './pages/AddGroup';
import JoinGroup from './pages/JoinGroup';
import Groupviewer from './pages/Groupviewer';

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
                    <NavDropdown.Item>Action</NavDropdown.Item>
                    <NavDropdown.Item>Another action</NavDropdown.Item>
                    <NavDropdown.Item>Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item>Separated link</NavDropdown.Item>
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
          { props.isAuthenticated ?
              <> 
                <Route href="" path="/dashboard" exact component = {Dashboard}/>
                <Route href="" path="/group/view/:id" component={Groupviewer}/>
                <Route href="" path="/group/add" component={AddGroup}/>
                <Route href="" path="/group/join" component={JoinGroup}/>
                <Route href="" path="/logout" exact component={Logout} />
              </>
              : <Redirect push to="/login"/>
          }
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