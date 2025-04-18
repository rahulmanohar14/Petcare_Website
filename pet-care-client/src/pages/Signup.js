import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style.css';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const checkStrength = (pwd) => {
    let score = 0;
    if (pwd.length >= 6) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/\d/.test(pwd)) score++;
    if (/[\W_]/.test(pwd)) score++;

    if (score <= 2) return 'Weak';
    if (score === 3 || score === 4) return 'Medium';
    return 'Strong';
  };

  const handlePasswordChange = (e) => {
    const newPwd = e.target.value;
    setPassword(newPwd);
    setStrength(checkStrength(newPwd));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/;

    if (!emailRegex.test(email)) {
      alert('Please enter a valid email.');
      return;
    }

    if (!passwordRegex.test(password)) {
      alert('Password must be at least 6 characters and include:\n- One uppercase\n- One lowercase\n- One number\n- One special character');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/auth/signup', {
        email,
        password,
        role
      });

      alert('Signup successful!');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Signup failed');
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
            position: relative;
          }

          .logo {
            position: absolute;
            top: 20px;
            left: 20px;
            cursor: pointer;
            z-index: 999;
          }

          .logo img {
            width: 40px;
            height: 40px;
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

          .strength {
            margin-top: -10px;
            margin-bottom: 10px;
            font-size: 14px;
          }
        `}
      </style>

      <div className="overlay">
        <div className="logo" onClick={() => navigate('/')}>
          <img src="/logo.png" alt="PetCare Logo" />
        </div>

        <div className="login-box">
          <h2>Create Your Account</h2>
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
              type={showPassword ? 'text' : 'password'}
              className="form-control"
              placeholder="Create Password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <div className="strength" style={{ color: strength === 'Strong' ? 'green' : strength === 'Medium' ? 'orange' : 'red' }}>
              Strength: {strength}
            </div>

            <label style={{ fontSize: '14px', display: 'block', marginBottom: '10px' }}>
              <input type="checkbox" onChange={() => setShowPassword(!showPassword)} /> Show Password
            </label>

            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <select
              className="form-control"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="vet">Vet</option>
              <option value="groomer">Groomer</option>
              <option value="adoption">Adoption Manager</option>
            </select>
            <button type="submit" className="btn-primary">Sign Up</button>
          </form>
          <p>
            Already have an account? <a href="/login">Login here</a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Signup;