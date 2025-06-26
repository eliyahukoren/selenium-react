import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import * as Icons from 'react-icons/fi';
import 'react-toastify/dist/ReactToastify.css';

interface Setting {
  id: number;
  key: string;
  value: string;
}

const SettingsPage = () => {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const { token } = useAuth();

  const fetchSettings = async () => {
    const res = await fetch('http://localhost:3001/api/settings', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const data = await res.json();
      setSettings(data.settings);
    } else {
      toast.error('Failed to fetch settings');
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!key || !value) return;

    const method = editingId ? 'PUT' : 'POST';
    const url = editingId
      ? `http://localhost:3001/api/settings/${editingId}`
      : 'http://localhost:3001/api/settings';

    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ key, value }),
    });

    if (res.ok) {
      toast.success(editingId ? 'Setting updated' : 'Setting saved');
      setKey('');
      setValue('');
      setEditingId(null);
      fetchSettings();
    } else {
      toast.error('Failed to save');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this setting?')) return;

    const res = await fetch(`http://localhost:3001/api/settings/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      toast.success('Setting deleted');
      fetchSettings();
      if (editingId === id) {
        setEditingId(null);
        setKey('');
        setValue('');
      }
    } else {
      toast.error('Failed to delete');
    }
  };

  const startEdit = (s: Setting) => {
    setKey(s.key);
    setValue(s.value);
    setEditingId(s.id);
  };

  return (
    <div className="container mt-5">
      <ToastContainer position="top-center" autoClose={3000} />
      <h2 className="mb-4 text-center">Settings</h2>

      <div className="d-flex justify-content-center mb-5">
        <div className="card p-4 shadow animate__animated animate__fadeIn" style={{ width: 400 }}>
          <h5 className="mb-3 text-center">
            {editingId ? 'Edit Setting' : 'Add New Setting'}
          </h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Key</label>
              <input
                className="form-control"
                value={key}
                onChange={e => setKey(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Value</label>
              <input
                className="form-control"
                value={value}
                onChange={e => setValue(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              {editingId ? 'Update' : 'Save'}
            </button>
          </form>
        </div>
      </div>

      <div className="card shadow p-4 animate__animated animate__fadeIn">
        <h5 className="mb-3">Settings List</h5>
        <ul className="list-group">
          {settings.map(s => (
            <li
              key={s.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{s.key}</strong> — <span className="text-muted">{s.value}</span>
              </div>
              <div className="btn-group">
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => startEdit(s)}
                  title="Edit"
                >
                  <>{Icons.FiEdit({})}</>
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDelete(s.id)}
                  title="Delete"
                >
                  <>{Icons.FiTrash2({})}</>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SettingsPage;
