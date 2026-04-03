'use client';

import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { ChatbotModule } from '@/components/ChatBot';
import { useAppStore } from '@/store/useAppStore';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { sidebarOpen } = useAppStore();

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarOpen ? 'ml-72' : 'ml-16'
        }`}
      >
        <Header />
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-6xl mx-auto animate-fade-in">
            {children}
          </div>
        </main>
      </div>
      <ChatbotModule />
    </div>
  );
}
