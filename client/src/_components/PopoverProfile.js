import React from "react";
import {NavLink} from 'react-router-dom';
import {useTransition, animated} from "react-spring";
import close from "../assets/icon-close.svg";

const PopoverProfile = (props) => {
  const transitions = useTransition(props.isPopOpen, null, {
    from: { opacity: 0, transform: "translateY(-.625rem)" },
    enter: { opacity: 1, transform: "translateY(0rem)" },
    leave: { opacity: 0, transform: "translateY(-.625rem)" }
  });
  return (
    <div className="container-fluid">
      {transitions.map(({ item, key, props: style }) => item && (
          <PopoverProfileSub
            style={style}
            key={key}
            ref2={props.ref2}
            setPop={() => props.setPopOpen(false)}
            popStyle={props.popoverStyle}
            popMessage={props.popoverMessage}
          />
      ))}
    </div>
  );
}

const PopoverProfileSub = ({ style, ref2, setPop, popStyle, popMessage }) => (
  <animated.div style={style}
                className="popover-container-profile"
                ref={ref2}
  >
    <NavLink to="/profile"
             className={popStyle}
             onClick={setPop}>
      {popMessage}
    </NavLink>
  </animated.div>
);
export {PopoverProfile};
