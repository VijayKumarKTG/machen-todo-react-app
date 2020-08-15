import React from 'react';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export function Todo({
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
