import React, { useState } from 'react';
import { useApp } from '../utils/AppContext';
import { findUser } from '../data/todoData';
import '../styles/global.css';

function LoginPage() {
  const { login } = useApp();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const validateLoginForm = () => {
    if (!form.username.trim()) return 'Username tidak boleh kosong!';
    if (!form.password.trim()) return 'Password tidak boleh kosong!';
    if (form.password.length < 6) return 'Password minimal 6 karakter!';
    return null;
  };

  const handleSubmit = () => {
    const validationError = validateLoginForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    const user = findUser(form.username, form.password);
    if (!user) {
      setError('Username atau password salah!');
      return;
    }

    login(user);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>✅ Todo List App</h2>
        <p>Masuk untuk mengelola tugas harianmu</p>

        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Masukkan username..."
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={form.password}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Masukkan password..."
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            Tampilkan password
          </label>
        </div>

        {error && <p className="error-message">{error}</p>}

        <button className="btn-primary" onClick={handleSubmit}>
          Masuk
        </button>

        <div style={{ marginTop: '20px', padding: '12px', background: '#f3f4f6', borderRadius: '8px', fontSize: '13px', color: '#666' }}>
          <strong>Akun tersedia:</strong><br />
          👤 duta / 123456<br />
          👤 rizky / 123456<br />
          👤 admin / admin123
        </div>
      </div>
    </div>
  );
}

export default LoginPage;