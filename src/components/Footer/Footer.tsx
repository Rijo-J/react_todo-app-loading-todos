import React, { Dispatch, SetStateAction } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { SelectFilter } from '../../utils/SelectFilter';

type Props = {
  todos: Todo[],
  currentFilter: string,
  setFilter: Dispatch<SetStateAction<string>>
};

export const Footer: React.FC<Props> = ({
  todos,
  currentFilter,
  setFilter,
}) => {
  const hasCompletedTodo = todos.some(({ completed }) => completed);

  const countTodosLeft = todos
    .filter(({ completed }) => !completed)
    .length;

  return (
    <>
      {todos.length !== 0 && (
        <footer className="todoapp__footer">
          <span className="todo-count">
            {`${countTodosLeft} items left`}
          </span>

          <nav className="filter">
            {Object.values(SelectFilter)
              .filter(value => typeof value === 'string')
              .map((option) => {
                const optionLowCase = option
                  .toString().toLowerCase();
                const isOptionSelected = optionLowCase === currentFilter;

                return (
                  <a
                    href={`#/${optionLowCase}`}
                    key={option}
                    onClick={() => setFilter(optionLowCase)}
                    className={cn(
                      'filter__link',
                      { selected: isOptionSelected },
                    )}
                  >
                    {option}
                  </a>
                );
              })}
          </nav>

          {hasCompletedTodo
        && (
          <button type="button" className="todoapp__clear-completed">
            Clear completed
          </button>
        )}
        </footer>
      )}
    </>
  );
};