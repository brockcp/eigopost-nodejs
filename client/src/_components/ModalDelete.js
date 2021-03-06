import React from "react";
import {NavLink} from 'react-router-dom';
import { useTransition, animated } from "react-spring";
import close from "../assets/icon-close.svg";
import './Modal.css';

const ModalDelete = (props) => {
  const transitions = useTransition(props.modalVis, null, {
    from: { opacity: 0, transform: "translateY(-2.5rem)" },
    enter: { opacity: 1, transform: "translateY(0rem)" },
    leave: { opacity: 0, transform: "translateY(-2.5rem)" }
  });
  return (
    <div className="container-fluid">
      {transitions.map(({ item, key, props: style }) => item && (
          <ModalDeleteSub
            style={style}
            closeModal={() => props.setModalVisOff(false)}
            deleteModal={() => props.deleteAccount()}
            isSubmitting={props.isSubmitting}
            key={key}
          />
        )
      )}
    </div>
  );
}

const ModalDeleteSub = ({ style,
                          deleteModal,
                          closeModal,
                          isSubmitting
                       }) => (
  <animated.div style={style}
                className="ep-modal">
    <div className="ep-modal-header">
      <h3 className="ep-modal-title">
       Are you sure you want to delete your account?
      </h3>
    </div>
    <div className="ep-modal-body">
      <h5>We will miss you...</h5>
    </div>
    <div className="ep-modal-footer">
      <button type="button"
              className="btn btn-primary me-2"
              onClick={deleteModal}>
              {isSubmitting ? <span className="ep-spinner ep-spinner-sm mr-1"></span> : "delete"}
      </button>
      <button type="button"
              className="btn btn-secondary ps-2"
              onClick={closeModal}>
        go back
      </button>
    </div>
  </animated.div>
);

export {ModalDelete};
