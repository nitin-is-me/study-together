"use client";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import { formatTimeAgo } from '../../../../utils/formatTime';

export default function RoomPage() {
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [leaving, setLeaving] = useState(false);

  const { roomid } = useParams();
  const router = useRouter();

  useEffect(() => {
    axios.get(`http://localhost:8000/room/public/get/${roomid}`, { withCredentials: true })
      .then(response => {
        setRoom(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch room details');
        setLoading(false);
      });
  }, [roomid]);

  const handleLeaveRoom = async () => {
    setLeaving(true);
    try {
      router.push("/dashboard");
    } catch (error) {
      setError('Failed to leave room');
      setLeaving(false);
    }
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
      <h2 className="text-danger font-weight-bold text-center my-5">{error}</h2>
    );
  }

  return (
    <div className="container my-5">
      <div className="card shadow-sm rounded">
        <div className="card-header bg-secondary text-white">
          <h2 className="card-title mb-0">{room?.name || "Untitled"}</h2>
        </div>
        <div className="card-body">
          <p className="card-text lead">{room?.description || "No description"}</p>
          <p className="text-muted">
            <i className="bi bi-person-fill"></i> Created by {room?.admin?.name || 'Unknown'} - {formatTimeAgo(room.createdAt)}
          </p>
        </div>
        <div className="card-footer bg-light text-center">
          <button 
            onClick={handleLeaveRoom} 
            className="btn btn-danger"
            disabled={leaving}
          >
            {leaving ? (
              <div className="spinner-border spinner-border-sm text-white" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <>
                <i className="bi bi-box-arrow-right"></i> Leave Room
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
