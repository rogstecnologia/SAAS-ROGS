
import React, { useState } from 'react';
import { MOCK_LEADS } from '../constants';

const ProspectingHub: React.FC = () => {
  const [leads, setLeads] = useState(MOCK_LEADS);

  const getPotentialColor = (p: string) => {
    switch(p) {
      case 'Alto': return 'text-green-600 bg-green-50';
      case 'Médio': return 'text-amber-600 bg-amber-50';
      case 'Baixo': return 'text-slate-600 bg-slate-50';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold">Fila de Prospecção Ativa</h3>
          <p className="text-sm text-slate-500">IA gerenciando 12/100 slots de prospecção paralela.</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors">
          Importar Novos Leads
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase">
            <tr>
              <th className="px-6 py-4">Cliente / Lead</th>
              <th className="px-6 py-4">Tipo</th>
              <th className="px-6 py-4">Potencial</th>
              <th className="px-6 py-4">Status IA</th>
              <th className="px-6 py-4">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-slate-50 transition-colors group">
                <td className="px-6 py-4">
                  <div>
                    <p className="font-bold text-slate-900">{lead.name}</p>
                    <p className="text-xs text-slate-500">{lead.phone}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs font-medium text-slate-600 px-2 py-1 bg-slate-100 rounded-full">{lead.type}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${getPotentialColor(lead.potential)}`}>
                    {lead.potential}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-medium text-slate-700">{lead.status}</span>
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Iniciar Abordagem">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                    <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 p-6 rounded-2xl text-white">
          <h4 className="font-bold mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Auto-Otimização de Abordagem
          </h4>
          <p className="text-sm text-slate-400 mb-6">
            A IA detectou que mensagens iniciadas com menção a "Manutenção Preventiva" têm 22% mais conversão em Condomínios do que scripts de "Instalação de Câmeras".
          </p>
          <div className="flex items-center space-x-3">
            <button className="bg-blue-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-700">Aplicar no Fluxo</button>
            <button className="border border-slate-700 px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-800">Ver Relatório Completo</button>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h4 className="font-bold text-slate-800 mb-4">Gatilhos de Eventos Recentes</h4>
          <div className="space-y-3">
            {[
              { time: "Há 12 min", event: "Novo lead detectado no Google Maps: 'Hospital Unimed'", type: "PROSPECÇÃO" },
              { time: "Há 45 min", event: "Contrato Condomínio Solar vence em 15 dias.", type: "MANUTENÇÃO" },
              { time: "Há 2 horas", event: "IA gerou áudio de abordagem para lead 'Indústria Flex'", type: "AUTOMAÇÃO" },
            ].map((e, i) => (
              <div key={i} className="flex items-start space-x-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="min-w-[70px]">
                  <p className="text-[10px] font-bold text-slate-400 uppercase leading-none">{e.time}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">{e.type}</p>
                  <p className="text-xs text-slate-500">{e.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProspectingHub;
