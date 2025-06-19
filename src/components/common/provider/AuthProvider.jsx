import { createContext, useContext, useEffect, useState } from "react";
import apiClient from "@/utils/apiClient";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('accessToken'));
  const [user, setUser] = useState(null);

  const login = async (userId, password) => {
    const response = await apiClient.post('/user/login', { userId, password });
    const data = response.data;
    if (data && data.accessToken) {
      localStorage.setItem('accessToken', data.accessToken);
      setIsAuthenticated(true);
      //setUser(response.data.user);
      navigate('/');
    } else {
      throw new Error("토큰이 존재하지 않습니다.");
    }
  };

  const logout = async () => {
    await apiClient.post('/user/logout');
    localStorage.removeItem('accessToken');
    setIsAuthenticated(false);
    setUser(null);
    navigate('/');
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      apiClient
        .get('/user/info')
        .then(res => setUser(res.data.user))
        .catch(() => logout());
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);