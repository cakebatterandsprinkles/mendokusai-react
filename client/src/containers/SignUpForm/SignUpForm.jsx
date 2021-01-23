import axios from "axios";
import React, { Component } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import Sun from "../../assets/images/sunny.png";
import Footer from "../../components/Footer/Footer";
import Aux from "../../hoc/Aux";
import * as actionTypes from "../../store/actions/actionTypes";
import classes from "./SignUpForm.module.css";

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      repeatPassword: "",
      showModal: false,
      isSubmitted: false,
      showPassword: false,
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.renderModalContent = this.renderModalContent.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  renderModalContent() {
    if (this.state.isSubmitted) {
      return (
        <div className={classes.submitModalContainer}>
          <img src={Sun} alt="sunimage" className={classes.birbImage} />
          <p>Congrats, you've got an email! Check your inbox.</p>
        </div>
      );
    }
    return <p>Oops something is wrong!</p>;
  }

  handleFormSubmit = () => {
    this.setState({ isSubmitted: true });
  };

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleMagnifyingGlass = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  submitForm = () => {
    axios
      .post("/signup", {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        repeatPassword: this.state.repeatPassword,
      })
      .then((response) => {
        if (response.status === 200) {
          this.handleOpenModal();
          this.handleFormSubmit();
          setTimeout(() => {
            this.props.history.push("/login");
          }, 3000);
        }
      })
      .catch((error) => {
        if (error.response) {
          this.props.setError(error.response.data);
          this.setState({ isSubmitted: false });
        }
      });
  };

  render() {
    let currentModal = this.renderModalContent();
    return (
      <Aux>
        <div className={classes.mainWrapper}>
          <div className={classes.mainContainer}>
            <div className={classes.headingContainer}>
              <p className={classes.heading}>Sign Up from here</p>
            </div>
            <form>
              <div
                className={`${classes.formGroupContainer} ${classes.marginBottom}`}
              >
                <label htmlFor="name">Name:</label>
                <input
                  type="name"
                  name="name"
                  id="name"
                  onChange={this.handleInputChange}
                ></input>
              </div>
              <div className={classes.subTextContainer}>
                <p className={classes.subText}>
                  Note: Calendar will call you with this name. Choose whatever
                  name you like. You can change it later too.
                </p>
              </div>
              <div
                className={`${classes.formGroupContainer} ${classes.marginBottom}`}
              >
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={this.handleInputChange}
                ></input>
              </div>
              <div className={classes.subTextContainer}>
                <p className={classes.subText}>
                  Note: You will need to verify this. Make it real.
                </p>
              </div>
              <div
                className={`${classes.formGroupContainer} ${classes.marginBottom}`}
              >
                <label htmlFor="password">Password:</label>
                <div
                  className={`${classes.magnifyingGlass} ${
                    this.state.showPassword ? classes.magnifyingGlassActive : ""
                  }`}
                  onClick={this.handleMagnifyingGlass}
                >
                  <span role="img" aria-label="magnifying-glass">
                    🔍
                  </span>
                </div>
                <input
                  type={this.state.showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  onChange={this.handleInputChange}
                ></input>
              </div>
              <div
                className={`${classes.formGroupContainer} ${classes.marginBottom}`}
              >
                <label htmlFor="repeat-password">Repeat Password:</label>
                <input
                  type={this.state.showPassword ? "text" : "password"}
                  name="repeatPassword"
                  id="repeat-password"
                  onChange={this.handleInputChange}
                ></input>
              </div>
              <div className={classes.subTextContainer}>
                <div className={classes.subText}>
                  <input
                    type="checkbox"
                    name="dislike"
                    value="justforfun"
                    className={classes.checkboxInput}
                  />
                  <label htmlFor="dislike" className={classes.checkboxLabel}>
                    {" "}
                    I dislike filling forms. Use telepathy next time.{" "}
                  </label>
                </div>
              </div>
              <div className={classes.btnWrapper}>
                <button
                  className={classes.btn}
                  type="button"
                  onClick={this.submitForm}
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
          <Footer />
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
    setError: (errorMessage) =>
      dispatch({
        type: actionTypes.setErrorMessage,
        payload: { errorMessage: errorMessage },
      }),
  };
};

export default connect(null, mapDispatchToProps)(SignUpForm);
