import React, { Component } from 'react';
import 'Stylesheets/listToDoItem.css';

class ListToDoItem extends Component {
  render() {
    return (
      <div className={this.props.containerStyle}>
        <div onClick={this.props.clickCheckbox.bind(this, this.props.id)}>{this.props.checkboxType(this.props.toDoDone)}</div>
        <div className={this.props.toDoStyle}>{this.props.toDo}</div>
        <div onClick={this.props.newTodo.bind(this, this.props.id)}>{this.props.deleteButtonStyle()}</div>
      </div>
    );
  }
}

export default ListToDoItem;
