import React from 'react';
import './App.css';
import {
  faPencilAlt,
  faTrashAlt,
  faPlus,
  faChevronUp,
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
    };
    // this.myRef = React.createRef();
    // this.scroll = this.scroll.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onNameSubmit = this.onNameSubmit.bind(this);
    this.onTodoChange = this.onTodoChange.bind(this);
    this.onTodoSubmit = this.onTodoSubmit.bind(this);
    this.activateAddTodo = this.activateAddTodo.bind(this);
    this.activateUpdateTodo = this.activateUpdateTodo.bind(this);
    this.onSubmitUpdateTodo = this.onSubmitUpdateTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
  }

  // scroll(ref) {
  //   ref.current.scrollIntoView({ behavior: 'smooth' });
  // }

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
          { id, title: prevState.title, desc: prevState.desc, complted: false },
        ];
        console.log(todos);
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

  activateUpdateTodo(i, todo) {
    this.setState({
      title: todo.title,
      desc: todo.desc,
      updateTodoActive: true,
    });
  }

  onSubmitUpdateTodo(i) {
    this.setState((prevState) => {
      let todos = [
        ...prevState.todos.slice(0, i),
        {
          id: prevState.todos[i].id,
          title: prevState.title,
          desc: prevState.desc,
          completed: false,
        },
        ...prevState.todos.slice(i + 1),
      ];
      console.log(todos);
      return {
        todos,
        updateTodoActive: false,
      };
    });
  }

  deleteTodo(i) {
    let todos = this.state.todos;
    console.log(i);
    todos.splice(i, 1);
    this.setState({
      todos,
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
            <form onSubmit={this.onTodoSubmit}>
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
        <main className='list' ref={this.myRef}>
          <ul>
            {todos.map((list, index) => (
              // <Fade key={list.id}>
              <li key={list.id} className='list__item'>
                <div className='list__layout'>
                  <div className='list__text'>
                    <h2 className='list__item__title'>{list.title}</h2>
                    <p className='list__item__desc'>{list.desc}</p>
                  </div>
                  <div className='list__icons'>
                    <FontAwesomeIcon
                      icon={faPencilAlt}
                      className='icon'
                      onClick={() =>
                        this.activateUpdateTodo(index, {
                          title: list.title,
                          desc: list.desc,
                        })
                      }
                    />{' '}
                    |{' '}
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      className='icon'
                      onClick={() => this.deleteTodo(index)}
                    />
                  </div>
                </div>
                <p className='border__bottom'></p>
              </li>
              // </Fade>
            ))}
          </ul>
          <div className='plus'>
            <FontAwesomeIcon icon={faPlus} onClick={this.activateAddTodo} />
          </div>
          <div
            className='top'
            // onClick={() => {
            //   this.scroll(this.myRef);
            // }}
          >
            <a href='#main' title='To Top'>
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
export default App;
