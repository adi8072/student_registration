<div className="container">
  <div className="card">
    <h2>Dashboard 📊</h2>

    <p><strong>Name:</strong> {user.name}</p>
    <p><strong>Email:</strong> {user.email}</p>

    <input
      value={course}
      onChange={(e) => setCourse(e.target.value)}
      placeholder="Update your course"
    />

    <button onClick={updateCourse}>Update Course</button>

    <button onClick={logout} style={{marginTop: "10px", background: "red"}}>
      Logout
    </button>
  </div>
</div>