import React, { Component, Fragment } from "react";
import classes from "./BucketList.module.css";
import NotDoneCheckbox from "../../assets/images/notdonecheckbox.png";
import InProgressCheckbox from "../../assets/images/inprogresscheckbox.png";
import DoneCheckbox from "../../assets/images/donecheckbox.png";
import AddIcon from "../../assets/images/addbutton.png";
import Modal from "react-modal";
import ClosingButton from "../../assets/images/closeButton.png";
import image from "../../assets/images/lifeisshort.jpg";

class BucketList extends Component {
  constructor() {
    super();
    this.state = {
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
              <label htmlFor="add-item">Add an item to your bucket list:</label>
              <input type="text" name="add-item" id="add-item"></input>
            </div>
          </form>
          <div className={classes.btnWrapper}>
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
          <div className={classes.todoWrapper}>
            <img
              className={classes.checkboxIcon}
              src={this.renderTodoCheckbox(item)}
              alt="checkbox icon"
              onClick={this.changeStatus}
              data-todo-value={this.renderTodos(item)}
            />
            <p
              onClick={this.changeStatus}
              data-todo-value={this.renderTodos(item)}
            >
              {this.renderTodos(item)}
            </p>
          </div>
          <img
            src={ClosingButton}
            alt="delete button"
            className={classes.deleteButton}
            data-value={this.renderTodos(item)}
            onClick={this.deleteToDo}
          />
        </div>
      );
    });
  };

  deleteToDo(e) {
    const clicked = e.target;
    const value = clicked.dataset.value;
    const currentList = [...this.state.todoList];
    const newList = currentList.filter((item) => item.todo !== value);
    this.setState({ todoList: newList });
    console.log(clicked, value);
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

  render() {
    let currentModal = this.renderModalContent();
    return (
      <Fragment>
        <div className={classes.mainContainer}>
          <div className={classes.flexContainerColumn}>
            <p className={classes.date}>{this.state.date}</p>
            <div className={classes.bgBlack}>
              <p className={classes.header}>Your bucket list: </p>
            </div>
            <div className={classes.ruleContainer}>
              <p className={classes.rules}>
                The list items here have no expiration dates. You can do them
                anytime you like. The date you add and finish them will also be
                logged.
              </p>
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

export default BucketList;
