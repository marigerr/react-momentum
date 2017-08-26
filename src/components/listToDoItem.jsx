import React, { Component } from 'react';
import 'Stylesheets/listToDoItem.css';

class ListToDoItem extends Component {
  render() {
    return (
      <div className="toDoItem-container">
        <div onClick={this.props.clickCheckbox.bind(this)}>{this.props.checkboxType()}</div>
        <div className={this.props.toDoStyle}>{this.props.toDo}</div>
        <div onClick={this.props.newTodo.bind(this)}>{this.props.deleteButtonStyle()}</div>
      </div>
    );
  }
}

export default ListToDoItem;
