import iconEnter from '../assets/icons/enter.svg';

function TextareaWithBtn({
  textareaRef,
  rows,
  placeholder,
  className,
  classNameTextarea,
  value,
  onChange,
  onSubmit,
  discard
}) {
  const onKeyDown = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      onSubmit();
      e.target.blur();
      return;
    }

    if (e.key === 'Escape') {
      discard();
      e.target.blur();
      return;
    }
  }

  const onClickEnter = () => {
    onSubmit();
  }

  return (
    <div className={className + ' textarea-container'}>
      <textarea ref={textareaRef} rows={rows} placeholder={placeholder} className={classNameTextarea + ' resize-y'} value={value} onChange={onChange} onKeyDown={onKeyDown}></textarea>
      <button><img src={iconEnter} alt="enter" onClick={onClickEnter} /></button>
    </div>
  );
}

export default TextareaWithBtn;
