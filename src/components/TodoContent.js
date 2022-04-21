import { useEffect, useRef, useState } from "react";

function TodoContent({
  content,
  onChange
}) {
  const [isEdit, setIsEdit] = useState(false);
  const textInput = useRef(null);
  const [cloneContent, setCloneContent] = useState(content);

  useEffect(() => {
    if (isEdit) {
      textInput.current.focus();
    }
  }, [isEdit]);

  const startEdit = (e) => {
    e.preventDefault();
    setIsEdit(true);
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      onChange(e.target.value);
      e.target.blur();
      setIsEdit(false);
      return;
    }

    if (e.key === 'Escape') {
      onChange(content);
      setCloneContent(content);
      e.target.blur();
      setIsEdit(false);
      return;
    }
  }

  if (isEdit) {
    return <input ref={textInput}
      className="px-2 py-1 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 rounded-md sm:text-sm focus:ring-1"
      value={cloneContent}
      onChange={(e) => {setCloneContent(e.target.value)}}
      onKeyDown={onKeyDown} />
  } else {
    return <span className="cursor-pointer" onDoubleClick={startEdit}>{content}</span>
  }
}

export default TodoContent;