import React from 'react'

const styles = {
  error: {
    color: 'red',
    borderStyle: 'solid',
    background: 'lightgrey',
    fontSize: '20px',
    padding: '10px',
  },
  success: {
    color: 'green',
    borderStyle: 'solid',
    background: 'lightgrey',
    fontSize: '20px',
    padding: '10px',
  }
}

const Notification = ({ message }) => {
  if (message === null) return null

  return (
    <div>
      <p id="msg-p" style={styles[message.type]}>{message.text}</p>
    </div>
  )
}

export default Notification