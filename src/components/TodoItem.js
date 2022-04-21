import Status from "./Status";
import TodoContent from "./TodoContent";

function TodoItem({
  isComplete,
  content,
  changeState,
  onChangeContent
}) {
  let className = 'todo-item py-1';
  className += isComplete ? ' line-through text-gray-400' : ' text-orange-600';
  return (
    <div className={className}>
      <Status isComplete={isComplete} onClick={changeState} />
      <TodoContent content={content} onChange={onChangeContent} />
    </div>
  );
}

export default TodoItem;
