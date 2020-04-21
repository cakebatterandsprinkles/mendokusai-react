import React, { Component } from "react";
import classes from "./Today.module.css";
import NotDoneCheckbox from "../../assets/images/notdonecheckbox.png";
import InProgressCheckbox from "../../assets/images/inprogresscheckbox.png";
import DoneCheckbox from "../../assets/images/donecheckbox.png";
import AddIcon from "../../assets/images/addbutton.png";
import SunnyIcon from "../../assets/images/sunny.png";
import Modal from "react-modal";
import Aux from "../../hoc/Aux";
import ClosingButton from "../../assets/images/closeButton.png";
import CloudyIcon from "../../assets/images/cloudy.png";
import LocationIcon from "../../assets/images/location1.png";
import CloudyAndSunnyIcon from "../../assets/images/sunandclouds.png";
import RainyIcon from "../../assets/images/rainy.png";
import TooRainyIcon from "../../assets/images/toorainy.png";
import Snowy from "../../assets/images/snowy.png";

class Today extends Component {
  constructor() {
    super();
    this.state = {
      expirationDate: "",
      weatherStatus: "",
      weatherImage: "",
      temperature: 32,
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

  renderTodoCheckbox = (item) => {
    switch (item.status) {
      case "not done":
        return NotDoneCheckbox;
      case "in progress":
        return InProgressCheckbox;
      case "done":
        return DoneCheckbox;
      default:
        return NotDoneCheckbox;
    }
  };

  renderTodos = (item) => {
    return item.todo;
  };

  renderTodoList = (array) => {
    return array.map((item, index) => {
      return (
        <div key={index} className={classes.todo}>
          <img
            className={classes.checkboxIcon}
            src={this.renderTodoCheckbox(item)}
            alt="checkbox icon"
          />
          <p>{this.renderTodos(item)}</p>
        </div>
      );
    });
  };

  setDate = () => {
    const today = new Date();
    const day = new Date().getDate();
    const year = today.getFullYear();
    let month;
    switch (today.getMonth()) {
      case 0:
        month = "January";
        break;
      case 1:
        month = "February";
        break;
      case 2:
        month = "March";
        break;
      case 3:
        month = "April";
        break;
      case 4:
        month = "May";
        break;
      case 5:
        month = "June";
        break;
      case 6:
        month = "July";
        break;
      case 7:
        month = "August";
        break;
      case 8:
        month = "September";
        break;
      case 9:
        month = "October";
        break;
      case 10:
        month = "November";
        break;
      case 11:
        month = "December";
        break;
      default:
        month = "Month";
        break;
    }
    this.setState({ date: `${month} ${day}, ${year}` });
  };

  getUserLocation() {
    return fetch("https://geoip.edelkrone.com/json/").then((blob) =>
      blob.json()
    );
  }

  componentDidMount() {
    this.setDate();
    this.getUserLocation().then((data) => {
      this.setState({
        location: `${data.city}, ${data.region_name}, ${data.country_code}`,
      });
    });
  }

  render() {
    let currentModal = this.renderModalContent();
    return (
      <Aux>
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
                <img
                  src={SunnyIcon}
                  className={classes.weatherIcon}
                  alt="weather icon"
                />
                <p className={classes.data}>Sunny</p>
                <p className={classes.data}>{this.state.temperature}°C</p>
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
      </Aux>
    );
  }
}

export default Today;
