import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/actionTypes";
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
      sortBy: "All",
      showModal: false,
      isSubmitted: false,
      addInput: "",
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.renderModalContent = this.renderModalContent.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addToDo = this.addToDo.bind(this);
    this.updateToDo = this.updateToDo.bind(this);
    this.deleteToDo = this.deleteToDo.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
    this.setSortBy = this.setSortBy.bind(this);
  }

  getBucketlist() {
    fetch("/todo/bucketlist", {
      credentials: "include",
    })
      .then((blob) => blob.json())
      .then((response) => {
        this.props.updateBucketlist(response);
      });
  }

  deleteToDo(id) {
    fetch("/todo/bucketlist", {
      method: "DELETE",
      body: JSON.stringify({ id: id }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then(() =>
      this.props.updateBucketlist(
        this.props.bucketlist.filter((todo) => todo._id !== id)
      )
    );
  }

  updateToDo(todo) {
    fetch("/todo/bucketlist", {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const updatedList = [
      ...this.props.bucketlist.filter((oldToDo) => todo._id !== oldToDo._id),
      todo,
    ];
    this.props.updateBucketlist(updatedList);
  }

  addToDo(todo) {
    fetch("/todo/bucketlist", {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((blob) => blob.json())
      .then((response) => {
        const updatedList = [...this.props.bucketlist, response];
        this.props.updateBucketlist(updatedList);
      });
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit() {
    this.setState({ isSubmitted: true });
    this.addToDo({ todo: this.state.addInput, status: "not done" });
    this.setState({ addInput: "" });
    this.handleCloseModal();
  }

  renderModalContent() {
    return (
      <div className={classes.modalMainContainer}>
        <div className={classes.addToDoForm}>
          <form onSubmit={this.handleSubmit}>
            <div className={classes.formGroupContainer}>
              <label htmlFor="add-item">Add an item to your bucket list:</label>
              <input
                onChange={this.handleInputChange}
                value={this.state.addInput}
                type="text"
                name="addInput"
                id="addInput"
              ></input>
            </div>
            <div className={classes.btnWrapper}>
              <button type="submit" className={classes.btn}>
                Add
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
    );
  }

  renderTodos = (item) => {
    return item.todo;
  };

  formatDate = (str) => {
    if (str) {
      const dateArr = str.substring(0, 10).split("-");
      const formattedArr = [dateArr[1], dateArr[2], dateArr[0]];
      return formattedArr.join("/");
    } else {
      return "Not yet!";
    }
  };

  renderTodoList = (array) => {
    return array.map((item) => {
      return (
        <div key={item._id} className={classes.todo}>
          <div className={classes.mainWrapper}>
            <img
              className={classes.checkboxIcon}
              src={renderTodoCheckbox(item)}
              alt="checkbox icon"
              onClick={() => this.changeStatus(item)}
              data-todo-value={renderTodos(item)}
            />
            <div className={classes.todoWrapper}>
              <p
                onClick={() => this.changeStatus(item)}
                data-todo-value={renderTodos(item)}
              >
                {renderTodos(item)}
              </p>
              <div className={classes.dateContainer}>
                <p className={classes.date}>
                  Added: <span> {this.formatDate(item.addDate)}</span>
                </p>
                <p className={classes.date}>
                  Finished: <span> {this.formatDate(item.finishDate)} </span>
                </p>
              </div>
            </div>
          </div>
          <img
            src={ClosingButton}
            alt="delete button"
            className={classes.deleteButton}
            data-value={renderTodos(item)}
            onClick={() => this.deleteToDo(item._id)}
          />
        </div>
      );
    });
  };

  changeStatus(item) {
    const status = item.status;
    switch (status) {
      case "not done":
        item.status = "in progress";
        break;
      case "in progress":
        item.status = "done";
        break;
      case "done":
        item.status = "not done";
        break;
      default:
        item.status = "not done";
    }
    this.updateToDo(item);
  }

  setSortBy(e) {
    this.setState({ sortBy: e.target.dataset.name });
  }

  componentDidMount() {
    this.getBucketlist();
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
            {this.renderTodoList(this.props.bucketlist)}
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

const mapDispatchToProps = (dispatch) => {
  return {
    updateBucketlist: (newBucketlist) => {
      dispatch({
        type: actionTypes.setBucketlist,
        payload: { bucketlist: newBucketlist },
      });
    },
  };
};

const mapStateToProps = (state) => {
  return {
    bucketlist: state.bucketlist,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BucketList);
