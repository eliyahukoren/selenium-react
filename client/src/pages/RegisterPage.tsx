import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password || !confirmPassword) {
      toast.error('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        toast.success('User registered');
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setTimeout(() => navigate('/login'), 1500);
      } else {
        const data = await res.json();
        toast.error(data.message || 'Registration failed');
      }
    } catch (err) {
      toast.error('Request error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper d-flex justify-content-center align-items-center vh-100">
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="card p-4 shadow animate__animated animate__fadeIn" style={{ width: 400 }}>
        <h3 className="mb-3 text-center">Register</h3>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              className="form-control"
              value={username}
              onChange={e => setUsername(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={e => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              disabled={loading}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <div className="text-center mt-3">
          <button className="btn btn-sm btn-outline-secondary" onClick={() => navigate('/login')}>
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
