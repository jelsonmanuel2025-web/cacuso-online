import React from 'react';
import { 
  Users, 
  Newspaper, 
  Handshake, 
  ShoppingBag, 
  Recycle, 
  Calendar, 
  Award, 
  Shield, 
  Lock, 
  HeartHandshake, 
  MapPin, 
  Sparkles,
  CheckCircle2,
  ExternalLink,
  Film,
  BarChart3,
  Flag,
  LogIn,
  CreditCard,
  Settings,
  LogOut,
  Smartphone,
  Database
} from 'lucide-react';
import { ViewTab, UserNeighbor } from '../types';
import { FOUNDERS } from '../mockData';

interface LeftSidebarProps {
  activeTab: ViewTab;
  setActiveTab: (tab: ViewTab) => void;
  currentUser: UserNeighbor;
  selectedNeighborhood: string;
  setSelectedNeighborhood: (n: string) => void;
  onOpenFoundersModal: () => void;
  onOpenPrivacyModal: () => void;
  onOpenReputationModal: () => void;
  onOpenCreatePageModal?: () => void;
  onOpenAuthModal?: (mode: 'login' | 'register') => void;
  onOpenSettingsModal?: () => void;
  onLogout?: () => void;
  onOpenSupabaseModal?: () => void;
}

const NEIGHBORHOOD_LIST = [
  'Todos os Bairros',
  'Bairro Central',
  'Bairro Quizenga',
  'Bairro Capanda',
  'Bairro Terra Nova',
  'Bairro da Estação',
  'Bairro Camabatela',
  'Bairro Pungo Andongo'
];

export const LeftSidebar: React.FC<LeftSidebarProps> = ({
  activeTab,
  setActiveTab,
  currentUser,
  selectedNeighborhood,
  setSelectedNeighborhood,
  onOpenFoundersModal,
  onOpenPrivacyModal,
  onOpenReputationModal,
  onOpenCreatePageModal,
  onOpenAuthModal,
  onOpenSettingsModal,
  onLogout,
  onOpenSupabaseModal,
}) => {
  return (
    <aside className="hidden lg:block w-72 shrink-0 py-4 space-y-4 text-slate-700">
      {/* Current User Quick Snapshot */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-3">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-600/20"
          />
          <div className="overflow-hidden flex-1">
            <h3 className="font-semibold text-slate-900 text-sm truncate">{currentUser.name}</h3>
            <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-blue-600 shrink-0" />
              <span className="truncate">{currentUser.neighborhood}</span>
            </p>
          </div>
        </div>

        {/* Reputation Score & Badges */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <button 
            onClick={onOpenReputationModal}
            className="text-left group cursor-pointer"
            id="user-reputation-summary-btn"
          >
            <span className="text-slate-500 block text-[11px]">Confiança Descentralizada</span>
            <span className="font-bold text-blue-700 flex items-center gap-1 group-hover:underline">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
              {currentUser.reputationScore}% ({currentUser.vouchesCount} vizinhos)
            </span>
          </button>
          <div className="text-right">
            <span className="text-slate-500 block text-[11px]">Eco-Mérito</span>
            <span className="font-bold text-emerald-600 flex items-center gap-1 justify-end">
              <Recycle className="w-3.5 h-3.5" />
              {currentUser.ecoMeritPoints} pts
            </span>
          </div>
        </div>
      </div>

      {/* Official Founders Spotlight Card */}
      <div className="bg-linear-to-br from-blue-900 via-indigo-900 to-slate-900 text-white rounded-2xl p-4 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 translate-x-3 -translate-y-3 w-20 h-20 bg-blue-500/20 rounded-full blur-xl" />
        
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-amber-400 text-amber-950 font-black text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
            <Award className="w-3 h-3" /> Criadores Oficiais
          </span>
        </div>

        <h4 className="font-bold text-sm tracking-tight text-white mb-1">
          Jelson Pereira Manuel &amp; Liron Kilson
        </h4>
        <p className="text-xs text-blue-200/90 leading-relaxed mb-3">
          Idealizadores da inovação social em Cacuso: uma rede que devolve o poder e a privacidade ao povo, superando modelos predatórios.
        </p>

        <div className="flex items-center -space-x-2 mb-3">
          {FOUNDERS.map((f) => (
            <img
              key={f.id}
              src={f.avatar}
              alt={f.name}
              title={`${f.name} - ${f.roleTitle}`}
              className="w-7 h-7 rounded-full object-cover ring-2 ring-indigo-950"
            />
          ))}
          <span className="pl-3 text-[11px] text-blue-200 font-medium">Fundadores Locais</span>
        </div>

        <button
          onClick={onOpenFoundersModal}
          id="founders-manifesto-btn"
          className="w-full py-2 px-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-white/15"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          Conhecer Manifesto Social
        </button>
      </div>

      {/* Navigation Menu */}
      <div className="bg-white rounded-2xl p-2 border border-slate-200/80 shadow-xs space-y-0.5">
        <button
          onClick={() => setActiveTab('feed')}
          id="sidebar-feed-link"
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
            activeTab === 'feed'
              ? 'bg-blue-50 text-blue-800 font-bold'
              : 'hover:bg-slate-100 text-slate-700'
          }`}
        >
          <Newspaper className="w-4 h-4 text-blue-600" />
          <div className="flex-1 text-left">
            <span>Página Inicial (Feed)</span>
            <p className="text-[10px] text-slate-400 font-normal">Sem algoritmo de retenção</p>
          </div>
        </button>

        {/* Reels */}
        <button
          onClick={() => setActiveTab('reels')}
          id="sidebar-reels-link"
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
            activeTab === 'reels'
              ? 'bg-pink-50 text-pink-700 font-bold'
              : 'hover:bg-slate-100 text-slate-700'
          }`}
        >
          <Film className="w-4 h-4 text-pink-600" />
          <div className="flex-1 text-left">
            <span>Reels de Cacuso &amp; Angola</span>
            <p className="text-[10px] text-pink-600/80 font-normal">Vídeos curtos em alta 🔥</p>
          </div>
        </button>

        {/* Grupos */}
        <button
          onClick={() => setActiveTab('grupos')}
          id="sidebar-grupos-link"
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
            activeTab === 'grupos'
              ? 'bg-blue-50 text-blue-800 font-bold'
              : 'hover:bg-slate-100 text-slate-700'
          }`}
        >
          <Users className="w-4 h-4 text-blue-600" />
          <div className="flex-1 text-left">
            <span>Grupos de Angola</span>
            <p className="text-[10px] text-slate-400 font-normal">Música, estúdios e comunidades</p>
          </div>
        </button>

        {/* Modo Profissional & Estatística */}
        <button
          onClick={() => setActiveTab('estatisticas')}
          id="sidebar-stats-link"
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
            activeTab === 'estatisticas'
              ? 'bg-amber-50 text-amber-800 font-bold'
              : 'hover:bg-slate-100 text-slate-700'
          }`}
        >
          <BarChart3 className="w-4 h-4 text-amber-600" />
          <div className="flex-1 text-left">
            <span>Modo Profissional &amp; Estatística</span>
            <p className="text-[10px] text-amber-700 font-normal">Alcance, seguidores e estrelas</p>
          </div>
        </button>

        {/* Criar Página (Facebook feature) */}
        {onOpenCreatePageModal && (
          <button
            onClick={onOpenCreatePageModal}
            id="sidebar-create-page-link"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"
          >
            <Flag className="w-4 h-4 text-purple-600" />
            <div className="flex-1 text-left">
              <span>Criar Página no Facebook</span>
              <p className="text-[10px] text-slate-400 font-normal">Música, estúdio ou marca</p>
            </div>
          </button>
        )}

        <button
          onClick={() => setActiveTab('servicos')}
          id="sidebar-services-link"
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
            activeTab === 'servicos'
              ? 'bg-blue-50 text-blue-800 font-bold'
              : 'hover:bg-slate-100 text-slate-700'
          }`}
        >
          <Handshake className="w-4 h-4 text-emerald-600" />
          <div className="flex-1 text-left">
            <span>Fórum de Troca Sem Custo</span>
            <p className="text-[10px] text-slate-400 font-normal">Banco de Tempo &amp; Ajuda Mútua</p>
          </div>
        </button>

        {/* Aba de Negócios (Venda em Kwanza & Multicaixa Express) */}
        <button
          onClick={() => setActiveTab('negocios')}
          id="sidebar-negocios-link"
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
            activeTab === 'negocios'
              ? 'bg-amber-50 text-amber-900 font-bold border border-amber-300 shadow-2xs'
              : 'hover:bg-slate-100 text-slate-700'
          }`}
        >
          <CreditCard className="w-4 h-4 text-amber-600" />
          <div className="flex-1 text-left">
            <span className="flex items-center gap-1.5">
              Aba de Negócios (Kwanza)
              <span className="text-[9px] bg-amber-100 text-amber-900 font-black px-1.5 py-0.2 rounded-full">Kz</span>
            </span>
            <p className="text-[10px] text-amber-700 font-normal">Multicaixa Express Angola 🇦🇴</p>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('marketplace')}
          id="sidebar-marketplace-link"
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
            activeTab === 'marketplace'
              ? 'bg-blue-50 text-blue-800 font-bold'
              : 'hover:bg-slate-100 text-slate-700'
          }`}
        >
          <ShoppingBag className="w-4 h-4 text-amber-600" />
          <div className="flex-1 text-left">
            <span>Marketplace Regional</span>
            <p className="text-[10px] text-slate-400 font-normal">Produtos da terra &amp; comércio justo</p>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('residuos')}
          id="sidebar-waste-link"
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
            activeTab === 'residuos'
              ? 'bg-emerald-50 text-emerald-800 font-bold'
              : 'hover:bg-slate-100 text-slate-700'
          }`}
        >
          <Recycle className="w-4 h-4 text-emerald-600" />
          <div className="flex-1 text-left">
            <span>Gestão de Resíduos &amp; Ecopontos</span>
            <p className="text-[10px] text-slate-400 font-normal">EcoCacuso Sustentabilidade</p>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('eventos')}
          id="sidebar-events-link"
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
            activeTab === 'eventos'
              ? 'bg-blue-50 text-blue-800 font-bold'
              : 'hover:bg-slate-100 text-slate-700'
          }`}
        >
          <Calendar className="w-4 h-4 text-purple-600" />
          <div className="flex-1 text-left">
            <span>Eventos Comunitários</span>
            <p className="text-[10px] text-slate-400 font-normal">Mutirões, feiras e assembleias</p>
          </div>
        </button>
      </div>

      {/* Neighborhood Selector / Filter */}
      <div className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-xs">
        <h4 className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-blue-600" />
          Filtrar por Bairro de Cacuso
        </h4>
        <div className="space-y-1">
          {NEIGHBORHOOD_LIST.map((bairro) => (
            <button
              key={bairro}
              onClick={() => setSelectedNeighborhood(bairro)}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between cursor-pointer ${
                selectedNeighborhood === bairro
                  ? 'bg-blue-700 text-white font-semibold'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>{bairro}</span>
              {selectedNeighborhood === bairro && (
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Privacy Guarantee Pill */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 text-xs text-emerald-900">
        <div className="flex items-center gap-2 font-bold mb-1 text-emerald-950">
          <Shield className="w-4 h-4 text-emerald-700" />
          <span>Garantia de Privacidade</span>
        </div>
        <p className="text-[11px] text-emerald-800 leading-relaxed mb-2">
          Zero publicidade predatória. Criptografia ponta-a-ponta em conversas privadas e dados sob seu controlo local.
        </p>
        <button
          onClick={onOpenPrivacyModal}
          id="sidebar-privacy-details-btn"
          className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 underline cursor-pointer"
        >
          Painel de Soberania Digital
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>

      {/* Account Settings & Quick Logout */}
      <div className="bg-white rounded-2xl p-2.5 border border-slate-200/80 shadow-xs space-y-1">
        {onOpenSupabaseModal && (
          <button
            onClick={onOpenSupabaseModal}
            id="sidebar-supabase-db-btn"
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 transition-colors cursor-pointer border border-emerald-200/70"
          >
            <div className="flex items-center gap-2.5">
              <Database className="w-4 h-4 text-emerald-600" />
              <span>Base Supabase (Postgres)</span>
            </div>
            <span className="text-[9px] bg-emerald-200 text-emerald-950 font-black px-1.5 py-0.2 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              v1
            </span>
          </button>
        )}

        {onOpenSettingsModal && (
          <button
            onClick={onOpenSettingsModal}
            id="sidebar-settings-btn"
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <Settings className="w-4 h-4 text-slate-500" />
              <span>Definições &amp; Idiomas</span>
            </div>
            <span className="text-[10px] text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded font-bold">
              9 Idiomas
            </span>
          </button>
        )}

        {onOpenSettingsModal && (
          <button
            onClick={onOpenSettingsModal}
            id="sidebar-whatsapp-calibrate-btn"
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-emerald-800 bg-emerald-50/70 hover:bg-emerald-100/70 transition-colors cursor-pointer border border-emerald-200/60"
          >
            <div className="flex items-center gap-2.5">
              <Smartphone className="w-4 h-4 text-emerald-600" />
              <span>Calibrar com WhatsApp</span>
            </div>
            <span className="text-[9px] bg-emerald-200 text-emerald-900 font-bold px-1.5 py-0.2 rounded-full">
              +244
            </span>
          </button>
        )}

        {onLogout && (
          <button
            onClick={onLogout}
            id="sidebar-logout-btn"
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-700 hover:bg-rose-50 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-rose-600" />
            <span>Terminar Sessão</span>
          </button>
        )}
      </div>
    </aside>
  );
};
