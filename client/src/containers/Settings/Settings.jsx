import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/actionTypes";
import classes from "./Settings.module.css";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      currentPassword: "",
      newPassword: "",
      repeatNewPassword: "",
      userConfirmationMessage: "Can't save new settings at the moment.",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.showPasswordRefCurrent = React.createRef();
    this.showPasswordRefNew1 = React.createRef();
    this.showPasswordRefNew2 = React.createRef();
    this.magnifyingGlass = React.createRef();
  }

  setUserName = () => {
    this.setState({ name: this.props.username });
  };

  componentDidMount() {
    this.setUserName();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.username !== prevProps.username) {
      this.setUserName();
    }
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleFormSubmit = () => {
    this.setState({
      userConfirmationMessage: "Setting changes were successful.",
    });
  };

  submitForm = (event) => {
    event.preventDefault();
    axios
      .post("/settings", {
        name: this.state.name,
        currentPassword: this.state.currentPassword,
        newPassword: this.state.newPassword,
        repeatNewPassword: this.state.repeatNewPassword,
      })
      .then((response) => {
        if (response.status === 200) {
          this.handleFormSubmit();
          this.props.setNewUsername(this.state.name);
          this.props.setError("Settings updated!");
        }
      })
      .catch((error) => {
        if (error.response) {
          this.props.setError(error.response.data);
        }
      });
  };

  handleMagnifyingGlass = () => {
    if (this.showPasswordRefCurrent.current.type === "password") {
      this.showPasswordRefCurrent.current.type = "text";
      this.showPasswordRefNew1.current.type = "text";
      this.showPasswordRefNew2.current.type = "text";
      this.magnifyingGlass.current.classList.toggle(
        `${classes.magnifyingGlassActive}`
      );
    } else if (this.showPasswordRefCurrent.current.type === "text") {
      this.showPasswordRefCurrent.current.type = "password";
      this.showPasswordRefNew1.current.type = "password";
      this.showPasswordRefNew2.current.type = "password";
      this.magnifyingGlass.current.classList.toggle(
        `${classes.magnifyingGlassActive}`
      );
    }
  };

  render() {
    return (
      <div className={classes.mainContainer}>
        <div className={classes.headingContainer}>
          <p className={classes.heading}>Change Settings</p>
        </div>
        <form onSubmit={this.submitForm}>
          <div
            className={`${classes.formGroupContainer} ${classes.marginBottom}`}
          >
            <label htmlFor="name">Name:</label>
            <input
              type="name"
              name="name"
              id="name"
              onChange={this.handleInputChange}
              value={this.state.name}
            ></input>
          </div>
          <div className={classes.subTextContainer}>
            <p className={classes.subText}>
              If you only like to change your name, just fill the name area and
              hit save. If you want to change your password too, you should fill
              the password areas.{" "}
            </p>
          </div>
          <div
            className={`${classes.formGroupContainer} ${classes.marginBottom}`}
          >
            <label htmlFor="currentPassword">Current Password:</label>
            <div
              className={classes.magnifyingGlass}
              onClick={this.handleMagnifyingGlass}
              ref={this.magnifyingGlass}
            >
              <span role="img" aria-label="magnifying-glass">
                🔍
              </span>
            </div>
            <input
              type="password"
              name="currentPassword"
              id="currentPassword"
              onChange={this.handleInputChange}
              ref={this.showPasswordRefCurrent}
            ></input>
          </div>
          <div
            className={`${classes.formGroupContainer} ${classes.marginBottom}`}
          >
            <label htmlFor="newPassword">New Password:</label>
            <input
              type="password"
              name="newPassword"
              id="newPassword"
              onChange={this.handleInputChange}
              ref={this.showPasswordRefNew1}
            ></input>
          </div>
          <div
            className={`${classes.formGroupContainer} ${classes.marginBottom}`}
          >
            <label htmlFor="repeatNewPassword">Repeat New Password:</label>
            <input
              type="password"
              name="repeatNewPassword"
              id="repeatNewPassword"
              onChange={this.handleInputChange}
              ref={this.showPasswordRefNew2}
            ></input>
          </div>
          <div className={classes.btnWrapper}>
            <button className={classes.btn} type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.userName,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setNewUsername: (name) =>
      dispatch({
        type: actionTypes.setNewUserSettings,
        payload: { name: name },
      }),
    setError: (errorMessage) =>
      dispatch({
        type: actionTypes.setErrorMessage,
        payload: { errorMessage: errorMessage },
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
