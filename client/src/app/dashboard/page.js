"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [name, setName] = useState(null);
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [publicRooms, setPublicRooms] = useState([
    { id: 1, name: "Math Study Group", description: "Join us for some math practice!" },
    { id: 2, name: "Science Q&A", description: "Ask and answer science questions." },
    { id: 3, name: "History Discussion", description: "Discuss historical events." },
    { id: 4, name: "Programming Help", description: "Get help with coding problems." }
  ]);

  const router = useRouter();

  useEffect(() => {
    axios.get("http://localhost:8000/auth/userInfo", { withCredentials: true })
      .then(response => {
        setName(response.data.name);
        setUsername(response.data.username);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch data');
        setLoading(false);
      });
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8000/auth/logout", {}, { withCredentials: true });
      router.push("/auth/login");
    } catch (error) {
      setError('Failed to log out');
    }
  };

  if (loading) {
    return <div className="d-flex justify-content-center my-5"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div></div>;
  }

  if (error) {
    return <h2 className="text-danger font-weight-bold text-center my-5">{error}</h2>;
  }

  return (
    <div className="container my-5">
      {/* Logout button positioned at the top-left */}
      <div className="d-flex justify-content-end align-items-center mb-3">
        <button onClick={handleLogout} className="btn btn-danger">Log out</button>
      </div>

      <h2 className="text-center mb-4">Welcome to the Study Room Dashboard, {name}!</h2>

      <div className="row mb-5">
        <div className="col-md-6 col-lg-4 mb-4">
          <div className="card h-100 text-center">
            <div className="card-body">
              <h5 className="card-title">Create Public Room</h5>
              <p className="card-text">Create a new public room that others can join.</p>
              <button className="btn btn-success">Create Room</button>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4 mb-4">
          <div className="card h-100 text-center">
            <div className="card-body">
              <h5 className="card-title">Create Private Room</h5>
              <p className="card-text">Create a private room with a unique code for invited members only.</p>
              <button className="btn btn-secondary">Create Private Room</button>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4 mb-4">
          <div className="card h-100 text-center">
            <div className="card-body">
              <h5 className="card-title">Join Private Room</h5>
              <p className="card-text">Enter the unique code to join a private room.</p>
              <button className="btn btn-info text-white">Join Private Room</button>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-center mb-4">OR join the public rooms</h3>

      <div className="row">
        {publicRooms.map(room => (
          <div key={room.id} className="col-md-6 col-lg-3 mb-4">
            <div className="card h-100 text-center">
              <div className="card-body">
                <h5 className="card-title">{room.name}</h5>
                <p className="card-text">{room.description}</p>
                <button className="btn btn-primary">Join Room</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
