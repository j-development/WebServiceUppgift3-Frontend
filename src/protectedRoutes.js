import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { useLocation } from 'react-router-dom';
import { isLoggedIn as isLoggedInAtom } from './atom';

const ProtectedRoutes = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInAtom);
  const location = useLocation();

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export { ProtectedRoutes };
