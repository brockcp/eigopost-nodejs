import React, {useState, useEffect} from 'react';
import {NavLink, Redirect} from 'react-router-dom';
import config from 'config';
import {hookFetch} from '../_helpers/hook-fetch';
import moment from 'moment';
import {Loader} from '../_components/Loader';
import {Error} from '../_components/Error';
import Comments from './Comments';

const Post = (props) => {
  document.title = `Eigopost - ${props.match.params.slug}`;
  const {data, error, loading} = hookFetch(`${config.apiUrl}/posts/${props.match.params.slug}`);

  if(error){
    return <Error/>;
  }
  return(
    <div className="container pt-3">
      <div className="row">
        <div className="col-sm-12 col-lg-8">
          {loading ? (
            <Loader/>
            ):(
            <div>
             {data ? (
               <div className="">
                  <div className="d-flex justify-content-between align-items-center">
                    <h3 className="mb-0 color-1d">{data.post_title}</h3>
                    <NavLink to="/posts" className="color-1d-link">
                       Back to Posts
                    </NavLink>
                  </div>
                    <div className="post-box">
                      <small className="color-3l">post by
                        <span className="color-1">
                          &emsp;
                          {data.userId.length ?
                            data.userId[0].userName
                            :
                            "abcUser"
                          }
                        </span>
                      </small>
                      <small className="color-3l"> on&emsp;
                       {moment(data.createdAt).format('MM/DD/YYYY')}
                      </small>
                      <p className="lead color-3d1">{data.post_body}</p>
                    </div>
                  <Comments postId={data._id}/>
               </div>
               ):(
               <Redirect to="/not-found"/>
             )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default Post;
