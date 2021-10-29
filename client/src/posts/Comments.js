import React,{useState, useEffect} from 'react';
import {accountService, postsComments} from '@/_services';
import config from 'config';
import {hookFetch} from '../_helpers/hook-fetch';
import moment from 'moment';
import voteUp from '../assets/icon-votingUp.svg';
import voteDown from '../assets/icon-votingDown.svg';
import {Loader} from '../_components/Loader';
import FormComment from './FormComment';
import {ModalAccounts} from '../_components/ModalAccounts';

const Comments= (props) => {
  const user = accountService.userValue;
  const {data, error, loading} = hookFetch(`${config.apiUrl}/posts/postComments/${props.postId}`);
  const [commentsData, setCommentsData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(()=>{
    setCommentsData(data);
  },[data]);

  function upVote(commentId){
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
  function downVote(commentId){
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
  function updateComment(commentId){
    let comments = [...commentsData];
    comments.forEach((y, z) => {
      if (y._id === commentId._id) {
        comments[z] = commentId;
      }
    });
    setCommentsData(comments);
  };
  return (
    <div className="comments">
      <h4 className="pt-4">comments</h4>
      {error && <div>Oops. Please refresh your browser</div>}
      {loading ? (
         <Loader/>
         ):(
         <div className="container fade-in">
          {commentsData &&
            <div className="">
              <div className="">
                  {commentsData.map((x,y)=>(
                     <div key={y}
                          className="row p-2 comments-box">
                          <div className="col-1 d-flex align-items-center">
                            <div className="voting-box">
                              <img src={voteUp}
                                    className={`d-block ${user && x.upvotedby.includes(user.id) ?
                                      'upvoted' : ''}`}
                                    onClick={()=>upVote(x._id)}
                               />
                              <div className="votes d-block align-middle pt-1">{x.score}</div>
                              <img src={voteDown}
                                    className={`d-block ${user && x.downvotedby.includes(user.id) ?
                                      'downvoted' : ''}`}
                                    onClick={()=>downVote(x._id)}
                               />
                            </div>
                          </div>
                          <div className="col-11">
                            <p className="mb-0"> {x.comment_body}</p>
                            <small className="comment-info">comment by
                              <span className="user-name">
                                &emsp;{x.userName}&emsp;
                              </span>
                            </small>
                            <small className="comment-date">
                               on {moment(x.createdAt).format('MM/DD/YYYY')}
                            </small>
                          </div>
                     </div>
                  ))}
                  {commentsData < 1 && <h5 className="no-comments">This post has no comments.</h5>}
              </div>
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
