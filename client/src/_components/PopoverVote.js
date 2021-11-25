import React from 'react';
import {useTransition, animated} from "react-spring";

const PopoverVote = (props) => {
  const transitions = useTransition(props.popoverOpen, null, {
     from: { opacity: 0, transform: "translateY(-.188rem)"},
    enter: { opacity: 1, transform: "translateY(0rem)"},
    leave: { opacity: 0, transform: "translateY(.188rem)"}
  });
  return (
    <div className="container">
      {transitions.map(({ item, key, props: style }) => item && (
          <PopoverVoteSub
            style={style}
            key={key}
            text={props.text}
            cssClass={props.cssClass}
          />
      ))}
    </div>
  );
}
const PopoverVoteSub = ({ style,
                          text,
                          cssClass
                        }) => (
  <animated.div style={style}
                className="popover-vote-container"
  >
    <div className={cssClass}>
      <span style={{ whiteSpace: 'nowrap' }}>
        {text}
      </span>
    </div>
  </animated.div>
);

export {PopoverVote};
