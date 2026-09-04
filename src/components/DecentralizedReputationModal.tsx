import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  Award, 
  Key, 
  Sparkles, 
  UserCheck, 
  Send,
  Lock,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserNeighbor, ReputationVouch } from '../types';
import { INITIAL_VOUCHES } from '../mockData';

interface DecentralizedReputationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserNeighbor;
  allNeighbors: UserNeighbor[];
  onAddVouch: (vouch: ReputationVouch) => void;
  vouches: ReputationVouch[];
}

export const DecentralizedReputationModal: React.FC<DecentralizedReputationModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  allNeighbors,
  onAddVouch,
  vouches,
}) => {
  const [selectedNeighborId, setSelectedNeighborId] = useState(allNeighbors[0]?.id || '');
  const [category, setCategory] = useState<ReputationVouch['category']>('troca_honesta');
  const [comment, setComment] = useState('');
  const [showVouchForm, setShowVouchForm] = useState(false);

  if (!isOpen) return null;

  const handleEmitVouch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    // Generate cryptographic signature hash
    const fakeSignature = Array.from({ length: 64 }, () => 
      Math.floor(Math.random() * 16).toString(16)
    ).join('');

    const newVouch: ReputationVouch = {
      id: `vouch-${Date.now()}`,
      fromNeighbor: currentUser,
      toNeighborId: selectedNeighborId,
      category,
      comment: comment.trim(),
      timestamp: 'Agora mesmo',
      signatureHash: fakeSignature,
    };

    onAddVouch(newVouch);

    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#2563EB', '#3B82F6', '#60A5FA']
      });
    } catch (err) {}

    setComment('');
    setShowVouchForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-600 rounded-xl">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Sistema de Reputação Descentralizado</h3>
              <p className="text-xs text-blue-200">Web-of-Trust P2P do Município de Cacuso</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* Concept Banner */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-xs text-blue-950 space-y-1.5">
            <h4 className="font-bold text-sm text-blue-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-blue-700" />
              Como Funciona a Confiança Sem Big Techs
            </h4>
            <p className="text-slate-700 leading-relaxed">
              Diferente de sistemas centralizados onde uma empresa pode bloquear ou alterar a sua reputação arbitrariamente, no <strong>Cacuso Online</strong> a pontuação é calculada de forma descentralizada por <em>Vouching</em> (testemunhos assinados criptograficamente por vizinhos reais que completaram trocas e mutirões com você).
            </p>
          </div>

          {/* User Score Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-14 h-14 rounded-full object-cover ring-2 ring-blue-600"
              />
              <div>
                <h4 className="font-bold text-slate-900 text-base">{currentUser.name}</h4>
                <p className="text-xs text-slate-500">{currentUser.neighborhood}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="font-mono text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded-md">
                    Chave: {currentUser.keyFingerprint}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-center sm:text-right bg-white p-3 rounded-xl border border-slate-200/80 shadow-xs">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                Índice de Confiança
              </span>
              <span className="text-2xl font-black text-blue-700">
                {currentUser.reputationScore}%
              </span>
              <span className="text-[11px] text-emerald-700 font-medium block mt-0.5">
                {currentUser.vouchesCount} vizinhos atestaram
              </span>
            </div>
          </div>

          {/* Action to add vouch */}
          <div className="flex items-center justify-between pt-1">
            <h4 className="font-bold text-slate-900 text-sm">Testemunhos &amp; Selos Auditáveis</h4>
            <button
              onClick={() => setShowVouchForm(!showVouchForm)}
              id="toggle-vouch-form-btn"
              className="px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs rounded-xl flex items-center gap-1 transition-colors cursor-pointer shadow-xs"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>{showVouchForm ? 'Cancelar' : 'Atestar um Vizinho (Vouch)'}</span>
            </button>
          </div>

          {/* Vouch Form */}
          {showVouchForm && (
            <form
              onSubmit={handleEmitVouch}
              className="bg-slate-50 p-4 rounded-2xl border border-blue-200 space-y-3"
            >
              <h5 className="text-xs font-bold text-blue-950 uppercase">
                Novo Selo de Confiança Criptográfico
              </h5>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Vizinho a Atestar
                  </label>
                  <select
                    value={selectedNeighborId}
                    onChange={(e) => setSelectedNeighborId(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-blue-500"
                  >
                    {allNeighbors.filter(n => n.id !== currentUser.id).map((n) => (
                      <option key={n.id} value={n.id}>
                        {n.name} ({n.neighborhood.split(',')[0]})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Categoria de Confiança
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-blue-500"
                  >
                    <option value="troca_honesta">Troca Honesta de Serviços</option>
                    <option value="guardiao_ambiental">Guardião Ambiental (EcoCacuso)</option>
                    <option value="apoio_mutuo">Apoio Mútuo no Bairro</option>
                    <option value="confianca_geral">Integridade &amp; Confiança Geral</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Seu Testemunho
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Explique como foi a sua experiência com este vizinho..."
                  rows={2}
                  required
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="submit"
                  id="confirm-vouch-btn"
                  className="px-4 py-1.5 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs rounded-xl flex items-center gap-1 cursor-pointer shadow-xs"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Assinar e Publicar no Ledger Local</span>
                </button>
              </div>
            </form>
          )}

          {/* List of Vouches */}
          <div className="space-y-2.5">
            {vouches.map((vouch) => (
              <div
                key={vouch.id}
                className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs text-xs space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={vouch.fromNeighbor.avatar}
                      alt={vouch.fromNeighbor.name}
                      className="w-6 h-6 rounded-full object-cover ring-1 ring-slate-200"
                    />
                    <span className="font-bold text-slate-900">{vouch.fromNeighbor.name}</span>
                    <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.2 rounded-full font-semibold">
                      {vouch.category.replace('_', ' ')}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400">{vouch.timestamp}</span>
                </div>

                <p className="text-slate-700 text-xs italic">&ldquo;{vouch.comment}&rdquo;</p>

                <div className="pt-1 text-[10px] font-mono text-slate-400 flex items-center justify-between">
                  <span className="truncate max-w-xs">Hash: {vouch.signatureHash}</span>
                  <span className="text-emerald-600 font-sans font-semibold flex items-center gap-0.5">
                    <CheckCircle2 className="w-3 h-3" /> Assinatura Válida
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
