import { useState } from 'react';
import './App.css';
import TodoList from './components/TodoList';

function App() {
  const [todoLists, setTodoLists] = useState([
    {
      id: 1,
      name: 'Learning',
      todos: [
        {
          id: 1,
          isComplete: true,
          content: 'learn React'
        },
        {
          id: 2,
          isComplete: false,
          content: 'Make a todo list app'
        }
      ]
    },
    {
      id: 2,
      name: 'Work',
      todos: [
        {
          id: 3,
          isComplete: true,
          content: 'Finish ticket #1234'
        }
      ]
    }
  ]);

  const changeState = (todo, state) => {
    todo.isComplete = state;
    setTodoLists(todoLists.slice());
  }
  const changeContent = (todo, content) => {
    todo.content = content;
    setTodoLists(todoLists.slice());
  }
  const addTodo = (todoList, content) => {
    todoList.todos.unshift({
      id: new Date(),
      isComplete: false,
      content
    });
    setTodoLists(todoLists.slice());
  }

  const todoListComp = todoLists.map(todoList => <TodoList
    key={todoList.id}
    name={todoList.name}
    todos={todoList.todos}
    changeState={changeState}
    changeContent={changeContent}
    add={(content) => addTodo(todoList, content)} />);
  return (
    <div className="App max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
      <div className="pb-2">
        <h4 className='text-2xl'>TODO List</h4>
        <i>Click ✔/✘ to change status. Double click to edit, enter to change, esc to discard.</i>
      </div>
      <div className='grid grid-cols-4 gap-4'>
        {todoListComp}
      </div>
    </div>
  );
}

export default App;
