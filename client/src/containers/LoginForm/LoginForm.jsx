import React, { Component } from "react";
import classes from "./LoginForm.module.css";
import Aux from "../../hoc/Aux";
import Modal from "react-modal";
import ClosingButton from "../../assets/images/closeButton.png";
import BirbImage from "../../assets/images/birb.png";
import Sun from "../../assets/images/sunny.png";
import axios from "axios";
import sliceUserId from "../../util/user";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/actionTypes";

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      isSubmitting: false,
      isSubmitted: false,
      email: "",
      password: "",
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

  handleForgotPasswordSubmit() {
    this.setState({ isSubmitting: true });
    setTimeout(() => {
      this.setState({
        isSubmitting: false,
        isSubmitted: true,
      });
      setTimeout(() => {
        this.handleCloseModal();
        this.setState({
          isSubmitted: false,
        });
      }, 2000);
    }, 2000);
  }

  handleLoginSubmit() {
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
        const slicedUserId = sliceUserId(response.data.id);
        this.props.history.push(`/user?${response.data.name}${slicedUserId}`);
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
              <div className={classes.headingContainer}>
                <p className={classes.heading}>Reset Password</p>
              </div>
              <p className={classes.modalText}>
                {" "}
                Tell me more about yourself...{" "}
              </p>
              <form className={classes.loginForm} action="/login" method="POST">
                <div className={classes.formGroupContainer}>
                  <label htmlFor="reset-password-email">E-mail address:</label>
                  <input
                    type="email"
                    name="reset-password-email"
                    id="reset-password-email"
                  ></input>
                </div>
              </form>
              <div className={`${classes.btnWrapper} ${classes.resetButton}`}>
                <button
                  onClick={this.handleForgotPasswordSubmit}
                  className={classes.btn}
                >
                  Reset Password
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
        </Aux>
      );
    } else if (this.state.isSubmitting && !this.state.isSubmitted) {
      return (
        <div className={classes.submitModalContainer}>
          <img src={BirbImage} alt="birdimage" className={classes.birbImage} />
          <p>Omg, is your request being submitted or what?</p>
        </div>
      );
    } else if (!this.state.isSubmitting && this.state.isSubmitted) {
      return (
        <div className={classes.submitModalContainer}>
          <img src={Sun} alt="sunimage" className={classes.birbImage} />
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
            <p className={classes.heading}>Login</p>
          </div>
          <form>
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
              <button
                className={classes.btn}
                type="button"
                onClick={this.handleLoginSubmit}
              >
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
