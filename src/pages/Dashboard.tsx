import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import UploadMaterialsTab from "@/components/dashboard/UploadMaterialsTab";
import ContentManagementTab from "@/components/dashboard/ContentManagementTab";
import NewsEventsTab from "@/components/dashboard/NewsEventsTab";
import { useAuth } from "@/hooks/useAuth";

const Dashboard = () => {
  const { user, isLoading, handleLogout } = useAuth();
  
  // Отображаем загрузку или ничего, если пользователь не авторизован
  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Загрузка...</div>;
  }
  
  if (!user) {
    return null;
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
          
          <Tabs defaultValue="upload" className="space-y-6">
            <TabsList className="grid grid-cols-2 md:grid-cols-3 w-full max-w-2xl">
              <TabsTrigger value="upload">Загрузка материалов</TabsTrigger>
              <TabsTrigger value="content">Управление контентом</TabsTrigger>
              <TabsTrigger value="news">Новости и события</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload">
              <UploadMaterialsTab />
            </TabsContent>
            
            <TabsContent value="content">
              <ContentManagementTab />
            </TabsContent>
            
            <TabsContent value="news">
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
