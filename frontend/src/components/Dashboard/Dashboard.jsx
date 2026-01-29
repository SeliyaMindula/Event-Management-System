import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      navigate('/login');
      return;
    }
    setUser(currentUser);
  }, [navigate]);

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  const getRoleDisplayName = (role) => {
    switch (role) {
      case 'SUPER_ADMIN':
        return 'Super Administrator';
      case 'ADMIN':
        return 'Admin (College IT)';
      case 'STUDENT':
        return 'Student';
      default:
        return role;
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="user-info">
          <span>Welcome, {user.name}</span>
          <span className="user-role">{getRoleDisplayName(user.role)}</span>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </div>
      <div className="dashboard-content">
        <div className="dashboard-card">
          <h2>Welcome to Event Management System</h2>
          <p>You are logged in as: <strong>{getRoleDisplayName(user.role)}</strong></p>
          <p>Email: <strong>{user.email}</strong></p>
          <p className="info-text">
            {user.role === 'SUPER_ADMIN' && 'You have full access to create and manage events.'}
            {user.role === 'ADMIN' && 'You can manage invitations and view reports.'}
            {user.role === 'STUDENT' && 'You can register for events and check in.'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

