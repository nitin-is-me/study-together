"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleRedirect = (e) => {
    e.preventDefault();
    router.push('/auth/signup');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password || username.trim() === '' || password.trim() === '') {
      return setError('Fill both fields');
    }
    if (username.includes(' ') || password.includes(' ')) {
      return setError('Spaces are not allowed in username or password');
    }

    try {
      const response = await axios.post('http://localhost:8000/auth/login', { username, password }, {
        withCredentials: true
      });

      if (response.data === 'Logged in successfully') {
        setMessage(response.data);
        setError('');
        router.push('/dashboard');
      } else {
        setError(response.data);
        setMessage('');
      }
    } catch (err) {
      setError('An error occurred');
    }
  };

  return (
    <div>
      <h3 className="text-center m-2">Log In</h3>
      <form>
        <div className="form-group text-center">
          <label className="lead m-2">Enter your username</label>
          <input type="text" onChange={(e) => setUsername(e.target.value)} className="mx-auto form-control w-75" placeholder="Username here" />
          <label className="lead m-2">Enter your password</label>
          <input type="password" onChange={(e) => setPassword(e.target.value)} className="mx-auto form-control w-75" placeholder="Password here" />
          <button type="submit" onClick={handleLogin} className="btn btn-primary pl-3 m-2">Log In</button>
          <p>Don't have an account? <a href="#" onClick={handleRedirect} className="link-primary">Signup </a></p>
          <span className="text-danger">{error}</span>
          <span className="text-success">{message}</span>
        </div>
      </form>
    </div>
  );
}
