import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {logOut} from '../redux/actions/actions';
import {Redirect} from 'react-router-dom';
import {Spinner} from 'react-bootstrap';

const Logout = (props) => {

    useEffect(() => {
        setTimeout(() => {
            props.logOut()
        }, 2000);
    })
    
    if(!props.isAuthenticated) return <Redirect push to="/"/>
    else {
        return (
            <>
                <div className="page logout">
                    <div className="goodbye">
                        <h1>Come back soon!</h1>
                        <p>You are logged out.</p>
                        <Spinner animation="border" size="lg"/>
                    </div>
                </div>
            </>

        )
    }
}

const mapDispatchToProps = dispatch => ({
    logOut: () => dispatch(logOut())
})

const mapStateToProps = state => ({
    isAuthenticated: state.reducer.isAuthenticated
  })

export default connect(mapStateToProps, mapDispatchToProps)(Logout);