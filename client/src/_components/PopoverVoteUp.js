import React from 'react';
import {useTransition, animated} from "react-spring";

const PopoverVoteUp = (props) => {
  const transitions = useTransition(props.modalOpen, null, {
     from: { opacity: 0, transform: "translateX(10px)"},
    enter: { opacity: 1, transform: "translateX(0px)"},
    leave: { opacity: 0, transform: "translateX(-10px)"}
  });
  return (
    <div className="container">
      {transitions.map(({ item, key, props: style }) => item && (
          <PopoverVoteUpSub
            style={style}
            key={key}
            setClose={props.onClose}
            value={props.value}
            voteAlert={props.voteAlert}
          />
      ))}
    </div>
  );
}
const PopoverVoteUpSub = ({ style, value, setClose, voteAlert }) => (
  <animated.div style={style}
                className="popover-container-Up"
  >
    <div className='popover-Up'>
      <span style={{ whiteSpace: 'nowrap' }}>{value}</span>
    </div>
  </animated.div>
);

export {PopoverVoteUp};
