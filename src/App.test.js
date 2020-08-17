import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { App, Todo, Alert } from './App';

describe('App', () => {
  it('renders App without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('has valid snapshot', () => {
    const component = renderer.create(<App />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Todo', () => {
  let props = {
    title: 'Stroy Telling',
    desc: 'Tell someone a story',
    completed: true,
    index: 0,
  };

  it('renders Todo without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Todo {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('has valid snapshot', () => {
    const component = renderer.create(<Todo {...props} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Alert', () => {
  it('render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Alert>
        <p className='alert__title'>Please Enter your name!</p>
        <form>
          <input type='text' className='alert__input' placeholder='Name' />
          <button className='alert__button'>Add</button>
        </form>
      </Alert>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  test('has valid snapshot', () => {
    const component = renderer.create(
      <Alert>
        <p className='alert__title'>Please Enter your name!</p>
        <form>
          <input type='text' className='alert__input' placeholder='Name' />
          <button className='alert__button'>Add</button>
        </form>
      </Alert>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
