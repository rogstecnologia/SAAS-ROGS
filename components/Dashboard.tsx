
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const data = [
  { name: 'Seg', leads: 4, calls: 12 },
  { name: 'Ter', leads: 7, calls: 18 },
  { name: 'Qua', leads: 5, calls: 15 },
  { name: 'Qui', leads: 9, calls: 24 },
  { name: 'Sex', leads: 12, calls: 30 },
  { name: 'Sáb', leads: 3, calls: 8 },
  { name: 'Dom', leads: 1, calls: 4 },
];

const StatCard: React.FC<{ title: string; value: string; trend: string; isPositive: boolean }> = ({ title, value, trend, isPositive }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
    <p className="text-sm font-medium text-slate-500">{title}</p>
    <div className="mt-2 flex items-baseline justify-between">
      <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
        {trend}
      </span>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Leads Captados" value="142" trend="+12%" isPositive={true} />
        <StatCard title="Contratos Recorrentes" value="89" trend="+3%" isPositive={true} />
        <StatCard title="Saúde do Sistema" value="98.5%" trend="-0.2%" isPositive={false} />
        <StatCard title="Tempo Médio Resp." value="45s" trend="-15%" isPositive={true} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-[400px]">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Volume de Prospecção</h3>
          <ResponsiveContainer width="100%" height="80%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Area type="monotone" dataKey="leads" stroke="#2563eb" fillOpacity={1} fill="url(#colorLeads)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Status dos Serviços</h3>
          <div className="space-y-4">
            {[
              { label: "Monitoramento 24h", status: "Operacional", color: "bg-green-500" },
              { label: "Servidores de Backup", status: "Operacional", color: "bg-green-500" },
              { label: "Bot de WhatsApp", status: "Sincronizando", color: "bg-blue-500" },
              { label: "Google My Business", status: "Atenção: 1 Nova Avaliação", color: "bg-amber-500" },
              { label: "Gateway de Pagamento", status: "Operacional", color: "bg-green-500" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <span className="text-sm font-medium text-slate-700">{item.label}</span>
                <div className="flex items-center space-x-2">
                  <span className={`w-2 h-2 rounded-full ${item.color}`}></span>
                  <span className="text-xs font-semibold text-slate-500">{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-blue-900 text-white p-8 rounded-2xl flex items-center justify-between overflow-hidden relative">
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-2">Insight de IA do Dia</h3>
          <p className="text-blue-100 max-w-xl">
            "Detectamos um aumento de 15% em buscas por 'câmeras térmicas para condomínios' na região de São Paulo. Recomendo disparar uma campanha focada em continuidade operacional para os leads qualificados do setor imobiliário."
          </p>
          <button className="mt-4 bg-white text-blue-900 px-6 py-2 rounded-full font-bold text-sm hover:bg-blue-50 transition-colors">
            Executar Campanha Automática
          </button>
        </div>
        <div className="absolute right-0 top-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
          <svg width="400" height="400" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#fff" d="M44.7,-76.4C58.1,-69.2,69.2,-58.1,77.3,-44.7C85.4,-31.3,90.5,-15.7,89.5,-0.6C88.5,14.5,81.4,29,72.4,41.9C63.4,54.8,52.5,66.1,39.5,73.5C26.5,80.9,13.2,84.4,-0.5,85.2C-14.2,86.1,-28.4,84.3,-41.8,77.5C-55.2,70.7,-67.7,58.9,-76.1,45.2C-84.5,31.5,-88.7,15.7,-88.1,0.3C-87.5,-15.1,-82.1,-30.2,-73.2,-43.3C-64.3,-56.4,-51.9,-67.5,-38,-74.3C-24.1,-81.1,-12.1,-83.6,1.4,-86C14.9,-88.4,29.8,-90.7,44.7,-76.4Z" transform="translate(100 100)" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
