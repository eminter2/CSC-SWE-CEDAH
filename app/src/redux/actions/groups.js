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
            dispatch(setGroups(data.groups))
        })
        .catch(err => console.log('Error: ', err))
    }
}

export const getMembers = (groupId, token) => {
    console.log('entered')
    return async dispatch => {
        return fetch(`/groups/members?id=${groupId}`, {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => 
            response.json()
        )
        .then(data => {
            if(data){
                console.log('Members: ', data.members)
                dispatch(setGroupMembers(data.members))
            }else {
                console.log("something up")
            }
        })
        .catch(err => console.log('Error: ', err))
    }
}

export const addGroup = (userId, token, groupName) => {
    console.log('made it to addGroup')
    return dispatch => {
        return fetch(`/groups/add?id=${userId}&name=${groupName}`, {
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
            if(data.message){
                console.log('Something went wrong:\n', data.message)
                // dispatch(addGroupResponse("Success!"))
            }
            else{
                console.log('Response: ', data.data)
            }
            // dispatch(addGroup(data.group))
        })
        .catch(err => console.log('Error: ', err))
    }
}

export const joinGroup = (userId, token, groupName) => {
    console.log('made it to joinGroup')
    return dispatch => {
        return fetch(`/groups/join?id=${userId}&name=${groupName}`, {
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
            if(data.message){
                console.log('Something went wrong:\n', data.message)
            }
            else {
                console.log('Response: ', data.data)
            }
        })
        .catch(err => console.log('Error: ', err))
    }
}

export const leaveGroup = (groupId, userId, token) => {
    console.log('leaving group...')
    return dispatch => {
        return fetch(`/groups/leave?groupId=${groupId}&userId=${userId}`, {
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
                if(data.message){
                    console.log('Something went wrong:\n', data.message)
                }
                else {
                    console.log('Response: ', data.data)
                }
            })
            .catch(err => console.log('Error: ', err))
    }
}

const setGroups = (groups) => ({
    type: 'FETCH_GROUPS',
    payload: groups
})

const setGroupMembers = members => ({
    type: 'FETCH_MEMBERS',
    payload: members
})