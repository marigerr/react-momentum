import React, { Component } from 'react';
import 'Stylesheets/to-do-list.css';
import AskInput from 'Components/askInput.jsx';
import ListToDoItem from 'Components/listToDoItem.jsx';
import 'Images/smile.svg';

class ToDoModal extends Component {
  // define the todo css style based on its completition
  crossToDo(todo) {
    if (todo.toDoDone) {
      return this.props.toDoStyle;
    }
    return 'todoItemList';
  }

  // iterate through the todos array and generate jsx to render the todos list
  toDoList(toDosArr) {
    const htmlList = toDosArr.map(todo => <ListToDoItem
      deleteButtonStyle={() => this.props.deleteButtonStyle()}
      checkboxType={toDoDone => this.props.checkboxType(toDoDone)}
      toDoDone={todo.toDoDone}
      id={todo.id}
      newTodo={todoId => this.props.deleteTodo(todoId)}
      clickCheckbox={todoId => this.props.clickCheckbox(todoId)}
      toDo={todo.toDo}
      toDoStyle={this.crossToDo(todo)}
      containerStyle={this.props.containerStyle}
      key={todo.id}
    />);
    return (
      <ul className="todos-list">
        {htmlList}
      </ul>
    );
  }

  render() {
    return (
      <div className="todo-modal">
        <div className="todoList-status">{this.props.amountUndoneToDos} to do</div>
        {this.props.toDosArr.length !== 0 &&
          <div className="todoList-container">{this.toDoList(this.props.toDosArr)}</div>
        }
        {this.props.toDosArr.length === 0 &&
          <div className="no-todo-container">
            <div><img className="smile" src='../assets/images/smile.svg'/></div>
            <div>Nothing to do</div>
            <div>One step at a time...</div>
          </div>
        }
        <AskInput
          inputStyle={this.props.inputStyle}
          addInput={this.props.addInput.bind(this)}
          updateInputValue={this.props.updateInputValue.bind(this)}
          value={this.props.value}
          placeholder={this.props.placeholder}
        />
      </div>
    );
  }
}

export default ToDoModal;
