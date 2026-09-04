import React from 'react';
import { 
  Settings, 
  HelpCircle, 
  Moon, 
  MessageSquare, 
  LogOut, 
  Users, 
  BarChart3, 
  Flag, 
  Briefcase, 
  ChevronRight, 
  Shield, 
  Sparkles,
  Palette
} from 'lucide-react';
import { UserNeighbor, FacebookPage } from '../types';

interface UserMenuDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserNeighbor;
  managedPages: FacebookPage[];
  onSelectPage: (page: FacebookPage) => void;
  onNavigateToTab: (tab: any) => void;
  onOpenCreatePage: () => void;
  onLogout: () => void;
  onOpenAuth: () => void;
  onToggleThemeArt?: () => void;
  onOpenSettings?: () => void;
}

export const UserMenuDropdown: React.FC<UserMenuDropdownProps> = ({
  isOpen,
  onClose,
  currentUser,
  managedPages,
  onSelectPage,
  onNavigateToTab,
  onOpenCreatePage,
  onLogout,
  onOpenAuth,
  onToggleThemeArt,
  onOpenSettings,
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="absolute top-14 right-2 sm:right-4 z-50 w-80 sm:w-96 bg-white/95 backdrop-blur-md rounded-3xl p-3 shadow-2xl border border-slate-200 select-none animate-fadeIn"
      id="user-profile-menu-dropdown"
    >
      {/* Current User Profile Card */}
      <div 
        onClick={() => { onNavigateToTab('estatisticas'); onClose(); }}
        className="p-3 bg-white hover:bg-slate-50 rounded-2xl border border-slate-200/80 shadow-xs cursor-pointer transition-colors"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-600/30"
            />
            <div className="overflow-hidden">
              <h3 className="font-bold text-sm text-slate-900 leading-tight truncate">
                {currentUser.name}
              </h3>
              <p className="text-xs text-blue-700 font-medium">Ver todos os perfis</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400" />
        </div>
      </div>

      {/* Pages Switcher List (as shown in Screenshot 2: Cacuso Musik, Sua Excelência) */}
      <div className="mt-3 pt-2 border-t border-slate-100">
        <div className="flex items-center justify-between px-2 mb-1.5">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Os Teus Perfis &amp; Páginas
          </span>
          <button
            onClick={() => { onOpenCreatePage(); onClose(); }}
            className="text-[11px] text-blue-700 hover:underline font-semibold cursor-pointer"
          >
            + Criar Página
          </button>
        </div>

        <div className="space-y-1">
          {managedPages.map(page => (
            <div
              key={page.id}
              onClick={() => { onSelectPage(page); onClose(); }}
              className="p-2 hover:bg-slate-100 rounded-xl flex items-center justify-between cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <img
                  src={page.avatar}
                  alt={page.name}
                  className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-300"
                />
                <div>
                  <p className="text-xs font-bold text-slate-800 leading-tight">{page.name}</p>
                  <p className="text-[10px] text-slate-500">{page.category}</p>
                </div>
              </div>
              <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                Alternar
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Primary Actions Matching Facebook Dropdown (Screenshot 2) */}
      <div className="mt-2 pt-2 border-t border-slate-100 space-y-1 text-xs font-semibold text-slate-700">
        <button
          onClick={() => { onNavigateToTab('estatisticas'); onClose(); }}
          className="w-full p-2.5 hover:bg-slate-100 rounded-xl flex items-center justify-between cursor-pointer transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
              <BarChart3 className="w-4 h-4" />
            </div>
            <span>Painel Profissional</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        <button
          onClick={() => { onOpenCreatePage(); onClose(); }}
          className="w-full p-2.5 hover:bg-slate-100 rounded-xl flex items-center justify-between cursor-pointer transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
              <Briefcase className="w-4 h-4" />
            </div>
            <span>Meta Business Suite &amp; Páginas</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        <button
          onClick={() => {
            if (onToggleThemeArt) onToggleThemeArt();
          }}
          className="w-full p-2.5 hover:bg-slate-100 rounded-xl flex items-center justify-between cursor-pointer transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center">
              <Palette className="w-4 h-4" />
            </div>
            <span>Arte Lar Angolano (Bandeira)</span>
          </div>
          <span className="text-[10px] bg-red-100 text-red-800 px-2 py-0.5 rounded-full font-bold">
            Vibrante 🇦🇴
          </span>
        </button>

        <button
          onClick={() => { 
            if (onOpenSettings) onOpenSettings(); 
            onClose(); 
          }}
          id="user-menu-settings-btn"
          className="w-full p-2.5 hover:bg-slate-100 rounded-xl flex items-center justify-between cursor-pointer transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
              <Settings className="w-4 h-4" />
            </div>
            <div>
              <span>Definições e Privacidade</span>
              <p className="text-[10px] text-slate-400 font-normal">Idiomas, Registo &amp; Calibrar WhatsApp</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        <button
          onClick={() => { alert('Cacuso Online: Criado por Jelson Pereira Manuel e Liron Kilson.'); onClose(); }}
          className="w-full p-2.5 hover:bg-slate-100 rounded-xl flex items-center justify-between cursor-pointer transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
              <HelpCircle className="w-4 h-4" />
            </div>
            <span>Ajuda e Apoio Técnico</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        {/* Logout / Switch User */}
        <button
          onClick={() => { onLogout(); onClose(); }}
          className="w-full p-2.5 hover:bg-rose-50 text-rose-700 rounded-xl flex items-center justify-between cursor-pointer transition-colors text-left font-bold"
          id="logout-btn"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-700">
              <LogOut className="w-4 h-4" />
            </div>
            <span>Terminar Sessão</span>
          </div>
        </button>
      </div>
    </div>
  );
};
