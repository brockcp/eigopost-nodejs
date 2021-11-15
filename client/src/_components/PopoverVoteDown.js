import React from 'react';
import {useTransition, animated} from "react-spring";

const PopoverVoteDown = (props) => {
  const transitions = useTransition(props.modalOpen, null, {
     from: { opacity: 0, transform: "translateX(10px)"},
    enter: { opacity: 1, transform: "translateX(0px)"},
    leave: { opacity: 0, transform: "translateX(-10px)"}
  });
  return (
    <div className="container">
      {transitions.map(({ item, key, props: style }) => item && (
          <PopoverVoteDownSub
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
const PopoverVoteDownSub = ({ style, value, setClose, voteAlert }) => (
  <animated.div style={style}
                className="popover-container-down"
  >
    <div className='popover-down'>
      <span style={{ whiteSpace: 'nowrap' }}>{value}</span>
    </div>
  </animated.div>
);

export {PopoverVoteDown};
