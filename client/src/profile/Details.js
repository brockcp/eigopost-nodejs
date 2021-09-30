import React from 'react';
import {Link} from 'react-router-dom';
import {accountService} from '@/_services';
import moment from 'moment';
import UserPosts from './UserPosts';
import UserComments from './UserComments';
import UserVotesUp from './UserVotesUp';
import UserVotesDown from './UserVotesDown';

function Details({ match }) {
  const { path } = match;
  const user = accountService.userValue;
  return (
    <div className="p-2">
      <h3>Profile</h3>
      <h5 className="p-0 m-0 color-3d1">Username: {user.userName}</h5>
      <h5 className="p-0 m-0">Email: {user.email}</h5>
      <h5 className="p-0 m-0">Joined: {moment(user.created).format('MM/YYYY')}</h5>
      <p className="pt-2"><Link to={`${path}/update`} className="btn btn-primary">Update Profile</Link></p>
      <hr />
      <h3 className="color-3d1">Activity</h3>
      <UserPosts />
      <UserComments />
      <UserVotesUp />
      <UserVotesDown />
    </div>
  );
}
export { Details };
