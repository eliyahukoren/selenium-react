import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { token, logout } = useAuth();
  const { toggleTheme, theme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!token) return null;

  return (
    <nav className={`navbar navbar-expand px-3 ${theme === 'dark' ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
      <Link className="navbar-brand" to="/dashboard">Selenium Tuto</Link>
      <div className="navbar-nav">
        <Link className="nav-link" to="/dashboard">Dashboard</Link>
        <Link className="nav-link" to="/settings">Settings</Link>
        <button className="btn btn-sm btn-outline-primary ms-3" onClick={toggleTheme}>
          {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
        <button className="btn btn-sm btn-outline-danger ms-2" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
