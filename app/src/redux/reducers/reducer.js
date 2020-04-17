const initialState = {
    userProfile: null,
    currentUser: null,
    isAuthenticated: false,
    loginError: null,
    registrationSuccess: false,
    registrationError: null
}

const startState = {
    ...initialState,
    token: localStorage.getItem('token')
}

export default function reducer(state = startState, action){
    console.log('Reducer start state = ', state)
    switch(action.type){
        case 'LOGIN_USER':
            return {
                ...state, 
                currentUser: action.payload.user,
                token: action.payload.token,
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
        case 'LOAD_PROFILE':
            return {
                ...state,
                userProfile: action.payload 
            }
        default:
            return state;
    }
}