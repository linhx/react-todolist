import Status from "./Status";
import TodoContent from "./TodoContent";

function TodoItem({
  isComplete,
  content,
  changeState,
  onChangeContent
}) {
  const className = isComplete ? ' line-through text-gray-400' : ' text-orange-600';
  return (
    <div className='todo-item py-1 flex'>
      <Status className={className} isComplete={isComplete} onClick={changeState} />
      <TodoContent className={className} content={content} onChange={onChangeContent} />
    </div>
  );
}

export default TodoItem;
