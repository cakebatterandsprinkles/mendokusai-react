import React, { Component } from "react";
import classes from "./LoginForm.module.css";
import Aux from "../../hoc/Aux";
import Modal from "react-modal";

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      isSubmitting: false,
      isSubmitted: false
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.renderModalContent = this.renderModalContent.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  handleSubmit() {
    this.setState({ isSubmitting: true });
    setTimeout(() => {
      this.setState({
        isSubmitting: false,
        isSubmitted: true
      });
      setTimeout(() => {
        this.handleCloseModal();
        this.setState({
          isSubmitted: false
        });
      }, 2000);
    }, 2000);
  }

  renderModalContent() {
    if (!this.state.isSubmitting && !this.state.isSubmitted) {
      return (
        <Aux>
          <div className={classes.headingContainer}>
            <p className={classes.heading}>Reset Password</p>
          </div>
          <p className={classes.modalText}> Tell me more about yourself... </p>
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
            <button onClick={this.handleSubmit} className={classes.btn}>
              Reset Password
            </button>
          </div>
        </Aux>
      );
    } else if (this.state.isSubmitting && !this.state.isSubmitted) {
      return <p>Omg, is your request being submitted or what?</p>;
    } else if (!this.state.isSubmitting && this.state.isSubmitted) {
      return <p>Congrats, you've got an email! Check your inbox.</p>;
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
          <form className={classes.loginForm} action="/user" method="POST">
            <div className={`${classes.formGroupContainer} ${classes.margin}`}>
              <label htmlFor="email">Email:</label>
              <input type="email" name="email" id="email"></input>
            </div>
            <div className={classes.formGroupContainer}>
              <label htmlFor="password">Password:</label>
              <input type="password" name="password" id="password"></input>
            </div>
            <div className={classes.resetPasswordLink}>
              <p className={classes.link} onClick={this.handleOpenModal}>
                Remembering passwords is bothersome.
              </p>
            </div>
            <input type="hidden" name="_csrf" value="csrfToken" />
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

export default LoginForm;
