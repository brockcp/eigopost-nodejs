import React from "react";
import {NavLink} from 'react-router-dom';
import {useTransition, animated} from "react-spring";
import close from "../assets/icon-close.svg";

const ModalAccounts = (props) => {
  const transitions = useTransition(props.modalVis, null, {
    from: { opacity: 0, transform: "translateY(-40px)" },
    enter: { opacity: 1, transform: "translateY(0px)" },
    leave: { opacity: 0, transform: "translateY(-40px)" }
  });
  return (
    <div className="container-fluid">
      {transitions.map(({ item, key, props: style }) => item && (
          <ModalAccountsSub
            style={style}
            closeModal={() => props.setModalVisOff(false)}
            key={key}
          />
        )
      )}
    </div>
  );
}

const ModalAccountsSub = ({ style, closeModal }) => (
  <animated.div style={style}
  className="ep-modal">
    <div className="ep-modal-header">
      <h3 className="ep-modal-title">We are so glad you want to participate.</h3>
      <div className="ep-modal-icon-container">
        <img src={close}
             onClick={closeModal} />
      </div>
    </div>
    <div className="ep-modal-body">
      <h5>However, you must signup to post, comment or vote.</h5>
    </div>
    <div className="ep-modal-footer">
      <NavLink to='/account/login' className="btn btn-secondary mr-1">Sign In</NavLink>
      <NavLink to='/account/register' className="btn btn-primary">Sign Up</NavLink>
    </div>
  </animated.div>
);

export {ModalAccounts};
