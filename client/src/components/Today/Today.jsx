import React, { Component, Fragment } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import AddIcon from "../../assets/images/addbutton.png";
import ClosingButton from "../../assets/images/closeButton.png";
import CloudyIcon from "../../assets/images/cloudy.png";
import LocationIcon from "../../assets/images/location1.png";
import RainyIcon from "../../assets/images/rainy.png";
import SnowyIcon from "../../assets/images/snowy.png";
import CloudyAndSunnyIcon from "../../assets/images/sunandclouds.png";
import SunnyIcon from "../../assets/images/sunny.png";
import TooRainyIcon from "../../assets/images/toorainy.png";
import * as actionTypes from "../../store/actions/actionTypes";
import { setDate, setDay } from "../../util/date";
import { getCelcius } from "../../util/temp";
import { renderTodoCheckbox, renderTodos } from "../../util/todo";
import classes from "./Today.module.css";

class Today extends Component {
  constructor() {
    super();
    this.state = {
      date: "",
      day: "",
      temp: "",
      tempUnit: "f",
      showModal: false,
      isSubmitted: false,
      addInput: "",
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.renderModalContent = this.renderModalContent.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addToDo = this.addToDo.bind(this);
    this.updateToDo = this.updateToDo.bind(this);
    this.deleteToDo = this.deleteToDo.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
    this.convertTemp = this.convertTemp.bind(this);
  }

  getToDos() {
    const today = new Date();
    const todayString = `${today.getFullYear()}-${(today.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;

    fetch(`/todo/today?date=${todayString}`, { credentials: "include" })
      .then((blob) => blob.json())
      .then((response) => {
        this.props.updateToDos(response);
      });
  }

  deleteToDo(id) {
    fetch("/todo", {
      method: "DELETE",
      body: JSON.stringify({ id: id }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then(() =>
      this.props.updateToDos(this.props.todos.filter((todo) => todo._id !== id))
    );
  }

  updateToDo(todo) {
    fetch("/todo/today", {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const todoList = [
      ...this.props.todos.filter((oldToDo) => todo._id !== oldToDo._id),
      todo,
    ];
    this.props.updateToDos(todoList);
  }

  addToDo(todo) {
    fetch("/todo/today", {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((blob) => blob.json())
      .then((response) => {
        const todoList = [...this.props.todos, response];
        this.props.updateToDos(todoList);
      });
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
    this.setState({ addInput: "" });
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit() {
    this.setState({ isSubmitted: true });
    const today = new Date();
    const todayString = `${today.getFullYear()}-${(today.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;

    this.addToDo({
      todo: this.state.addInput,
      status: "not done",
      date: todayString,
    });
    this.setState({ addInput: "" });
    this.handleCloseModal();
  }

  convertTemp() {
    if (this.state.tempUnit === "f") {
      this.setState({ tempUnit: "c" });
    } else if (this.state.tempUnit === "c") {
      this.setState({ tempUnit: "f" });
    }
  }

  calculateTemp() {
    if (!this.props.weatherData.main) {
      return "";
    }

    if (this.state.tempUnit === "f") {
      return this.props.weatherData.main.temp;
    } else if (this.state.tempUnit === "c") {
      return getCelcius(this.props.weatherData.main.temp);
    }
  }

  getWeatherIcon() {
    if (!this.props.weatherData.weather) {
      return;
    }

    const weatherStatus = this.props.weatherData.weather[0].main;
    switch (weatherStatus) {
      case "Clear":
        return SunnyIcon;
      case "Snow":
        return SnowyIcon;
      case "Rain":
      case "Drizzle":
        return RainyIcon;
      case "Thunderstorm":
        return TooRainyIcon;
      case "Clouds":
        return CloudyAndSunnyIcon;
      default:
        return CloudyIcon;
    }
  }

  renderModalContent() {
    return (
      <div className={classes.modalMainContainer}>
        <div className={classes.addToDoForm}>
          <form onSubmit={this.handleSubmit}>
            <div className={classes.formGroupContainer}>
              <label htmlFor="add-item">Add an item to your list:</label>
              <input
                onChange={this.handleInputChange}
                value={this.state.addInput}
                type="text"
                name="addInput"
                id="addInput"
              ></input>
            </div>
            <div className={`${classes.btnWrapper} ${classes.resetButton}`}>
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

  renderToDoList = (array) => {
    return array.map((item) => {
      return (
        <div key={item._id} className={classes.todo}>
          <div className={classes.todoWrapper}>
            <img
              className={classes.checkboxIcon}
              src={renderTodoCheckbox(item)}
              alt="checkbox icon"
              onClick={() => this.changeStatus(item)}
            />
            <p onClick={() => this.changeStatus(item)}>{renderTodos(item)}</p>
          </div>
          <img
            src={ClosingButton}
            alt="delete button"
            className={classes.deleteButton}
            onClick={() => this.deleteToDo(item._id)}
          />
        </div>
      );
    });
  };

  getUserLocation() {
    return fetch("https://freegeoip.app/json/").then((blob) => blob.json());
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

  componentDidMount() {
    const today = setDate();
    const day = setDay();
    this.setState({ date: today, day: day });
    this.getUserLocation().then((data) => {
      this.setState({
        location: `${data.city}, ${data.region_name}, ${data.country_code}`,
      });
    });
    this.getToDos();
  }

  render() {
    let currentModal = this.renderModalContent();
    return (
      <Fragment>
        <div className={classes.mainContainer}>
          <div className={classes.flexContainerColumn}>
            <div>
              <p className={classes.date}>{this.state.date}</p>
              <div className={classes.day}>
                {this.state.day === "Friday" ||
                this.state.day === "Saturday" ||
                this.state.day === "Sunday"
                  ? "Yay! "
                  : "Oh noes! "}
                It's a {this.state.day}!
              </div>
            </div>
            <div className={classes.dataContainer}>
              <div className={classes.flexContainerRow}>
                <img
                  src={LocationIcon}
                  className={classes.locationIcon}
                  alt="location icon"
                />
                <p className={classes.data}>{this.state.location}</p>
              </div>
              {this.props.weatherData.weather ? (
                <div className={classes.flexContainerRow}>
                  <img
                    src={this.getWeatherIcon()}
                    className={classes.weatherIcon}
                    alt="weather icon"
                  />
                  <p className={classes.data}>
                    {this.props.weatherData.weather[0].main},
                  </p>
                  {this.calculateTemp() ? (
                    <p className={classes.tempData} onClick={this.convertTemp}>
                      {this.calculateTemp()}°{" "}
                      {this.state.tempUnit.toUpperCase()}
                    </p>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
          <div className={classes.flexContainerRowHeading}>
            <div className={classes.heading}>
              {this.props.todos.length
                ? "Your day looks like this:"
                : "How to use this app:"}
            </div>
            <div>
              <img
                src={AddIcon}
                alt="add icon"
                className={classes.addIcon}
                onClick={this.handleOpenModal}
              />
            </div>
          </div>
          <div className={classes.flexContainerColumnToDo}>
            {this.props.todos.length ? (
              this.renderToDoList(this.props.todos)
            ) : (
              <div className={classes.warning}>
                <div>
                  <span className={classes.star}>★</span> You can add new todos
                  by clicking the plus icon on the right.
                </div>
                <div>
                  <span className={classes.star}>★</span> Click on the checkbox
                  icon to change the todo status to "in progress" or "done".
                </div>
                <div>
                  <span className={classes.star}>★</span> To convert the
                  temperature from Fahrenheit to Celcius, click on it.
                </div>
              </div>
            )}
          </div>
        </div>
        <Modal
          isOpen={this.state.showModal}
          onRequestClose={this.handleCloseModal}
          className={classes.modal}
          overlayClassName={classes.overlay}
          ariaHideApp={false}
        >
          {currentModal}
        </Modal>
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateToDos: (newToDoList) => {
      dispatch({
        type: actionTypes.setTodayList,
        payload: {
          todos: newToDoList,
        },
      });
    },
  };
};

const mapStateToProps = (state) => {
  return { weatherData: state.weatherData, todos: state.todayTodos };
};

export default connect(mapStateToProps, mapDispatchToProps)(Today);
