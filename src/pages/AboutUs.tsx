import React from "react";
import {
    Users, Star, ShieldCheck, Clock, Award, Rocket,
    CheckCircle2, ArrowRight, Gamepad2, Globe, Heart
} from "lucide-react";
import {Link} from "react-router-dom";
const AboutUs: React.FC = () => {
    const stats = [
        { label: "Cộng đồng Game thủ", value: "50,000+", icon: <Users className="text-blue-500" /> },
        { label: "Sản phẩm bản quyền", value: "5,000+", icon: <Star className="text-yellow-500" /> },
        { label: "Năm phát triển", value: "5+", icon: <Award className="text-indigo-500" /> },
    ];

    const journeySteps = [
        {
            year: "2019",
            title: "Khởi tạo",
            desc: "Bắt đầu với mục tiêu mang Steam Wallet giá rẻ đến game thủ."
        },
        {
            year: "2021",
            title: "Mở rộng",
            desc: "Trở thành đối tác phân phối của Ubisoft và EA tại VN."
        },
        {
            year: "2024",
            title: "Đột phá",
            desc: "Ra mắt hệ thống thanh toán tự động đa nền tảng 24/7."
        }
    ];

    const galleryImages = [
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&q=80&w=600"
    ];

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans">

            {/* 1. HERO SECTION - Đã làm nhỏ lại gọn gàng hơn */}
            <div className="relative pt-24 pb-32 bg-[#0B1120] overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=2000"
                        className="w-full h-full object-cover opacity-15"
                        alt="Gaming background"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0B1120]/60 via-[#0B1120] to-[#0B1120]"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
                        CHÚNG TÔI LÀ <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">GAMESTORE</span>
                    </h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Hành trình từ những người chơi game trở thành người kiến tạo giải pháp sở hữu game bản quyền hàng đầu Việt Nam.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white p-8 rounded-3xl shadow-xl flex flex-col items-center text-center border border-slate-100 hover:-translate-y-1 transition-all">
                            <div className="bg-slate-50 p-4 rounded-2xl mb-4">{stat.icon}</div>
                            <p className="text-3xl font-black text-slate-900 mb-1">{stat.value}</p>
                            <p className="text-slate-500 font-semibold uppercase tracking-wider text-xs">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-24">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-[2rem] blur opacity-10 group-hover:opacity-20 transition duration-500"></div>
                        <img
                            src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800"
                            className="relative rounded-[2rem] object-cover w-full h-[450px] shadow-2xl"
                            alt="Gaming Vision"
                        />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 text-blue-600 font-bold mb-4 uppercase tracking-[0.2em] text-sm">
                            <Gamepad2 size={18} /> <span>Tầm nhìn chiến lược</span>
                        </div>
                        <h2 className="text-3xl font-bold mb-6 leading-tight text-slate-900">Nơi mọi trò chơi đều nằm trong tầm tay bạn.</h2>
                        <p className="text-lg text-slate-600 mb-6 leading-relaxed text-justify">
                            Chúng tôi không chỉ bán Key game. GameStore đang xây dựng một hệ sinh thái kỹ thuật số nơi mà việc sở hữu game bản quyền trở nên dễ dàng như mua một ly cà phê. Chúng tôi tin rằng, tôn trọng bản quyền là cách tốt nhất để ủng hộ nhà phát triển.
                        </p>
                        <div className="space-y-4">
                            {["Hỗ trợ thanh toán qua MoMo, thẻ nội địa, chuyển khoản.", "Hệ thống nhận Key tự động ngay sau 30 giây.", "Đội ngũ Support là những game thủ thực thụ."].map((text, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <div className="mt-1 bg-blue-100 p-1 rounded-full"><CheckCircle2 size={14} className="text-blue-600" /></div>
                                    <span className="text-slate-700 font-medium">{text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-slate-50 py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1">
                            <div className="flex items-center gap-2 text-indigo-600 font-bold mb-4 uppercase tracking-[0.2em] text-sm">
                                <Globe size={18} /> <span>Cam kết cộng đồng</span>
                            </div>
                            <h2 className="text-3xl font-bold mb-6 leading-tight text-slate-900">An tâm tuyệt đối với chế độ bảo hành vĩnh viễn.</h2>
                            <p className="text-lg text-slate-600 mb-8 leading-relaxed text-justify">
                                Tại GameStore, uy tín là tài sản lớn nhất. Mọi rủi ro của khách hàng đều được chúng tôi gánh vác. Nếu có bất kỳ vấn đề nào, chúng tôi cam kết hoàn tiền hoặc đổi mới ngay lập tức.
                            </p>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                    <h4 className="font-bold text-slate-900 mb-1 italic">100% Chính hãng</h4>
                                    <p className="text-xs text-slate-500">Nguồn gốc từ các Store quốc tế.</p>
                                </div>
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                    <h4 className="font-bold text-slate-900 mb-1 italic">24/7 Support</h4>
                                    <p className="text-xs text-slate-500">Kể cả ngày lễ và Tết.</p>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2 relative">
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
                                className="rounded-[2rem] object-cover w-full h-[450px] shadow-2xl"
                                alt="Support Team"
                            />
                            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl">
                                <div className="flex items-center gap-3">
                                    <div className="flex -space-x-3">
                                        {[
                                            "https://i.pravatar.cc/150?u=1",
                                            "https://i.pravatar.cc/150?u=2",
                                            "https://i.pravatar.cc/150?u=3",
                                            "https://i.pravatar.cc/150?u=4"
                                        ].map((url, i) => (
                                            <img key={i} src={url} className="w-10 h-10 rounded-full border-2 border-white object-cover" alt="Staff" />
                                        ))}
                                    </div>
                                    <p className="text-xs font-bold text-slate-800">50+ Chuyên viên hỗ trợ</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 py-24">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 mb-3">Hành trình phát triển</h2>
                    <div className="h-1 w-16 bg-blue-600 mx-auto rounded-full"></div>
                </div>
                <div className="grid md:grid-cols-3 gap-8 relative">
                    <div className="absolute top-1/2 left-0 w-full h-px bg-slate-200 hidden md:block -z-10"></div>
                    {journeySteps.map((step, index) => (
                        <div key={index} className="bg-white p-6 rounded-2xl border border-slate-100 text-center relative hover:shadow-lg transition-all group">
                            <div className="inline-block px-4 py-1 bg-blue-600 text-white rounded-full text-sm font-bold mb-4 group-hover:scale-110 transition-transform">
                                {step.year}
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                            <p className="text-sm text-slate-500 leading-relaxed italic">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 pb-24">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {galleryImages.map((img, index) => (
                        <div key={index} className="overflow-hidden rounded-2xl aspect-[4/3] group shadow-md">
                            <img
                                src={img}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                alt={`Gallery ${index + 1}`}
                            />
                        </div>
                    ))}
                </div>
                <div className="mt-8 bg-blue-50 p-6 rounded-2xl flex items-center justify-center gap-4 border border-blue-100">
                    <Heart size={24} className="text-blue-600 animate-pulse" />
                    <span className="font-medium text-blue-800 italic text-sm md:text-base">Cảm ơn bạn đã luôn đồng hành và tin tưởng GameStore!</span>
                </div>
            </div>

            <div className="bg-[#0B1120] py-20 relative overflow-hidden text-center">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
                <div className="relative z-10 max-w-3xl mx-auto px-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 tracking-tight">Sẵn sàng trải nghiệm game bản quyền?</h2>
                    <p className="text-slate-400 mb-10 text-sm md:text-base">Hơn <span className="text-blue-400 font-semibold">50.000 game thủ</span> đã tin tưởng GameStore</p>
                    <Link to="/" className="inline-flex items-center gap-3 bg-blue-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-700 hover:shadow-[0_0_30px_rgba(37,99,235,0.3)] hover:-translate-y-1 transition-all duration-300 group">Khám phá cửa hàng ngay<ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" /></Link>
                </div>
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px]"></div>
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-600/10 rounded-full blur-[100px]"></div>
            </div>
        </div>
    );
};

export default AboutUs;