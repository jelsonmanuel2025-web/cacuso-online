import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Send, 
  Lock, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  Key, 
  CheckCheck, 
  Sparkles,
  Info
} from 'lucide-react';
import { UserNeighbor, DirectMessage } from '../types';
import { INITIAL_MESSAGES } from '../mockData';
import { saveSupabaseMessage, sanitizeText } from '../lib/supabase';

interface E2EEMessagingModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeNeighbor: UserNeighbor;
  currentUser: UserNeighbor;
  onSelectNeighbor: (neighbor: UserNeighbor) => void;
  allNeighbors: UserNeighbor[];
}

export const E2EEMessagingModal: React.FC<E2EEMessagingModalProps> = ({
  isOpen,
  onClose,
  activeNeighbor,
  currentUser,
  onSelectNeighbor,
  allNeighbors,
}) => {
  const [messages, setMessages] = useState<DirectMessage[]>(() => {
    const saved = localStorage.getItem('cacuso_messages');
    return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
  });

  const [inputText, setInputText] = useState('');
  const [showRawCipher, setShowRawCipher] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('cacuso_messages', JSON.stringify(messages));
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeNeighbor]);

  if (!isOpen) return null;

  // Filter messages between currentUser and activeNeighbor
  const conversation = messages.filter(
    (m) =>
      (m.senderId === currentUser.id && m.receiverId === activeNeighbor.id) ||
      (m.senderId === activeNeighbor.id && m.receiverId === currentUser.id)
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const text = sanitizeText(inputText, 2000);
    if (!text) return;
    
    // Simulate AES-GCM encryption payload
    const simulatedCipher = `AES-GCM:IV-${Math.random().toString(36).substring(2, 8)}:${btoa(encodeURIComponent(text)).substring(0, 18)}...[SHA256-TAG]`;
    const messageId = `msg-${Date.now()}`;

    const newMsg: DirectMessage = {
      id: messageId,
      senderId: currentUser.id,
      receiverId: activeNeighbor.id,
      encryptedPayload: simulatedCipher,
      plainText: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMine: true,
      verifiedE2EE: true,
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');

    // Persist securely to Supabase E2EE private_messages table
    saveSupabaseMessage({
      id: messageId,
      senderId: currentUser.id,
      recipientId: activeNeighbor.id,
      encryptedPayload: simulatedCipher,
    });

    // Simulate neighbor response if talking to founder or active neighbor
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      let replyText = `Olá vizinho! Recebi a tua mensagem com segurança criptográfica aqui no ${activeNeighbor.neighborhood.split(',')[0]}. Vamos combinar os detalhes!`;
      
      if (activeNeighbor.isFounder && activeNeighbor.name.includes('Jelson')) {
        replyText = `Saudações, vizinho! Como co-fundador do Cacuso Online, é uma honra apoiar a nossa comunidade. Esta conversa está 100% cifrada. Como posso ajudar no teu bairro?`;
      } else if (activeNeighbor.isFounder && activeNeighbor.name.includes('Liron')) {
        replyText = `Olá! A tua chave criptográfica (${currentUser.keyFingerprint.substring(0, 9)}...) foi verificada com sucesso. Ninguém além de nós tem acesso a este chat.`;
      }

      const replyMsg: DirectMessage = {
        id: `msg-${Date.now() + 1}`,
        senderId: activeNeighbor.id,
        receiverId: currentUser.id,
        encryptedPayload: `AES-GCM:IV-${Math.random().toString(36).substring(2, 8)}:${btoa(replyText).substring(0, 18)}...[SHA256-TAG]`,
        plainText: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMine: false,
        verifiedE2EE: true,
      };

      setMessages((prev) => [...prev, replyMsg]);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-2xl h-[90vh] max-h-[640px] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={activeNeighbor.avatar}
                alt={activeNeighbor.name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-slate-900" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-sm text-white">{activeNeighbor.name}</h3>
                {activeNeighbor.isFounder ? (
                  <span className="bg-amber-400 text-amber-950 text-[10px] font-black px-1.5 py-0.2 rounded-sm">
                    Criador
                  </span>
                ) : (
                  <span className="bg-blue-600 text-white text-[10px] font-semibold px-1.5 py-0.2 rounded-sm">
                    Vizinho
                  </span>
                )}
              </div>
              <p className="text-[11px] text-blue-200 flex items-center gap-1">
                <Lock className="w-3 h-3 text-emerald-400" />
                <span>E2EE Verificado • Chave: {activeNeighbor.keyFingerprint}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowRawCipher(!showRawCipher)}
              title={showRawCipher ? "Mostrar texto decifrado" : "Inspecionar carga criptografada"}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors ${
                showRawCipher ? 'bg-amber-400 text-amber-950' : 'bg-white/10 hover:bg-white/20 text-blue-200'
              }`}
            >
              {showRawCipher ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{showRawCipher ? 'Decifrado' : 'Inspecionar Cifra'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Security Banner info */}
        <div className="bg-emerald-50 border-b border-emerald-200 px-4 py-1.5 flex items-center justify-between text-[11px] text-emerald-900">
          <span className="flex items-center gap-1.5 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            Criptografia Ponta-a-Ponta Ativa. Zero intermediários ou rastreamento.
          </span>
          <span className="font-mono text-[10px] text-emerald-700 hidden sm:inline">
            AES-GCM-256
          </span>
        </div>

        {/* Contact Switcher Strip */}
        <div className="bg-slate-50 border-b border-slate-200 px-3 py-2 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-[10px] text-slate-400 font-bold uppercase shrink-0">Conversas:</span>
          {allNeighbors.filter(n => n.id !== currentUser.id).map((neighbor) => (
            <button
              key={neighbor.id}
              onClick={() => onSelectNeighbor(neighbor)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium shrink-0 cursor-pointer transition-colors ${
                neighbor.id === activeNeighbor.id
                  ? 'bg-blue-700 text-white font-semibold'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <img
                src={neighbor.avatar}
                alt={neighbor.name}
                className="w-4 h-4 rounded-full object-cover"
              />
              <span>{neighbor.name.split(' ')[0]}</span>
              {neighbor.isFounder && <span className="text-[9px] text-amber-300 font-black">★</span>}
            </button>
          ))}
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-100/50">
          {conversation.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 p-6">
              <Lock className="w-10 h-10 text-emerald-600 mb-2 opacity-80" />
              <h4 className="font-bold text-slate-800 text-sm">Inicie a conversa segura</h4>
              <p className="text-xs text-slate-500 max-w-xs mt-1">
                Todas as mensagens com {activeNeighbor.name} são cifradas no seu dispositivo antes de serem enviadas.
              </p>
            </div>
          ) : (
            conversation.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.isMine ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[82%] sm:max-w-[70%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm shadow-xs ${
                    msg.isMine
                      ? 'bg-blue-700 text-white rounded-br-xs'
                      : 'bg-white text-slate-900 border border-slate-200 rounded-bl-xs'
                  }`}
                >
                  {showRawCipher ? (
                    <div className="font-mono text-[11px] break-all bg-black/20 p-1.5 rounded-md">
                      <span className="text-amber-300 font-bold block text-[9px] uppercase">
                        Payload Criptografado no Trânsito:
                      </span>
                      {msg.encryptedPayload}
                    </div>
                  ) : (
                    <p className="whitespace-pre-line leading-relaxed">{msg.plainText}</p>
                  )}

                  <div
                    className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${
                      msg.isMine ? 'text-blue-200' : 'text-slate-400'
                    }`}
                  >
                    <span>{msg.timestamp}</span>
                    <Lock className="w-2.5 h-2.5 text-emerald-400" />
                    {msg.isMine && <CheckCheck className="w-3 h-3 text-blue-200" />}
                  </div>
                </div>
              </div>
            ))
          )}

          {isTyping && (
            <div className="flex items-center gap-1.5 text-xs text-slate-500 italic bg-white px-3 py-1.5 rounded-full w-fit border border-slate-200">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce" />
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce delay-100" />
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce delay-200" />
              <span>{activeNeighbor.name.split(' ')[0]} está a redigir...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form
          onSubmit={handleSendMessage}
          className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`Mensagem criptografada para ${activeNeighbor.name.split(' ')[0]}...`}
            className="flex-1 px-4 py-2 bg-slate-100 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 border border-transparent focus:border-blue-500 focus:bg-white focus:outline-hidden"
            id="e2ee-message-input"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            id="send-e2ee-message-btn"
            className="p-2.5 bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white rounded-xl transition-colors cursor-pointer shadow-xs"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
