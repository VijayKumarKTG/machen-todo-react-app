import React from 'react';
import './App.css';
import {
  faPencilAlt,
  faTrashAlt,
  faPlus,
  faChevronUp,
  faStickyNote,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import Fade from 'react-reveal/Fade';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      tempName: '',
      title: '',
      desc: '',
      todos: [],
      addTodoActive: false,
      updateTodoActive: false,
      filter: 'all',
    };
    this.myRef = React.createRef();
    this.scroll = this.scroll.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onNameSubmit = this.onNameSubmit.bind(this);
    this.onTodoChange = this.onTodoChange.bind(this);
    this.onTodoSubmit = this.onTodoSubmit.bind(this);
    this.activateAddTodo = this.activateAddTodo.bind(this);
    this.activateUpdateTodo = this.activateUpdateTodo.bind(this);
    this.onSubmitUpdateTodo = this.onSubmitUpdateTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.onFilterAll = this.onFilterAll.bind(this);
    this.onFilterActive = this.onFilterActive.bind(this);
    this.onFilterCompleted = this.onFilterCompleted.bind(this);
    this.onComplete = this.onComplete.bind(this);
  }

  scroll(ref) {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  }

  onNameChange(e) {
    this.setState({ tempName: e.target.value });
  }

  onNameSubmit() {
    this.setState({ name: this.state.tempName });
  }

  onTodoChange(e) {
    let value = e.target.value;
    let name = e.target.name;
    this.setState({ [name]: value });
  }

  onTodoSubmit(e) {
    e.preventDefault();
    this.setState((prevState) => {
      if (prevState.title && prevState.desc) {
        let list = prevState.todos;
        let id = list.length > 0 ? list[list.length - 1].id + 1 : 1;
        let todos = [
          ...list,
          {
            id,
            title: prevState.title,
            desc: prevState.desc,
            completed: false,
          },
        ];
        return {
          todos,
          title: '',
          desc: '',
          addTodoActive: false,
        };
      } else {
        return prevState;
      }
    });
  }

  activateAddTodo() {
    this.setState({ addTodoActive: true });
  }

  activateUpdateTodo(todo) {
    this.setState({
      title: todo.title,
      desc: todo.desc,
      updateTodoActive: true,
      i: todo.i,
    });
  }

  onSubmitUpdateTodo() {
    this.setState((prevState) => {
      let todos = [
        ...prevState.todos.slice(0, prevState.i),
        {
          id: prevState.todos[prevState.i].id,
          title: prevState.title,
          desc: prevState.desc,
          completed: prevState.todos[prevState.i].completed,
        },
        ...prevState.todos.slice(prevState.i + 1),
      ];
      return {
        todos,
        updateTodoActive: false,
        i: null,
        title: '',
        desc: '',
      };
    });
  }

  deleteTodo(i) {
    let todos = this.state.todos;
    todos.splice(i, 1);
    this.setState({
      todos,
    });
  }

  onFilterAll() {
    this.setState({ filter: 'all' });
  }

  onFilterActive() {
    this.setState({ filter: 'active' });
  }

  onFilterCompleted() {
    this.setState({ filter: 'completed' });
  }

  onComplete(e, i) {
    console.log(e.target);
    this.setState((prevState) => {
      let todos = prevState.todos.map((todo, index) => {
        todo.completed = index === i ? !todo.completed : todo.completed;
        return todo;
      });
      i = null;
      return {
        todos,
      };
    });
  }

  render() {
    const { name, todos, addTodoActive, updateTodoActive } = this.state;
    return (
      <div className='app'>
        {name === '' && (
          <Alert className='alert'>
            <p className='alert__title'>Please Enter your name!</p>
            <form onSubmit={this.onNameSubmit}>
              <input
                type='text'
                className='alert__input'
                onChange={this.onNameChange}
                placeholder='Name'
              />
              <button className='alert__button'>Add</button>
            </form>
          </Alert>
        )}
        {(addTodoActive || updateTodoActive) && (
          <Alert className='alert'>
            <p className='alert__title'>
              {addTodoActive ? `Add` : `Update`} Your New Todo!
            </p>
            <form
              onSubmit={
                addTodoActive ? this.onTodoSubmit : this.onSubmitUpdateTodo
              }>
              <input
                type='text'
                className='alert__input'
                name='title'
                value={this.state.title}
                onChange={this.onTodoChange}
                placeholder='Todo Title'
              />
              <textarea
                className='alert__input'
                rows='4'
                name='desc'
                value={this.state.desc}
                onChange={this.onTodoChange}></textarea>
              <input
                type='submit'
                value={addTodoActive ? `Add` : `Update`}
                className='alert__button'
              />
            </form>
          </Alert>
        )}
        <header>
          <div className='brand'>Machen</div>
          <div className='username'>{name}</div>
        </header>
        <main className='list'>
          <div className='filters'>
            <button className='filter__all' onClick={this.onFilterAll}>
              All
            </button>
            <button className='filtler__active' onClick={this.onFilterActive}>
              Active
            </button>
            <button
              className='filter__complete'
              onClick={this.onFilterCompleted}>
              Completed
            </button>
          </div>
          {todos !== [] ? (
            <ul ref={this.myRef} id='lists'>
              {todos.map(
                (list, index) => (
                  <Todo
                    key={list.id}
                    {...list}
                    index={index}
                    activateUpdateTodo={this.activateUpdateTodo}
                    deleteTodo={this.deleteTodo}
                    onCompleted={(e) => this.onComplete(e, index)}
                  />
                )
                // <Fade key={list.id}>
                // </Fade>
              )}
            </ul>
          ) : (
            <div className='empty__note'>
              <FontAwesomeIcon icon={faStickyNote} />
            </div>
          )}
          <div className='plus'>
            <FontAwesomeIcon icon={faPlus} onClick={this.activateAddTodo} />
          </div>
          <div
            className='top'
            onClick={() => {
              this.scroll(this.myRef);
            }}>
            <a href='#lists' title='To Top'>
              <FontAwesomeIcon icon={faChevronUp} />
            </a>
          </div>
        </main>
      </div>
    );
  }
}

function Alert({ children }) {
  return <div className='alert'>{children}</div>;
}

function Todo({
  title,
  desc,
  completed,
  index,
  activateUpdateTodo,
  deleteTodo,
  onCompleted,
}) {
  return (
    <li className={completed ? 'list__item complete' : 'list__item'}>
      <div className='list__layout'>
        <span className='checkbox' onClick={onCompleted}>
          <input type='button' id='complete' value='' />
        </span>
        <div className='list__text'>
          <h2 className='list__item__title'>{title}</h2>
          <p className='list__item__desc'>{desc}</p>
        </div>
        <div className='list__icons'>
          <FontAwesomeIcon
            icon={faPencilAlt}
            className='icon'
            onClick={() =>
              activateUpdateTodo({
                title: title,
                desc: desc,
                i: index,
              })
            }
          />{' '}
          |{' '}
          <FontAwesomeIcon
            icon={faTrashAlt}
            className='icon'
            disabled={completed}
            onClick={() => deleteTodo(index)}
          />
        </div>
      </div>
      <p className='border__bottom'></p>
    </li>
  );
}
export default App;
