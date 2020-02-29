import { createStore } from 'redux';
import reducers from '../reducers/simpleReducer';

let initialState = {
    notes: [
        { title: 'You are awesome', content: 'No, wait, I mean legendary!'},
        { title: 'Ooooops', content: 'I was talking to myself'}
    ],
    visibility: 'AWESOME_TAG'
};

export default createStore(
    reducers,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

/* 
    createStore takes 3 arguemnts. 
    
    First is root reducer of application, which we imported and
    applied to createStore built in function 

    Second is the initial state of the application. Overwrites any default values
    in the reducers
*/