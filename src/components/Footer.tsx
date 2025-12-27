import React from "react";
import {Gamepad2, Mail, Phone, MapPin} from "lucide-react";

const Footer: React.FC = () => {
    return (
        <footer className="w-full bg-gradient-to-b from-gray-900 to-black text-white overflow-x-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-8 pt-16 pb-8">
                <div className="mb-12 pb-8 border-b border-gray-800">
                    <div className="flex items-center gap-3 mb-4">
                        <div
                            className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-2.5 rounded-lg shadow-lg">
                            <Gamepad2 size={28}/>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                GameStore
                            </h2>
                            <p className="text-sm text-gray-400">Shop Game Bản Quyền Chính Hãng</p>
                        </div>
                    </div>
                    <p className="text-gray-400 text-sm max-w-2xl leading-relaxed">
                        Chuyên cung cấp game bản quyền chính hãng với giá tốt nhất thị trường.
                        Uy tín - Chất lượng - Hỗ trợ 24/7
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    {/* Column 1 */}
                    <div>
                        <h3 className="text-white font-semibold mb-4 text-base relative inline-block">
                            Về chúng tôi
                            <span className="absolute bottom-0 left-0 w-23 h-0.5 bg-blue-500"></span>
                        </h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <a href="#"
                                   className="text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center gap-2">
                                    <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                                    Game bản quyền là gì?
                                </a>
                            </li>
                            <li>
                                <a href="#"
                                   className="text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center gap-2">
                                    <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                                    Giới thiệu GameStore
                                </a>
                            </li>
                            <li>
                                <a href="#"
                                   className="text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center gap-2">
                                    <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                                    Điều khoản dịch vụ
                                </a>
                            </li>
                            <li>
                                <a href="#"
                                   className="text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center gap-2">
                                    <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                                    Chính sách bảo mật
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4 text-base relative inline-block">
                            Tài khoản
                            <span className="absolute bottom-0 left-0 w-18 h-0.5 bg-blue-500"></span>
                        </h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <a href="#"
                                   className="text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center gap-2">
                                    <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                                    Đăng nhập
                                </a>
                            </li>
                            <li>
                                <a href="#"
                                   className="text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center gap-2">
                                    <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                                    Đăng ký
                                </a>
                            </li>
                            <li>
                                <a href="#"
                                   className="text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center gap-2">
                                    <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                                    Quên mật khẩu
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4 text-base relative inline-block">
                            Liên hệ
                            <span className="absolute bottom-0 left-0 w-13 h-0.5 bg-blue-500"></span>
                        </h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-2 text-gray-400">
                                <Phone size={16} className="mt-0.5 text-blue-400 flex-shrink-0"/>
                                <div>
                                    <div className="text-white font-medium">1900 633 305</div>
                                    <div className="text-xs text-gray-500">Hỗ trợ 24/7</div>
                                </div>
                            </li>
                            <li>
                                <a href="#"
                                   className="text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center gap-2">
                                    <Mail size={16} className="text-blue-400"/>
                                    support@gamestore.vn
                                </a>
                            </li>
                            <li>
                                <a href="#"
                                   className="text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center gap-2">
                                    <MapPin size={16} className="text-blue-400"/>
                                    TP. Hồ Chí Minh, Việt Nam
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4 text-base relative inline-block">
                            Kết nối với chúng tôi
                            <span className="absolute bottom-0 left-0 w-38 h-0.5 bg-blue-500"></span>
                        </h3>

                        <div className="flex gap-4 mb-6">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noreferrer"
                                className="w-9 h-9 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300"
                            >
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Facebook_Logo_2023.png"
                                    alt="Facebook"
                                    className="w-full h-full object-cover"
                                />
                            </a>

                            <a
                                href="https://youtube.com"
                                target="_blank"
                                rel="noreferrer"
                                className="w-9 h-9   rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300"
                            >
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png"
                                    alt="YouTube"
                                    className="w-full h-full object-cover rounded-full"
                                />
                            </a>
                        </div>


                        <div className="text-white text-gray-500 mb-2">Phương thức thanh toán</div>
                        <div className="flex flex-wrap gap-2">
                            <div className="bg-white rounded p-1.5 hover:scale-105 transition-transform">
                                <img src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-MoMo-Transparent.png"
                                     alt="MoMo" className="h-5 w-auto"/>
                            </div>
                            <div className="bg-white rounded p-1.5 hover:scale-105 transition-transform">
                                <img src="https://pay.vnpay.vn/images/bank/qr-vnpayewallet.png" alt="VNPay"
                                     className="h-5 w-auto"/>
                            </div>
                            <div className="bg-white rounded p-1.5 hover:scale-105 transition-transform">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png"
                                    alt="Visa" className="h-4 w-auto mt-0.5"/>
                            </div>
                            <div className="bg-white rounded p-1.5 hover:scale-105 transition-transform">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png"
                                    alt="Mastercard" className="h-5 w-auto"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* COPYRIGHT */}
            <div className="bg-gray-950 border-t border-gray-800 py-6">
                <div
                    className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
                    <div className="text-gray-500">
                        © 2024 GameStore. All rights reserved.
                    </div>
                    <div className="flex items-center gap-4 text-gray-500">
                        <a href="#" className="hover:text-blue-400 transition-colors">Điều khoản</a>
                        <span>•</span>
                        <a href="#" className="hover:text-blue-400 transition-colors">Bảo mật</a>
                        <span>•</span>
                        <a href="#" className="hover:text-blue-400 transition-colors">Cookie</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;