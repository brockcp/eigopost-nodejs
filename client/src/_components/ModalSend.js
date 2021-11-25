import React from "react";
import {NavLink} from 'react-router-dom';
import {useFormikContext} from 'formik';
import {useTransition, animated} from "react-spring";
import close from "../assets/icon-close.svg";

const ModalSend = (props) => {
  const {values} = useFormikContext();
  const transitions = useTransition(props.modalVis, null, {
    from: { opacity: 0, transform: "translateY(-2.5rem)" },
    enter: { opacity: 1, transform: "translateY(0rem)" },
    leave: { opacity: 0, transform: "translateY(-2.5rem)" }
  });
  return (
    <div className="container-fluid">
      {transitions.map(({ item, key, props: style }) => item && (
          <ModalSendSub
            style={style}
            closeModal={() => props.setModalVisOff(false)}
            sendData={() => props.send(values)}
            statement={props.statement}
            key={key}
          />
      ))}
    </div>
  );
}

const ModalSendSub = ({ style, sendData, closeModal, statement }) => (
  <animated.div style={style}
                className="ep-modal">
    <div className="ep-modal-header">
      <h3 className="ep-modal-title">
       {statement}
      </h3>
    </div>
    <div className="ep-modal-body">
      <h5></h5>
    </div>
    <div className="ep-modal-footer">
      <button type="button" className="btn btn-primary me-2"
              onClick={sendData}>
        yes, post
      </button>
      <button type="button" className="btn btn-secondary ps-2"
              onClick={closeModal}>
        go back
      </button>
    </div>
  </animated.div>
);

export {ModalSend};
