const initialState = {
    groupList: null,
}

export default function groupReducer(state = initialState, action){
    switch(action.type){
        case 'FETCH_GROUPS':
            return {
                ...state,
                groupList: action.payload
            }
        default: 
            return state;
    }
}