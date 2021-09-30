import React from 'react';
import { Link } from 'react-router-dom';

function Overview({ match }) {
    const { path } = match;

    return (
        <div className="">
            <h1>Admin</h1>
            <p>This section can only be accessed by administrators.</p>
            <p><Link to={`${path}/users`}>Manage Users</Link></p>
        </div>
    );
}

export { Overview };
