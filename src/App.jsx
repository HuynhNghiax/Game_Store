import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Home from './pages/Home';
import Cart from './pages/Cart';
import GameDetail from './pages/GameDetail';
import Success from './pages/Success';
import Categories from './pages/Categories';
import Library from './pages/Library';
import SearchResults from './pages/SearchResults';
import Login from './pages/Login';
import Register from './pages/Register';
import OrderHistory from './pages/OrderHistory';
import ProtectedRoute from './components/ProtectedRoute'; // 1. Import Component bảo vệ
import Profile from './pages/Profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* --- CÁC TRANG KHÔNG CẦN BẢO VỆ (Public Routes) --- */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* --- MAIN LAYOUT --- */}
        <Route path="/" element={<MainLayout />}>
          
          {/* Ai cũng xem được */}
          <Route index element={<Home />} />
          <Route path="game/:id" element={<GameDetail />} />
          <Route path="categories" element={<Categories />} />
          <Route path="search" element={<SearchResults />} />
          
          {/* --- CÁC TRANG CẦN BẢO VỆ (Private Routes) --- */}
          {/* Phải đăng nhập mới vào được, nếu không sẽ bị đá về Login */}
          
          <Route path="cart" element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          } />

          <Route path="library" element={
            <ProtectedRoute>
              <Library />
            </ProtectedRoute>
          } />

          <Route path="history" element={
            <ProtectedRoute>
              <OrderHistory />
            </ProtectedRoute>
          } />

          <Route path="success" element={
            <ProtectedRoute>
              <Success />
            </ProtectedRoute>
          } />

          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;