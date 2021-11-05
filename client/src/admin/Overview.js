import React from 'react';
import { Link } from 'react-router-dom';
import Colors from '../_helpers/colors';

function Overview({ match }) {
    const { path } = match;

    return (
        <div className="">
            <h1 className="">Admin</h1>
            <p className="">This section can only be accessed by administrators.</p>
            <p><Link to={`${path}/users`}>Manage Users</Link></p>
            <br />
            <Colors />
        </div>
    );
}

export { Overview };
