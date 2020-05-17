import NotDoneCheckbox from "../assets/images/notdonecheckbox.png";
import InProgressCheckbox from "../assets/images/inprogresscheckbox.png";
import DoneCheckbox from "../assets/images/donecheckbox.png";

export function renderTodoCheckbox(item) {
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
}

export function renderTodos(item) {
  return item.todo;
}
