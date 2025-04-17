import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });

      const { token, user } = res.data;

      // Save token in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      alert('Login successful!');
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
      console.error(err);
    }
  };

  return (
    <>
      <style>
  {`
    html, body {
      margin: 0;
      padding: 0;
      height: 100%;
      font-family: 'Poppins', sans-serif;
    }

    body {
      background: url("/portrait-bg.jpg") no-repeat center center fixed;
      background-size: cover;
    }

    @media screen and (orientation: landscape) {
      body {
        background: url("/1.jpg") no-repeat center center fixed;
        background-size: cover;
      }
    }

    .overlay {
      min-height: 100vh;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.5);
    }

    .login-box {
      background: white;
      padding: 40px;
      border-radius: 10px;
      box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.3);
      width: 90%;
      max-width: 400px;
    }

    .login-box h2 {
      text-align: center;
      color: #ff7f50;
      margin-bottom: 20px;
    }

    .form-control {
      width: 100%;
      padding: 12px;
      margin-bottom: 15px;
      border: 1px solid #ddd;
      border-radius: 5px;
      font-size: 16px;
    }

    .btn-primary {
      width: 100%;
      padding: 12px;
      background-color: #ff7f50;
      border: none;
      color: white;
      font-size: 18px;
      font-weight: bold;
      border-radius: 5px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .btn-primary:hover {
      background-color: #ff9966;
      transform: scale(1.02);
    }

    .login-box p {
      text-align: center;
      margin-top: 10px;
    }

    .login-box a {
      color: #ff7f50;
      text-decoration: none;
    }

    .login-box a:hover {
      text-decoration: underline;
    }
  `}
</style>

      <div className="overlay">
        <div className="login-box">
          <h2>Login to PetCare</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              className="form-control"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="btn-primary">Login</button>
          </form>
          <p>
            <a href="/forgot-password">Forgot password?</a><br />
            <a href="/signup">Don't have an account? Sign up here</a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;