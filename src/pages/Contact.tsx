import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, Clock, MessageSquare, Facebook, Twitter, Instagram } from "lucide-react";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Cảm ơn bạn! Tin nhắn đã được gửi đi. Chúng tôi sẽ phản hồi sớm nhất.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Hotline hỗ trợ",
      detail: "1900 6333 305 (8:00 - 22:00)",
      color: "bg-green-50 text-green-600"
    },
    {
      icon: Mail,
      title: "Email liên hệ",
      detail: "support@gamestore.vn",
      color: "bg-blue-50 text-blue-600"
    },
    {
      icon: MapPin,
      title: "Văn phòng",
      detail: "Toà nhà Innovation, Quận 1, TP. Hồ Chí Minh",
      color: "bg-red-50 text-red-600"
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Header Section */}
      <section className="bg-slate-900 py-20 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Liên Hệ Với Chúng Tôi</h1>
          <p className="text-slate-400 text-lg">
            Bạn gặp vấn đề khi mua game hay cần tư vấn? Đội ngũ GameStore luôn sẵn sàng hỗ trợ 24/7.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Column 1 & 2: Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <MessageSquare className="text-blue-600" /> Gửi tin nhắn cho chúng tôi
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Họ và tên</label>
                    <input 
                      type="text" required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="Nguyễn Văn A"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Địa chỉ Email</label>
                    <input 
                      type="email" required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Chủ đề</label>
                  <input 
                    type="text" required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="Hỗ trợ kích hoạt Key game"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nội dung chi tiết</label>
                  <textarea 
                    rows={5} required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Nhập nội dung bạn cần hỗ trợ..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full md:w-max bg-blue-600 text-white px-10 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                >
                  Gửi yêu cầu <Send size={18} />
                </button>
              </form>
            </div>
          </div>

          {/* Column 3: Contact Info */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <div key={index} className="p-6 rounded-3xl border border-gray-100 bg-slate-50/50 flex items-start gap-4">
                <div className={`${info.color} p-4 rounded-2xl`}>
                  <info.icon size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">{info.title}</h4>
                  <p className="text-gray-600">{info.detail}</p>
                </div>
              </div>
            ))}

            <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
              <h4 className="font-bold text-xl mb-4 flex items-center gap-2">
                <Clock size={20} /> Thời gian làm việc
              </h4>
              <ul className="space-y-2 opacity-90">
                <li className="flex justify-between"><span>Thứ 2 - Thứ 6:</span> <span>08:00 - 22:00</span></li>
                <li className="flex justify-between"><span>Thứ 7 - CN:</span> <span>09:00 - 20:00</span></li>
              </ul>
              
              <div className="mt-8 pt-8 border-t border-white/20">
                <p className="font-semibold mb-4 text-center">Theo dõi chúng tôi</p>
                <div className="flex justify-center gap-4">
                  <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-all"><Facebook size={20}/></a>
                  <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-all"><Twitter size={20}/></a>
                  <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-all"><Instagram size={20}/></a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Map Placeholder */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
         <div className="w-full h-96 bg-gray-200 rounded-3xl overflow-hidden shadow-inner grayscale hover:grayscale-0 transition-all duration-500">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4946681007846!2d106.65843061533414!3d10.773374262194134!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ed189fa355d%3A0x20305673c3543d74!2sHCMC%20University%20of%20Technology!5e0!3m2!1sen!2s!4v1625540000000!5m2!1sen!2s" 
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
            ></iframe>
         </div>
      </section>
    </div>
  );
};

export default Contact;