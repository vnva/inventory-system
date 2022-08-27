import { siteMap } from '@/consts';
import { useAppSelector } from '@/store';
import { Navigate } from 'react-router-dom';

interface IProtectedRouteProps {
  children: JSX.Element;
}

export const ProtectedRoute: React.FC<IProtectedRouteProps> = ({
  children,
}) => {
  const userIsLoaded = useAppSelector(state => state.auth.userIsLoaded);
  if (!userIsLoaded) return <Navigate to={siteMap.signin.path} replace />;

  return children;
};
