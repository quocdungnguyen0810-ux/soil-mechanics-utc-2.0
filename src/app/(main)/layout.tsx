'use client';

import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { MobileNav } from '@/components/MobileNav';
import { ChatbotModule } from '@/components/ChatBot';
import { useAppStore } from '@/store/useAppStore';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { sidebarOpen } = useAppStore();

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop / Tablet sidebar — hidden < md */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main content area */}
      <div
        className="flex-1 flex flex-col transition-all duration-300 w-full"
        style={{
          /* On md+ the margin is set via CSS media query below */
        }}
      >
        {/* Responsive spacer for sidebar — md uses ml, mobile = 0 */}
        <style>{`
          @media (min-width: 768px) {
            .main-with-sidebar {
              margin-left: ${sidebarOpen ? '18rem' : '4rem'};
              transition: margin-left 0.3s ease;
            }
          }
        `}</style>

        <div className="main-with-sidebar flex-1 flex flex-col">
          <Header />
          <main className="flex-1 overflow-y-auto p-3 sm:p-5 lg:p-8 pb-20 md:pb-6">
            <div className="max-w-6xl mx-auto animate-fade-in">
              {children}
            </div>
          </main>
        </div>
      </div>

      {/* Mobile bottom navigation — hidden ≥ md */}
      <MobileNav />

      <ChatbotModule />
    </div>
  );
}
