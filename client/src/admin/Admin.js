import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {Overview} from './Overview';
import {Users} from './users';

const Admin = () => {
  document.title = "Eigopost - Admin Page";
  return (
    <div className="p-4">
      <div className="container admin">
        <Routes>
          <Route path='/' element={<Overview/>} />
          <Route path='users/*' element={<Users/>} />
        </Routes>
      </div>
    </div>
  );
}
export {Admin};
