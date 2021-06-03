import React from 'react'

const loginForm = ({ handleLogin, username, setUsername, password, setPassword }) => (
  <div>
    <h2>Please Login</h2>
    <form onSubmit={handleLogin}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          name="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          name="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">Login</button>
    </form>
  </div>
)

export default loginForm