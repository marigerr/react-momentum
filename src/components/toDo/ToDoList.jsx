import React from 'react';
import 'Stylesheets/to-do-list.css';
import ToDoModal from 'Components/toDo/todoModal.jsx';
import 'Images/001-check-box-empty.svg';
import 'Images/002-check.svg';
import 'Images/002-remove-symbol.svg';
import { getCurrentTime, localStorageKeyExists, addToLocalStorage, getFromLocalStorage, addToLocalStorageArray, removeFromLocalStorageArray } from 'Scripts/utilities';

export default class ToDoList extends React.Component {
  constructor(props) {
    super(props);

    const toDosArrSaved = localStorageKeyExists('toDosArr');
    const toDosArr = getFromLocalStorage('toDosArr');
    const amountUndoneToDosSaved = localStorageKeyExists('undoneToDos');
    const amountUndoneToDos = getFromLocalStorage('undoneToDos');
    const toggleModalStatus = getFromLocalStorage('toggleTodoModal');
    this.state = {
      todo: 'ToDo',
      toDosArr: toDosArrSaved === true ? toDosArr : [],
      todoInput: '',
      placeholder: 'New todo',
      inputStyle: 'todo-input',
      containerStyle: 'toDoItemList-container',
      toDoStyle: 'toDoCross todoItemList',
      amountUndoneToDos: amountUndoneToDosSaved === true ? amountUndoneToDos : '0',
      toggleModal: toggleModalStatus || false,
    };
  }

  addInput(e) {
    if (e.key === 'Enter' && e.target.value) {
      const newToDoObj = {
        toDo: e.target.value,
        toDoDone: false,
        id: getCurrentTime(),
      };
      const updatedToDosArr = addToLocalStorageArray('toDosArr', newToDoObj);
      this.setState({
        toDosArr: updatedToDosArr,
        amountUndoneToDos: this.howManyUndoneTodos(updatedToDosArr),
        todoInput: '',
      });
    }
  }

  updateInputValue(e) {
    this.setState({
      todoInput: e.target.value,
    });
  }

  // keep track of how many todos are not complete
  howManyUndoneTodos(toDosArr) {
    let amountUndoneToDos = 0;
    toDosArr.forEach((todo) => {
      if (!todo.toDoDone) {
        amountUndoneToDos += 1;
      }
    });
    addToLocalStorage('undoneToDos', amountUndoneToDos);
    return amountUndoneToDos;
  }

  // Decide which checkbox to show according to todo completion
  showCheckbox(toDoDone) {
    if (toDoDone) {
      return <img className="toDo-checkbox" src='../assets/images/002-check.svg'/>;
    }
    return <img className="toDo-checkbox" src='../assets/images/001-check-box-empty.svg'/>;
  }

  showDeleteButton() {
    return <div className="deleteButton-todoList"><img className="letterX-todoList" src='../assets/images/002-remove-symbol.svg'/></div>;
  }

  // update the array containing the todos list by deleting the selected todo
  deleteTodo(todoId) {
    const updatedToDosArr = removeFromLocalStorageArray('toDosArr', 'id', todoId);
    this.setState({
      toDosArr: updatedToDosArr,
      amountUndoneToDos: this.howManyUndoneTodos(updatedToDosArr),
    });
  }

  // update the todos state directly from the array.
  clickCheckbox(todoId) {
    const toDosArr = this.state.toDosArr;
    const updatedDoneTodosArr = toDosArr.map((todo) => {
      if (todo.id === todoId) {
        return {
          toDo: todo.toDo,
          toDoDone: !todo.toDoDone,
          id: todo.id,
        };
      }
      return todo;
    },
    );
    addToLocalStorage('toDosArr', updatedDoneTodosArr);
    this.setState({
      toDosArr: updatedDoneTodosArr,
      amountUndoneToDos: this.howManyUndoneTodos(updatedDoneTodosArr),
    });
  }

  toggleModal() {
    this.setState({
      toggleModal: !this.state.toggleModal,
    }, () => addToLocalStorage('toggleTodoModal', this.state.toggleModal));
  }

  render() {
    return (
      <div className="todo-list-container">
        {this.state.toggleModal && <ToDoModal
          deleteTodo={todoId => this.deleteTodo(todoId)}
          clickCheckbox={todoId => this.clickCheckbox(todoId)}
          containerStyle={this.state.containerStyle}
          toDoStyle={this.state.toDoStyle}
          deleteButtonStyle={() => this.showDeleteButton()}
          checkboxType={toDoDone => this.showCheckbox(toDoDone)}
          toDosArr={this.state.toDosArr}
          inputStyle={this.state.inputStyle}
          addInput={e => this.addInput(e)}
          updateInputValue={e => this.updateInputValue(e)}
          value={this.state.todoInput}
          placeholder={this.state.placeholder}
          amountUndoneToDos={this.state.amountUndoneToDos}
        />
        }
        <div className="todo-icon" onClick={this.toggleModal.bind(this)}>{this.state.todo}</div>
      </div>
    );
  }
}
