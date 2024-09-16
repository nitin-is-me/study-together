"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreatePublicRoom() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCreating(true);

    try {
      const response = await axios.post("http://localhost:8000/room/public/create", { name, description }, { withCredentials: true });
      setSuccessMessage("Public room created successfully!");
      setName('');
      setDescription('');
      router.push("/dashboard");
    } catch (err) {
      setError('Failed to create public room');
      setCreating(false);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Create a Public Room</h2>

      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card">
            <div className="card-body">
              {error && <div className="alert alert-danger" role="alert">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="roomName" className="form-label">Room Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="roomName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="roomDescription" className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    id="roomDescription"
                    rows="3"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-success" disabled={creating}>
                  {creating ? (
                    <div className="d-flex align-items-center">
                      <div className="spinner-border spinner-border-sm text-light me-2" role="status">
                        <span className="visually-hidden">creating...</span>
                      </div>
                      Creating...
                    </div>
                  ) : (
                    'Create Room'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
