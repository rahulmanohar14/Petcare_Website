import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("If this email is registered, a reset link will be sent.");
    console.log("Reset requested for:", email);
  };

  return (
    <>
      <style>
        {`
          body {
            margin: 0;
            font-family: 'Poppins', sans-serif;
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
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1;
            flex-direction: column;
          }

          .logo {
            position: absolute;
            top: 20px;
            left: 20px;
            z-index: 999;
          }

          .logo img {
            width: 40px;
            height: 40px;
            cursor: pointer;
          }

          .login-box {
            background: white;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.3);
            width: 90%;
            max-width: 400px;
            z-index: 2;
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
        <Link to="/" className="logo">
          <img src="/logo.png" alt="PetCare Logo" />
        </Link>

        <div className="login-box">
          <h2>Reset Your Password</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn-primary">
              Send Reset Link
            </button>
          </form>
          <p>
            Remembered it? <a href="/login">Login here</a>
          </p>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;