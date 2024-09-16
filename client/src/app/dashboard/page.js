"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { formatTimeAgo } from '../utils/formatTime'; // Adjust the path as needed

export default function Dashboard() {
  const [name, setName] = useState(null);
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [publicRooms, setPublicRooms] = useState([]);

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

    axios.get("http://localhost:8000/room/public/get", { withCredentials: true })
      .then(response => {
        setPublicRooms(response.data);
      })
      .catch(err => {
        setError('Failed to fetch public rooms');
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

  const handleCreatePublicRoom = () => {
    router.push("/dashboard/public/create");
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <h2 className="text-danger font-weight-bold text-center my-5">
        <i className="bi bi-exclamation-triangle"></i> {error}
      </h2>
    );
  }

  return (
    <div className="container my-5">
      {/* Logout button positioned at the top-left */}
      <div className="d-flex justify-content-end align-items-center mb-3">
        <button onClick={handleLogout} className="btn btn-danger">
          <i className="bi bi-box-arrow-right"></i> Log out
        </button>
      </div>

      <h2 className="text-center mb-4">
        <i className="bi bi-person-circle"></i> Welcome to the Study Room Dashboard, {name}!
      </h2>

      <div className="row mb-5">
        <div className="col-md-6 col-lg-4 mb-4">
          <div className="card h-100 text-center">
            <div className="card-body">
              <h5 className="card-title">
                <i className="bi bi-plus-circle"></i> Create Public Room
              </h5>
              <p className="card-text">Create a new public room that others can join.</p>
              <button onClick={handleCreatePublicRoom} className="btn btn-success">
                <i className="bi bi-plus"></i> Create Room
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4 mb-4">
          <div className="card h-100 text-center">
            <div className="card-body">
              <h5 className="card-title">
                <i className="bi bi-lock"></i> Create Private Room
              </h5>
              <p className="card-text">Create a private room with a unique code for invited members only.</p>
              <button className="btn btn-secondary">
                <i className="bi bi-shield-lock"></i> Create Private Room
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4 mb-4">
          <div className="card h-100 text-center">
            <div className="card-body">
              <h5 className="card-title">
                <i className="bi bi-key"></i> Join Private Room
              </h5>
              <p className="card-text">Enter the unique code to join a private room.</p>
              <button className="btn btn-info text-white">
                <i className="bi bi-door-open"></i> Join Private Room
              </button>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-center mb-4">
        <i className="bi bi-people"></i> OR join the public rooms
      </h3>

      <div className="row">
        {publicRooms.map(room => (
          <div key={room._id} className="col-md-6 col-lg-3 mb-4">
            <div className="card h-100 text-center">
              <div className="card-body">
                <h5 className="card-title">{room.name}</h5>
                <p className="card-text">{room.description}</p>
                <button onClick={() => router.push(`/dashboard/public/join/${room._id}`)} className="btn btn-primary">
                  <i className="bi bi-door-open"></i> Join Room
                </button>
              </div>
              <div className="card-footer text-muted">
                <i className="bi bi-person-circle"></i>&nbsp; Created by {room.admin?.name || 'Unknown'} - {formatTimeAgo(room.createdAt)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
