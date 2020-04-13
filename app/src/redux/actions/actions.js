export const userLoginFetch = user => {
    console.log("Logging in...")
    return async dispatch => {
        //Login existing user
        return fetch('/login' , {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then(data => {
            if(data.message){
                console.log("Could not login: ", data.message)
                dispatch(loginError(data.message))
                setTimeout(() => {
                    dispatch(loginError(null))
                }, 3000);
            }
            else {
                console.log("Successful login. Token: ", data.jwt)
                localStorage.setItem("token", data.jwt)
                console.log("user: ", data.user)
                dispatch(loginUser(data.user, true))
            }
        })
    }
}

export const getUserInfo = (username, token) => {
    console.log('Getting user info')
    return async dispatch => {
        return fetch(`/users/profile?username=${username}`, {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        .then(response => response.json())
        .then(data => {
            if(data.message){
                console.log("Token expired. Log in again")
            }
            else {
                console.log('getuserinfo response: ', data)
                dispatch(loginUser(data.user, true))
            }
        })
    }
}

export const getUserInfo = (username, token) => {
    console.log('Getting user info')
    return async dispatch => {
        return fetch(`/users/profile?username=${username}`, {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log('getuserinfo response: ', data)
        })
    }
}

export const logOut = () => {
    console.log("actions.js | Logging out")
    return dispatch => {
        return dispatch(logoutUser())
    }
}

export const checkIfFamiliar = () => {
    console.log("Checking for token")
    return dispatch => {
        if (localStorage.token){
            console.log("found token")
            localStorage.removeItem("token")
            dispatch(loginUser(null, true))
        }
    }
}

export const registerUser = (formData) => {
    console.log("Attempting registration");
    return dispatch => {
        return fetch('/users/sign-up', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            if(data.message){
                dispatch(registrationError(data.message))
                setTimeout(() => {
                    dispatch(registrationError(null))
                }, 3000);
            }
            else{
                dispatch(registrationSuccess(true))
            }
        })
    }
}

const registrationError = message => ({
    type: 'REGISTRATION_ERROR',
    payload: message
})

const registrationSuccess = status => ({
    type: 'REGISTRATION_SUCCESS',
    payload: status
})

const loginUser = (userObj, bool) => ({
    type: 'LOGIN_USER',
    payload: { user: userObj, isAuthenticated: bool }
})

const loginError = message => ({
    type: 'LOGIN_ERROR',
    payload: message
})

const logoutUser = () => ({
    type: 'LOGOUT_USER',
    payload: false
})
