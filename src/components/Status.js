function Status({
  isComplete,
  onClick
}) {
  const label = isComplete ? '✔ ' : '✘ '
  return <span className="cursor-pointer" onClick={() => onClick(!isComplete)}>{label}</span>
}

export default Status;