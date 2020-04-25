import React, { Component, Fragment } from "react";
import LegendFooter from "../../components/LegendFooter/LegendFooter";
import Aux from "../../hoc/Aux";
import classes from "./Calendar.module.css";
import Drawer from "../Drawer/Drawer";
import CloseButton from "../../assets/images/closeButton.png";
import {
  getMonthName,
  getDaysInMonth,
  getFirstDayOfMonth,
} from "../../util/date";

class Calendar extends Component {
  constructor() {
    super();

    const today = new Date();
    const year = today.getFullYear();
    const month = getMonthName(today.getMonth());

    this.state = {
      drawerOpen: false,
      monthName: month,
      month: today.getMonth(),
      year: year,
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
    this.getPrevMonth = this.getPrevMonth.bind(this);
    this.getNextMonth = this.getNextMonth.bind(this);
  }

  toggleDrawer() {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  }
  closeDrawer() {
    this.setState({ drawerOpen: false });
  }

  getPrevMonth() {
    let newMonth = this.state.month - 1;
    let newYear;
    if (newMonth < 0) {
      newMonth = 11;
      newYear = this.state.year - 1;
    } else {
      newYear = this.state.year;
    }
    this.setState({
      month: newMonth,
      year: newYear,
      monthName: getMonthName(newMonth),
    });
  }

  getNextMonth() {
    let newMonth = this.state.month + 1;
    let newYear;
    if (newMonth > 11) {
      newMonth = 0;
      newYear = this.state.year + 1;
    } else {
      newYear = this.state.year;
    }
    this.setState({
      month: newMonth,
      year: newYear,
      monthName: getMonthName(newMonth),
    });
  }

  renderPadding() {
    const paddingArr = [];
    const paddingNum = getFirstDayOfMonth(this.state.month, this.state.year);
    for (let i = 0; i < paddingNum; i++) {
      paddingArr.push(i);
    }

    return (
      <Fragment>
        {paddingArr.map((padding) => {
          return <div key={padding}></div>;
        })}
      </Fragment>
    );
  }

  renderDays() {
    const daysInCurrentMonth = getDaysInMonth(
      this.state.month,
      this.state.year
    );

    const dateArray = [];

    for (let day = 1; day <= daysInCurrentMonth; day++) {
      dateArray.push(day);
    }

    return (
      <Fragment>
        {dateArray.map((date) => {
          return (
            <div
              className={classes.days}
              onClick={this.toggleDrawer}
              key={date}
            >
              {date}
            </div>
          );
        })}
      </Fragment>
    );
  }

  renderCalendar() {
    return (
      <Fragment>
        {this.renderPadding()}
        {this.renderDays()}
      </Fragment>
    );
  }

  render() {
    return (
      <Aux>
        <div className={classes.mainContainer}>
          <div className={classes.month}>
            <h2>
              <span onClick={this.getPrevMonth} className={classes.arrow}>
                ↞
              </span>{" "}
              {this.state.monthName}{" "}
              <span onClick={this.getNextMonth} className={classes.arrow}>
                ↠
              </span>
            </h2>
          </div>
          <h2 className={classes.year}>{this.state.year}</h2>
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
            {this.renderCalendar()}
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
