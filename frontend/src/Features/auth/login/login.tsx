import React, { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { loginapi } from '../../../Shared/config/api';
import type { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    loginapi(formData)
      .then((res: AxiosResponse) => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('currentUser', JSON.stringify(res.data.userData));
        toast.success('Login successful!');
        navigate('/home');
      })
      .catch((error: AxiosError) => {
        const message = (error.response?.data as string) ?? 'Server Error';
        toast.error(message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="login-wrapper">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 style={{ marginBottom: '10px' }}>Login</h2>
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
        <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Submit'}</button>
        <div style={{ marginTop: '10px', fontSize: '0.9em' }}>
          Don&apos;t have an account?{' '}
          <span
            style={{ color: '#007bff', cursor: 'pointer', textDecoration: 'underline' }}
            onClick={() => navigate('/register')}
          >
            Register
          </span>
        </div>
      </form>
    </div>
  );
}
