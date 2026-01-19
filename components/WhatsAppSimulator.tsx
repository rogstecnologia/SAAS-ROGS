
import React, { useState, useRef, useEffect } from 'react';
import { gemini } from '../geminiService';
import { ChatMessage } from '../types';

const WhatsAppSimulator: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', sender: 'client', text: 'Boa tarde! Gostaria de um orçamento para câmeras no meu condomínio.', timestamp: new Date(), type: 'text' },
    { id: '2', sender: 'ai', text: 'Olá! Sou a IA da ROGS. Com certeza, segurança em condomínios é nossa especialidade. Qual o nome do condomínio e quantos pontos de monitoramento vocês imaginam?', timestamp: new Date(), type: 'text' },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'client',
      text: inputText,
      timestamp: new Date(),
      type: 'text'
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      const response = await gemini.generateResponse("Histórico: " + messages.map(m => `${m.sender}: ${m.text}`).join('\n'), inputText);
      
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: response,
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, aiMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleGenerateAudio = async () => {
    const lastMsg = messages.filter(m => m.sender === 'ai').pop();
    if (!lastMsg) return;

    const audioData = await gemini.generateProfessionalAudio(lastMsg.text);
    if (audioData) {
      const audio = new Audio(`data:audio/pcm;base64,${audioData}`);
      // Note: This would need PCM to WAV conversion or direct PCM playing logic from the Live API guidelines.
      // For simplicity in the simulator, we acknowledge the action.
      alert("Áudio Profissional Gerado pela IA da ROGS (Kore Voice). Pronto para envio.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[700px] flex flex-col bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
      {/* Contact Header */}
      <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center font-bold">CC</div>
          <div>
            <h4 className="font-bold">Condomínio Colinas</h4>
            <p className="text-xs text-green-400">Online • ROGS AI Ativa</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50 pattern-dots">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'ai' ? 'justify-start' : 'justify-end'}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${
              msg.sender === 'ai' 
                ? 'bg-white text-slate-800 border border-slate-200 rounded-tl-none' 
                : 'bg-blue-600 text-white rounded-tr-none'
            }`}>
              <p className="text-sm leading-relaxed">{msg.text}</p>
              <p className={`text-[10px] mt-2 text-right ${msg.sender === 'ai' ? 'text-slate-400' : 'text-blue-100'}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white p-3 rounded-full shadow-sm flex space-x-1">
              <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-100"></span>
              <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce delay-200"></span>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-100">
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleGenerateAudio}
            title="Transformar última resposta em áudio profissional"
            className="p-3 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <input 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Digite uma mensagem ou comando para a IA..."
            className="flex-1 bg-slate-100 border-none rounded-full px-6 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button 
            onClick={handleSend}
            disabled={!inputText.trim() || isTyping}
            className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 transition-all shadow-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
        <div className="mt-3 flex items-center justify-center space-x-6">
           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center">
             <span className="w-1 h-1 bg-green-500 rounded-full mr-1.5"></span>
             Análise de Sentimento Ativa
           </span>
           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center">
             <span className="w-1 h-1 bg-blue-500 rounded-full mr-1.5"></span>
             Escalonamento para Varlei Ativado
           </span>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppSimulator;
