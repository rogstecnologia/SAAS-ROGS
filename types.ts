
export enum View {
  DASHBOARD = 'dashboard',
  GOOGLE_BUSINESS = 'google_business',
  PROSPECTING = 'prospecting',
  WHATSAPP = 'whatsapp',
  TECHNICAL = 'technical',
  CONNECT = 'connect'
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  type: 'Empresa' | 'Condomínio' | 'Residência' | 'Público';
  status: 'Novo' | 'Em Abordagem' | 'Qualificado' | 'Contratado';
  potential: 'Baixo' | 'Médio' | 'Alto';
  riskLevel: 'Baixo' | 'Médio' | 'Alto';
  lastActivity: string;
}

export interface AnalysisResult {
  summary: string;
  risks: string[];
  recommendations: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'client' | 'ai';
  text: string;
  timestamp: Date;
  type?: 'text' | 'audio';
}

export interface ConnectionSource {
  id: string;
  name: string;
  type: 'google_business' | 'spreadsheet' | 'database' | 'document';
  status: 'Conectado' | 'Desconectado' | 'Sincronizando';
  lastSync: string;
}
