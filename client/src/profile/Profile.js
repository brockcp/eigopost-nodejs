import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {Details} from './Details';
import {Update} from './Update';
import './Profile.css';

function Profile() {
  document.title = "Eigopost | Profile";
    return (
      <div className="profile-container">
        <div className="row">
          <Routes>
            <Route path='/' element={<Details/>} />
            <Route path='update' element={<Update/>} />
          </Routes>
        </div>
      </div>
    );
}
export {Profile};
