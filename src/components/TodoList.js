import TodoItem from "./TodoItem";

function TodoList({ todos }) {
  const todoItems = todos.map(todo => {
    return (
      <TodoItem isComplete={todo.isComplete} content={todo.content} />
    );
  });

  return (
    <div>
      {todoItems}
    </div>
  );
}

export default TodoList;
