import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Blog } from '../types';

const BlogDetail: React.FC = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState<Blog | null>(null);

    useEffect(() => {
        fetch(`http://localhost:3000/blogs/${id}`)
            .then(res => res.json())
            .then(data => setBlog(data));
    }, [id]);

    if (!blog) return <div className="text-white text-center py-20">Đang tải nội dung...</div>;

    return (
        <div className="container mx-auto px-4 py-10 max-w-4xl text-white">
            <Link to="/blog" className="text-blue-400 hover:underline mb-6 inline-block">← Quay lại tin tức</Link>

            <img src={blog.image} alt={blog.title} className="w-full h-[400px] object-cover rounded-2xl mb-8 shadow-2xl" />

            <div className="flex items-center gap-4 mb-4">
                <span className="bg-blue-600 px-3 py-1 rounded text-sm uppercase font-bold">{blog.category}</span>
                <span className="text-gray-400">{blog.date}</span>
            </div>

            <h1 className="text-4xl font-extrabold mb-6 leading-tight">{blog.title}</h1>

            <div className="flex items-center gap-3 mb-10 pb-6 border-b border-gray-800">
                <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center font-bold">
                    {blog.author.charAt(0)}
                </div>
                <span className="text-gray-300">Tác giả: <span className="font-semibold">{blog.author}</span></span>
            </div>


            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed text-lg">
                <p className="mb-6 font-semibold text-xl text-white italic border-l-4 border-blue-500 pl-4">
                    {blog.summary}
                </p>

                <div className="whitespace-pre-line text-justify">
                    {blog.content}
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;