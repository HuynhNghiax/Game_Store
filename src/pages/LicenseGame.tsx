import React from "react";
import {ShieldCheck, Zap, RefreshCw, Headphones, CheckCircle2, Gamepad2, Users, Cloud, Gift, Award, AlertCircle, Download, Lock, Star} from "lucide-react";
import {Link} from "react-router-dom";
const LicenseGame: React.FC = () => {
    const benefits = [
        {
            icon: ShieldCheck,
            title: "An toàn & bảo mật",
            desc: "Không virus, không mã độc, bảo vệ tuyệt đối thông tin cá nhân và dữ liệu thiết bị của bạn."
        },
        {
            icon: RefreshCw,
            title: "Cập nhật tự động",
            desc: "Luôn nhận bản vá lỗi, DLC mới và nội dung cập nhật ngay khi phát hành."
        },
        {
            icon: Zap,
            title: "Online & Multiplayer",
            desc: "Chơi cùng bạn bè toàn cầu, tham gia co-op, PvP và ranked matches."
        },
        {
            icon: Headphones,
            title: "Hỗ trợ kỹ thuật",
            desc: "Được hỗ trợ trực tiếp từ nhà phát hành khi gặp sự cố hoặc lỗi game."
        },
        {
            icon: Cloud,
            title: "Cloud Save",
            desc: "Lưu tiến trình lên cloud, chơi liền mạch trên nhiều thiết bị khác nhau."
        },
        {
            icon: Gift,
            title: "Ưu đãi độc quyền",
            desc: "Nhận sale sốc, DLC miễn phí, pre-order bonus và phần thưởng đặc biệt."
        },
        {
            icon: Users,
            title: "Cộng đồng chính hãng",
            desc: "Truy cập Workshop, tải mods, tham gia sự kiện và tournaments chính thức."
        },
        {
            icon: Award,
            title: "Achievements & Rewards",
            desc: "Mở khóa thành tựu, nhận huy hiệu profile, trading cards và items độc quyền."
        }
    ];

    const comparison = [
        { feature: "An toàn bảo mật", licensed: true, cracked: false },
        { feature: "Cập nhật game", licensed: true, cracked: false },
        { feature: "Online / Multiplayer", licensed: true, cracked: false },
        { feature: "Cloud Save", licensed: true, cracked: false },
        { feature: "Achievements", licensed: true, cracked: false },
        { feature: "Workshop & Mods", licensed: true, cracked: false },
        { feature: "Hỗ trợ kỹ thuật", licensed: true, cracked: false },
        { feature: "Hợp pháp", licensed: true, cracked: false }
    ];

    const risks = [
        {
            icon: AlertCircle,
            title: "Virus & Malware",
            desc: "Game crack thường chứa mã độc, keylogger, ransomware đánh cắp thông tin."
        },
        {
            icon: Lock,
            title: "Vi phạm pháp luật",
            desc: "Sử dụng game lậu là hành vi vi phạm bản quyền, có thể bị xử phạt."
        },
        {
            icon: Download,
            title: "Không cập nhật",
            desc: "Bỏ lỡ DLC, bản vá lỗi quan trọng và nội dung mới."
        },
        {
            icon: Users,
            title: "Không chơi online",
            desc: "Mất tính năng multiplayer, co-op và toàn bộ trải nghiệm cộng đồng."
        }
    ];

    return (
        <div className="bg-gradient-to-b from-gray-50 to-white text-gray-800 antialiased overflow-x-hidden">
            {/* HERO */}
            <section className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white py-32 overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-20 left-10 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-white rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
                    <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-md px-6 py-3 rounded-full text-sm font-semibold mb-8 border border-white/30">
                        <Gamepad2 size={20} />
                        <span>Kiến thức Game Thủ</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-[1.15] pb-2">
                        Game Bản Quyền <br /> Là Gì?
                    </h1>

                    <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
                        Hiểu đúng về game chính hãng và khám phá lý do đây là lựa chọn tốt nhất
                        cho trải nghiệm chơi game an toàn, chất lượng và bền vững.
                    </p>
                </div>
            </section>

            {/* DEFINITION */}
            <section className="max-w-7xl mx-auto px-4 py-28">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="order-2 lg:order-1">
                        <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-5 py-2 rounded-full text-sm font-semibold mb-6">
                            <Star size={18} />
                            <span>Khái niệm cơ bản</span>
                        </div>

                        {/* Thêm pb-2 để tránh mất chân chữ */}
                        <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent pb-2">
                            Định nghĩa chính xác
                        </h2>

                        <div className="space-y-6 text-lg leading-relaxed text-gray-700">
                            <p>
                                <strong className="text-indigo-600 font-semibold">Game bản quyền (Licensed Game)</strong> là
                                sản phẩm game bạn mua hợp pháp từ nhà phát hành hoặc các nền tảng phân phối
                                chính thức như Steam, Epic Games, PlayStation Store, Xbox Store và các kênh uy tín khác.
                            </p>

                            <p>
                                Khi mua game bản quyền, bạn sở hữu <strong className="text-indigo-600">license key</strong> gắn liền với
                                tài khoản cá nhân. License này cho phép bạn tải xuống, cài đặt, và chơi game
                                mọi lúc mọi nơi mà không lo bị giới hạn.
                            </p>

                            <p>
                                Bạn được hưởng đầy đủ quyền lợi: cập nhật miễn phí vĩnh viễn, chơi online với bạn bè,
                                sử dụng cloud save để đồng bộ tiến trình, mở khóa achievements và nhận hỗ trợ kỹ thuật
                                chính thức từ nhà phát triển.
                            </p>
                        </div>

                        <div className="mt-10 bg-gradient-to-br from-indigo-50 to-purple-50 border-l-4 border-indigo-500 p-8 rounded-xl shadow-md">
                            <div className="flex items-start gap-4">
                                <div className="bg-indigo-100 p-3 rounded-xl shrink-0">
                                    <ShieldCheck className="text-indigo-600" size={28} />
                                </div>
                                <div>
                                    <p className="font-bold text-indigo-900 mb-2 text-lg">Quyền sở hữu hợp pháp</p>
                                    <p className="text-gray-700 leading-relaxed">
                                        License thuộc về bạn vĩnh viễn và không bị thu hồi nếu bạn không vi phạm
                                        điều khoản sử dụng của nền tảng. Bạn có thể tải lại và chơi bất cứ khi nào muốn.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="order-1 lg:order-2">
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-3xl blur-2xl opacity-30"></div>
                            <img
                                src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800"
                                className="relative rounded-3xl shadow-2xl transform hover:scale-[1.02] transition-transform duration-500 w-full object-cover"
                                alt="Professional gaming setup"
                            />
                            <div className="absolute -bottom-8 -left-0 md:-left-8 bg-white p-6 rounded-2xl shadow-2xl max-w-xs border-4 border-white">
                                <div className="flex items-center gap-4 mb-2">
                                    <div className="bg-green-100 p-3 rounded-xl">
                                        <CheckCircle2 className="text-green-600" size={28} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900 text-lg">100% Hợp pháp</p>
                                        <p className="text-sm text-gray-600">An toàn & Bảo mật</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* BENEFITS */}
            <section className="bg-gradient-to-b from-white to-indigo-50 py-28">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-20">
                        <div className="inline-block bg-indigo-100 text-indigo-700 px-5 py-2 rounded-full text-sm font-semibold mb-6">
                            Ưu điểm vượt trội
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent pb-3">
                            8 lý do nên chọn game bản quyền
                        </h2>
                        <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
                            Trải nghiệm gaming đẳng cấp với đầy đủ tính năng và quyền lợi mà game crack không thể có
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {benefits.map((b, i) => {
                            const IconComponent = b.icon;
                            return (
                                <div
                                    key={i}
                                    className="group relative bg-white rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 hover:border-indigo-200 hover:-translate-y-2"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                    <div className="relative">
                                        <div className="bg-gradient-to-br from-indigo-100 to-purple-100 w-16 h-16 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                                            <IconComponent size={32} />
                                        </div>
                                        <h3 className="font-bold text-xl mb-3 text-gray-900">{b.title}</h3>
                                        <p className="text-gray-600 leading-relaxed text-sm md:text-base">{b.desc}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* COMPARISON */}
            <section className="max-w-6xl mx-auto px-4 py-28">
                <div className="text-center mb-20">
                    <div className="inline-block bg-purple-100 text-purple-700 px-5 py-2 rounded-full text-sm font-semibold mb-6">
                        So sánh chi tiết
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent pb-3">
                        Bản quyền vs Game Crack
                    </h2>
                    <p className="text-gray-600 text-xl max-w-2xl mx-auto">
                        Sự khác biệt rõ ràng giữa hai lựa chọn, bạn sẽ chọn cái nào?
                    </p>
                </div>

                <div className="bg-white rounded-3xl overflow-x-auto shadow-2xl border-2 border-gray-100">
                    <div className="min-w-[600px]">
                        <div className="grid grid-cols-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 p-8 font-bold text-white">
                            <div className="text-xl">Tính năng</div>
                            <div className="text-center text-xl">Bản quyền</div>
                            <div className="text-center text-xl">Game Crack</div>
                        </div>
                        {comparison.map((item, i) => (
                            <div
                                key={i}
                                className="grid grid-cols-3 p-8 border-t-2 border-gray-100 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-300"
                            >
                                <div className="font-semibold text-gray-900 text-lg">{item.feature}</div>
                                <div className="text-center">
                                    <div className="inline-flex items-center justify-center w-10 h-10 bg-green-100 rounded-full">
                                        <CheckCircle2 className="text-green-600" size={24} />
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="inline-flex items-center justify-center w-10 h-10 bg-red-100 rounded-full">
                                        <span className="text-red-600 text-xl font-bold leading-none">✕</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* RISKS */}
            <section className="bg-gradient-to-b from-red-50 to-white py-28">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-5 py-2 rounded-full text-sm font-semibold mb-6">
                            <AlertCircle size={18} />
                            <span>Cảnh báo quan trọng</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                            Rủi ro khi dùng game crack
                        </h2>
                        <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
                            Những nguy hiểm tiềm ẩn có thể gây thiệt hại nghiêm trọng cho thiết bị và dữ liệu cá nhân của bạn
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {risks.map((r, i) => {
                            const IconComponent = r.icon;
                            return (
                                <div
                                    key={i}
                                    className="bg-white border-2 border-red-200 rounded-3xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-red-300"
                                >
                                    <div className="bg-red-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shrink-0">
                                        <IconComponent className="text-red-600" size={32} />
                                    </div>
                                    <h3 className="font-bold text-xl mb-3 text-gray-900">{r.title}</h3>
                                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">{r.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* IMAGE GALLERY */}
            <section className="max-w-7xl mx-auto px-4 py-28">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent pb-3">
                        Trải nghiệm gaming chính hãng
                    </h2>
                    <p className="text-gray-600 text-xl max-w-2xl mx-auto">
                        Nâng tầm trải nghiệm với setup và game bản quyền chất lượng
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500",
                        "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=500",
                        "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=500"
                    ].map((src, idx) => (
                        <div key={idx} className="relative group overflow-hidden rounded-3xl shadow-xl aspect-video md:aspect-square">
                            <img
                                src={src}
                                className="h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                alt="Gaming lifestyle"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 py-32 text-white text-center overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-10 left-20 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-10 right-20 w-[500px] h-[500px] bg-white rounded-full blur-3xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
                </div>

                <div className="max-w-5xl mx-auto px-4 relative z-10">
                    <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                        Sẵn sàng nâng cấp trải nghiệm?
                    </h2>
                    <p className="text-xl md:text-2xl mb-12 text-white/90 leading-relaxed">
                        Khám phá hàng ngàn game bản quyền chính hãng với giá tốt nhất thị trường
                    </p>

                    <Link to="/" className="bg-white text-indigo-600 px-10 py-5 md:px-12 md:py-6 rounded-full font-bold text-lg md:text-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 inline-flex items-center gap-3 active:scale-95">
                        <Gamepad2 size={24} />
                        <span>Khám phá cửa hàng</span>
                    </Link>

                </div>
            </section>
        </div>
    );
};

export default LicenseGame;