import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, CheckCircle, AlertCircle, KeyRound } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Giả lập gọi API mất 1.5 giây
    setTimeout(() => {
        setIsLoading(false);
        setIsSubmitted(true);
        toast.success("Đã gửi link khôi phục!");
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 md:p-10 rounded-3xl w-full max-w-md shadow-xl border border-gray-100">
            
            {/* Header */}
            <div className="flex flex-col items-center mb-8 text-center">
                <div className="bg-blue-100 text-blue-600 p-4 rounded-2xl mb-4">
                    {isSubmitted ? <CheckCircle size={40} /> : <KeyRound size={40} />}
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                    {isSubmitted ? 'Kiểm tra email của bạn' : 'Quên mật khẩu?'}
                </h2>
                <p className="text-gray-500 mt-2 text-sm px-4">
                    {isSubmitted 
                        ? `Chúng tôi đã gửi hướng dẫn khôi phục mật khẩu đến ${email}.`
                        : 'Nhập email đã đăng ký để nhận hướng dẫn lấy lại mật khẩu.'}
                </p>
            </div>

            {/* Nội dung thay đổi dựa trên trạng thái */}
            {isSubmitted ? (
                <div className="space-y-6 animate-fade-in">
                    <div className="bg-green-50 text-green-700 p-4 rounded-xl text-sm border border-green-100 flex items-start gap-3">
                        <AlertCircle size={18} className="shrink-0 mt-0.5" />
                        <span>Nếu không thấy email, hãy kiểm tra mục Spam hoặc thử lại sau 5 phút.</span>
                    </div>

                    <Link 
                        to="/login" 
                        className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-3.5 rounded-xl shadow-lg transition flex items-center justify-center gap-2"
                    >
                        Quay lại Đăng nhập
                    </Link>

                    <button 
                        onClick={() => setIsSubmitted(false)}
                        className="w-full text-blue-600 font-bold hover:underline text-sm"
                    >
                        Gửi lại bằng email khác
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input 
                            type="email" 
                            required
                            placeholder="name@example.com" 
                            className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition bg-gray-50 focus:bg-white text-gray-800 font-medium"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-200 transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <span className="flex items-center gap-2">Đang gửi...</span>
                        ) : (
                            'Gửi link khôi phục'
                        )}
                    </button>

                    <div className="flex justify-center pt-2">
                        <Link to="/login" className="text-gray-500 hover:text-gray-900 font-bold text-sm flex items-center gap-2 transition">
                            <ArrowLeft size={16} /> Quay lại đăng nhập
                        </Link>
                    </div>
                </form>
            )}
        </div>
    </div>
  );
}