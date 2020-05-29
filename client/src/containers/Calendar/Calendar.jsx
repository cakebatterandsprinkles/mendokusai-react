import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/actionTypes";
import { renderTodoCheckbox, renderTodos } from "../../util/todo";
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
  setCurrentDay,
} from "../../util/date";

class Calendar extends Component {
  constructor() {
    super();

    const today = new Date();
    const year = today.getFullYear();
    const month = getMonthName(today.getMonth());
    const day = new Date().getDate();

    this.state = {
      monthlyTodos: [],
      currentDay: "",
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
    this.setStateCurrentDay = this.setStateCurrentDay.bind(this);
  }

  getAdjustedMonth(month) {
    if (month + 1 < 10) {
      return `0${month + 1}`;
    } else {
      return month + 1;
    }
  }

  getMonthlyTodos() {
    fetch(
      `/todo/calendar?month=${this.getAdjustedMonth(this.state.month)}&year=${
        this.state.year
      }&daysInMonth=${getDaysInMonth(this.state.month, this.state.year)}`,
      {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then((blob) => blob.json())
      .then((response) => {
        this.setState({ monthlyTodos: response });
        console.log(this.state.monthlyTodos);
      });
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
    this.setState(
      {
        month: newMonth,
        year: newYear,
        monthName: getMonthName(newMonth),
        monthlyTodos: [],
      },
      () => this.getMonthlyTodos()
    );
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
    this.setState(
      {
        month: newMonth,
        year: newYear,
        monthName: getMonthName(newMonth),
        monthlyTodos: [],
      },
      () => this.getMonthlyTodos()
    );
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

  setStateCurrentDay = (date) => {
    this.setState({ currentDay: setCurrentDay(date) });
  };

  showTodosOnCalendar = (todoArr, date) => {
    const dailyTodos = todoArr.filter((todo) => {
      return todo.date.substring(8, 10) === date.toString();
    });
    const todoStatusArr = [];
    dailyTodos.forEach((todo) => {
      todoStatusArr.push(todo.status);
    });

    const hasDone = todoStatusArr.includes("done");
    const hasInProgress = todoStatusArr.includes("in progress");
    const hasNotDone = todoStatusArr.includes("not done");

    return (
      <div className={classes.progressIconsWrapper}>
        {hasNotDone ? (
          <img
            src={Circle}
            alt="not done icon"
            className={classes.progressIcons}
          />
        ) : null}
        {hasInProgress ? (
          <img
            src={Triangle}
            alt="in progress icon"
            className={classes.progressIcons}
          />
        ) : null}
        {hasDone ? (
          <img src={Star} alt="done icon" className={classes.progressIcons} />
        ) : null}
      </div>
    );
  };

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
              className={
                date === new Date().getDate() &&
                this.state.month === new Date().getMonth() &&
                this.state.year === new Date().getFullYear()
                  ? classes.today
                  : classes.days
              }
              onClick={(e) => {
                this.setStateCurrentDay(
                  date + getFirstDayOfMonth(this.state.month, this.state.year)
                );
                this.toggleDrawer(e);
              }}
              key={date}
            >
              {date}
              {this.showTodosOnCalendar(this.state.monthlyTodos, date)}
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

  componentDidMount() {
    this.getMonthlyTodos();
  }

  render() {
    return (
      <Aux>
        <div className={classes.mainContainer}>
          <div className={classes.month}>
            <p onClick={this.getPrevMonth} className={classes.arrow}>
              ↞
            </p>{" "}
            <div className={classes.currentMonth}>
              <p>{this.state.monthName}</p>
            </div>{" "}
            <p onClick={this.getNextMonth} className={classes.arrow}>
              ↠
            </p>
          </div>
          <h2 className={classes.year}>{this.state.year}</h2>
          <div className={classes.calendarContainer}>
            <div className={classes.weekday} id={classes.monday}>
              Monday
            </div>
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
              <div className={classes.dateContainer}>
                <div className={classes.heading}>{this.state.date}</div>
                <p className={classes.leftArrow}>➜</p>
                <div className={classes.subheading}>
                  {this.state.currentDay}
                </div>
              </div>
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
