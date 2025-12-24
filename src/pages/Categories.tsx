import React, { useState, useMemo, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { fetchProducts } from '../redux/productSlice';
import GameCard from '../components/GameCard';
import { ChevronLeft, ChevronRight, Loader, ArrowUpDown, Filter } from 'lucide-react';

export default function Categories() {
  const dispatch = useAppDispatch();
  const { items: games, status } = useAppSelector(state => state.products);

  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    if (status === 'idle') dispatch(fetchProducts());
  }, [status, dispatch]);

  const genres = useMemo(() => {
    if (!games.length) return [];
    const allGenres = ['All', ...new Set(games.map(game => game.genre))];
    return allGenres.sort(); 
  }, [games]);

  const processedGames = useMemo(() => {
    let result = selectedGenre === 'All' 
        ? [...games] 
        : games.filter(game => game.genre === selectedGenre);

    switch (sortBy) {
        case 'price-asc':
            result.sort((a, b) => parseFloat(a.price.toString()) - parseFloat(b.price.toString()));
            break;
        case 'price-desc':
            result.sort((a, b) => parseFloat(b.price.toString()) - parseFloat(a.price.toString()));
            break;
        case 'name-asc':
            result.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            result.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'rating-desc':
            result.sort((a, b) => b.rating - a.rating);
            break;
        default: break;
    }
    return result;
  }, [selectedGenre, sortBy, games]);

  const totalPages = Math.ceil(processedGames.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentGames = processedGames.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => { setCurrentPage(1); }, [selectedGenre, sortBy]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    const scrollContainer = document.getElementById('main-scroll-container');
    if (scrollContainer) scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (status === 'loading') return <div className="flex h-[50vh] items-center justify-center"><Loader className="animate-spin text-blue-600" size={40} /></div>;

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Khám phá</h1>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm">
            <ArrowUpDown size={16} className="text-gray-500" />
            <span className="text-sm text-gray-500 font-medium whitespace-nowrap">Sắp xếp:</span>
            <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-sm font-bold text-gray-800 outline-none cursor-pointer"
            >
                <option value="default">Mặc định</option>
                <option value="price-asc">Giá: Thấp đến Cao</option>
                <option value="price-desc">Giá: Cao đến Thấp</option>
                <option value="name-asc">Tên: A - Z</option>
                <option value="name-desc">Tên: Z - A</option>
                <option value="rating-desc">Đánh giá cao nhất</option>
            </select>
        </div>
      </div>

      <div className="flex gap-3 mb-6 overflow-x-auto pb-2 scrollbar-hide items-center">
        <div className="flex items-center gap-2 text-gray-400 pr-2 border-r border-gray-200 mr-2 shrink-0">
            <Filter size={18} />
            <span className="text-xs font-bold uppercase">Lọc</span>
        </div>
        {genres.map((genre) => (
          <button key={genre} onClick={() => setSelectedGenre(genre)} className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap border ${selectedGenre === genre ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'bg-white text-gray-500 border-gray-200 hover:border-blue-400 hover:text-blue-600'}`}>
            {genre}
          </button>
        ))}
      </div>

      <div className="mb-4 text-gray-500 text-sm font-medium flex justify-between items-center">
          <span>Hiển thị {currentGames.length} trên tổng số {processedGames.length} game</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 min-h-[500px] content-start">
        {currentGames.length > 0 ? (
            currentGames.map((game) => <GameCard key={game.id} game={game} />)
        ) : (
            <div className="text-gray-400 col-span-full text-center py-20 text-lg flex flex-col items-center">
                <p>Không tìm thấy game nào phù hợp.</p>
                <button onClick={() => {setSelectedGenre('All'); setSortBy('default')}} className="text-blue-600 hover:underline mt-2 text-sm">Xóa bộ lọc</button>
            </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-12 pb-8">
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-blue-50 hover:text-blue-600 disabled:opacity-50 transition shadow-sm"><ChevronLeft size={20} /></button>
            {[...Array(totalPages)].map((_, index) => {
                const pageNum = index + 1;
                return (
                    <button key={pageNum} onClick={() => handlePageChange(pageNum)} className={`w-10 h-10 rounded-lg font-bold text-sm transition shadow-sm border ${currentPage === pageNum ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:bg-blue-50 hover:text-blue-600'}`}>{pageNum}</button>
                );
            })}
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-blue-50 hover:text-blue-600 disabled:opacity-50 transition shadow-sm"><ChevronRight size={20} /></button>
        </div>
      )}
    </div>
  );
}