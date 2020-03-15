const getUser = async () => {
    try{ 
        console.log('Getting user...')
        const response = await fetch('/api/user', {credentials: 'include'});
        const body = await response.text();
        var username = JSON.parse(body)["given_name"]
        var email = JSON.parse(body)["email"]
        console.log('Retrieved user: ', username,
        '\nEmail: ', email)
        return { username, email };
    }
    catch {
        console.log("Something went wrong. Session Expired")
        return { username: "mistakes", email: "happen"}
    }
}

export default getUser;