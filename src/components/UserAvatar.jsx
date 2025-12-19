import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function UserAvatar() {
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.user); 

  if (!user) return null;

  return (
    <button
      onClick={() => navigate('/profile')}
      className="flex items-center gap-2 hover:opacity-80 transition"
    >
      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold uppercase border">
        {user.name?.charAt(0)}
      </div>

      <span className="font-semibold text-gray-700 hidden md:block">
        {user.name}
      </span>
    </button>
  );
}
