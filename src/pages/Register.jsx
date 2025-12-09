import React, { useState, useEffect } from 'react';
import { Gamepad2, Mail, Lock, User, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearError } from '../redux/authSlice';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, successMessage } = useSelector(state => state.auth);

  // Xóa lỗi cũ khi vào trang
  useEffect(() => { dispatch(clearError()); }, [dispatch]);

  // Nếu đăng ký thành công thì chuyển hướng sau 1.5s
  useEffect(() => {
    if (successMessage) {
        setTimeout(() => navigate('/login'), 1500);
    }
  }, [successMessage, navigate]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegister = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Mật khẩu không khớp!"); 
      return;
    }
    // Gọi API qua Redux
    dispatch(registerUser({ 
        name: formData.name, 
        email: formData.email, 
        password: formData.password 
    }));
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-10 rounded-2xl w-full max-w-md shadow-xl border border-gray-200">
        
        <div className="flex flex-col items-center mb-8">
            <div className="bg-blue-600 text-white p-3 rounded-xl shadow-lg shadow-blue-200 mb-4">
                <Gamepad2 size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Tạo tài khoản</h2>
            <p className="text-gray-500 text-sm">Tham gia cộng đồng GameStore</p>
        </div>

        {/* Thông báo lỗi / Thành công */}
        {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4 flex items-center gap-2"><AlertCircle size={16}/> {error}</div>}
        {successMessage && <div className="bg-green-50 text-green-600 p-3 rounded-lg text-sm mb-4 flex items-center gap-2"><CheckCircle size={16}/> {successMessage}</div>}

        <form onSubmit={handleRegister} className="space-y-4">
            <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input name="name" type="text" placeholder="Tên hiển thị" required
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 outline-none transition bg-gray-50 focus:bg-white"
                    onChange={handleChange}
                />
            </div>
            <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input name="email" type="email" placeholder="Email" required
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 outline-none transition bg-gray-50 focus:bg-white"
                    onChange={handleChange}
                />
            </div>
            <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input name="password" type="password" placeholder="Mật khẩu" required
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 outline-none transition bg-gray-50 focus:bg-white"
                    onChange={handleChange}
                />
            </div>
            <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input name="confirmPassword" type="password" placeholder="Nhập lại mật khẩu" required
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 outline-none transition bg-gray-50 focus:bg-white"
                    onChange={handleChange}
                />
            </div>

            <button type="submit" disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-70"
            >
                {loading ? 'Đang xử lý...' : <>Đăng Ký <ArrowRight size={18} /></>}
            </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
            Đã có tài khoản? <Link to="/login" className="text-blue-600 font-bold hover:underline">Đăng nhập</Link>
        </div>
      </div>
    </div>
  );
}