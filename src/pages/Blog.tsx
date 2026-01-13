import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Blog } from '../types';

const BlogPage: React.FC = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');
    const [searchTerm, setSearchTerm] = useState<string>('');

    //  Phân trang
    const [currentPage, setCurrentPage] = useState<number>(1);
    const blogsPerPage = 6;

    useEffect(() => {
        fetch('http://localhost:3000/blogs')
            .then(res => res.json())
            .then(data => setBlogs(data))
            .catch(err => console.error("Error:", err));
    }, []);

    // Reset về trang 1 khi lọc hoặc tìm kiếm
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory, searchTerm]);

    const categories = ['Tất cả', 'Tin Nóng', 'Cấu Hình Game', 'Sự Kiện', 'Khuyến Mãi'];

    const filteredBlogs = blogs.filter(blog => {
        const matchCategory = selectedCategory === 'Tất cả' || blog.category === selectedCategory;
        const matchSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.summary.toLowerCase().includes(searchTerm.toLowerCase());
        return matchCategory && matchSearch;
    });

    const featuredBlog = filteredBlogs[0];
    const allRegularBlogs = filteredBlogs.slice(1);

    // Tính toán cắt mảng bài viết cho trang hiện tại
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentRegularBlogs = allRegularBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
    const totalPages = Math.ceil(allRegularBlogs.length / blogsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);

        window.scrollTo({ top: 700, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-black">
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
            </div>

            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-600/5 via-transparent to-transparent"></div>
                <div className="container mx-auto px-4 pt-20 pb-16 relative z-10">
                    <div className="text-center mb-12">
                        <div className="inline-block mb-4">
                            <span className="px-4 py-1.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full text-blue-400 text-sm font-semibold uppercase tracking-wider">
                                GameStore & Tin tức
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight leading-tight">
                            <span className="text-white">THẾ GIỚI </span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 animate-gradient">
                                GAME BẢN QUYỀN
                            </span>
                        </h1>
                        <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                            Nơi cập nhật những chuyển động mới nhất của làng game thế giới. Đồng hành cùng game thủ trong việc lựa chọn <span className="text-blue-400 font-medium">trải nghiệm nguyên bản</span>.
                        </p>
                    </div>

                    <div className="max-w-2xl mx-auto mb-10">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition"></div>
                            <input
                                type="text"
                                placeholder="Tìm kiếm bài viết..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="relative w-full bg-[#0a0a0a] border border-gray-800 rounded-2xl px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition text-lg"
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-3">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`relative px-6 py-2.5 rounded-xl font-bold transition-all duration-300 ${
                                    selectedCategory === cat ? 'text-white scale-105' : 'text-gray-400 hover:text-white hover:scale-105'
                                }`}
                            >
                                {selectedCategory === cat && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl"></div>
                                )}
                                <span className="relative z-10">{cat}</span>
                                {selectedCategory !== cat && (
                                    <div className="absolute inset-0 bg-white/5 rounded-xl border border-gray-800"></div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 pb-20 relative z-10">
                {featuredBlog && currentPage === 1 && (
                    <div className="mb-16">
                        <Link to={`/blog/${featuredBlog.id}`} className="group block">
                            <div className="relative overflow-hidden rounded-3xl">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition duration-500 blur-xl"></div>
                                <div className="relative bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] border border-gray-800 group-hover:border-gray-700 transition-all rounded-3xl overflow-hidden">
                                    <div className="grid lg:grid-cols-2 gap-0">
                                        <div className="relative h-[400px] lg:h-[500px] overflow-hidden">
                                            <img src={featuredBlog.image} alt={featuredBlog.title} className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                                            <div className="absolute top-6 left-6">
                                                <span className="inline-block px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-2xl">
                                                    {featuredBlog.category}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-8 lg:p-12 flex flex-col justify-center">
                                            <div className="mb-4">
                                                <span className="inline-block px-3 py-1 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider rounded-lg">Nổi bật</span>
                                            </div>
                                            <h2 className="text-3xl lg:text-4xl font-black text-white mb-4 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all">
                                                {featuredBlog.title}
                                            </h2>
                                            <p className="text-gray-400 text-base lg:text-lg mb-6 leading-relaxed line-clamp-3">{featuredBlog.summary}</p>
                                            <div className="flex items-center gap-4 text-sm text-gray-500 mb-8">
                                                <span>{featuredBlog.date}</span>
                                                <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                                                <span>{featuredBlog.author}</span>
                                            </div>
                                            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-xl group-hover:gap-5 group-hover:shadow-2xl transition-all">
                                                Đọc ngay <span className="text-xl">→</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                )}

                {allRegularBlogs.length > 0 && (
                    <>
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-4">
                                <div className="w-1.5 h-10 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                                <h2 className="text-3xl font-black text-white">Khám phá thêm</h2>
                            </div>
                            <span className="px-4 py-2 bg-white/5 border border-gray-800 rounded-xl text-gray-500 font-bold text-xs uppercase tracking-widest">
                                Trang {currentPage} / {totalPages}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {currentRegularBlogs.map((blog) => (
                                <Link key={blog.id} to={`/blog/${blog.id}`} className="group block">
                                    <div className="relative h-full bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] rounded-2xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-all duration-300 hover:-translate-y-2">
                                        <div className="relative h-56 overflow-hidden">
                                            <img src={blog.image} alt={blog.title} className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                                            <span className="absolute top-4 right-4 px-3 py-1.5 bg-black/80 backdrop-blur-sm border border-blue-500/50 text-blue-400 text-xs font-bold uppercase rounded-lg">{blog.category}</span>
                                        </div>
                                        <div className="p-6">
                                            <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                                                <span>{blog.date}</span>
                                                <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                                                <span>{blog.author}</span>
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-3 leading-tight line-clamp-2 group-hover:text-blue-400 transition-all">{blog.title}</h3>
                                            <p className="text-gray-400 text-sm mb-5 line-clamp-3">{blog.summary}</p>
                                            <div className="text-blue-400 font-bold text-sm">Xem thêm →</div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-3 mt-16">
                                <button
                                    disabled={currentPage === 1}
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    className={`px-5 py-2.5 rounded-xl font-bold border transition-all ${
                                        currentPage === 1 ? 'border-gray-900 text-gray-800 cursor-not-allowed' : 'border-gray-800 text-gray-400 hover:border-blue-500 hover:text-white bg-white/5'
                                    }`}
                                >
                                    Trước
                                </button>

                                <div className="flex gap-2">
                                    {[...Array(totalPages)].map((_, i) => (
                                        <button
                                            key={i + 1}
                                            onClick={() => handlePageChange(i + 1)}
                                            className={`w-11 h-11 rounded-xl font-bold transition-all ${
                                                currentPage === i + 1
                                                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/20'
                                                    : 'bg-white/5 text-gray-500 border border-gray-800 hover:border-gray-600'
                                            }`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    disabled={currentPage === totalPages}
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    className={`px-5 py-2.5 rounded-xl font-bold border transition-all ${
                                        currentPage === totalPages ? 'border-gray-900 text-gray-800 cursor-not-allowed' : 'border-gray-800 text-gray-400 hover:border-blue-500 hover:text-white bg-white/5'
                                    }`}
                                >
                                    Sau
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default BlogPage;