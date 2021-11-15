import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {accountService} from '@/_services';
import config from 'config';
import moment from 'moment';
import {hookFetch} from '../_helpers/hook-fetch';
import {Loader} from '../_components/Loader';

const UserComments = () => {
  const user = accountService.userValue;
  const {data, error, loading} = hookFetch(`${config.apiUrl}/posts/userComments/${user.id}`)

  return(
    <div className="container user-comments px-0 pt-2">
      {error && <h5>Oops. No user comments</h5>}
      {loading ? (
        <Loader/>
        ):(
          <div className="row">
            <h5 className="">
              Comments
              (<span className="activity-count">{data.length}</span>)
            </h5>
            {data.map((x,y)=>(
              <div key={y}>
                <Link to={"/posts/" + x.postId[0].slug} //[0] needed for link to not return 404 but will error if parent post deleted
                      className=""
                >
                  <h6 className="d-inline">{x.comment_body.length < 30 ?
                    x.comment_body : x.comment_body.substr(0,30) + `...`}
                  </h6>
                  &emsp;
                  <span className="score">{x.score} votes</span>
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
export default UserComments;
