import React, { useState } from 'react';
import { Gamepad2, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // Validate cơ bản
    if (formData.password !== formData.confirmPassword) {
      alert("Mật khẩu nhập lại không khớp!");
      return;
    }
    if (!formData.email || !formData.password || !formData.name) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    // Giả lập đăng ký thành công
    alert(`Đăng ký thành công! Chào mừng ${formData.name}`);
    navigate('/login'); // Chuyển sang trang đăng nhập
  };

  return (
    <div className="min-h-screen w-full bg-[#050816] flex items-center justify-center relative overflow-hidden">
      
      {/* Hiệu ứng nền */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-teal-500/20 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>

      {/* Form Card */}
      <div className="bg-[#15192b]/80 backdrop-blur-xl border border-white/10 p-10 rounded-[40px] w-full max-w-md shadow-2xl relative z-10 my-10">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-tr from-teal-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-teal-500/30 mb-4">
                <Gamepad2 className="text-white" size={40} />
            </div>
            <h2 className="text-3xl font-black text-white tracking-tight">Tạo tài khoản mới</h2>
            <p className="text-gray-400 mt-2">Gia nhập cộng đồng game thủ ngay!</p>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleRegister} className="space-y-5">
            
            {/* Tên hiển thị */}
            <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300 ml-1">Tên hiển thị</label>
                <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-teal-400 transition" size={20} />
                    <input 
                        type="text" 
                        name="name"
                        placeholder="Gamer_VIP"
                        className="w-full bg-[#0B0E14] text-white pl-12 pr-4 py-4 rounded-2xl border border-gray-800 focus:border-teal-500 focus:outline-none transition placeholder-gray-600 font-medium"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300 ml-1">Email</label>
                <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-teal-400 transition" size={20} />
                    <input 
                        type="email" 
                        name="email"
                        placeholder="example@email.com"
                        className="w-full bg-[#0B0E14] text-white pl-12 pr-4 py-4 rounded-2xl border border-gray-800 focus:border-teal-500 focus:outline-none transition placeholder-gray-600 font-medium"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
            </div>

            {/* Mật khẩu */}
            <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300 ml-1">Mật khẩu</label>
                <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-teal-400 transition" size={20} />
                    <input 
                        type="password" 
                        name="password"
                        placeholder="••••••••"
                        className="w-full bg-[#0B0E14] text-white pl-12 pr-4 py-4 rounded-2xl border border-gray-800 focus:border-teal-500 focus:outline-none transition placeholder-gray-600 font-medium"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
            </div>

            {/* Nhập lại Mật khẩu */}
            <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300 ml-1">Xác nhận mật khẩu</label>
                <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-teal-400 transition" size={20} />
                    <input 
                        type="password" 
                        name="confirmPassword"
                        placeholder="••••••••"
                        className="w-full bg-[#0B0E14] text-white pl-12 pr-4 py-4 rounded-2xl border border-gray-800 focus:border-teal-500 focus:outline-none transition placeholder-gray-600 font-medium"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <button 
                type="submit"
                className="w-full bg-gradient-to-r from-teal-400 to-teal-600 hover:from-teal-300 hover:to-teal-500 text-white font-bold py-4 rounded-2xl text-lg shadow-lg shadow-teal-500/30 transition transform active:scale-95 flex items-center justify-center gap-2 mt-6"
            >
                Đăng Ký Ngay <ArrowRight size={20} />
            </button>
        </form>

        <div className="mt-8 text-center text-gray-400 text-sm">
            Đã có tài khoản? <Link to="/login" className="text-white font-bold hover:text-teal-400 transition">Đăng nhập ngay</Link>
        </div>
      </div>
    </div>
  );
}