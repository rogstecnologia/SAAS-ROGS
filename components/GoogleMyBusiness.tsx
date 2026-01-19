
import React, { useState } from 'react';

const GoogleMyBusiness: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'reviews' | 'keywords' | 'competitors'>('reviews');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-4">
          <div className="bg-blue-50 p-3 rounded-full text-blue-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.382-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Nota Média</p>
            <h4 className="text-xl font-bold">4.9 / 5.0</h4>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-4">
          <div className="bg-green-50 p-3 rounded-full text-green-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Visualizações (Mês)</p>
            <h4 className="text-xl font-bold">12.4k</h4>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-4">
          <div className="bg-amber-50 p-3 rounded-full text-amber-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Novos Leads GMB</p>
            <h4 className="text-xl font-bold">28</h4>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="flex border-b border-slate-100">
          <button 
            onClick={() => setActiveTab('reviews')}
            className={`px-6 py-4 text-sm font-bold transition-all ${activeTab === 'reviews' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-400'}`}
          >
            Avaliações Recentes
          </button>
          <button 
            onClick={() => setActiveTab('keywords')}
            className={`px-6 py-4 text-sm font-bold transition-all ${activeTab === 'keywords' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-400'}`}
          >
            Palavras-Chave Locais
          </button>
          <button 
            onClick={() => setActiveTab('competitors')}
            className={`px-6 py-4 text-sm font-bold transition-all ${activeTab === 'competitors' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-400'}`}
          >
            Análise Concorrentes
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'reviews' && (
            <div className="space-y-4">
              {[
                { name: "Carlos Oliveira", rating: 5, comment: "Atendimento excepcional, a equipe técnica da ROGS é muito qualificada.", date: "Há 2 dias", replied: true },
                { name: "Sílvia Medeiros", rating: 4, comment: "Instalação rápida de CFTV, mas tive dúvidas sobre o acesso remoto.", date: "Há 1 semana", replied: false },
                { name: "João Paulo", rating: 5, comment: "Monitoramento 24h funciona de verdade. Me sinto seguro.", date: "Há 2 semanas", replied: true },
              ].map((rev, i) => (
                <div key={i} className="p-4 border border-slate-50 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                  <div className="flex justify-between mb-2">
                    <span className="font-bold text-slate-900">{rev.name}</span>
                    <span className="text-xs text-slate-500">{rev.date}</span>
                  </div>
                  <div className="flex mb-2 text-amber-400">
                    {Array.from({ length: rev.rating }).map((_, j) => (
                      <svg key={j} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    ))}
                  </div>
                  <p className="text-sm text-slate-600 mb-4 italic">"{rev.comment}"</p>
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${rev.replied ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {rev.replied ? 'IA Respondeu' : 'Pendente'}
                    </span>
                    {!rev.replied && (
                      <button className="text-xs font-bold text-blue-600 hover:underline">Sugerir Resposta IA</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'keywords' && (
            <div className="grid grid-cols-2 gap-4">
              {[
                { term: "Cerca elétrica residencial", volume: "Alta", trend: "+12%" },
                { term: "Monitoramento CFTV SP", volume: "Média", trend: "+5%" },
                { term: "Instalação alarme condomínio", volume: "Alta", trend: "+25%" },
                { term: "Suporte técnico segurança 24h", volume: "Baixa", trend: "0%" },
              ].map((k, i) => (
                <div key={i} className="p-4 border border-slate-100 rounded-xl flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-900">{k.term}</p>
                    <p className="text-xs text-slate-500">Busca: {k.volume}</p>
                  </div>
                  <span className="text-green-600 font-bold text-xs">{k.trend}</span>
                </div>
              ))}
            </div>
          )}
          
          {activeTab === 'competitors' && (
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
              </div>
              <h4 className="font-bold text-slate-800">Ranking Competitivo Local</h4>
              <p className="text-sm text-slate-500 max-w-sm mx-auto mt-2">
                A ROGS está em 2º lugar na região para a categoria "Segurança Eletrônica". O concorrente líder possui 15 avaliações a mais.
              </p>
              <button className="mt-6 bg-slate-900 text-white px-6 py-2 rounded-xl text-sm font-bold">Gerar Estratégia de SEO</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoogleMyBusiness;
