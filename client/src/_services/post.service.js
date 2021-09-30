import { fetchWrapper, history } from '@/_helpers';
import config from 'config';
const baseUrl = `${config.apiUrl}/posts`;

export const postsComments = {
  postRegister,
  commentRegister,
  upVoteRegister,
  downVoteRegister
}
function postRegister(params){
  return fetchWrapper.post(`${baseUrl}/new-post`, params);
}
function commentRegister(params, postID){
  return fetchWrapper.post(`${baseUrl}/new-comment/${postID}`, params);
}
function upVoteRegister(commentId, userId){
  return  fetch(`${baseUrl}/comment/upvote/${commentId}`,{
          method: 'PUT',
          headers:{
             'Accept': 'application/json, text/plain, */*',
             'Content-Type': 'application/json'
          },
          body: JSON.stringify({user :userId})
  })
}

function downVoteRegister(commentId, userId){
  return  fetch(`${baseUrl}/comment/downvote/${commentId}`,{
          method: 'PUT',
          headers:{
             'Accept': 'application/json, text/plain, */*',
             'Content-Type': 'application/json'
          },
          body: JSON.stringify({user :userId})
  })
}
