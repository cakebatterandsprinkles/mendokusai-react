import React, { Component, Fragment } from "react";
import LegendFooter from "../../components/LegendFooter/LegendFooter";
import Aux from "../../hoc/Aux";
import classes from "./Calendar.module.css";
import Drawer from "../Drawer/Drawer";
import CloseButton from "../../assets/images/closeButton.png";
import Circle from "../../assets/images/circle.png";
import Triangle from "../../assets/images/triangle.png";
import Star from "../../assets/images/star.png";
import AddIcon from "../../assets/images/addbutton.png";
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
    const day = new Date().getDate();

    this.state = {
      entered: true,
      drawerOpen: false,
      monthName: month,
      month: today.getMonth(),
      year: year,
      date: `${month} ${day}, ${year}`,
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
    this.getPrevMonth = this.getPrevMonth.bind(this);
    this.getNextMonth = this.getNextMonth.bind(this);
  }

  toggleDrawer(e) {
    const day = e.target.innerText;
    this.setState({
      drawerOpen: !this.state.drawerOpen,
      date: `${this.state.monthName} ${day}, ${this.state.year}`,
      entered: !this.state.entered,
    });
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
              onClick={(e) => {
                this.toggleDrawer(e);
              }}
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
          <Drawer closeDrawer={this.closeDrawer} in={this.state.drawerOpen}>
            <img
              src={CloseButton}
              alt="closing button"
              className={classes.closebtn}
              onClick={this.closeDrawer}
            />
            <div className={classes.drawerContent}>
              <div className={classes.heading}>{this.state.date}</div>
              <div className={classes.notDoneContainer}>
                <div className={classes.wrapper}>
                  <img
                    src={Circle}
                    alt="closing button"
                    className={classes.icon}
                  />
                  <div className={classes.headerContainer}>
                    <p>To Be Done:</p>
                  </div>
                  <img
                    src={AddIcon}
                    alt="closing button"
                    className={classes.icon}
                  />
                </div>
              </div>
              <div className={classes.inProgressContainer}>
                <div className={classes.wrapper}>
                  <img
                    src={Triangle}
                    alt="closing button"
                    className={classes.icon}
                  />
                  <div className={classes.headerContainer}>
                    <p>In Progress:</p>
                  </div>
                  <img
                    src={AddIcon}
                    alt="closing button"
                    className={classes.icon}
                  />
                </div>
              </div>
              <div className={classes.doneContainer}>
                <div className={classes.wrapper}>
                  <img
                    src={Star}
                    alt="closing button"
                    className={classes.icon}
                  />
                  <div className={classes.headerContainer}>
                    <p>Done:</p>
                  </div>
                  <img
                    src={AddIcon}
                    alt="closing button"
                    className={classes.icon}
                  />
                </div>
              </div>
            </div>
          </Drawer>
        </div>
      </Aux>
    );
  }
}

export default Calendar;
