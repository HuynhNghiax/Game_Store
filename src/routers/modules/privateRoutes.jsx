import Cart from '../../pages/Cart';
import Library from '../../pages/Library';
import OrderHistory from '../../pages/OrderHistory';
import Success from '../../pages/Success';
import ProtectedRoute from '../../components/ProtectedRoute';

// Hàm bọc nhanh ProtectedRoute để code đỡ lặp lại
const protect = (component) => <ProtectedRoute>{component}</ProtectedRoute>;

export const privateRoutes = [
  {
    path: 'cart',
    element: protect(<Cart />)
  },
  {
    path: 'library',
    element: protect(<Library />)
  },
  {
    path: 'history',
    element: protect(<OrderHistory />)
  },
  {
    path: 'success',
    element: protect(<Success />)
  }
];