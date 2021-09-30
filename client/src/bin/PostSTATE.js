import React from 'react';
import config from 'config';
import axios from 'axios';
import moment from 'moment';
import Loader from '../_components/Loader';
import VoteModal from '../_components/VoteModal';
import Comments from './Comments';
import NewComment from './NewComment';
import {NotFound} from '../_components/NotFound';

class Post extends React.Component{
 constructor(props){
   super(props);
   this.state={
     isLoaded:false,
     post:[],
    // postId:'',
     voteModalVisible:false
   }
 }
 componentDidMount(){
  document.title = `Eigopost - ${this.props.match.params.slug}`;
  axios.get(`${config.apiUrl}/posts/${this.props.match.params.slug}`)
  .then(res=>{
    this.setState({
      post: res.data,
      isLoaded: true
      //postId:res.data._id
    });
    console.log()
  })
}
voteModalVisibleOn=()=>{
  this.setState({
    voteModalVisible:true
  })
}
voteModalVisibleOff=()=>{
  this.setState({
    voteModalVisible:false
  })
}
render(){

  if(!this.state.isLoaded){
    return <Loader/>
  }
  if(this.state.post === null){
    return <NotFound/>
  }
  const postId = this.state.post._id;
  return(
    <div className="container fadein">
      <div className="row">
      <VoteModal modalVis={this.state.voteModalVisible}
                 setModalVisOff={this.voteModalVisibleOff}/>
          <div className="col-sm-12 col-lg-8">
            <div className="row">
              {!this.state.isLoaded ? <Loader/> : (
              <div className="col pt-3">
                <h3 className="mb-0 color-1d">{this.state.post.post_title}</h3>
                <small className="color-3l">posted by <span className="color-1">{this.state.post.userId && this.state.post.userId[0].userName}</span></small>
                <small className="color-3l"> at {moment(this.state.post.createdAt).format('MM/DD/YYYY')}</small>
                <p className="lead color-3d">{this.state.post.post_body}</p>
              </div>
              )}
            </div>
            <h5 className="color-1d">comments</h5>
               <Comments postID={postId}
                         setModalVisOn={this.voteModalVisibleOn}/>
                 <div className="row">
                   <div className="col mb-4">
                     <div className="color-3d mt-4"></div>
                     <NewComment postID={postId}/>
                     </div>
                   </div>
                 </div>
               <div className="col-sm-0 col-lg-4"></div>
             </div>
           </div>
         )

       }
     }

export default Post;
