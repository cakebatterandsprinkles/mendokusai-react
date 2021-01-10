import axios from "axios";
import React, { Component } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import BirbImage from "../../assets/images/birb.png";
import ClosingButton from "../../assets/images/closeButton.png";
import Sun from "../../assets/images/sunny.png";
import Aux from "../../hoc/Aux";
import * as actionTypes from "../../store/actions/actionTypes";
import classes from "./LoginForm.module.css";

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      isSubmitting: false,
      isSubmitted: false,
      email: "",
      password: "",
      resetEmail: "",
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.renderModalContent = this.renderModalContent.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleForgotPasswordSubmit = this.handleForgotPasswordSubmit.bind(
      this
    );
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  handleForgotPasswordSubmit(event) {
    event.preventDefault();
    this.setState({ isSubmitting: true });
    axios
      .post("/reset-request", {
        email: this.state.resetEmail,
      })
      .then(() => {
        this.setState({ isSubmitted: true, isSubmitting: false });
      })
      .catch((error) => {
        if (error.response) {
          this.setState({ isSubmitted: false, isSubmitting: false });
          this.props.setError(error.response.data);
        }
      });
  }

  handleLoginSubmit(e) {
    e.preventDefault();
    axios
      .post(
        "/login",
        {
          email: this.state.email,
          password: this.state.password,
        },
        { withCredentials: true }
      )
      .then((response) => {
        this.props.setUserData(response.data.id, response.data.name);
        this.props.history.push("/user");
      })
      .catch((error) => {
        if (error.response) {
          this.props.setError(error.response.data);
        }
      });
  }

  renderModalContent() {
    if (!this.state.isSubmitting && !this.state.isSubmitted) {
      return (
        <Aux>
          <div className={classes.modalMainContainer}>
            <div>
              <div className={classes.modalHeadingContainer}>
                <p className={classes.modalHeading}>Reset Password</p>
              </div>
              <form
                className={classes.loginForm}
                onSubmit={this.handleForgotPasswordSubmit}
              >
                <div className={classes.formGroupContainer}>
                  <label htmlFor="reset-password-email">E-mail address:</label>
                  <input
                    type="email"
                    name="reset-password-email"
                    id="reset-password-email"
                    value={this.state.resetEmail}
                    onChange={(e) => {
                      this.setState({ resetEmail: e.target.value });
                    }}
                  ></input>
                </div>
                <div className={`${classes.btnWrapper} ${classes.resetButton}`}>
                  <button type="submit" className={classes.btn}>
                    Reset Password
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
        </Aux>
      );
    } else if (this.state.isSubmitting && !this.state.isSubmitted) {
      return (
        <div className={classes.submitModalContainer}>
          <img src={BirbImage} alt="bird" className={classes.birbImage} />
          <p>Omg, is your request being submitted or what?</p>
        </div>
      );
    } else if (!this.state.isSubmitting && this.state.isSubmitted) {
      return (
        <div className={classes.submitModalContainer}>
          <img src={Sun} alt="sun" className={classes.birbImage} />
          <p>Congrats, you've got an email! Check your inbox.</p>
        </div>
      );
    }
    return <p>Oops something is wrong!</p>;
  }

  render() {
    let currentModal = this.renderModalContent();
    return (
      <Aux>
        <div className={classes.mainContainer}>
          <div className={classes.headingContainer}>
            <p className={classes.heading}>Login from here</p>
          </div>
          <form onSubmit={this.handleLoginSubmit}>
            <div className={`${classes.formGroupContainer} ${classes.margin}`}>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={this.handleInputChange}
              ></input>
            </div>
            <div className={classes.formGroupContainer}>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={this.handleInputChange}
              ></input>
            </div>
            <div className={classes.resetPasswordLink}>
              <p className={classes.link} onClick={this.handleOpenModal}>
                Remembering passwords is bothersome.
              </p>
            </div>
            <div className={classes.btnWrapper}>
              <button className={classes.btn} type="submit">
                Login
              </button>
            </div>
          </form>
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

const mapDispatchToProps = (dispatch) => {
  return {
    setUserData: (userId, userName) =>
      dispatch({
        type: actionTypes.setUserData,
        payload: { id: userId, name: userName },
      }),
    setError: (errorMessage) =>
      dispatch({
        type: actionTypes.setErrorMessage,
        payload: { errorMessage: errorMessage },
      }),
  };
};

export default connect(null, mapDispatchToProps)(LoginForm);
