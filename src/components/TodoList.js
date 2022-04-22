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
    if (e.key === 'Enter') {
      add(e.target.value);
      e.target.value = '';
      return;
    }
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
        <input className="input" placeholder="Add new" onKeyDown={onKeyDown} />
      </div>
      {todoItems}
    </div>
  );
}

export default TodoList;
