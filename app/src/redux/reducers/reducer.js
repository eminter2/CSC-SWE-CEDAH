const initialState = {
    currentUser: {},
    isAuthenticated: false,
    loginError: null,
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
        case 'LOGIN_FAIL':
            return {
                ...state,
                loginError: action.payload
            }
        case 'LOGOUT_USER':
            return {
                ...state,
                currentUser: {},
                isAuthenticated: action.payload
            }
        default:
            return state;
    }
}