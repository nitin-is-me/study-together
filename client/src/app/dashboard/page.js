"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [name, setName] = useState(null);
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage]=useState(null);
  
  const router = useRouter();
  useEffect(() => {
    axios.get("http://localhost:8000/get/userInfo", { withCredentials: true })
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

  if (loading) {
    return <div>Fetching your data...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  const handleLogout=async()=>{
    const response = await axios.post("http://localhost:8000/auth/logout", {}, {withCredentials: true});
    setMessage("Logging you out...");
    router.push("/auth/login")
  }

  return (
    <div className="lead text-center">
      This is the dashboard page, it's only visible if you've logged in before
      <p>Welcome {name}!</p>
      <p>Your username is: {username}</p>
      <button onClick={handleLogout} className="btn btn-success">Log out</button>
      <p>{message}</p>
    </div>
  );
}
