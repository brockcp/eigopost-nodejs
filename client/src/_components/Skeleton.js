import React from 'react';
import './Skeleton.css';

const Skeleton = () => {
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

const SkeletonEffects = () => {
  return (
    <div className="effects-container">
      <div className="effects" />
    </div>
  )
}

export {Skeleton};
