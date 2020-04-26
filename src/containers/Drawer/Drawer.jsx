import React from "react";
import { CSSTransition } from "react-transition-group";
import classes from "./Drawer.module.css";

class Drawer extends React.Component {
  render() {
    return (
      <CSSTransition
        unmountOnExit
        in={this.props.in}
        timeout={{ appear: 0, enter: 0, exit: 1000 }}
        classNames="roll"
        appear
      >
        <div className={classes.mainWrapper}>
          <div
            className={classes.overlay}
            onClick={this.props.closeDrawer}
          ></div>
          <div className={classes.drawerRight}>{this.props.children}</div>
        </div>
      </CSSTransition>
    );
  }
}

export default Drawer;
