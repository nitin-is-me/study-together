"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loadingSignup, setLoadingSignup] = useState(false);
  const [loadingRedirect, setLoadingRedirect] = useState(false);
  const router = useRouter();

  const handleRedirect = async (e) => {
    e.preventDefault();
    setLoadingRedirect(true);
      router.push("/auth/login");
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!username || !name || !password || username.trim() === "" || name.trim() === "" || password.trim() === "") {
      setMessage("")
      return setError("Fill all the fields");
    }
    if (username.includes(" ") && password.includes(" ")) {
      setMessage("")
      return setError("Spaces are not allowed in both fields");
    }
    if (username.includes(" ")) {
      setMessage("")
      return setError("Spaces are not allowed in username");
    }
    if (password.includes(" ")) {
      setMessage("")
      return setError("Spaces are not allowed in password");
    }

    setLoadingSignup(true);

    try {
      const response = await axios.post("http://localhost:8000/auth/signup", { username, name, password });
      if (response.data === "Account created successfully") {
        setMessage(response.data + ", now try logging in");
        setError("");
      } else {
        setError(response.data);
        setMessage("");
      }
    } catch (error) {
      setError("An error occurred");
      setMessage("");
    } finally {
      setLoadingSignup(false);
    }
  };

  return (
    <div>
      <h3 className="text-center m-2">Sign Up</h3>
      <form>
        <div className="form-group text-center">
          <label className="lead m-2">Enter your Name</label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            className="mx-auto form-control w-75"
            placeholder="Name here"
          />
          <label className="lead m-2">Enter your username</label>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            className="mx-auto form-control w-75"
            placeholder="Username here"
          />
          <label className="lead m-2">Enter your password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="mx-auto form-control w-75"
            placeholder="Password here"
          />
          <button
            type="submit"
            onClick={handleSignup}
            className="btn btn-primary pl-3 m-2"
            disabled={loadingSignup}
          >
            {loadingSignup ? (
              <div className="d-flex align-items-center">
                <div className="spinner-border spinner-border-sm text-white me-2" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                Signing Up... 
              </div>
            ) : (
              'Sign Up'
            )}
          </button>
          <p>
            Already have an account? 
            <a
              href="#"
              onClick={handleRedirect}
              className="link-primary ms-2"
              style={{ pointerEvents: loadingRedirect ? 'none' : 'auto' }}
            >
              {loadingRedirect ? (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                'Login'
              )}
            </a>
          </p>
          <span className="text-danger">{error}</span>
          <span className="text-success">{message}</span>
        </div>
      </form>
    </div>
  );
}
