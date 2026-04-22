import { useEffect, useState } from "react";
import API from "../api/axios";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [course, setCourse] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await API.get("/auth/profile");
      setUser(data);
      setCourse(data.course);
    };
    fetchData();
  }, []);

  const updateCourse = async () => {
    await API.put("/auth/update-course", { course });
    alert("Updated!");
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="container">
      <div className="card">
        <h2>Dashboard</h2>

        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>

        <input
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />

        <button onClick={updateCourse}>Update Course</button>
      </div>
    </div>
  );
}

export default Dashboard;