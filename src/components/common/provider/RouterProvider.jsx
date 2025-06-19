import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setRouter } from '@/utils/apiClient';

function RouterProvider({ children }) {
  const navigate = useNavigate();
  useEffect(() => {
    setRouter(navigate);
  }, [navigate]);

  return children;
}

export default RouterProvider;