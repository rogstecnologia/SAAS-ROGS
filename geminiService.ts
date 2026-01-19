
import { GoogleGenAI, Type, Modality, GenerateContentResponse } from "@google/genai";
import { ROGS_INFO } from "./constants";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async analyzeInfrastructure(imageB64: string, mimeType: string): Promise<string> {
    const response = await this.ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          { inlineData: { data: imageB64, mimeType } },
          { text: `${ROGS_INFO.primaryPrompt}\nAnalise esta foto de infraestrutura técnica (câmeras, racks ou cabos). Identifique falhas aparentes, riscos de segurança e sugira melhorias seguindo as normas técnicas.` }
        ]
      }
    });
    return response.text || "Não foi possível realizar a análise no momento.";
  }

  async generateResponse(context: string, userMessage: string): Promise<string> {
    const response = await this.ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: context + "\n" + userMessage,
      config: {
        systemInstruction: ROGS_INFO.primaryPrompt,
        temperature: 0.7,
      }
    });
    return response.text || "Olá, sou a IA da ROGS. Como posso ajudar na segurança do seu patrimônio?";
  }

  async generateProfessionalAudio(text: string): Promise<string | undefined> {
    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: `Diga de forma profissional e consultiva: ${text}` }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' },
            },
          },
        },
      });
      return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    } catch (e) {
      console.error("Audio generation failed", e);
      return undefined;
    }
  }

  async searchMarketTrends(query: string): Promise<{text: string, sources: any[]}> {
    const response = await this.ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analise tendências de mercado para: ${query} no setor de segurança eletrônica no Brasil.`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });
    return {
      text: response.text || "",
      sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  }
}

export const gemini = new GeminiService();
