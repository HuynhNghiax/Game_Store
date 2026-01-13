import React from "react";
import { Scale, FileText, UserCheck, CreditCard, ShieldAlert, Ban, HelpCircle, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Terms: React.FC = () => {
  const sections = [
    {
      icon: UserCheck,
      title: "1. Tài khoản người dùng",
      content: "Khi đăng ký tài khoản, bạn có trách nhiệm bảo mật thông tin cá nhân và mật khẩu. GameStore không chịu trách nhiệm cho bất kỳ tổn thất nào phát sinh từ việc bạn chia sẻ tài khoản với người khác."
    },
    {
      icon: CreditCard,
      title: "2. Quy định thanh toán",
      content: "Các giao dịch được thực hiện qua các cổng thanh toán uy tín (MoMo, VNPay, Visa). Sản phẩm sẽ được gửi đến tài khoản của bạn ngay sau khi hệ thống xác nhận thanh toán thành công."
    },
    {
      icon: ShieldAlert,
      title: "3. Chính sách đổi trả & Hoàn tiền",
      content: "Vì đặc thù sản phẩm kỹ thuật số (Key game/Code), chúng tôi chỉ hỗ trợ hoàn tiền nếu sản phẩm bị lỗi từ nhà phát hành và không thể kích hoạt được sau khi đã nhận hỗ trợ kỹ thuật."
    },
    {
      icon: Ban,
      title: "4. Các hành vi nghiêm cấm",
      content: "Nghiêm cấm các hành vi hack, cheat, lợi dụng lỗi hệ thống để trục lợi hoặc sử dụng các phương thức thanh toán bất hợp pháp. Tài khoản vi phạm sẽ bị khóa vĩnh viễn không báo trước."
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-900 to-blue-900 text-white py-24 mb-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-white/20">
            <Scale size={18} className="text-blue-300" />
            <span>Pháp lý & Quy định</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">Điều khoản dịch vụ</h1>
          <p className="text-blue-100 text-lg md:text-xl leading-relaxed opacity-90">
            Chào mừng bạn đến với GameStore. Bằng việc sử dụng dịch vụ của chúng tôi, bạn đã đồng ý với các quy định dưới đây.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
          <div className="space-y-12">
            {sections.map((item, index) => (
              <div key={index} className="flex gap-6 group">
                <div className="hidden md:flex bg-indigo-50 w-14 h-14 rounded-2xl items-center justify-center text-indigo-600 shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                  <item.icon size={28} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <span className="md:hidden text-indigo-600"><item.icon size={24} /></span>
                    {item.title}
                  </h2>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {item.content}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-gray-100 text-center">
            <p className="text-gray-400 text-sm mb-6 italic">Cập nhật lần cuối: Tháng 1/2026</p>
            <Link to="/" className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-600 transition-colors">
              Đã hiểu và quay lại Cửa hàng
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Terms;