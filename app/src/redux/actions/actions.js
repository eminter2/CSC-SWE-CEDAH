export const userLoginFetch = user => {
    console.log("In the actions.js")
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
                dispatch(loginFail(data.message))
                setTimeout(() => {
                    dispatch(loginFail(null))
                }, 3000);
            }
            else {
                console.log("Successful login. Token: ", data.jwt)
                localStorage.setItem("token", data.jwt)
                dispatch(loginUser(data.user, true))
            }
        })
    }
}


export const checkIfFamiliar = () => {
    console.log("Checking for token")
    return dispatch => {
        if (localStorage.token){
            localStorage.removeItem("token")
            dispatch(loginUser(null, true))
        }
    }
}

export const logOut = () => {
    console.log("actions.js | Logging out")
    return dispatch => {
        return dispatch(logoutUser())
    }
}

const loginUser = (userObj, bool) => ({
    type: 'LOGIN_USER',
    payload: { user: userObj, isAuthenticated: bool }
})

const loginFail = message => ({
    type: 'LOGIN_FAIL',
    payload: message
})

const logoutUser = () => ({
    type: 'LOGOUT_USER',
    payload: false
})
