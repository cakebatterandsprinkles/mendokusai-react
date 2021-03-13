import React, { Component } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import AddIcon from "../../assets/images/addbutton.png";
import ClosingButton from "../../assets/images/closeButton.png";
import LegendFooter from "../../components/LegendFooter/LegendFooter";
import * as actionTypes from "../../store/actions/actionTypes";
import { renderTodoCheckbox, renderTodos } from "../../util/todo";
import classes from "./BucketList.module.css";

class BucketList extends Component {
  constructor() {
    super();
    this.state = {
      sortBy: "All",
      showModal: false,
      addInput: "",
      dropdownBtnActive: false,
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
    this.sortArray = this.sortArray.bind(this);
    this.handleDropdownClick = this.handleDropdownClick.bind(this);
    this.closeDropdown = this.closeDropdown.bind(this);
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
    })
      .then((blob) => blob.json())
      .then((updatedTodo) => {
        const updatedList = [
          ...this.props.bucketlist.filter(
            (oldToDo) => updatedTodo._id !== oldToDo._id
          ),
          updatedTodo,
        ];
        this.props.updateBucketlist(updatedList);
      });
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

  handleDropdownClick = () => {
    this.state.dropdownBtnActive
      ? this.setState({ dropdownBtnActive: false })
      : this.setState({ dropdownBtnActive: true });
  };

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

  sortArray = (array) => {
    if (this.state.sortBy === "Done") {
      return array.filter((item) => item.status === "done");
    } else if (this.state.sortBy === "Not Done") {
      return array.filter((item) => item.status === "not done");
    } else if (this.state.sortBy === "In progress") {
      return array.filter((item) => item.status === "in progress");
    } else {
      return array;
    }
  };

  renderTodoList = (array) => {
    return this.sortArray(array).map((item) => {
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
              <div
                className={classes.dateContainer}
                onClick={() => this.changeStatus(item)}
              >
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

  closeDropdown() {
    if (this.state.dropdownBtnActive) {
      this.setState({ dropdownBtnActive: false });
    }
  }

  componentDidMount() {
    this.getBucketlist();
  }

  render() {
    let currentModal = this.renderModalContent();
    return (
      <div className={classes.layoutWrapper}>
        <div className={classes.mainContainer} onClick={this.closeDropdown}>
          <div className={classes.flexContainerColumn}>
            <div className={classes.headerContainer}>
              <p className={classes.header}>This is your bucket list: </p>
            </div>
            <div className={classes.flexContainerRow}>
              <div className={classes.dropdown}>
                <button
                  className={classes.dropbtn}
                  onClick={this.handleDropdownClick}
                >
                  <span className={classes.title}>Filter by: </span>
                  <span>
                    {this.state.sortBy}
                    <span className={classes.dropIcon}> ▼</span>
                  </span>
                  <div
                    className={
                      this.state.dropdownBtnActive
                        ? `${classes.dropdownContentActive}`
                        : `${classes.dropdownContent}`
                    }
                  >
                    <p
                      onClick={this.setSortBy}
                      className={
                        this.state.sortBy === "All" ? classes.active : ""
                      }
                      data-name="All"
                    >
                      All
                    </p>
                    <p
                      onClick={this.setSortBy}
                      className={
                        this.state.sortBy === "Not Done" ? classes.active : ""
                      }
                      data-name="Not Done"
                    >
                      Not Done
                    </p>
                    <p
                      onClick={this.setSortBy}
                      className={
                        this.state.sortBy === "In progress"
                          ? classes.active
                          : ""
                      }
                      data-name="In progress"
                    >
                      In progress
                    </p>
                    <p
                      onClick={this.setSortBy}
                      className={
                        this.state.sortBy === "Done" ? classes.active : ""
                      }
                      data-name="Done"
                    >
                      Done
                    </p>
                  </div>
                </button>
              </div>
              <img
                src={AddIcon}
                alt="add icon"
                className={classes.addIcon}
                onClick={this.handleOpenModal}
              />
            </div>
          </div>
          <div className={classes.flexContainerColumnToDo}>
            {this.props.bucketlist.length ? (
              this.renderTodoList(this.props.bucketlist)
            ) : (
              <div className={classes.warning}>
                <div>
                  <span className={classes.star}>★</span>
                  You can add new todos by clicking the plus icon on the right.
                </div>
                <div>
                  <span className={classes.star}>★</span>
                  Click on the checkbox icon to change the todo status to "in
                  progress" or "done".
                </div>
                <div>
                  <span className={classes.star}>★</span>
                  The list items here have no expiration dates. You can do them
                  anytime you like.
                </div>
              </div>
            )}
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
      </div>
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
