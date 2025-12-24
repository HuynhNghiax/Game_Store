import React, { useState, useEffect } from 'react';
import { Gamepad2, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { loginUser, clearError } from '../redux/authSlice';
import toast from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useAppSelector(state => state.auth);

  useEffect(() => { dispatch(clearError()); }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
        toast.success("Chào mừng trở lại!");
        navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-10 rounded-2xl w-full max-w-md shadow-xl border border-gray-200">
        <div className="flex flex-col items-center mb-8">
            <div className="bg-blue-600 text-white p-3 rounded-xl shadow-lg shadow-blue-200 mb-4">
                <Gamepad2 size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Chào mừng trở lại!</h2>
        </div>

        {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 flex items-center gap-2 border border-red-100">
                <AlertCircle size={16}/> {error}
            </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
            <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                    type="email" placeholder="Email" required
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 outline-none transition bg-gray-50 focus:bg-white"
                    value={email} onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                    type="password" placeholder="Mật khẩu" required
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 outline-none transition bg-gray-50 focus:bg-white"
                    value={password} onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div className="flex justify-end">
                <Link to="/forgot-password" class="text-sm text-blue-600 hover:underline font-medium">Quên mật khẩu?</Link>
            </div>

            <button type="submit" disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-70"
            >
                {loading ? 'Đang kiểm tra...' : <>Đăng Nhập <ArrowRight size={18} /></>}
            </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
            Chưa có tài khoản? <Link to="/register" className="text-blue-600 font-bold hover:underline">Đăng ký ngay</Link>
        </div>
      </div>
    </div>
  );
}