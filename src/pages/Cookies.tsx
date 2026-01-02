import React from "react";
import { Cookie, ShieldCheck, BarChart3, Settings, Info, BellRing } from "lucide-react";
import { Link } from "react-router-dom";

const CookiesPage: React.FC = () => {
  const cookieTypes = [
    {
      icon: ShieldCheck,
      title: "Cookie thiết yếu (Bắt buộc)",
      desc: "Đây là những cookie cần thiết để website hoạt động, ví dụ như giữ cho bạn luôn đăng nhập hoặc lưu trữ các sản phẩm trong giỏ hàng.",
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      icon: BarChart3,
      title: "Cookie phân tích",
      desc: "Giúp chúng tôi hiểu cách người dùng tương tác với website (ví dụ: trang nào được xem nhiều nhất) để cải thiện trải nghiệm mua sắm.",
      color: "text-green-600",
      bg: "bg-green-50"
    },
    {
      icon: Settings,
      title: "Cookie tùy chỉnh",
      desc: "Ghi nhớ các lựa chọn của bạn như ngôn ngữ, vùng miền hoặc giao diện tối/sáng để bạn không phải thiết lập lại mỗi lần truy cập.",
      color: "text-purple-600",
      bg: "bg-purple-50"
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-500 to-orange-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-white/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-white/30">
            <Cookie size={40} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Chính sách Cookie</h1>
          <p className="text-amber-50 opacity-90 text-lg">
            Chúng tôi sử dụng cookie để mang lại trải nghiệm tốt nhất cho bạn trên GameStore.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
          <div className="flex items-center gap-3 mb-8">
            <Info className="text-orange-500" />
            <h2 className="text-2xl font-bold text-gray-900">Cookie là gì?</h2>
          </div>
          <p className="text-gray-600 leading-relaxed mb-12">
            Cookie là những tệp văn bản nhỏ được lưu trữ trên máy tính hoặc thiết bị di động của bạn khi bạn truy cập website. 
            Chúng giúp website nhận diện thiết bị và ghi nhớ thông tin về sở thích hoặc các hành động đã thực hiện trước đó.
          </p>

          <div className="space-y-8">
            {cookieTypes.map((type, index) => (
              <div key={index} className="flex gap-6 p-6 rounded-2xl border border-gray-50 bg-gray-50/30">
                <div className={`${type.bg} ${type.color} p-4 rounded-xl shrink-0 h-max`}>
                  <type.icon size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{type.title}</h3>
                  <p className="text-gray-600">{type.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 p-8 bg-blue-600 rounded-3xl text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                <BellRing size={20} /> Quản lý quyền riêng tư
              </h3>
              <p className="opacity-90">Bạn có thể thay đổi cài đặt Cookie trong trình duyệt bất cứ lúc nào.</p>
            </div>
            <Link to="/contact" className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-orange-50 transition-colors shrink-0">
              Tôi cần hỗ trợ
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CookiesPage;