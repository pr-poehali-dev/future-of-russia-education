import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import UploadMaterialsTab from "@/components/dashboard/UploadMaterialsTab";
import ContentManagementTab from "@/components/dashboard/ContentManagementTab";
import NewsEventsTab from "@/components/dashboard/NewsEventsTab";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const { user, isLoading, handleLogout } = useAuth();
  const [activeTab, setActiveTab] = useState("upload");
  
  // Сохраняем активную вкладку в localStorage
  useEffect(() => {
    const savedTab = localStorage.getItem("dashboardActiveTab");
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, []);
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    localStorage.setItem("dashboardActiveTab", value);
  };
  
  // Показываем индикатор загрузки
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
          <p className="text-muted-foreground">Загрузка...</p>
        </div>
      </div>
    );
  }
  
  // Перенаправляем неавторизованных пользователей на страницу входа
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8 px-4">
        <div className="container mx-auto">
          <DashboardHeader 
            userName={user.name}
            userRole={user.role}
            onLogout={handleLogout}
          />
          
          <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
            <TabsList className="grid grid-cols-1 sm:grid-cols-3 w-full max-w-3xl mx-auto">
              <TabsTrigger value="upload">Загрузка материалов</TabsTrigger>
              <TabsTrigger value="content">Управление контентом</TabsTrigger>
              <TabsTrigger value="news">Новости и события</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload" className="min-h-[500px]">
              <UploadMaterialsTab />
            </TabsContent>
            
            <TabsContent value="content" className="min-h-[500px]">
              <ContentManagementTab />
            </TabsContent>
            
            <TabsContent value="news" className="min-h-[500px]">
              <NewsEventsTab />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
