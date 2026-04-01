'use client';

import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { TheoryModule } from '@/features/chapters/TheoryModule';
import { ExerciseModule } from '@/features/exercises/ExerciseModule';
import { LabModule } from '@/features/labs/LabModule';
import { ReportModule } from '@/features/reports/ReportModule';
import { useAppStore } from '@/store/useAppStore';

export default function Home() {
  const { currentMode, sidebarOpen } = useAppStore();

  const renderModule = () => {
    switch (currentMode) {
      case 'theory': return <TheoryModule />;
      case 'exercises': return <ExerciseModule />;
      case 'labs': return <LabModule />;
      case 'reports': return <ReportModule />;
      default: return <TheoryModule />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-72' : 'ml-16'}`}>
        <Header />
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-6xl mx-auto animate-fade-in">
            {renderModule()}
          </div>
        </main>
      </div>
    </div>
  );
}
