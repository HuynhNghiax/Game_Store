import React from "react";
import { Link } from 'react-router-dom'; 
import { ShieldCheck, Lock, Eye, Database, Bell, Mail, ShieldAlert } from "lucide-react";

const Privacy: React.FC = () => {
  const policies = [
    {
      icon: Eye,
      title: "Thông tin thu thập",
      desc: "Chúng tôi thu thập Email, Họ tên và Lịch sử giao dịch để xác thực quyền sở hữu game và hỗ trợ bạn tốt nhất khi gặp sự cố."
    },
    {
      icon: Lock,
      title: "Bảo mật dữ liệu",
      desc: "Thông tin của bạn được mã hóa bằng giao thức SSL chuẩn quốc tế. Chúng tôi cam kết không cung cấp dữ liệu cá nhân cho bất kỳ bên thứ ba nào."
    },
    {
      icon: Database,
      title: "Sử dụng Cookies",
      desc: "Chúng tôi sử dụng cookie để ghi nhớ phiên đăng nhập và cá nhân hóa trải nghiệm mua sắm của bạn trên website."
    },
    {
      icon: Bell,
      title: "Thông báo & Email",
      desc: "Bạn sẽ nhận được email về hóa đơn và mã key. Chúng tôi chỉ gửi tin nhắn quảng cáo khi có sự đồng ý của bạn."
    }
  ];

  return (
    <div className="bg-white min-h-screen antialiased">
      {/* Header */}
      <section className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <ShieldCheck size={64} className="mx-auto mb-6 text-purple-200" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Chính sách bảo mật</h1>
          <p className="max-w-2xl mx-auto text-purple-100 text-lg">
            Sự tin tưởng của bạn là tài sản lớn nhất của GameStore. Chúng tôi cam kết bảo vệ dữ liệu cá nhân của game thủ một cách tuyệt đối.
          </p>
        </div>
      </section>

      {/* Grid Content */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {policies.map((p, i) => (
            <div key={i} className="flex gap-6 p-8 rounded-3xl border border-gray-100 hover:border-purple-200 hover:shadow-xl transition-all duration-300 bg-slate-50/50">
              <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center text-purple-600 shadow-sm shrink-0">
                <p.icon size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{p.title}</h3>
                <p className="text-gray-600 leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Note */}
        <div className="bg-indigo-50 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-indigo-900 mb-2 flex items-center gap-3 justify-center md:justify-start">
              <ShieldAlert /> Bạn có câu hỏi về bảo mật?
            </h3>
            <p className="text-indigo-700">Đừng ngần ngại liên hệ với bộ phận phụ trách dữ liệu của chúng tôi.</p>
          </div>
          
          <Link to="/contact"  className="flex items-center gap-3 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
            <Mail size={20} />
            Liên hệ ngay
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Privacy;