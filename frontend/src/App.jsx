import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import LoginStub from './pages/LoginStub.jsx';
import RegisterStub from './pages/RegisterStub.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginStub />} />
      <Route path="/register" element={<RegisterStub />} />
    </Routes>
  );
}

export default App;
