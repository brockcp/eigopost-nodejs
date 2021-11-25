import React,{useState, useEffect} from 'react';
import {accountService, postsComments} from '@/_services';
import config from 'config';
import {hookFetch} from '../_helpers/hook-fetch';
import {Loader} from '../_components/Loader';
import FormComment from './FormComment';
import {Comment} from '../_components/Comment';
import {ModalAccounts} from '../_components/ModalAccounts';

import {useTransition, animated} from "react-spring";

const Comments= (props) => {
  const user = accountService.userValue;
  const {data, error, loading} = hookFetch(`${config.apiUrl}/posts/postComments/${props.postId}`);
  const [commentsData, setCommentsData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const upVote = (commentId) => {
    if(user){
      postsComments.upVoteRegister(commentId, user.id)
      .then((res) => res.json())
      .then((res) => {
        if(res.success){
          updateComment(res.comment);
        }
      })
      .catch((err) => {
      });
    }
    else{
      setModalVisible(true);
    }
  };
  const downVote = (commentId) => {
    if(user){
        postsComments.downVoteRegister(commentId, user.id)
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            updateComment(res.comment);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    else{
      setModalVisible(true);
    }
  };
  const updateComment = (commentId) => {
    let comments = [...commentsData];
    comments.forEach((y, z) => {
      if (y._id === commentId._id) {
        comments[z] = commentId;
      }
    });
    setCommentsData(comments);
  };
  const comments = commentsData && commentsData.map((x) => {
    return <Comment data={x}
                    key={x._id}
                    upVote={upVote}
                    downVote={downVote}
                    upDateComment={updateComment}
                    user={user}
            />;
  });
  useEffect(()=>{
    setCommentsData(data);
  },[data]);
  return (
    <div className="comments">
      <h4>comments</h4>
      {error &&
        <div>
          Oops. Please refresh your browser
        </div>
      }
      {loading ? (
         <Loader/>
         ):(
         <div className="container fade-in">
          {commentsData &&
            <div>
                {comments}
                {commentsData < 1 &&
                  <h5 className="no-comments">
                    Be the first to comment on this post.
                  </h5>
                }
              <FormComment postId={props.postId}/>
            </div>
          }
         </div>
       )}
       <ModalAccounts modalVis={modalVisible}
                      setModalVisOff={setModalVisible}/>
     </div>
  )
}
export default Comments;
