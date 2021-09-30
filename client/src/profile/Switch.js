import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Details } from './Details';
import { Update } from './Update';

function Profile({ match }) {
  document.title = "Eigopost | Profile";
    const { path } = match;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <Switch>
              <Route exact path={path} component={Details} />
              <Route path={`${path}/update`} component={Update} />
            </Switch>
          </div>
        </div>
      </div>
    );
}
export { Profile };
