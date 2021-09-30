import React from "react";
import {NavLink} from 'react-router-dom';
import { useTransition, animated } from "react-spring";
import close from "../assets/icon-close.svg";

const ModalDelete = (props) => {
  const transitions = useTransition(props.modalVis, null, {
    from: { opacity: 0, transform: "translateY(-40px)" },
    enter: { opacity: 1, transform: "translateY(0px)" },
    leave: { opacity: 0, transform: "translateY(-40px)" }
  });
  return (
    <div className="container-fluid">
      {transitions.map(({ item, key, props: style }) => item && (
          <ModalDeleteSub
            style={style}
            closeModal={() => props.setModalVisOff(false)}
            deleteModal={() => props.deleteAccount()}
            key={key}
          />
        )
      )}
    </div>
  );
}

const ModalDeleteSub = ({ style, deleteModal, closeModal }) => (
  <animated.div style={style}
  className="ep-modal">
    <div className="ep-modal-header">
      <h3 className="ep-modal-title">
       Are you sure you want to delete your account?
      </h3>
    </div>
    <div className="ep-modal-body">
      <h5></h5>
    </div>
    <div className="ep-modal-footer">
      <button className="btn btn-secondary mr-1"
              onClick={deleteModal}>
        yes, delete
      </button>
      <button className="btn btn-primary"
              onClick={closeModal}>
        go back
      </button>
    </div>
  </animated.div>
);

export {ModalDelete};
