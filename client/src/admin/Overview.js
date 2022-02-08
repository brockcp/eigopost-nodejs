import React from 'react';
import {Link} from 'react-router-dom';
import Colors from './colors';
import './Admin.css';

function Overview() {
  return (
    <div className="">
      <h1 className="">Admin</h1>
        <Link to='users'
              className="btn btn-primary"
              style={{marginBottom:"1rem"}}
        >
          Manage Users
        </Link>
      <br />
      <p>Site Color Scheme</p>
      <Colors />
    </div>
  );
}
export {Overview};
