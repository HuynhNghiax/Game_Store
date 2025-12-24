import { HashRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AppRouter from './routers';

function App() {
  return (
    <HashRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <AppRouter />
    </HashRouter>
  );
}

export default App;