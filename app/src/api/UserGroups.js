const getUserGroups = async (token, email) => {
    try{
        console.log(`Attempting to retrieve groups...\nToken: ${token }\nEmail: ${email}`)
        const response = await fetch('/api/meetings', {method: 'POST', credentials: 'include',
            headers: {'X-XSRF-TOKEN': token},
            body: JSON.stringify(email)
        });
        const body = await response.text();
        console.log(body)
    }
    catch(err){
        console.log('Something went wrong: ', err);
    }
}

export default getUserGroups;