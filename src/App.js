import { useState } from 'react';
import './App.css';
import TodoList from './components/TodoList';

function App() {
  const [todoLists, setTodoLists] = useState([
    {
      id: 1,
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

  const todoListComp = todoLists.map(todoList => <TodoList
    key={todoList.id}
    todos={todoList.todos}
    changeState={changeState}
    changeContent={changeContent} />);
  return (
    <div className="App max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
      {todoListComp}
    </div>
  );
}

export default App;
