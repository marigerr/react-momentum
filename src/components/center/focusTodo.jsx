import React, { Component } from 'react';
import 'Stylesheets/center.css';
import { localStorageKeyExists, getFromLocalStorage, addToLocalStorage } from 'Scripts/utilities';
import AskInput from 'Components/askInput.jsx';
import ListToDoItem from 'Components/listToDoItem.jsx';
import 'Images/001-check-box-empty.svg';
import 'Images/002-check.svg';
import 'Images/001-plus-black-symbol.svg';
import 'Images/002-remove-symbol.svg';

class FocusToDo extends Component {
  constructor(props) {
    super(props);
    // keep track of saved focus todo and if it was already done or not.
    // Initialize state accordingly
    const savedToDo = localStorageKeyExists('toDo');
    const toDo = getFromLocalStorage('toDo');
    const savedToDoDone = localStorageKeyExists('toDoDone');
    const toDoDone = getFromLocalStorage('toDoDone');
    this.state = {
      focusToDo: {
        askToDo: 'What is your main focus for today?',
        toDoExists: savedToDo,
        toDo: savedToDo === true ? toDo : '',
        toDoDone: savedToDoDone === true ? toDoDone : false,
        clickDone: false,
      },
      toDoStyle: {
        label: 'askToDo-label',
        input: 'askToDo-input',
        container: 'toDoItem-container',
        toDoCross: toDoDone === true ? 'toDoCross' : '',
      },
    };
  }

  // Receive and store the given todo
  addInput(e) {
    if (e.key === 'Enter' && e.target.value) {
      addToLocalStorage('toDo', this.state.focusToDo.toDo);
      this.setState({
        focusToDo: {
          toDo: e.target.value,
          toDoExists: true,
        },
      });
    }
  }

  updateInputValue(e) {
    this.setState({
      focusToDo: {
        toDo: e.target.value,
        toDoExists: false,
        askToDo: 'What is your main focus for today?',
      },
    });
  }

  // Decide which checkbox to show according to todo completion
  showCheckbox() {
    if (this.state.focusToDo.toDoDone) {
      return <img className="focusToDo-checkbox" src='../assets/images/002-check.svg'/>;
    }
    return <img className="focusToDo-checkbox" src='../assets/images/001-check-box-empty.svg'/>;
  }

  // Decide which delete button type according to todo completion
  showDeleteButton() {
    if (this.state.focusToDo.toDoDone) {
      return <div className="deleteButton"><img className="plus-sign" src='../assets/images/001-plus-black-symbol.svg'/></div>;
    }
    return <div className="deleteButton"><img className="letterX" src='../assets/images/002-remove-symbol.svg'/></div>;
  }

  // update state when checking or unchecking the checkbox for todo completion
  // store the todo completion status to localstorage. To be used when initializing state.
  clickCheckbox() {
    if (this.state.focusToDo.toDoDone) {
      this.setState({
        focusToDo: {
          toDoDone: false,
          toDoExists: true,
          toDo: getFromLocalStorage('toDo'),
        },
        toDoStyle: {
          container: 'toDoItem-container',
          toDoCross: '',
        },
      }, () => {
        addToLocalStorage('toDoDone', this.state.focusToDo.toDoDone);
      });
    } else {
      this.setState({
        focusToDo: {
          toDoDone: true,
          toDoExists: true,
          toDo: getFromLocalStorage('toDo'),
          clickDone: true,
        },
        toDoStyle: {
          container: 'toDoItem-container',
          toDoCross: 'toDoCross',
        },
      }, () => {
        addToLocalStorage('toDoDone', this.state.focusToDo.toDoDone);
      });
    }
  }

  // functionality for the delete todo button. State is updated, so new components can re-render.
  // remove the todo from localstorage. To be used when initializing state.
  newTodo() {
    this.setState({
      focusToDo: {
        toDoExists: false,
        askToDo: 'What is your main focus for today?',
        toDo: '',
      },
      toDoStyle: {
        label: 'askToDo-label',
        input: 'askToDo-input',
        container: 'toDoItem-container',
      },
    });
    localStorage.removeItem('toDo');
  }

  congratsDoneToDo() {
    if (this.state.focusToDo.clickDone) {
      return (
        <div className="congrats-container">
          <div className="ping-animation"></div>
          <div>Great job!</div>
        </div>
      );
    }
    return null;
  }

  render() {
    if (!this.state.focusToDo.toDoExists) {
      return (
        <div className="focusToDo-main-container">
          <AskInput
            labelStyle={this.state.toDoStyle.label}
            inputStyle={this.state.toDoStyle.input}
            addInput={e => this.addInput(e)}
            updateInputValue={e => this.updateInputValue(e)}
            value={this.state.focusToDo.toDo}
            askInput={this.state.focusToDo.askToDo}
          />
        </div>
      );
    }
    return (
      <div className="focusToDo-main-container">
        <div className="container-center-todo">TODAY</div>
        <ListToDoItem
          toDoStyle={this.state.toDoStyle.toDoCross}
          containerStyle={this.state.toDoStyle.container}
          deleteButtonStyle={() => this.showDeleteButton()}
          toDo={this.state.focusToDo.toDo}
          checkboxType={() => this.showCheckbox()}
          newTodo={() => this.newTodo()}
          clickCheckbox={() => this.clickCheckbox()}
        />
        {this.congratsDoneToDo()}
      </div>
    );
  }
}

export default FocusToDo;
