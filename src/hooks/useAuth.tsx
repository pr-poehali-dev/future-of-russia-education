import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface UserInfo {
  name: string;
  role: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Проверка авторизации при загрузке страницы
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/login");
      setIsLoading(false);
      return;
    }
    
    // Получение данных пользователя
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setIsLoading(false);
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    navigate("/login");
  };
  
  return { user, isLoading, handleLogout };
};
