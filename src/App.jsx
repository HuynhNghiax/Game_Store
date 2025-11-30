import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Success from './pages/Success';
import GameDetail from './pages/GameDetail';
import SearchResults from './pages/SearchResults'; // <--- Import file mới

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen pb-20 bg-gray-900 text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/success" element={<Success />} />
          <Route path="/game/:id" element={<GameDetail />} />
          
          {/* Route cho trang tìm kiếm */}
          <Route path="/search" element={<SearchResults />} /> 
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;