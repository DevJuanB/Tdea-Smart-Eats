import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User as UserIcon, Loader2 } from 'lucide-react';
import { GoogleGenAI, Chat } from "@google/genai";

// Initialize Google GenAI Client
// The API key is obtained from the environment variable process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: '¡Hola! Soy tu asistente de Eats Smart. 🍏 ¿Te ayudo a encontrar algo rico hoy?', sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatSessionRef = useRef<Chat | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Initialize chat session
  useEffect(() => {
    if (!chatSessionRef.current) {
      chatSessionRef.current = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: "Eres el asistente IA de TDEA Eats Smart. Tu misión es ayudar a estudiantes a encontrar comida rica y barata, explicar cómo funciona el sistema de 'Rescate' (platos con descuento después de las 2pm) y 'Pickup' (recoger sin fila). Responde siempre en Español, de forma muy breve (máximo 30 palabras), amigable y con emojis.",
        },
      });
    }
  }, []);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    const newMessage: Message = { id: Date.now().toString(), text: userText, sender: 'user' };
    
    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setIsLoading(true);

    try {
      let responseText = "Lo siento, no puedo responder en este momento.";
      
      if (chatSessionRef.current) {
        const response = await chatSessionRef.current.sendMessage({ message: userText });
        if (response.text) {
          responseText = response.text;
        }
      }

      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), text: responseText, sender: 'bot' }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), text: 'Ups, tuve un problema de conexión. Intenta de nuevo.', sender: 'bot' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="absolute bottom-20 right-4 z-40 bg-brand-green text-white p-3.5 rounded-full shadow-lg shadow-green-500/40 hover:scale-110 transition-transform animate-bounce-slow"
        >
          <MessageCircle size={26} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-4 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 flex flex-col overflow-hidden animate-fade-in origin-bottom-right" style={{ maxHeight: '500px', height: '60vh' }}>
          {/* Header */}
          <div className="bg-brand-green p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <div className="bg-white/20 p-1.5 rounded-full">
                <Bot size={18} />
              </div>
              <div>
                <h3 className="font-bold text-sm">Asistente Smart</h3>
                <p className="text-[10px] text-green-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-300 rounded-full animate-pulse"></span> En línea
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded transition-colors">
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex items-end gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] ${
                  msg.sender === 'user' ? 'bg-gray-200 text-gray-600' : 'bg-brand-green text-white'
                }`}>
                  {msg.sender === 'user' ? <UserIcon size={12} /> : <Bot size={12} />}
                </div>
                <div 
                  className={`max-w-[80%] px-3 py-2 rounded-2xl text-xs leading-relaxed shadow-sm ${
                    msg.sender === 'user' 
                      ? 'bg-white text-gray-800 rounded-br-none border border-gray-100' 
                      : 'bg-brand-green text-white rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 text-gray-400 text-xs ml-8">
                <Loader2 size={12} className="animate-spin" /> Escribiendo...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pregunta algo..."
              className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-green"
            />
            <button 
              type="submit" 
              disabled={isLoading || !input.trim()}
              className="p-2 bg-brand-green text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-700 transition-colors"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatAssistant;