import React from 'react';
import {instanceOf} from 'prop-types';
import {withCookies, Cookies} from 'react-cookie';

const Dashboard = (props) => {
    const {cookies} = props;
    return (
        <div>You're at the dashboard</div>
    )
}

Dashboard.propTypes = {
    cookies: instanceOf(Cookies).isRequired
}

export default withCookies(Dashboard);