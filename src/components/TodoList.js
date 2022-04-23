import { useState } from "react";
import TextareaWithBtn from "./TextareaWithBtn";
import TodoItem from "./TodoItem";

function TodoList({
  id,
  name,
  todos,
  changeState,
  changeContent,
  add,
  deleteTodoList,
  className
}) {
  const todoItems = (todos || []).map(todo => {
    return (
      <div key={todo.id}>
        <TodoItem
          isComplete={todo.isComplete}
          content={todo.content}
          changeState={(state) => changeState(todo, state)}
          onChangeContent={(content) => changeContent(todo, content)}
        />
      </div>
    );
  });

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      add(e.target.value);
      e.target.value = '';
      return;
    }
  }

  const [newTodoListName, setNewTodoListName] = useState(''); 

  const onSubmit = () => {
    add(newTodoListName);
    setNewTodoListName('');
  }

  const onDeleteTodoList = () => {
    if (window.confirm("Delete?")) {
      deleteTodoList(id)
    }
  }

  return (
    <div className={className}>
      <div>
        <h5 className="flex"><span className="cursor-pointer pr-2" onClick={onDeleteTodoList}>✘</span><span className="inline-block text-ellipsis overflow-hidden ">{name}</span></h5>
        <TextareaWithBtn
          rows="3"
          placeholder="Add new"
          className="grow"
          classNameTextarea="input"
          value={newTodoListName}
          onChange={(e) => {setNewTodoListName(e.target.value)}}
          onSubmit={onSubmit}
        />
      </div>
      {todoItems}
    </div>
  );
}

export default TodoList;
