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
    <div className="">
      <h4 className="color-1d">comments</h4>
      {error && <div>Oops. Please refresh your browser</div>}
      {loading ? (
         <Loader/>
         ):(
         <div className="container">
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
              <p className="mb-0 color-3d"> {x.comment_body}</p>
              <small className="color-3">comment by
                <span className="color-1l">
                  &emsp;{x.userName}&emsp;
                </span>
              </small>
              <small className="color-3">
                 on {moment(x.createdAt).format('MM/DD/YYYY')}
              </small>
            </div>
            <ModalAccounts modalVis={modalVisible}
                            setModalVisOff={setModalVisible}/>
           </div>
          ))}
          {commentsData < 1 && <div>Be the first to comment on this post.</div>}
         </div>
       )}

      <FormComment postId={props.postId}/>
    </div>
  )
}
export default Comments;
