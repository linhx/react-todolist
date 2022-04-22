import TodoItem from "./TodoItem";

function TodoList({
  name,
  todos,
  changeState,
  changeContent,
  add,
  className
}) {
  const todoItems = todos.map(todo => {
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
    if (e.key === 'Enter') {
      add(e.target.value);
      e.target.value = '';
      return;
    }
  }

  return (
    <div className={className}>
      <div>
        <h5>{name}</h5>
        <input className="input" placeholder="Add new" onKeyDown={onKeyDown} />
      </div>
      {todoItems}
    </div>
  );
}

export default TodoList;
