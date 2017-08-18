import React from 'react';
import 'Stylesheets/to-do-list.css';


export default class ToDoList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todo: 'To Do',
    };
  }

  render() {
    return (
      <div className="todo-list-container">
        {this.state.todo}
      </div>
    );
  }
}
