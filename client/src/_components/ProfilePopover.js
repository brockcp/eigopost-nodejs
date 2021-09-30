import React from "react";
import {NavLink} from 'react-router-dom';
import {useTransition, animated} from "react-spring";
import close from "../assets/icon-close.svg";

const ProfilePopover = (props) => {

  const transitions = useTransition(props.isPopOpen, null, {
    from: { opacity: 0, transform: "translateY(-10px)" },
    enter: { opacity: 1, transform: "translateY(0px)" },
    leave: { opacity: 0, transform: "translateY(-10px)" }
  });
  return (
    <div className="container-fluid">
      {transitions.map(({ item, key, props: style }) => item && (
          <ProfilePopoverSub
            style={style}
            key={key}
            ref2={props.ref2}
            setPop={() => props.setPopOpen(false)}
          />
      ))}
    </div>
  );
}

const ProfilePopoverSub = ({ style, ref2, setPop }) => (
  <animated.div style={style}
                className="popover-container"
                ref={ref2}
  >
    <NavLink to="/profile"
             className="popover"
             onClick={setPop}>
      profile & activity
    </NavLink>
  </animated.div>
);

export {ProfilePopover};
