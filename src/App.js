import './App.css';
import TodoList from './components/TodoList';

function App() {
  const todoLists = [
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
  ];

  const todoListComp = todoLists.map(todoList => <TodoList todos={todoList.todos} />);
  return (
    <div className="App">
      {todoListComp}
    </div>
  );
}

export default App;
