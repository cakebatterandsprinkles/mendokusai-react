import React, { Component } from "react";
import LegendFooter from "../../components/LegendFooter/LegendFooter";
import Aux from "../../hoc/Aux";
import classes from "./Calendar.module.css";
import Drawer from "../Drawer/Drawer";
import CloseButton from "../../assets/images/closeButton.png";

class Calendar extends Component {
  constructor() {
    super();
    this.state = {
      drawerOpen: false,
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
  }

  toggleDrawer() {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  }
  closeDrawer() {
    this.setState({ drawerOpen: false });
  }

  render() {
    return (
      <Aux>
        <div className={classes.mainContainer}>
          <div className={classes.month}>
            <h2>↞ January ↠</h2>
          </div>
          <h2 className={classes.year}>2020</h2>
          <div className={classes.calendarContainer}>
            <div className={classes.weekday}>Monday</div>
            <div className={classes.weekday}>Tuesday</div>
            <div className={classes.weekday}>Wednesday</div>
            <div className={classes.weekday}>Thursday</div>
            <div className={classes.weekday}>Friday</div>
            <div className={`${classes.weekday} ${classes.saturday}`}>
              Saturday
            </div>
            <div className={`${classes.weekday} ${classes.sunday}`}>Sunday</div>
            <div className={classes.days} onClick={this.toggleDrawer}>
              1
            </div>
            <div className={classes.days}>2</div>
            <div className={classes.days}>3</div>
            <div className={classes.days}>4</div>
            <div className={classes.days}>5</div>
            <div className={classes.days}>6</div>
            <div className={classes.days}>7</div>
            <div className={classes.days}>8</div>
            <div className={classes.days}>9</div>
            <div className={classes.days}>10</div>
            <div className={classes.days}>11</div>
            <div className={classes.days}>12</div>
            <div className={classes.days}>13</div>
            <div className={classes.days}>14</div>
            <div className={classes.days}>15</div>
            <div className={classes.days}>16</div>
            <div className={classes.days}>17</div>
            <div className={classes.days}>18</div>
            <div className={classes.days}>19</div>
            <div className={classes.days}>20</div>
            <div className={classes.days}>21</div>
            <div className={classes.days}>22</div>
            <div className={classes.days}>23</div>
            <div className={classes.days}>24</div>
            <div className={classes.days}>25</div>
            <div className={classes.days}>26</div>
            <div className={classes.days}>27</div>
            <div className={classes.days}>28</div>
            <div className={classes.days}>29</div>
            <div className={classes.days}>30</div>
          </div>
          <LegendFooter />
          {this.state.drawerOpen ? (
            <Drawer open={this.state.drawerOpen} closeDrawer={this.closeDrawer}>
              <img
                src={CloseButton}
                alt="closing button"
                className={classes.closebtn}
                onClick={this.closeDrawer}
              />
              <div className={classes.drawerContent}>
                <div className={classes.notDoneContainer}></div>
                <div className={classes.inProgressContainer}></div>
                <div className={classes.doneContainer}></div>
              </div>
            </Drawer>
          ) : null}
        </div>
      </Aux>
    );
  }
}

export default Calendar;
