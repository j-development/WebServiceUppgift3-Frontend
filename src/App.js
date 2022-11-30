import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Edit from './pages/edit/Edit';
import Home from './pages/home/Home';
import Layout from './pages/Layout';
import Login from './pages/login/Login';
import NoPage from './pages/nopage/NoPage';
import { ProtectedRoutes } from './protectedRoutes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/edit" element={<Edit />} />
          </Route>
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
