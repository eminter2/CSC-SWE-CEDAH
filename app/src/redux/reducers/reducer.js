const initialState = {
    currentUser: null,
    isAuthenticated: false,
    loginError: null,
    registrationSuccess: false,
    registrationError: null
}

export default function reducer(state = initialState, action){
    switch(action.type){
        case 'LOGIN_USER':
            return {
                ...state, 
                currentUser: action.payload.user, 
                isAuthenticated: action.payload.isAuthenticated
            }
        case 'LOGIN_ERROR':
            return {
                ...state,
                loginError: action.payload
            }
        case 'LOGOUT_USER':
            return {
                initialState
            }
        case 'REGISTRATION_SUCCESS':
            return {
                ...state,
                registrationSuccess: true
            }
        case 'REGISTRATION_ERROR':
            return {
                ...state,
                registrationError: action.payload
            }
        default:
            return state;
    }
}