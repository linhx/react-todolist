function Status({
  isComplete,
  onClick,
  className
}) {
  const label = isComplete ? '✔ ' : '✘ '
  return <span className={className + ' cursor-pointer select-none'} onClick={() => onClick(!isComplete)}>{label}</span>
}

export default Status;
