import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LogOut, 
  User, 
  Mail, 
  Shield, 
  Users, 
  Calendar, 
  Settings,
  CheckCircle2,
  AlertCircle,
  FileText
} from 'lucide-react';
import authService from '../../services/authService';

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
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
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

  const getRoleIcon = (role) => {
    switch (role) {
      case 'SUPER_ADMIN':
        return <Shield className="w-6 h-6" />;
      case 'ADMIN':
        return <Settings className="w-6 h-6" />;
      case 'STUDENT':
        return <Users className="w-6 h-6" />;
      default:
        return <User className="w-6 h-6" />;
    }
  };

  const getRoleDescription = (role) => {
    switch (role) {
      case 'SUPER_ADMIN':
        return 'You have full access to create and manage events.';
      case 'ADMIN':
        return 'You can manage invitations and view reports.';
      case 'STUDENT':
        return 'You can register for events and check in.';
      default:
        return '';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'SUPER_ADMIN':
        return 'from-purple-500 to-purple-600';
      case 'ADMIN':
        return 'from-blue-500 to-blue-600';
      case 'STUDENT':
        return 'from-green-500 to-green-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </div>
              
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 font-medium text-sm"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${getRoleColor(user.role)} rounded-xl flex items-center justify-center text-white shadow-lg`}>
                  {getRoleIcon(user.role)}
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    Welcome back, {user.name}!
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {getRoleDisplayName(user.role)}
                  </p>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-gradient-to-r from-primary-50 to-purple-50 rounded-xl border border-primary-100">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700">
                    {getRoleDescription(user.role)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* User Info Card */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">User Name</h3>
                <p className="text-lg font-semibold text-gray-900">{user.name}</p>
              </div>
            </div>
          </div>

          {/* Email Card */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Mail className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p className="text-lg font-semibold text-gray-900 truncate">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Role Card */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${getRoleColor(user.role)} rounded-lg flex items-center justify-center text-white`}>
                {getRoleIcon(user.role)}
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Role</h3>
                <p className="text-lg font-semibold text-gray-900">{getRoleDisplayName(user.role)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <FileText className="w-6 h-6 text-primary-600" />
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {user.role === 'SUPER_ADMIN' && (
              <>
                <button className="flex items-center gap-3 p-4 bg-gradient-to-r from-primary-50 to-purple-50 hover:from-primary-100 hover:to-purple-100 rounded-lg border border-primary-200 transition-all duration-200 text-left">
                  <Calendar className="w-5 h-5 text-primary-600" />
                  <span className="font-medium text-gray-900">Create Event</span>
                </button>
                <button className="flex items-center gap-3 p-4 bg-gradient-to-r from-primary-50 to-purple-50 hover:from-primary-100 hover:to-purple-100 rounded-lg border border-primary-200 transition-all duration-200 text-left">
                  <Settings className="w-5 h-5 text-primary-600" />
                  <span className="font-medium text-gray-900">Manage Events</span>
                </button>
              </>
            )}
            {user.role === 'ADMIN' && (
              <>
                <button className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-blue-50 hover:from-blue-100 hover:to-blue-100 rounded-lg border border-blue-200 transition-all duration-200 text-left">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-gray-900">Manage Invitations</span>
                </button>
                <button className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-blue-50 hover:from-blue-100 hover:to-blue-100 rounded-lg border border-blue-200 transition-all duration-200 text-left">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-gray-900">View Reports</span>
                </button>
              </>
            )}
            {user.role === 'STUDENT' && (
              <>
                <button className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-green-50 hover:from-green-100 hover:to-green-100 rounded-lg border border-green-200 transition-all duration-200 text-left">
                  <Calendar className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-gray-900">Browse Events</span>
                </button>
                <button className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-green-50 hover:from-green-100 hover:to-green-100 rounded-lg border border-green-200 transition-all duration-200 text-left">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-gray-900">Check In</span>
                </button>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
