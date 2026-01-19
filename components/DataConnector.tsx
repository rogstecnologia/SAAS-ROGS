
import React, { useState } from 'react';
import { MOCK_CONNECTIONS } from '../constants';

const DataConnector: React.FC = () => {
  const [connections, setConnections] = useState(MOCK_CONNECTIONS);

  return (
    <div className="space-y-6">
      <div className="bg-blue-600 p-8 rounded-2xl text-white shadow-xl flex items-center justify-between overflow-hidden relative">
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-2">Conecte o Ecossistema ROGS</h3>
          <p className="text-blue-100 max-w-lg">
            Para que a ROGS AI seja 100% autônoma, ela precisa de dados. Conecte suas planilhas de manutenção, o CRM de vendas e o Google Business para sincronia total.
          </p>
        </div>
        <div className="absolute right-0 opacity-10">
          <svg width="240" height="240" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4z"/></svg>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {connections.map((conn) => (
          <div key={conn.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between mb-4">
              <div className={`p-3 rounded-xl ${
                conn.type === 'google_business' ? 'bg-amber-50 text-amber-600' :
                conn.type === 'database' ? 'bg-blue-50 text-blue-600' :
                'bg-slate-50 text-slate-600'
              }`}>
                {conn.type === 'google_business' && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeWidth="2"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="2"/></svg>}
                {conn.type === 'database' && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" strokeWidth="2"/></svg>}
                {conn.type === 'spreadsheet' && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeWidth="2"/></svg>}
              </div>
              <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                conn.status === 'Conectado' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {conn.status}
              </span>
            </div>
            <h4 className="font-bold text-slate-900 text-sm mb-1">{conn.name}</h4>
            <p className="text-xs text-slate-500 mb-6">Última Sincronização: {conn.lastSync}</p>
            <div className="flex space-x-2">
              <button className="flex-1 text-xs font-bold py-2 border border-slate-200 rounded-lg hover:bg-slate-50">Configurar</button>
              <button className="text-xs font-bold py-2 px-4 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200">Sincronizar</button>
            </div>
          </div>
        ))}

        <button className="border-2 border-dashed border-slate-200 p-6 rounded-2xl flex flex-col items-center justify-center text-slate-400 hover:border-blue-400 hover:bg-blue-50 transition-all group">
          <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3 group-hover:bg-blue-100 group-hover:text-blue-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <span className="text-sm font-bold">Nova Conexão</span>
        </button>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
        <h4 className="font-bold text-slate-800 mb-6 flex items-center">
           <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
           Carregar Documentos Técnicos
        </h4>
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-slate-100 border-dashed rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-all">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <p className="mb-2 text-sm text-slate-500">
                <span className="font-bold">Clique para upload</span> ou arraste e solte
              </p>
              <p className="text-xs text-slate-400">PDF, CSV ou DOCX (Relatórios de conformidade, plantas, propostas)</p>
            </div>
            <input type="file" className="hidden" />
          </label>
        </div>
      </div>
    </div>
  );
};

export default DataConnector;
