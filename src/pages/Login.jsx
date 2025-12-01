import React, { useState } from 'react';
import { Gamepad2, Mail, Lock, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Giả lập đăng nhập thành công
    if (email && password) {
        alert("Đăng nhập thành công!");
        navigate('/'); // Chuyển về trang chủ
    } else {
        alert("Vui lòng nhập Email và Mật khẩu");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#050816] flex items-center justify-center relative overflow-hidden">
      
      {/* Hiệu ứng nền (Trang trí) */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-teal-500/20 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>

      {/* Form Card */}
      <div className="bg-[#15192b]/80 backdrop-blur-xl border border-white/10 p-10 rounded-[40px] w-full max-w-md shadow-2xl relative z-10">
        
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 bg-gradient-to-tr from-teal-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-teal-500/30 mb-4">
                <Gamepad2 className="text-white" size={40} />
            </div>
            <h2 className="text-3xl font-black text-white tracking-tight">Chào mừng trở lại!</h2>
            <p className="text-gray-400 mt-2">Đăng nhập để tiếp tục chiến game</p>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300 ml-1">Email</label>
                <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-teal-400 transition" size={20} />
                    <input 
                        type="email" 
                        placeholder="example@email.com"
                        className="w-full bg-[#0B0E14] text-white pl-12 pr-4 py-4 rounded-2xl border border-gray-800 focus:border-teal-500 focus:outline-none transition placeholder-gray-600 font-medium"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300 ml-1">Mật khẩu</label>
                <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-teal-400 transition" size={20} />
                    <input 
                        type="password" 
                        placeholder="••••••••"
                        className="w-full bg-[#0B0E14] text-white pl-12 pr-4 py-4 rounded-2xl border border-gray-800 focus:border-teal-500 focus:outline-none transition placeholder-gray-600 font-medium"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex justify-end">
                <a href="#" className="text-sm text-teal-400 hover:text-teal-300 font-bold transition">Quên mật khẩu?</a>
            </div>

            <button 
                type="submit"
                className="w-full bg-gradient-to-r from-teal-400 to-teal-600 hover:from-teal-300 hover:to-teal-500 text-white font-bold py-4 rounded-2xl text-lg shadow-lg shadow-teal-500/30 transition transform active:scale-95 flex items-center justify-center gap-2"
            >
                Đăng Nhập <ArrowRight size={20} />
            </button>
        </form>

        <div className="mt-8 text-center text-gray-400 text-sm">
            Chưa có tài khoản? <Link to="/register" className="text-white font-bold hover:text-teal-400 transition">Đăng ký ngay</Link>
        </div>
      </div>
    </div>
  );
}