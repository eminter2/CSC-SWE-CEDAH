export const getMyGroups = (userId, token) => {
    console.log('made it to getMyGroups\nUser id: ', userId, '\nToken: ', token)
    return async dispatch => {
        return fetch(`/groups/retrieve?id=${userId}`, {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('Response: ', data.groups)
            dispatch(fetchGroups(data.groups))
        })
        .catch(err => console.log('Error: ', err))
    }
}

export const addGroup = (userId, token) => {
    console.log('made it to addGroup')
    return dispatch => {
        return fetch(`/groups/add?id=${userId}`, {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('Response: ', data.data)
            // dispatch(addGroup(data.group))
        })
        .catch(err => console.log('Error: ', err))
    }
}

export const joinGroup = (userId, token) => {
    console.log('made it to joinGroup')
    return dispatch => {
        return fetch(`/groups/join?id=${userId}`, {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('Response: ', data.data)
            // dispatch(addGroup(data.group))
        })
        .catch(err => console.log('Error: ', err))
    }
}

const fetchGroups = (groups) => ({
    type: 'FETCH_GROUPS',
    payload: groups
})