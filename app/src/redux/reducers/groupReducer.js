const initialState = {
    groupList: null,
    members: null
}

export default function groupReducer(state = initialState, action){
    switch(action.type){
        case 'FETCH_GROUPS':
            return {
                ...state,
                groupList: action.payload
            }
        case 'FETCH_MEMBERS': 
            console.log('Fetch member reducer')
            return {
                ...state,
                members: action.payload
            }
        default: 
            return state;
    }
}