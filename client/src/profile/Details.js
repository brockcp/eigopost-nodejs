import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {accountService} from '@/_services';
import moment from 'moment';
import UserPosts from './UserPosts';
import UserComments from './UserComments';
import UserVotesUp from './UserVotesUp';
import UserVotesDown from './UserVotesDown';

const Details = ({match}) => {
  const {path} = match;
  const user = accountService.userValue;
  if(!user){
    return <Redirect to="/account/login"/>
  }
  return (
    <div className="container profile-details">
      <div className="row">
        <h3 className="">Profile</h3>
        <table>
          <thead>
            <tr>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>username</td>
              <td>{user.userName}</td>
            </tr>
            <tr>
              <td>email</td>
              <td>{user.email}</td>
            </tr>
            <tr>
              <td>joined</td>
              <td>{moment(user.created).format('MM/DD/YYYY')}</td>
            </tr>
          </tbody>
        </table>
        <Link to={`${path}/update`}
              className="btn btn-primary">
          Update Profile
        </Link>
        <h4>Activity</h4>
        <UserPosts />
        <UserComments />
        <UserVotesUp />
        <UserVotesDown />
      </div>
    </div>
  );
}
export { Details };
