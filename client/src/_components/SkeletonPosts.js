import React from 'react';
import {SkeletonEffects} from './SkeletonEffects';

const SkeletonPosts = () => {
  return(
    <div className="skel-container posts-box">
      <h2 className="skel-line skel-post-title"></h2>
      <div className="skel-line skel-post-body"></div>
      <div className="skel-line skel-post-body"></div>
      <div className="skel-line skel-meta"></div>
      <SkeletonEffects />
    </div>
  )
}
export {SkeletonPosts};
