import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { List } from './List';
import { AddEdit } from './AddEdit';

function Users() {
    return (
        <Routes>
            <Route path='/' element={<List/>} />
            <Route path='add' element={<AddEdit/>} />
            <Route path='edit/:id' element={<AddEdit/>} />
        </Routes>
    );
}

export { Users };
