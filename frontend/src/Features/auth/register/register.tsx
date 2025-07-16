import React, { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import './register.css';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [formData, setFormData] = useState({ email: '', username: '', password: '' });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');
      setSuccess(true);
      setTimeout(() => navigate('/'), 1500); // Redirect to login after 1.5s
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-wrapper">
      <form onSubmit={handleSubmit} className="register-form">
        <h2 style={{ marginBottom: '10px' }}>Register</h2>
        <input
          placeholder="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          placeholder="Username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          placeholder="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</button>
        {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
        {success && <div style={{ color: 'green', marginTop: 8 }}>Registration successful! Redirecting to login...</div>}
        <div style={{ marginTop: '10px', fontSize: '0.9em' }}>
          Already have an account?{' '}
          <span
            style={{ color: '#007bff', cursor: 'pointer', textDecoration: 'underline' }}
            onClick={() => navigate('/')}
          >
            Login
          </span>
        </div>
      </form>
    </div>
  );
} 