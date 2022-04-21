import TodoItem from "./TodoItem";

function TodoList({ todos, changeState, changeContent }) {
  const todoItems = todos.map(todo => {
    return (
      <TodoItem key={todo.id}
        isComplete={todo.isComplete}
        content={todo.content}
        changeState={(state) => changeState(todo, state)}
        onChangeContent={(content) => changeContent(todo, content)}
      />
    );
  });

  return (
    <div>
      {todoItems}
    </div>
  );
}

export default TodoList;
