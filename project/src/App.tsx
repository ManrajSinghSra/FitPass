import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './Home';
import { AdminDashboard } from './pages/AdminDashboard';
import { UserDashboard } from './pages/UserBashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/userDasboard" element={<UserDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;