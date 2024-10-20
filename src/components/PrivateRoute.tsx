import { Navigate } from 'react-router-dom';

type PrivateRouteProps = {
  isAuth: boolean;
  children: JSX.Element;
};

const PrivateRoute = ({ isAuth, children }: PrivateRouteProps) =>
  isAuth ? children : <Navigate to="/login" />;

export default PrivateRoute;
