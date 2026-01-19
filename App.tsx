
import React, { useState, useEffect } from 'react';
import { View } from './types';
import Dashboard from './components/Dashboard';
import GoogleMyBusiness from './components/GoogleMyBusiness';
import ProspectingHub from './components/ProspectingHub';
import WhatsAppSimulator from './components/WhatsAppSimulator';
import TechnicalAnalysis from './components/TechnicalAnalysis';
import DataConnector from './components/DataConnector';

const SidebarItem: React.FC<{ 
  icon: React.ReactNode; 
  label: string; 
  active: boolean; 
  onClick: () => void 
}> = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
      active 
        ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
        : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
    }`}
  >
    <span className="w-5 h-5">{icon}</span>
    <span className="font-medium text-sm">{label}</span>
  </button>
);

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const renderView = () => {
    switch (currentView) {
      case View.DASHBOARD: return <Dashboard />;
      case View.GOOGLE_BUSINESS: return <GoogleMyBusiness />;
      case View.PROSPECTING: return <ProspectingHub />;
      case View.WHATSAPP: return <WhatsAppSimulator />;
      case View.TECHNICAL: return <TechnicalAnalysis />;
      case View.CONNECT: return <DataConnector />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className={`bg-white border-r border-slate-200 transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'} flex flex-col p-4`}>
        <div className="flex items-center space-x-3 mb-10 px-2">
          <div className="bg-blue-600 w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-xl">R</div>
          {isSidebarOpen && (
            <div className="leading-tight">
              <h1 className="font-bold text-slate-900 tracking-tight">ROGS AI</h1>
              <p className="text-[10px] text-blue-600 font-bold uppercase">Autônoma</p>
            </div>
          )}
        </div>

        <nav className="flex-1 space-y-1">
          <SidebarItem 
            active={currentView === View.DASHBOARD} 
            onClick={() => setCurrentView(View.DASHBOARD)} 
            label={isSidebarOpen ? "Painel Geral" : ""} 
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>} 
          />
          <SidebarItem 
            active={currentView === View.GOOGLE_BUSINESS} 
            onClick={() => setCurrentView(View.GOOGLE_BUSINESS)} 
            label={isSidebarOpen ? "Google Negócios" : ""} 
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>} 
          />
          <SidebarItem 
            active={currentView === View.PROSPECTING} 
            onClick={() => setCurrentView(View.PROSPECTING)} 
            label={isSidebarOpen ? "Prospecção" : ""} 
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>} 
          />
          <SidebarItem 
            active={currentView === View.WHATSAPP} 
            onClick={() => setCurrentView(View.WHATSAPP)} 
            label={isSidebarOpen ? "WhatsApp AI" : ""} 
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>} 
          />
          <SidebarItem 
            active={currentView === View.TECHNICAL} 
            onClick={() => setCurrentView(View.TECHNICAL)} 
            label={isSidebarOpen ? "Análise Técnica" : ""} 
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>} 
          />
        </nav>

        <div className="mt-auto pt-4 border-t border-slate-100">
          <SidebarItem 
            active={currentView === View.CONNECT} 
            onClick={() => setCurrentView(View.CONNECT)} 
            label={isSidebarOpen ? "Conectar Dados" : ""} 
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>} 
          />
          <button 
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="w-full mt-2 flex items-center justify-center p-2 text-slate-400 hover:text-slate-600"
          >
            {isSidebarOpen ? "Recolher" : "→"}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full bg-slate-50 relative overflow-y-auto">
        <header className="sticky top-0 z-10 glass-panel px-8 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              {currentView === View.DASHBOARD && "Dashboard de Inteligência"}
              {currentView === View.GOOGLE_BUSINESS && "Monitoramento Google Negócios"}
              {currentView === View.PROSPECTING && "Hub de Prospecção Autônoma"}
              {currentView === View.WHATSAPP && "Central de Mensagens"}
              {currentView === View.TECHNICAL && "Análise de Infraestrutura"}
              {currentView === View.CONNECT && "Conexão de Fontes de Dados"}
            </h2>
            <p className="text-xs text-slate-500">ROGS AI • Online e Operacional</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-green-50 px-3 py-1.5 rounded-full border border-green-100">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-xs font-semibold text-green-700">Automação Ativa</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold border-2 border-white shadow-sm">
              VS
            </div>
          </div>
        </header>

        <section className="p-8 max-w-7xl mx-auto w-full">
          {renderView()}
        </section>
      </main>
    </div>
  );
};

export default App;
