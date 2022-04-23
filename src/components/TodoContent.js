import { useEffect, useRef, useState } from "react";
import TextareaWithBtn from "./TextareaWithBtn";

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

  const onSubmit = () => {
    onChange(cloneContent);
    setIsEdit(false);
  }

  const discard = () => {
    setCloneContent(content);
    setIsEdit(false);
  }

  if (isEdit) {
    return <TextareaWithBtn
      textareaRef={textInput}
      rows="3"
      className="grow"
      classNameTextarea={className + ' input no-underline'}
      value={cloneContent}
      onChange={(e) => {setCloneContent(e.target.value)}}
      onSubmit={onSubmit}
      discard={discard}
    />
  } else {
    return <span className={className + ' cursor-pointer break-all whitespace-pre-wrap'} onDoubleClick={startEdit}>{content}</span>
  }
}

export default TodoContent;