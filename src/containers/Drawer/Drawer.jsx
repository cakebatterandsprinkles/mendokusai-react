import React from "react";
import classes from "./Drawer.module.css";

class Drawer extends React.Component {
  render() {
    return (
      <div>
        <div className={classes.overlay} onClick={this.props.closeDrawer}></div>
        <div className={classes.drawerRight}>{this.props.children}</div>
      </div>
    );
  }
}

export default Drawer;
