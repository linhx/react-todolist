import Status from "./Status";

function TodoItem({
  isComplete,
  content
}) {
  return (
    <div class="todo-item">
      <Status isComplete={isComplete} />
      <span>{content}</span>
    </div>
  );
}

export default TodoItem;
