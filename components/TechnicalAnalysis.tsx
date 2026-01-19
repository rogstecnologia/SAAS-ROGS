
import React, { useState } from 'react';
import { gemini } from '../geminiService';

const TechnicalAnalysis: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const runAnalysis = async () => {
    if (!selectedImage) return;
    setIsAnalyzing(true);
    try {
      const base64Data = selectedImage.split(',')[1];
      const result = await gemini.analyzeInfrastructure(base64Data, 'image/jpeg');
      setAnalysisResult(result);
    } catch (err) {
      setAnalysisResult("Erro ao analisar imagem. Verifique sua conexão.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-xl font-bold mb-4">Inspeção Técnica de Infraestrutura</h3>
        <p className="text-slate-500 mb-8 text-sm">
          A IA da ROGS pode identificar falhas em racks, cabeamento desorganizado e riscos em instalações de câmeras. Carregue uma foto para análise instantânea.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div 
              className={`border-2 border-dashed rounded-2xl h-80 flex flex-col items-center justify-center transition-all ${
                selectedImage ? 'border-blue-200 bg-blue-50' : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
              } overflow-hidden`}
            >
              {selectedImage ? (
                <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <>
                  <svg className="w-12 h-12 text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <label className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200 text-sm font-bold cursor-pointer hover:shadow-md transition-all">
                    Selecionar Foto
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                  </label>
                  <p className="text-[10px] text-slate-400 mt-3">JPG, PNG ou WEBP até 10MB</p>
                </>
              )}
            </div>
            {selectedImage && (
              <div className="flex space-x-3">
                <button 
                  onClick={runAnalysis}
                  disabled={isAnalyzing}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold text-sm shadow-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {isAnalyzing ? "Analisando..." : "Executar Análise de Risco"}
                </button>
                <button 
                  onClick={() => { setSelectedImage(null); setAnalysisResult(null); }}
                  className="px-4 py-3 border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
            )}
          </div>

          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 overflow-y-auto max-h-80">
            <h4 className="font-bold text-slate-800 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Relatório de Conformidade
            </h4>
            {analysisResult ? (
              <div className="prose prose-sm text-slate-600">
                <p className="whitespace-pre-wrap">{analysisResult}</p>
                <div className="mt-6 pt-4 border-t border-slate-200">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Responsável Técnico Recomendado</p>
                  <p className="text-sm font-bold text-slate-800">Varlei SR - Especialista Sênior</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-slate-400">
                <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <p className="text-xs">Aguardando análise da infraestrutura...</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
           <p className="text-xs font-bold text-blue-600 uppercase mb-2">Exemplo 1</p>
           <h5 className="font-bold text-sm mb-1">Câmera Exposta</h5>
           <p className="text-xs text-slate-500">A IA detectou oxidação em conectores externos em 42% das fotos analisadas este mês.</p>
         </div>
         <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
           <p className="text-xs font-bold text-amber-600 uppercase mb-2">Exemplo 2</p>
           <h5 className="font-bold text-sm mb-1">Rack Desorganizado</h5>
           <p className="text-xs text-slate-500">Riscos de aquecimento excessivo e dificuldade de manutenção corretiva.</p>
         </div>
         <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
           <p className="text-xs font-bold text-green-600 uppercase mb-2">Dica Técnica</p>
           <h5 className="font-bold text-sm mb-1">Certificação CAT6</h5>
           <p className="text-xs text-slate-500">Sempre valide a continuidade metálica após instalações de rede.</p>
         </div>
      </div>
    </div>
  );
};

export default TechnicalAnalysis;
