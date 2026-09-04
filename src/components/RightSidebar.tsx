import React from 'react';
import { 
  ShieldCheck, 
  Recycle, 
  MessageSquareLock, 
  Calendar, 
  CheckCircle, 
  Users, 
  ArrowRight,
  TrendingUp,
  Lock,
  Leaf
} from 'lucide-react';
import { UserNeighbor, EcoWasteReport, CommunityEvent } from '../types';
import { NEIGHBORS, INITIAL_ECO_REPORTS, INITIAL_EVENTS } from '../mockData';

interface RightSidebarProps {
  onOpenE2EEChatWith: (neighbor: UserNeighbor) => void;
  onOpenReputationModal: () => void;
  onOpenWasteModal: () => void;
  onNavigateToTab: (tab: any) => void;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({
  onOpenE2EEChatWith,
  onOpenReputationModal,
  onOpenWasteModal,
  onNavigateToTab,
}) => {
  return (
    <aside className="hidden xl:block w-80 shrink-0 py-4 space-y-4 text-slate-700">
      {/* Decentralized Trust & Web of Trust Widget */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-blue-100 rounded-lg text-blue-700">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-slate-900 leading-tight">Reputação Descentralizada</h4>
              <p className="text-[10px] text-slate-500">Consenso entre vizinhos reais</p>
            </div>
          </div>
          <span className="bg-blue-50 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-200">
            Web-of-Trust
          </span>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed mb-3">
          No Cacuso Online, não há algoritmos punitivos ou aprovação central. A confiança é atestada por vizinhos que trocam serviços honestos.
        </p>

        <div className="bg-slate-50 rounded-xl p-2.5 mb-3 border border-slate-100 space-y-1.5 text-[11px]">
          <div className="flex justify-between items-center text-slate-600">
            <span>Vizinhos Validados:</span>
            <span className="font-semibold text-slate-800">420 no Município</span>
          </div>
          <div className="flex justify-between items-center text-slate-600">
            <span>Fraudes / Anúncios Bloqueados:</span>
            <span className="font-semibold text-emerald-600">0 (Zero rastreamento)</span>
          </div>
          <div className="flex justify-between items-center text-slate-600">
            <span>Contratos Sociais Concluídos:</span>
            <span className="font-semibold text-blue-700">187 trocas honestas</span>
          </div>
        </div>

        <button
          onClick={onOpenReputationModal}
          id="view-reputation-web-btn"
          className="w-full py-2 bg-blue-50 hover:bg-blue-100 text-blue-800 font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <span>Ver Selos &amp; Testemunhos</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* EcoCacuso Waste Management Widget */}
      <div className="bg-white rounded-2xl p-4 border border-emerald-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-emerald-100 rounded-lg text-emerald-700">
              <Recycle className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-slate-900 leading-tight">EcoCacuso Sustentável</h4>
              <p className="text-[10px] text-emerald-700 font-medium">Gestão Comunitária de Resíduos</p>
            </div>
          </div>
          <Leaf className="w-4 h-4 text-emerald-600" />
        </div>

        <div className="my-3">
          <div className="flex justify-between text-xs mb-1 font-medium">
            <span className="text-slate-600">Meta do Mês (Cacuso Limpo):</span>
            <span className="font-bold text-emerald-700">910 / 1.200 kg</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-linear-to-r from-emerald-500 to-teal-600 rounded-full w-[76%]" />
          </div>
          <p className="text-[10px] text-slate-500 mt-1 flex items-center justify-between">
            <span>76% da meta comunitária alcançada</span>
            <span className="text-emerald-700 font-semibold">4 Ecopontos</span>
          </p>
        </div>

        <div className="space-y-1.5 text-xs">
          <div className="flex items-center justify-between p-2 bg-emerald-50/50 rounded-xl border border-emerald-100">
            <div>
              <span className="font-semibold text-slate-800 text-[11px] block">Compostagem Quizenga</span>
              <span className="text-[10px] text-slate-500">Adubo orgânico distribuído</span>
            </div>
            <span className="text-xs font-bold text-emerald-700">+340 kg</span>
          </div>
        </div>

        <button
          onClick={() => onNavigateToTab('residuos')}
          id="open-waste-tracker-btn"
          className="w-full mt-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
        >
          <span>Ecopontos &amp; Entregas</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Real-time E2EE Encrypted Neighbors Channel */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <MessageSquareLock className="w-4 h-4 text-blue-700" />
            <h4 className="font-bold text-xs text-slate-900">Conversas Seguras (E2EE)</h4>
          </div>
          <span className="flex items-center gap-1 text-[10px] text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Criptografado
          </span>
        </div>

        <p className="text-[11px] text-slate-500 mb-2.5">
          Converse em tempo real com garantia de que ninguém intromete-se na sua privacidade:
        </p>

        <div className="space-y-1.5">
          {NEIGHBORS.filter(n => n.id !== 'user-self').slice(0, 4).map((neighbor) => (
            <button
              key={neighbor.id}
              onClick={() => onOpenE2EEChatWith(neighbor)}
              className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-100 transition-colors text-left group cursor-pointer"
              id={`chat-neighbor-${neighbor.id}`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="relative shrink-0">
                  <img
                    src={neighbor.avatar}
                    alt={neighbor.name}
                    className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200"
                  />
                  <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <p className="text-xs font-semibold text-slate-800 truncate group-hover:text-blue-700">
                      {neighbor.name}
                    </p>
                    {neighbor.isFounder && (
                      <span className="text-[9px] bg-amber-100 text-amber-900 font-bold px-1 rounded-sm">
                        Criador
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-400 truncate">
                    {neighbor.neighborhood.split(',')[0]} • Chave {neighbor.keyFingerprint.substring(0, 7)}...
                  </p>
                </div>
              </div>
              <Lock className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 shrink-0 ml-1" />
            </button>
          ))}
        </div>
      </div>

      {/* Community Events Quick Spotlight */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-slate-900 font-bold text-xs">
            <Calendar className="w-4 h-4 text-purple-600" />
            <span>Próximos Eventos em Cacuso</span>
          </div>
          <button 
            onClick={() => onNavigateToTab('eventos')}
            className="text-[11px] text-blue-700 hover:underline font-semibold cursor-pointer"
          >
            Ver todos
          </button>
        </div>

        <div className="space-y-2 mt-2">
          {INITIAL_EVENTS.slice(0, 2).map((ev) => (
            <div key={ev.id} className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs">
              <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider block mb-0.5">
                {ev.date} • {ev.time}
              </span>
              <h5 className="font-semibold text-slate-800 leading-snug mb-1">{ev.title}</h5>
              <p className="text-[11px] text-slate-500 flex items-center gap-1">
                📍 {ev.location}
              </p>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};
