import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { 
  Search, 
  Plus, 
  Minus, 
  HelpCircle, 
  MessageSquare, 
  ArrowRight,
  Gamepad
} from "lucide-react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const FAQ: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openId, setOpenId] = useState<number | null>(1);

  const faqs: FAQItem[] = [
    {
      id: 1,
      category: "Chung",
      question: "GameStore là gì?",
      answer: "GameStore là nền tảng cung cấp mã kích hoạt (CD-Key) bản quyền của các tựa game trên Steam, Epic Games, Origin... với mức giá ưu đãi dành cho game thủ Việt Nam."
    },
    {
      id: 2,
      category: "Thanh toán",
      question: "Tôi có thể thanh toán bằng những phương thức nào?",
      answer: "Chúng tôi hỗ trợ đa dạng phương thức: Chuyển khoản ngân hàng, ví MoMo, ZaloPay, Viettel Money và thẻ cào điện thoại (có chiết khấu)."
    },
    {
      id: 3,
      category: "Kỹ thuật",
      question: "Tại sao Key của tôi báo 'Duplicate Code'?",
      answer: "Lỗi này xảy ra khi Key đã được kích hoạt trước đó. Đừng lo lắng, hãy chụp màn hình thông báo lỗi và gửi cho bộ phận hỗ trợ, chúng tôi sẽ kiểm tra và đổi Key mới cho bạn trong 5-10 phút."
    },
    {
      id: 4,
      category: "Chính sách",
      question: "Tôi có thể hoàn tiền nếu máy không chơi được game không?",
      answer: "Rất tiếc, chúng tôi chỉ hoàn tiền nếu lỗi thuộc về sản phẩm (Key hỏng). Bạn nên kiểm tra kỹ cấu hình yêu cầu ở trang chi tiết sản phẩm trước khi mua."
    },
    {
      id: 5,
      category: "Kỹ thuật",
      question: "Key có giới hạn vùng (Region Lock) không?",
      answer: "Đa số Key tại GameStore là Global (kích hoạt toàn cầu). Nếu Key có giới hạn vùng (ví dụ chỉ dành cho Asia), chúng tôi sẽ ghi chú rất rõ bằng màu đỏ ở trang sản phẩm."
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-slate-50 min-h-screen antialiased pb-20">
      {/* Hero Section */}
      <section className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl mb-6">
            <Gamepad size={32} />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Câu hỏi thường gặp</h1>
          <p className="text-gray-600 text-lg mb-8">Tìm kiếm câu trả lời nhanh nhất cho các thắc mắc của bạn.</p>
          
          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text"
              placeholder="Nhập vấn đề bạn đang gặp phải..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all shadow-sm"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="max-w-3xl mx-auto px-4 mt-12">
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => (
              <div 
                key={faq.id} 
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all hover:shadow-md"
              >
                <button 
                  onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-bold text-gray-800 text-lg">{faq.question}</span>
                  <div className={`shrink-0 ml-4 transition-transform duration-300 ${openId === faq.id ? 'rotate-180' : ''}`}>
                    {openId === faq.id ? <Minus className="text-indigo-600" /> : <Plus className="text-gray-400" />}
                  </div>
                </button>
                
                {openId === faq.id && (
                  <div className="px-6 pb-6 text-gray-600 leading-relaxed animate-in fade-in slide-in-from-top-2">
                    <div className="pt-2 border-t border-gray-50">
                      {faq.answer}
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-20">
              <HelpCircle size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">Không tìm thấy câu hỏi nào phù hợp với tìm kiếm của bạn.</p>
            </div>
          )}
        </div>

        {/* Support Call-to-action */}
        <div className="mt-16 bg-indigo-900 rounded-[2.5rem] p-10 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <MessageSquare size={40} className="mx-auto mb-4 text-indigo-300" />
            <h3 className="text-2xl font-bold mb-2">Vẫn chưa tìm thấy câu trả lời?</h3>
            <p className="text-indigo-200 mb-8 max-w-md mx-auto">Hãy liên hệ trực tiếp với chúng tôi. Đội ngũ hỗ trợ luôn sẵn sàng 24/7.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="bg-white text-indigo-900 px-8 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2">
                Liên hệ hỗ trợ <ArrowRight size={18} />
              </Link>
              <Link to="/support" className="bg-indigo-800 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors border border-indigo-700">
                Xem hướng dẫn chi tiết
              </Link>
            </div>
          </div>
          {/* Decorative Circle */}
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-800 rounded-full opacity-50"></div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;