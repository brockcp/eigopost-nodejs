import React from 'react';
import {Link} from 'react-router-dom';
import { accountService } from '@/_services';
import axios from 'axios';
import moment from 'moment';
import Loader from '../_components/Loader';
import VoteModal from '../_components/VoteModal';
import config from 'config';

class Posts extends React.Component{
  constructor(props){
    super(props);
    this.state={
      isLoaded:false,
      voteModalVisible:false,
      posts:[],
      user:accountService.userValue
    }
  }
  componentDidMount(){
   document.title = 'EigoPost | Posts';
   axios.get(`${config.apiUrl}/posts`)
   .then(res=>{
     this.setState({
       isLoaded: true,
       posts: res.data
     });
   })
 }
 checkUser=()=>{
   if(!this.state.user){
     this.voteModalVisibleOn();
   }else{
     this.props.history.push('new-post');
   }
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
   function post_body_func(x){
        if(x.length<20){
          return(
            x
          )
        }else{
        return(
          x.substr(0,20) + '...'
        );
      }
   }

   return(
      <div className="container fadein pt-3 pb-5">
        <div className="row">
        <VoteModal modalVis={this.state.voteModalVisible}
                   setModalVisOff={this.voteModalVisibleOff}/>
          <div className="col-md-8">
            <div className="d-flex justify-content-between align-items-center">
              <h1 className="color-1d">EigoPost<small className="color-3">s</small></h1>
              <button className="btn btn-primary" onClick={this.checkUser}>New Post</button>            </div>
              {!this.state.isLoaded ? <Loader/> : (
              <div className="border-b-3l1">
                {this.state.posts.map((x,y)=>(
                  <div key={y} className="p-2 border-tlr-3l1">
                    <Link to={"/posts/" + x.slug} className="">
                      <h4 className="mb-0 color-3 font-w-400">{x.post_title}</h4>
                      <p className="lead mb-0 color-3">{post_body_func(x.post_body)}</p>
                      <small className="color-3l">submitted {moment(x.createdAt).format('MM/DD/YY')} by </small>
                      <small className="color-1l">{x.userId[0].userName}</small><br />
                      <small className="color-1l">{x.comments.length} comments</small>
                    </Link>
                  </div>
                ))}
              </div>
            )}
            <div className='pt-2'></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Posts;
