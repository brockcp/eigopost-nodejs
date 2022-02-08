import React, {useState, useEffect} from 'react';
import {NavLink, useParams, useLocation} from 'react-router-dom';
import config from 'config';
import {HookFetch} from '../_helpers/HookFetch';
import moment from 'moment';
import {Loader} from '../_components/Loader';
import {Error} from '../_components/Error';
import {NotFound} from '../_components/NotFound';
import Comments from './Comments';
import './Post.css';

const Post = (props) => {
  let {slug} = useParams();
  document.title = `Eigopost - ${slug}`;
  const {data, error, loading} = HookFetch(`${config.apiUrl}/posts/${slug}`);

  if(error){
    return <Error/>;
  }
  return(
    <div className="container post">
      <div className="row">
        <div className="col-sm-12 col-lg-8">
          {loading ? (
            <Loader/>
            ):(
            <div>
             {data ? (
               <div className="fade-in">
                  <div className="d-flex justify-content-between align-items-center">
                    <h2>{data.post_title}</h2>
                    <NavLink to="/posts"
                             className="back-to-posts">
                       Back to Posts
                    </NavLink>
                  </div>
                    <div className="post-box">
                      <small className="post-info">post by
                        <span className="user-name">
                          &emsp;
                          {data.userId.length ?
                            data.userId[0].userName
                            :
                            "user123"
                          }
                        </span>
                      </small>
                      <small className="post-date"> on&emsp;
                       {moment(data.createdAt).format('MM/DD/YYYY')}
                      </small>
                      <p className="">{data.post_body}</p>
                    </div>
                  <Comments postId={data._id}/>
               </div>
               ):(
               <NotFound/>
             )}
            </div>
          )}
        </div>
        <div className="col-sm-12 col-lg-4 post-sidebar">
        </div>
      </div>
    </div>
  )
}
export default Post;
