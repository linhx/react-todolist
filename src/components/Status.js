function Status({
  isComplete
}) {
  if (isComplete) {
    return <span>✔ </span>
  } else {
    return <span>✘ </span>
  }
}

export default Status;