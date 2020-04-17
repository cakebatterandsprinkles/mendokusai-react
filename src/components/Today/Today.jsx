import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import classes from "./Today.module.css";
import NotDoneCheckbox from "../../assets/images/notdonecheckbox.png";
import InProgressCheckbox from "../../assets/images/inprogresscheckbox.png";
import DoneCheckbox from "../../assets/images/donecheckbox.png";
import AddIcon from "../../assets/images/addbutton.png";
import SunnyIcon from "../../assets/images/sunny.png";
import CloudyIcon from "../../assets/images/cloudy.png";
import LocationIcon from "../../assets/images/location1.png";
import CloudyAndSunnyIcon from "../../assets/images/sunandclouds.png";
import RainyIcon from "../../assets/images/rainy.png";
import TooRainyIcon from "../../assets/images/toorainy.png";
import Snowy from "../../assets/images/snowy.png";

class Today extends Component {
  state = {
    date: "",
    location: "",
    weatherStatus: "",
    weatherImage: "",
    temperature: 32,
    todoList: [
      { todo: "Buy cakes", status: "not done", date: "" },
      { todo: "Eat cakes", status: "not done", date: "" },
      { todo: "Kiss the chicken", status: "not done", date: "" },
      { todo: "Call Arisi", status: "not done", date: "" },
      { todo: "Do some clay stuffs", status: "not done", date: "" },
    ],
  };

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
    array.map((item) => {
      return (
        <div>
          <img src={this.renderTodoCheckbox(item)} alt="checkbox icon" />
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
    return (
      <Aux>
        <div className={classes.flexContainerColumn}>
          <p className={classes.date}>
            {this.state.date ? this.state.date : this.setDate()}
          </p>
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
              <img src={AddIcon} alt="add icon" className={classes.addIcon} />
            </div>
          </div>
        </div>
        <div className={classes.flexContainerColumn}>
          {this.renderTodoList(this.state.todoList)}
        </div>
      </Aux>
    );
  }
}

export default Today;
