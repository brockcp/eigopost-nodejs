import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {accountService} from '@/_services';
import config from 'config';
import moment from 'moment';
import {hookFetch} from '../_helpers/hook-fetch';
import {Loader} from '../_components/Loader';

const UserVotesDown = () => {
  const user = accountService.userValue;
  const {data, error, loading} = hookFetch(`${config.apiUrl}/posts/userVotesDown/${user.id}`)

  return(
    <div className="container user-votes-down px-0 pt-2">
      {error && <h5>Oops. No user downvotes</h5>}
      {loading ? (
        <Loader/>
        ):(
          <div className="row">
            <h5 className="">
              DownVotes
              (<span className="activity-count">{data.length}</span>)
            </h5>
            {data.map((x,y)=>(
              <div key={y}>
                <Link to={"/posts/" + x.postId.slug}
                      className=""
                >
                  <h6 className="d-inline">{x.comment_body.length < 30 ?
                    x.comment_body : x.comment_body.substr(0,30) + `...`}
                  </h6>
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
export default UserVotesDown;
