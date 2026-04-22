<div className="container">
  <div className="card">
    <h2>Welcome Back 👋</h2>
    <p>Login to your account</p>

    <form onSubmit={handleSubmit}>
      <input placeholder="Email" required
        onChange={(e) => setForm({ ...form, email: e.target.value })} />

      <input type="password" placeholder="Password" required
        onChange={(e) => setForm({ ...form, password: e.target.value })} />

      <button type="submit">Login</button>
    </form>

    <p>
      New user? <a href="/register">Register</a>
    </p>
  </div>
</div>