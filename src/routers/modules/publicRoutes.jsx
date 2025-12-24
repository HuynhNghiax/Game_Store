import Home from '../../pages/Home';
import GameDetail from '../../pages/GameDetail';
import Categories from '../../pages/Categories';
import SearchResults from '../../pages/SearchResults';
import NotFound from '../../pages/NotFound';

export const publicRoutes = [
  {
    index: true, // Đây là trang chủ (/)
    element: <Home />
  },
  {
    path: 'game/:id', // Lưu ý: Không cần dấu / ở đầu khi là children
    element: <GameDetail />
  },
  {
    path: 'categories',
    element: <Categories />
  },
  {
    path: 'search',
    element: <SearchResults />
  },
  {
    path: '*', // Trang 404
    element: <NotFound />
  }
];