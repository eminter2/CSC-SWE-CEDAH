export const addGroup = (userId, token) => {
    console.log('made it to addGroup')
    return dispatch => {
        return fetch(`/group/add?id=${userId}`, {
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

