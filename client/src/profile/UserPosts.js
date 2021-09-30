import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {accountService} from '@/_services';
import config from 'config';
import moment from 'moment';
import {hookFetch} from '../_helpers/hook-fetch';
import {Loader} from '../_components/Loader';

const UserPosts = () => {
  const user = accountService.userValue;
  const {data, error, loading} = hookFetch(`${config.apiUrl}/posts/userPosts/${user.id}`);

  return(
    <div className="container">
      <div className="row">
        {error && <h5>Oops. No user posts</h5>}
        <div>
         {loading ? (
            <Loader/>
           ):(
            <div>
              <div className="d-flex justify-content-between align-items-center">
              <h4 className="color-3d2">
                Posts
                (<span className="color-1d">{data.length}</span>)
              </h4>
              </div>
              {data.map((x,y)=>(
              <div key={y}>
                <Link to={"/posts/" + x.slug}
                      className="color-1d-link"
                >
                  <h5 className="d-inline color-3d1">{x.post_title.length < 30 ?
                    x.post_title : x.post_title.substr(0,30) + `...`}
                  </h5>
                  &emsp;
                  <span className="color-3"> posted {moment(x.createdAt).format('MM/DD/YYYY')}</span>
                </Link>
              </div>
            ))}
              <hr />
            </div>
           )
         }
        </div>
      </div>
    </div>
  );
}
export default UserPosts;
