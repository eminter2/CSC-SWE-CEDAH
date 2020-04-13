import React, {useState} from 'react';
import {connect} from 'react-redux';
import {registerUser} from '../redux/actions/actions';
import {NavLink, Redirect} from 'react-router-dom';
import Userform from './Userform';

const Signup = (props) => {

    const [isLoading, setLoading] = useState(false);

    const handleSubmit = async (e, formData) => {
        e.preventDefault()
        setLoading(true);
        console.log("Form data: ", formData)
        props.registerUser(formData) 
        setLoading(false);       
    }

    if(props.registrationSuccess) return <Redirect to="/login" exact push/>
    else{
        return (
            <div className="page signup">
                <h1>Sign up!</h1>
                <div className="user-form">
                    <p style={{color: 'red'}}>{props.registrationError}</p>
                    <Userform 
                        signup
                        isLoading={isLoading}
                        handleSubmit={handleSubmit}/>
                    <p style={{padding: 30}}>
                        Already have an account?
                        <NavLink to="/login" style={{marginLeft: 10}}>Log in</NavLink>
                    </p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    registrationError: state.reducer.registrationError,
    registrationSuccess: state.reducer.registrationSuccess
})

const mapDispatchToProps = dispatch => ({
    registerUser: formData => dispatch(registerUser(formData))
})

export default connect(mapStateToProps, mapDispatchToProps)(Signup);