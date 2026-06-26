import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import ChatPage from './pages/ChatPage';
import SummarizerPage from './pages/SummarizerPage';
import Sidebar from './components/Sidebar';

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (currentPage === 'landing') {
    return <LandingPage onEnter={() => setCurrentPage('chat')} />;
  }

  return (
    <div className="flex h-screen bg-space-black overflow-hidden">
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      <main className="flex-1 overflow-hidden">
        {currentPage === 'chat' && <ChatPage />}
        {currentPage === 'summarizer' && <SummarizerPage />}
      </main>
    </div>
  );
}
