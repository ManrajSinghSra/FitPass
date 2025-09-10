import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './Home';
import { AdminDashboard } from './pages/AdminDashboard';
import { UserDashboard } from './pages/UserBashboard';
import { FitPass } from './pages/FitPass';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the toastify CSS

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/userDasboard" element={<UserDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/fitpass" element={<FitPass />} />
      </Routes>
      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  );
}

export default App;