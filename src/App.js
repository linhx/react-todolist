import { useEffect, useState } from 'react';
import './App.css';
import TodoList from './components/TodoList';
import TodoRepository from './repositories/TodoRepository';

function App() {
  
  const [todoLists, setTodoLists] = useState([]);

  const getTodoLists = () => {
    return TodoRepository.getLists().then(res => {
      setTodoLists(res);
    });
  }

  useEffect(() => {
    getTodoLists();
  }, []);

  const changeState = async (todo, state) => {
    await TodoRepository.changeTodoState(todo.id, state);
    todo.isComplete = state;
    setTodoLists(todoLists.slice());
  }
  const changeContent = async (todo, content) => {
    await TodoRepository.saveTodoContent(todo.id, content);
    if (content) {
      todo.content = content;
    } else {
      const todoList = todoLists.find(todoList => todoList.id === todo.todoListId);
      if (todoList) {
        const index = todoList.todos?.findIndex(_todo => todo.id === _todo.id);
        if (index > -1) {
          todoList.todos.splice(index, 1);
        }
      }
    }
    setTodoLists(todoLists.slice());
  }
  const addTodo = async (todoList, content) => {
    if (!content) {
      return;
    }
    const newTodo = await TodoRepository.addTodo({
      todoListId: todoList.id,
      content
    });
    todoList.todos.unshift(newTodo);
    setTodoLists(todoLists.slice());
  }
  const [newTodoListName, setNewTodoListName] = useState('');
  const addTodoList = async (e) => {
    if (e.key === 'Enter') {
      const newTodoList = await TodoRepository.addList({
        name: newTodoListName
      });
      setNewTodoListName('');
  
      todoLists.push(newTodoList);
      setTodoLists(todoLists.slice());
    }
  }

  const deleteTodoList = async (id) => {
    await TodoRepository.deleteList(id);
    const index = todoLists.findIndex(todoList => todoList.id === id);
    if (index > -1) {
      todoLists.splice(index, 1);
    }
    setTodoLists(todoLists.slice());
  }

  const todoListComp = todoLists.map(todoList => <TodoList
    key={todoList.id}
    id={todoList.id}
    name={todoList.name}
    todos={todoList.todos}
    changeState={changeState}
    changeContent={changeContent}
    add={(content) => addTodo(todoList, content)}
    deleteTodoList={deleteTodoList}
  />);
  return (
    <div className="App max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
      <div className="pb-2">
        <h4 className='text-2xl'>TODO List</h4>
        <i>Click ✔/✘ to change status. Double click to edit, Ctrl + Enter to change, Esc to discard, Clear content to delete.</i>
      </div>
      <div className="grid grid-cols-4 gap-4 mb-4">
        <input
          className="input"
          placeholder="Enter new TODO list"
          value={newTodoListName}
          onChange={(e) => setNewTodoListName(e.target.value)}
          onKeyDown={addTodoList}
        />
      </div>
      <div className='grid grid-cols-4 gap-4'>
        {todoListComp}
      </div>
    </div>
  );
}

export default App;
