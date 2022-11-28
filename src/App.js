import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import {
  isLoggedIn as isLoggedInAtom,
  selectedPost as selectedPostAtom,
} from './atom';
import Edit from './pages/edit/Edit';
import Home from './pages/home/Home';
import Layout from './pages/Layout';
import Login from './pages/login/Login';
import NoPage from './pages/nopage/NoPage';
import { ProtectedRoutes } from './protectedRoutes';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInAtom);

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
