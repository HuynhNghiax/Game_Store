import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AppRouter from './routers'; // Tự động tìm file index.jsx trong folder routers

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;