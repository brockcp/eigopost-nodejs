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
    <div className="container user-posts px-0">
      {error && <h5>Oops. No user posts</h5>}
      {loading ? (
        <Loader/>
        ):(
          <div className="row">
            <h5 className="">
              Posts
              (<span className="activity-count">{data.length}</span>)
            </h5>
            {data.map((x,y)=>(
              <div key={y}>
                <Link to={"/posts/" + x.slug}
                      className=""
                >
                  <h6 className="d-inline">{x.post_title.length < 30 ?
                    x.post_title : x.post_title.substr(0,30) + `...`}
                  </h6>
                  &emsp;
                  <span className="date"> posted {moment(x.createdAt).format('MM/DD/YYYY')}</span>
                </Link>
              </div>
            ))}
          </div>
        )
      }
    </div>
  );
}
export default UserPosts;
