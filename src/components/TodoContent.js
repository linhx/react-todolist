import { useEffect, useRef, useState } from "react";

function TodoContent({
  content,
  onChange,
  className
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
    if (e.key === 'Enter' && e.ctrlKey) {
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
    return <textarea
      ref={textInput}
      rows="3"
      className={className + ' input no-underline'}
      value={cloneContent}
      onChange={(e) => {setCloneContent(e.target.value)}}
      onKeyDown={onKeyDown} />
  } else {
    return <span className={className + ' cursor-pointer break-all whitespace-pre-wrap'} onDoubleClick={startEdit}>{content}</span>
  }
}

export default TodoContent;