import React from "react";
import { Link } from 'react-router-dom';
import { 
  HelpCircle, 
  CreditCard, 
  Key, 
  RotateCcw, 
  MessageCircle, 
  ChevronRight, 
  ExternalLink,
  Wallet,
  Gamepad2
} from "lucide-react";

const Support: React.FC = () => {
  const supportCategories = [
    {
      icon: Wallet,
      title: "Hướng dẫn nạp thẻ",
      items: [
        "Nạp tiền qua thẻ ngân hàng (ATM/Internet Banking)",
        "Sử dụng ví điện tử MoMo, ZaloPay, VNPay",
        "Hướng dẫn nạp bằng thẻ cào điện thoại",
        "Xử lý lỗi khi nạp tiền không nhận được số dư"
      ],
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: Key,
      title: "Cách kích hoạt Key",
      items: [
        "Cách nhập Key trên Steam",
        "Hướng dẫn kích hoạt trên Epic Games Store",
        "Sử dụng code trên Origin / EA App",
        "Lỗi 'Duplicate Product Code' là gì?"
      ],
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      icon: RotateCcw,
      title: "Chính sách hoàn tiền",
      items: [
        "Điều kiện để được hoàn tiền",
        "Thời gian xử lý yêu cầu hoàn tiền",
        "Hoàn tiền về ví Shop hay về ngân hàng?",
        "Chính sách cho Game Pre-order"
      ],
      color: "text-red-600",
      bgColor: "bg-red-50"
    }
  ];

  return (
    <div className="bg-white min-h-screen antialiased">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <HelpCircle size={64} className="mx-auto mb-6 text-blue-200" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Chúng tôi có thể giúp gì cho bạn?</h1>
          <p className="max-w-2xl mx-auto text-blue-100 text-lg">
            Tìm kiếm hướng dẫn nạp tiền, cách kích hoạt sản phẩm hoặc tìm hiểu về chính sách của GameStore.
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {supportCategories.map((cat, i) => (
            <div key={i} className="p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className={`${cat.bgColor} ${cat.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6`}>
                <cat.icon size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-6 text-gray-900">{cat.title}</h3>
              <ul className="space-y-4">
                {cat.items.map((item, idx) => (
                  <li key={idx} className="group cursor-pointer flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors">
                    <ChevronRight size={16} className="text-gray-400 group-hover:text-indigo-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button className="mt-8 flex items-center gap-2 text-sm font-bold text-indigo-600 hover:underline">
                Xem tất cả bài viết <ExternalLink size={14} />
              </button>
            </div>
          ))}
        </div>

        {/* Quick Help / Steps */}
        <div className="grid lg:grid-cols-2 gap-12 items-center bg-slate-50 rounded-[2rem] p-8 md:p-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Bạn mới mua game lần đầu?</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-sm font-bold text-indigo-600 shrink-0">1</div>
                <p className="text-gray-600 pt-2">Vào <strong>Thư viện</strong> của bạn để lấy mã kích hoạt (Key).</p>
              </div>
              <div className="flex gap-4">
                <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-sm font-bold text-indigo-600 shrink-0">2</div>
                <p className="text-gray-600 pt-2">Sao chép mã và mở Launcher tương ứng (Steam, Epic...).</p>
              </div>
              <div className="flex gap-4">
                <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-sm font-bold text-indigo-600 shrink-0">3</div>
                <p className="text-gray-600 pt-2">Tìm phần <strong>"Redeem Key"</strong> và dán mã vào để nhận game.</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-indigo-600 rounded-3xl p-8 text-white">
              <Gamepad2 size={48} className="mb-4 text-indigo-200" />
              <h3 className="text-xl font-bold mb-2">Hỗ trợ trực tiếp 24/7</h3>
              <p className="text-indigo-100 mb-6">Đội ngũ kỹ thuật luôn sẵn sàng giải đáp các vấn đề về Key và cài đặt game.</p>
              <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-colors">
                <MessageCircle size={20} />
                Chat với hỗ trợ viên
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <footer className="max-w-7xl mx-auto px-4 pb-20 text-center">
        <p className="text-gray-500">
          Bạn không tìm thấy câu trả lời? 
          <Link to="/faq" className="text-indigo-600 font-semibold ml-1 hover:underline">Xem trang FAQ đầy đủ</Link>
        </p>
      </footer>
    </div>
  );
};

export default Support;