import { Navigate } from 'react-router-dom';

type PrivateRouteProps = {
  isAuth: boolean;
  children: JSX.Element; // Убедись, что тип children — это один элемент
};

const PrivateRoute = ({ isAuth, children }: PrivateRouteProps) => isAuth ? children : <Navigate to="/login" />;

export default PrivateRoute;
