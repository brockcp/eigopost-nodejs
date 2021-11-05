import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {Overview} from './Overview';
import {Users} from './users';

const Admin = ({match}) => {
    const {path} = match;

    return (
        <div className="p-4">
            <div className="container admin">
                <Switch>
                    <Route exact path={path} component={Overview} />
                    <Route path={`${path}/users`} component={Users} />
                </Switch>
            </div>
        </div>
    );
}
export {Admin};
