import React, { Component, Fragment } from "react";
import classes from "./BucketList.module.css";
import AddIcon from "../../assets/images/addbutton.png";
import Modal from "react-modal";
import ClosingButton from "../../assets/images/closeButton.png";
import LegendFooter from "../../components/LegendFooter/LegendFooter";
import { setDate } from "../../util/date";
import { renderTodoCheckbox, renderTodos } from "../../util/todo";

class BucketList extends Component {
  constructor() {
    super();
    this.state = {
      date: "",
      sortBy: "All",
      todoList: [],
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
    this.setSortBy = this.setSortBy.bind(this);
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
      todoList: [
        ...this.state.todoList,
        {
          todo: newItem,
          status: "not done",
          addDate: this.state.date,
          finishDate: "",
        },
      ],
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

  renderTodos = (item) => {
    return item.todo;
  };

  renderTodoList = (array) => {
    return array.map((item, index) => {
      return (
        <div key={index} className={classes.todo}>
          <div className={classes.mainWrapper}>
            <img
              className={classes.checkboxIcon}
              src={renderTodoCheckbox(item)}
              alt="checkbox icon"
              onClick={this.changeStatus}
              data-todo-value={renderTodos(item)}
            />
            <div className={classes.todoWrapper}>
              <p
                onClick={this.changeStatus}
                data-todo-value={renderTodos(item)}
              >
                {renderTodos(item)}
              </p>
              <div className={classes.dateContainer}>
                <p className={classes.date}>
                  Added: <span> {item.addDate}</span>
                </p>
                <p className={classes.date}>
                  Finished: <span> Not yet! </span>
                </p>
              </div>
            </div>
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

  setSortBy(e) {
    this.setState({ sortBy: e.target.dataset.name });
  }

  componentDidMount() {
    const today = setDate();
    this.setState({ date: today });
  }

  render() {
    let currentModal = this.renderModalContent();
    return (
      <Fragment>
        <div className={classes.mainContainer}>
          <div className={classes.flexContainerColumn}>
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
            <div className={classes.flexContainerRow}>
              <button className={classes.addBtn}>
                <img
                  src={AddIcon}
                  alt="add icon"
                  className={classes.addIcon}
                  onClick={this.handleOpenModal}
                />
                <p onClick={this.handleOpenModal}>Add items</p>
              </button>
              <div className={classes.dropdown}>
                <button className={classes.dropbtn}>
                  Sort by: <span>{this.state.sortBy} ▼</span>
                </button>
                <div className={classes.dropdownContent}>
                  <a href="/" onClick={this.setSortBy} data-name="All">
                    All
                  </a>
                  <a href="/" onClick={this.setSortBy} data-name="Not Done">
                    Not Done
                  </a>
                  <a href="/" onClick={this.setSortBy} data-name="In progress">
                    In progress
                  </a>
                  <a href="/" onClick={this.setSortBy} data-name="Done">
                    Done
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.flexContainerColumn}>
            {this.renderTodoList(this.state.todoList)}
          </div>
        </div>
        <LegendFooter />
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
