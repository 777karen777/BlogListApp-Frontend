const Notification = ({ message, notificationColor }) => {
  const messageStyle = {
    color: notificationColor,
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20
  }

  if (message) {
    return(
      <div style={messageStyle}>{message}</div>
    )
  }
}

export default Notification