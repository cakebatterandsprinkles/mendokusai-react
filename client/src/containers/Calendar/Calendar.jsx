import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/actionTypes";
import Modal from "react-modal";
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
import ClosingButton from "../../assets/images/closeButton.png";
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
      currentDateTodos: [],
      currentDay: "",
      currentDate: "",
      entered: true,
      drawerOpen: false,
      monthName: month,
      month: today.getMonth(),
      year: year,
      date: `${month} ${day}, ${year}`,
      showModal: false,
      addInput: "",
      status: "",
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
    this.getPrevMonth = this.getPrevMonth.bind(this);
    this.getNextMonth = this.getNextMonth.bind(this);
    this.setStateCurrentDay = this.setStateCurrentDay.bind(this);
    this.sortArray = this.sortArray.bind(this);
    this.renderDrawerList = this.renderDrawerList.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.renderModalContent = this.renderModalContent.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addToDo = this.addToDo.bind(this);
    this.updateToDo = this.updateToDo.bind(this);
    this.deleteToDo = this.deleteToDo.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit() {
    this.addToDo({
      todo: this.state.addInput,
      status: this.state.status,
      date: `${this.state.year}-${this.state.month + 1}-${
        this.state.currentDate
      }`,
    });
    this.setState({ addInput: "" });
    this.handleCloseModal();
  }

  renderModalContent(string) {
    return (
      <div className={classes.modalMainContainer}>
        <div className={classes.addToDoForm}>
          <form onSubmit={this.handleSubmit}>
            <div className={classes.formGroupContainer}>
              <label htmlFor="add-item">
                Add an item to your {string} list:
              </label>
              <input
                onChange={this.handleInputChange}
                value={this.state.addInput}
                type="text"
                name="addInput"
                id="addInput"
              ></input>
            </div>
            <div className={classes.btnWrapper}>
              <button type="submit" className={classes.btn}>
                Add
              </button>
            </div>
          </form>
        </div>
        <div className={classes.closingButtonContainer}>
          <img
            src={ClosingButton}
            alt="closing button"
            className={classes.closingButton}
            onClick={this.handleCloseModal}
          />
        </div>
      </div>
    );
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
      currentDate: `${day}`,
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

  sortArray = (todoArr, filterString) => {
    return todoArr.filter((item) => item.status === filterString);
  };

  renderDrawerList = (todoArr, filterString) => {
    return this.sortArray(
      todoArr.filter(
        (item) => item.date.substring(8, 10) === this.state.currentDate
      ),
      filterString
    ).map((item) => {
      return (
        <div key={item._id} className={classes.todo}>
          <div className={classes.mainWrapper}>
            <img
              className={classes.checkboxIcon}
              src={renderTodoCheckbox(item)}
              alt="checkbox icon"
              onClick={() => this.changeStatus(item)}
              data-todo-value={renderTodos(item)}
            />
            <div className={classes.todoWrapper}>
              <p
                onClick={() => this.changeStatus(item)}
                data-todo-value={renderTodos(item)}
              >
                {renderTodos(item)}
              </p>
            </div>
          </div>
          <img
            src={ClosingButton}
            alt="delete button"
            className={classes.deleteButton}
            data-value={renderTodos(item)}
            onClick={() => this.deleteToDo(item._id)}
          />
        </div>
      );
    });
  };

  deleteToDo(id) {
    fetch("/todo/calendar", {
      method: "DELETE",
      body: JSON.stringify({ id: id }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then(() =>
      this.props.updateCalendar(
        this.props.currentMonthTodoList.filter((todo) => todo._id !== id)
      )
    );
  }

  updateToDo(todo) {
    fetch("/todo/calendar", {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((blob) => blob.json())
      .then((updatedTodo) => {
        const updatedList = [
          ...this.props.currentMonthTodoList.filter(
            (oldToDo) => updatedTodo._id !== oldToDo._id
          ),
          updatedTodo,
        ];
        this.props.updateCalendar(updatedList);
      });
  }

  addToDo(todo) {
    fetch("/todo/calendar", {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((blob) => blob.json())
      .then((response) => {
        const updatedList = [...this.props.currentMonthTodoList, response];
        this.props.updateCalendar(updatedList);
      });
  }

  changeStatus(item) {
    const status = item.status;
    switch (status) {
      case "not done":
        item.status = "in progress";
        break;
      case "in progress":
        item.status = "done";
        break;
      case "done":
        item.status = "not done";
        break;
      default:
        item.status = "not done";
    }
    this.updateToDo(item);
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
    let currentModal = this.renderModalContent();
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
                    alt="not done icon"
                    className={classes.icon}
                  />
                  <div className={classes.headerContainer}>
                    <p>To Be Done:</p>
                  </div>
                  <img
                    src={AddIcon}
                    alt="add button"
                    className={classes.icon}
                    onClick={() => {
                      this.setState({ status: "not done" });
                      this.handleOpenModal();
                    }}
                  />
                </div>
                <div>
                  {this.renderDrawerList(this.state.monthlyTodos, "not done")}
                </div>
              </div>
              <div className={classes.inProgressContainer}>
                <div className={classes.wrapper}>
                  <img
                    src={Triangle}
                    alt="in progress icon"
                    className={classes.icon}
                  />
                  <div className={classes.headerContainer}>
                    <p>In Progress:</p>
                  </div>
                  <img
                    src={AddIcon}
                    alt="add button"
                    className={classes.icon}
                    onClick={() => {
                      this.setState({ status: "in progress" });
                      this.handleOpenModal();
                    }}
                  />
                </div>
                <div>
                  {this.renderDrawerList(
                    this.state.monthlyTodos,
                    "in progress"
                  )}
                </div>
              </div>
              <div className={classes.doneContainer}>
                <div className={classes.wrapper}>
                  <img src={Star} alt="done icon" className={classes.icon} />
                  <div className={classes.headerContainer}>
                    <p>Done:</p>
                  </div>
                  <img
                    src={AddIcon}
                    alt="add button"
                    className={classes.icon}
                    onClick={() => {
                      this.setState({ status: "done" });
                      this.handleOpenModal();
                    }}
                  />
                </div>
                <div>
                  {this.renderDrawerList(this.state.monthlyTodos, "done")}
                </div>
              </div>
            </div>
          </Drawer>
          <Modal
            isOpen={this.state.showModal}
            onRequestClose={this.handleCloseModal}
            className={classes.modal}
            overlayClassName={classes.overlay}
            ariaHideApp={false}
          >
            {currentModal}
          </Modal>
        </div>
      </Aux>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateCalendar: (updatedList) => {
      dispatch({
        type: actionTypes.setCalendar,
        payload: { currentMonthTodoList: updatedList },
      });
    },
  };
};

const mapStateToProps = (state) => {
  return {
    currentMonthTodoList: state.currentMonthTodoList,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
