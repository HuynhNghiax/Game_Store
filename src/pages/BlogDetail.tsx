import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Blog } from '../types';

const BlogDetail: React.FC = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState<Blog | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetch(`http://localhost:3000/blogs/${id}`)
            .then(res => res.json())
            .then(data => setBlog(data))
            .catch(err => console.error("Error:", err));
    }, [id]);

    if (!blog) return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-16 h-16 border-4 border-purple-500/30 border-b-purple-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#050505] via-[#0a0a0f] to-[#050505] text-white pb-20">
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[150px] animate-pulse"></div>
                <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-600/5 rounded-full blur-[150px]"></div>
            </div>

            <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 pt-6">
                <Link
                    to="/blog"
                    className="inline-flex items-center gap-2 text-white hover:text-blue-400 transition-all duration-300 group backdrop-blur-md bg-black/40 px-5 py-2.5 rounded-full border border-white/20 hover:border-blue-500/50 shadow-xl hover:shadow-blue-500/30"
                >
                    <span className="text-lg group-hover:-translate-x-1 transition-transform duration-300">←</span>
                    <span className="font-semibold tracking-wider uppercase text-xs">Quay lại</span>
                </Link>
            </div>

            <div className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden -mt-20 pt-20">
                <div className="absolute inset-0">
                    <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-[#050505]"></div>

                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
                </div>

                <div className="absolute bottom-0 left-0 w-full z-10">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8 md:mb-12">
                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-3 mb-6">
                            <span className="px-4 py-1.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-blue-500/50">
                                {blog.category}
                            </span>
                            <div className="flex items-center gap-2 text-gray-300 text-sm font-medium backdrop-blur-sm bg-white/10 px-3 py-1.5 rounded-full border border-white/20">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span>{blog.date}</span>
                            </div>
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-6xl font-black leading-tight max-w-5xl">
                            <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent drop-shadow-2xl">
                                {blog.title}
                            </span>
                        </h1>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16 relative z-10">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

                    <article className="lg:w-2/3">
                        <div className="bg-gradient-to-br from-[#0d0d12] to-[#0a0a0f] border border-gray-800/50 rounded-3xl overflow-hidden shadow-2xl shadow-black/50 backdrop-blur-xl relative group hover:border-gray-700/50 transition-all duration-500">

                            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>

                            <div className="p-6 sm:p-8 md:p-12">

                                <div className="relative mb-12 pb-8 border-b border-gray-800/50">
                                    <div className="absolute -left-6 sm:-left-8 md:-left-12 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-blue-500 rounded-full shadow-lg shadow-blue-500/50"></div>
                                    <div className="relative">
                                        <svg className="absolute -top-2 -left-4 w-8 h-8 text-blue-500/20" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                        </svg>
                                        <p className="text-lg sm:text-xl md:text-2xl text-gray-100 font-medium leading-relaxed italic pl-6">
                                            {blog.summary}
                                        </p>
                                    </div>
                                </div>


                                <div className="prose prose-invert prose-lg max-w-none">
                                    <div className="text-gray-300 text-base sm:text-lg leading-[1.9] font-light tracking-wide space-y-6">
                                        {blog.content.split('\n\n').map((paragraph, index) => (
                                            <p key={index} className="text-justify first-letter:text-5xl first-letter:font-bold first-letter:text-blue-400 first-letter:mr-2 first-letter:float-left first-letter:leading-none">
                                                {paragraph}
                                            </p>
                                        ))}
                                    </div>
                                </div>


                                <div className="mt-12 pt-8 border-t border-gray-800/50">
                                    <div className="flex flex-wrap items-center justify-between gap-6">
                                        <div className="flex items-center gap-4">
                                            <div className="relative group/avatar">
                                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center font-black text-2xl shadow-xl shadow-blue-500/30 transition-transform group-hover/avatar:scale-110 duration-300">
                                                    {blog.author.charAt(0)}
                                                </div>
                                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 blur-xl opacity-0 group-hover/avatar:opacity-50 transition-opacity"></div>
                                            </div>
                                            <div>
                                                <p className="text-gray-500 text-xs uppercase tracking-widest font-semibold">Biên tập viên</p>
                                                <p className="text-white font-bold text-lg">{blog.author}</p>
                                            </div>
                                        </div>


                                        <div className="flex gap-3">
                                            <button className="group/btn flex items-center gap-2 px-5 py-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 border border-gray-800 hover:border-blue-500/50 shadow-lg hover:shadow-blue-500/20">
                                                <svg className="w-4 h-4 group-hover/btn:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                                </svg>
                                                <span className="text-sm font-semibold">Chia sẻ</span>
                                            </button>
                                            <button className="p-3 bg-white/5 rounded-xl hover:bg-red-500/20 transition-all duration-300 border border-gray-800 hover:border-red-500/50 group/heart">
                                                <svg className="w-5 h-5 group-hover/heart:scale-110 group-hover/heart:fill-red-500 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>

                    {/* Sidebar */}
                    <aside className="lg:w-1/3 space-y-6">

                        <div className="sticky top-8 space-y-6">
                            <div className="relative group/promo overflow-hidden bg-gradient-to-br from-[#0d0d12] to-[#0a0a0f] border border-blue-500/30 rounded-3xl p-8 backdrop-blur-xl shadow-2xl hover:shadow-blue-500/20 transition-all duration-500">

                                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10 opacity-0 group-hover/promo:opacity-100 transition-opacity duration-500"></div>

                                <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl group-hover/promo:bg-blue-500/30 transition-all duration-500"></div>

                                <div className="relative z-10">

                                    <div className="mb-6 inline-flex p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg shadow-blue-500/50">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                    </div>

                                    <h3 className="text-white font-black text-xl mb-3 flex items-center gap-2">
                                        Đặc Quyền Game Thủ
                                    </h3>

                                    <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                                        Sở hữu ngay các siêu phẩm game bản quyền với mức giá ưu đãi nhất thị trường. An toàn - Bảo mật - Hỗ trợ 24/7.
                                    </p>

                                    <Link
                                        to="/categories"
                                        className="group/link flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white text-center font-bold rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/40 hover:shadow-blue-500/60 hover:-translate-y-0.5"
                                    >
                                        <span>Ghé thăm cửa hàng</span>
                                        <svg className="w-5 h-5 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-[#0d0d12] to-[#0a0a0f] border border-gray-800/50 rounded-3xl p-6 backdrop-blur-xl">
                                <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <span className="w-1 h-4 bg-blue-500 rounded-full"></span>
                                    Thông tin bài viết
                                </h4>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500">Danh mục</span>
                                        <span className="text-gray-300 font-semibold">{blog.category}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500">Tác giả</span>
                                        <span className="text-gray-300 font-semibold">{blog.author}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500">Ngày đăng</span>
                                        <span className="text-gray-300 font-semibold">{blog.date}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                </div>
            </div>
        </div>
    );
};

export default BlogDetail;