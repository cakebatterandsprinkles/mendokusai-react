import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import classes from "./Today.module.css";
import AddIcon from "../../assets/images/addbutton.png";
import SunnyIcon from "../../assets/images/sunny.png";
import Modal from "react-modal";
import ClosingButton from "../../assets/images/closeButton.png";
import CloudyIcon from "../../assets/images/cloudy.png";
import LocationIcon from "../../assets/images/location1.png";
import CloudyAndSunnyIcon from "../../assets/images/sunandclouds.png";
import RainyIcon from "../../assets/images/rainy.png";
import TooRainyIcon from "../../assets/images/toorainy.png";
import SnowyIcon from "../../assets/images/snowy.png";
import { setDate } from "../../util/date";
import { getCelcius } from "../../util/temp";
import { renderTodoCheckbox, renderTodos } from "../../util/todo";

class Today extends Component {
  constructor() {
    super();
    this.state = {
      temp: "",
      tempUnit: "c",
      todoList: [
        { todo: "Buy cakes", status: "not done" },
        { todo: "Eat cakes", status: "not done" },
        { todo: "Kiss the chicken", status: "not done" },
        { todo: "Call Arisi", status: "not done" },
        { todo: "Do some clay stuffs", status: "not done" },
      ],
      showModal: false,
      isSubmitted: false,
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.renderModalContent = this.renderModalContent.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addToDo = this.addToDo.bind(this);
    this.deleteToDo = this.deleteToDo.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
    this.convertTemp = this.convertTemp.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  handleSubmit() {
    this.setState({ isSubmitted: true });
    this.addToDo();
    this.handleCloseModal();
  }

  addToDo() {
    const newItem = document.querySelector("#add-item").value;
    this.setState({
      todoList: [...this.state.todoList, { todo: newItem, status: "not done" }],
    });
  }

  convertTemp() {
    if (!this.props.weatherData.main) {
      return;
    }

    if (this.state.tempUnit === "f") {
      const newTemp = getCelcius(this.props.weatherData.main.temp);
      this.setState({ temp: newTemp, tempUnit: "c" });
    } else if (this.state.tempUnit === "c") {
      const newTemp = this.props.weatherData.main.temp;
      this.setState({ temp: newTemp, tempUnit: "f" });
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
          <form action="/user" method="POST">
            <div className={classes.formGroupContainer}>
              <label htmlFor="add-item">Add an item to your list:</label>
              <input type="text" name="add-item" id="add-item"></input>
            </div>
          </form>
          <div className={`${classes.btnWrapper} ${classes.resetButton}`}>
            <button onClick={this.handleSubmit} className={classes.btn}>
              Add
            </button>
          </div>
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

  renderTodoList = (array) => {
    return array.map((item, index) => {
      return (
        <div key={index} className={classes.todo}>
          <div className={classes.todoWrapper}>
            <img
              className={classes.checkboxIcon}
              src={renderTodoCheckbox(item)}
              alt="checkbox icon"
              onClick={this.changeStatus}
              data-todo-value={renderTodos(item)}
            />
            <p onClick={this.changeStatus} data-todo-value={renderTodos(item)}>
              {renderTodos(item)}
            </p>
          </div>
          <img
            src={ClosingButton}
            alt="delete button"
            className={classes.deleteButton}
            data-value={renderTodos(item)}
            onClick={this.deleteToDo}
          />
        </div>
      );
    });
  };

  getUserLocation() {
    return fetch("https://geoip.edelkrone.com/json/").then((blob) =>
      blob.json()
    );
  }

  deleteToDo(e) {
    const clicked = e.target;
    const value = clicked.dataset.value;
    const currentList = [...this.state.todoList];
    const newList = currentList.filter((item) => item.todo !== value);
    this.setState({ todoList: newList });
  }

  changeStatus(e) {
    const clicked = e.target;
    const value = clicked.dataset.todoValue;
    const currentList = [...this.state.todoList];
    const changed = currentList.filter((item) => item.todo === value)[0];
    const status = changed.status;
    switch (status) {
      case "not done":
        changed.status = "in progress";
        break;
      case "in progress":
        changed.status = "done";
        break;
      case "done":
        changed.status = "not done";
        break;
      default:
        changed.status = "not done";
    }
    this.setState({ todoList: currentList });
  }

  componentDidMount() {
    const today = setDate();
    this.setState({ date: today });
    this.getUserLocation().then((data) => {
      this.setState({
        location: `${data.city}, ${data.region_name}, ${data.country_code}`,
      });
    });
  }

  render() {
    if (this.state.temp === "" && this.props.weatherData.main) {
      this.convertTemp();
    }
    let currentModal = this.renderModalContent();
    return (
      <Fragment>
        <div className={classes.mainContainer}>
          <div className={classes.flexContainerColumn}>
            <p className={classes.date}>{this.state.date}</p>
            <div className={classes.bgBlack}>
              <p>Today Looks Like This: </p>
            </div>
            <div className={classes.flexContainerRow}>
              <div className={classes.flexContainerRow}>
                <img
                  src={LocationIcon}
                  className={classes.locationIcon}
                  alt="location icon"
                />
                <p className={classes.data}>{this.state.location}</p>
                {this.props.weatherData.weather ? (
                  <Fragment>
                    <img
                      src={this.getWeatherIcon()}
                      className={classes.weatherIcon}
                      alt="weather icon"
                    />
                    <p className={classes.data}>
                      {this.props.weatherData.weather[0].main}
                    </p>
                  </Fragment>
                ) : null}
                {this.state.temp ? (
                  <p className={classes.tempData} onClick={this.convertTemp}>
                    {this.state.temp ? this.state.temp : "..."}°
                    {this.state.tempUnit.toUpperCase()}
                  </p>
                ) : null}
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
          </div>
          <div className={classes.flexContainerColumn}>
            {this.renderTodoList(this.state.todoList)}
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

const mapStateToProps = (state) => {
  return {
    weatherData: state.weatherData,
  };
};

export default connect(mapStateToProps)(Today);
