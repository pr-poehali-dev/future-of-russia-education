import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, LogOut } from "lucide-react";

interface DashboardHeaderProps {
  userName: string;
  userRole: string;
  onLogout: () => void;
}

const DashboardHeader = ({ userName, userRole, onLogout }: DashboardHeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
      <div>
        <h1 className="text-3xl font-bold">Панель управления</h1>
        <p className="text-gray-600 mt-1">
          Добро пожаловать, {userName} | {userRole}
        </p>
      </div>
      
      <div className="flex space-x-3">
        <Button onClick={() => navigate("/")} variant="outline" size="sm">
          <Home className="mr-2 h-4 w-4" />
          На сайт
        </Button>
        <Button onClick={onLogout} variant="destructive" size="sm">
          <LogOut className="mr-2 h-4 w-4" />
          Выйти
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
