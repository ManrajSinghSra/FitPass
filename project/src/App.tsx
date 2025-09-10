import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './Home';
import { AdminDashboard } from './pages/AdminDashboard';
import { UserDashboard } from './pages/UserBashboard';
import { FitPass } from './pages/FitPass';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/userDasboard" element={<UserDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
         <Route path="/fitpass" element={<FitPass />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;