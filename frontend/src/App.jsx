import HotelList from './pages/HotelList';
import CreateHotel from './pages/CreateHotel';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import Hotels from './pages/Hotels';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/hotels/create" element={<CreateHotel />} />
        <Route path="/hotels" element={<HotelList />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/hotels-v2" element={<Hotels />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;