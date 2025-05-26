import { useNavigate } from 'react-router-dom';
import { getToken, logout } from '~/services/auth';
import { useEffect, useState } from 'react';

const Header = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const token = getToken();
    if (!token) return;

    const payload = JSON.parse(atob(token.split('.')[1]));
    setEmail(payload.email);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow px-6 py-4 flex items-center justify-between mb-6">
      <h1 className="text-xl font-bold text-blue-600">Task Manager</h1>
      <div className="flex items-center gap-4">
        {email && <span className="text-gray-700 text-sm">Logged in as: {email}</span>}
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
