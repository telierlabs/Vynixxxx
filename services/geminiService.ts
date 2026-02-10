
import { GoogleGenAI } from "@google/genai";

// Use process.env.API_KEY directly for initialization
const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const chatWithAssistant = async (prompt: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) => {
  const ai = getAIClient();
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: 'You are Vynix Assistant, a helpful AI for movie buffs on the Vynix streaming platform. You speak in a professional, sophisticated, and minimalist tone. Focus on movie recommendations and industry insights.',
    },
  });

  // Reconstruct history if needed or just send the message
  const response = await chat.sendMessage({ message: prompt });
  return response.text;
};

export const editImageWithAI = async (base64Image: string, prompt: string, mimeType: string) => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          inlineData: {
            data: base64Image,
            mimeType: mimeType,
          },
        },
        {
          text: prompt,
        },
      ],
    },
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
};
