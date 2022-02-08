import React,{useState, useEffect} from 'react';
import {accountService, postsComments} from '@/_services';
import config from 'config';
import {HookFetch} from '../_helpers/HookFetch';
import {Loader} from '../_components/Loader';
import CommentForm from './CommentForm';
import {CommentVoting} from './CommentVoting';
import {ModalAccounts} from '../_components/ModalAccounts';
import {useTransition, animated} from "react-spring";
import './comments.css';

const Comments= (props) => {
  const user = accountService.userValue;
  const {data, error, loading} = HookFetch(`${config.apiUrl}/posts/postComments/${props.postId}`);
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
    return <CommentVoting data={x}
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
                  <h6 className="no-comments">
                    There are no comments for this post.
                  </h6>
                }
              <CommentForm postId={props.postId}/>
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
