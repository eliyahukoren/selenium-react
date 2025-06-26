import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {JSX} from 'react';

interface Props {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: Props) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
