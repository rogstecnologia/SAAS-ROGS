
export const ROGS_INFO = {
  name: "ROGS Tecnologia e Segurança",
  philosophy: "Segurança não é produto. É responsabilidade contínua.",
  specialties: ["CFTV Profissional", "Monitoramento 24h", "Cabeamento Estruturado", "Fibra Óptica", "Suporte Pós-Instalação"],
  techLead: "Varlei SR",
  primaryPrompt: `Você é a IA Autônoma da ROGS Tecnologia e Segurança.
  Sua identidade: Sistema operacional inteligente para análise de dados e prospecção.
  Foco: Segurança eletrônica e redes.
  Regra de Ouro: "Segurança não é produto. É responsabilidade contínua."
  Não prometa prazos impossíveis e escale decisões críticas para Varlei SR.
  Sempre priorize valor sobre preço.`
};

export const MOCK_LEADS: any[] = [
  { id: '1', name: 'Condomínio Mirante', phone: '+55 11 99999-0001', type: 'Condomínio', status: 'Novo', potential: 'Alto', riskLevel: 'Médio', lastActivity: 'Há 2 horas' },
  { id: '2', name: 'Indústria MetalFlex', phone: '+55 11 99999-0002', type: 'Empresa', status: 'Qualificado', potential: 'Alto', riskLevel: 'Alto', lastActivity: 'Há 15 min' },
  { id: '3', name: 'Residência Dr. Marco', phone: '+55 11 99999-0003', type: 'Residência', status: 'Em Abordagem', potential: 'Médio', riskLevel: 'Baixo', lastActivity: 'Ontem' },
];

export const MOCK_CONNECTIONS: any[] = [
  { id: 'gmb-1', name: 'Google Meu Negócio - ROGS Principal', type: 'google_business', status: 'Conectado', lastSync: '10/05/2024 14:20' },
  { id: 'db-1', name: 'Banco de Dados CRM', type: 'database', status: 'Conectado', lastSync: '10/05/2024 09:00' },
  { id: 'sheet-1', name: 'Planilha Manutenções 2024', type: 'spreadsheet', status: 'Desconectado', lastSync: 'N/A' },
];
