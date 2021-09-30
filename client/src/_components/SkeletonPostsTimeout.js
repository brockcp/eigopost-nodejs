import React,{useState, useEffect} from 'react';
import {SkeletonEffects} from './SkeletonEffects';

const SkeltonPostsTimeout = () => {
  const [show, setShow] = useState(true);
  useEffect(
    ()=>{
      let timer1 = setTimeout(() => {
        setShow(false);
      },3000);
      return () => {
      clearTimeout(timer1);
    };
    },
  []);

  if(show) return(
    <div className="skel-container posts-box">
      <h2 className="skel-line skel-post-title"></h2>
      <div className="skel-line skel-post-body"></div>
      <div className="skel-line skel-post-body"></div>
      <div className="skel-line skel-meta"></div>
      <SkeletonEffects />
    </div>
  )
    return null;
  }
  export {SkeltonPostsTimeout};
