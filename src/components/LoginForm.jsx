const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
                    username
          <input
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
                    password
          <input
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
      </form>
    </div>
  )
}