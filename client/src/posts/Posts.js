import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {accountService} from '@/_services';
import config from 'config';
import {hookFetch} from '../_helpers/hook-fetch';
import moment from 'moment';
import {SkeletonPosts, ModalAccounts} from '@/_components';

const Posts = ({history}) => {
  document.title = 'EigoPost | Posts'
  const user = accountService.userValue;
  const {data, error, loading} = hookFetch(`${config.apiUrl}/posts`);
  const [modalVisible, setModalVisible] = useState(false);

  function modalCheckUser(){
    if(!user){
      setModalVisible(true);
    }else{
      history.push('new-post');
    }
  }
  return(
    <div className="container pt-3 pb-5">
      <div className="row">
        <div className="col-sm-12 col-lg-8">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="color-1d">EigoPost
              <small className="color-3d">s</small>
            </h1>
            <button className="btn btn-primary"
                    onClick={modalCheckUser}>
              New Post
            </button>
          </div>
          {error && <div>Oops. Please refresh your browser</div>}
          {data && data.map((x,y)=>(
            <div key={y}
                 className="posts-box">
              <Link to={"/posts/" + x.slug}>
                <h2 className="mb-0 color-3">{x.post_title}</h2>
                <p className="mb-0 color-3">
                  {x.post_body.length < 130 ? x.post_body :
                     x.post_body.substr(0,130) + `...`}
                </p>
                <small className="color-3l">
                  post {moment(x.createdAt).format('MM/DD/YY')} by
                </small>
                {x.userId.length ? (
                  <small className="color-1l"> {x.userId[0].userName} </small>
                  ):(
                  <small className="color-1l"> user123 </small>
                )}
                <small className="color-3">{x.comments.length} comments</small>
              </Link>
            </div>
          ))}
          {data === null && [1,2,3,4].map(x => <SkeletonPosts key={x}/>)}
        </div>
      </div>
      <ModalAccounts modalVis={modalVisible}
                     setModalVisOff={setModalVisible}/>
    </div>
  );
}
export default Posts;
