import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Newspaper, 
  Handshake, 
  ShoppingBag, 
  Recycle, 
  Calendar, 
  Sparkles, 
  MessageSquareLock, 
  Search, 
  Lock, 
  Users, 
  Award,
  Bell,
  Film,
  BarChart3,
  Flag,
  Plus,
  LogIn,
  UserPlus,
  Database
} from 'lucide-react';
import { ViewTab, UserNeighbor, FacebookNotification, FriendRequest, FacebookPage } from '../types';
import { UserMenuDropdown } from './UserMenuDropdown';
import { NotificationsPopover } from './NotificationsPopover';

interface NavbarProps {
  activeTab: ViewTab;
  setActiveTab: (tab: ViewTab) => void;
  currentUser: UserNeighbor;
  onOpenE2EEChat: () => void;
  onOpenPrivacyModal: () => void;
  onOpenFoundersModal: () => void;
  unreadCount?: number;
  selectedNeighborhood: string;
  setSelectedNeighborhood: (n: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  // New props for authentication, pages, notifications, etc.
  onOpenAuthModal: (mode: 'login' | 'register') => void;
  onOpenCreatePageModal: () => void;
  notifications: FacebookNotification[];
  friendRequests: FriendRequest[];
  onAcceptFriend: (requestId: string) => void;
  onDeclineFriend: (requestId: string) => void;
  onMarkAllAsRead: () => void;
  managedPages: FacebookPage[];
  onSelectPage: (page: FacebookPage) => void;
  onLogout: () => void;
  onToggleThemeArt?: () => void;
  onOpenSettingsModal?: () => void;
  onOpenSupabaseModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currentUser,
  onOpenE2EEChat,
  onOpenPrivacyModal,
  onOpenFoundersModal,
  unreadCount = 1,
  selectedNeighborhood,
  setSelectedNeighborhood,
  searchQuery,
  setSearchQuery,
  onOpenAuthModal,
  onOpenCreatePageModal,
  notifications,
  friendRequests,
  onAcceptFriend,
  onDeclineFriend,
  onMarkAllAsRead,
  managedPages,
  onSelectPage,
  onLogout,
  onToggleThemeArt,
  onOpenSettingsModal,
  onOpenSupabaseModal,
}) => {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showNotificationsPopover, setShowNotificationsPopover] = useState(false);

  const unreadNotificationsCount = notifications.filter(n => !n.isRead).length + friendRequests.filter(f => f.status === 'pending').length;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 h-15 flex items-center justify-between gap-2 relative">
        {/* Left: Brand Identity inspired by clean social UI */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button 
            onClick={() => setActiveTab('feed')}
            className="flex items-center gap-2 group text-left cursor-pointer focus:outline-hidden"
            id="brand-logo-btn"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-700 text-white flex items-center justify-center font-black text-xl shadow-xs transition-transform group-hover:scale-105">
              C
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center gap-1.5">
                <span className="font-black text-slate-900 text-lg tracking-tight">Cacuso Online</span>
                <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-1.5 py-0.2 rounded-md">
                  🇦🇴
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium -mt-0.5">O lar digital seguro</p>
            </div>
          </button>

          {/* Search Bar */}
          <div className="relative hidden md:block w-44 lg:w-56">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisar no Cacuso..."
              className="w-full pl-8 pr-3 py-1.5 bg-slate-100 hover:bg-slate-200/70 focus:bg-white text-xs rounded-full border border-transparent focus:border-blue-500 focus:outline-hidden transition-all text-slate-800"
              id="global-search-input"
            />
          </div>
        </div>

        {/* Center: Main Facebook-Style Navigation Tabs */}
        <nav className="flex items-center justify-center gap-0.5 sm:gap-1.5 flex-1 max-w-2xl mx-auto overflow-x-auto no-scrollbar py-1">
          {/* 1. Página Inicial */}
          <button
            onClick={() => setActiveTab('feed')}
            id="nav-tab-feed"
            title="Página Inicial"
            className={`flex flex-col items-center justify-center px-2.5 sm:px-4 py-1.5 rounded-xl transition-all cursor-pointer relative shrink-0 ${
              activeTab === 'feed'
                ? 'text-blue-700 font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Newspaper className="w-5 h-5" />
            <span className="text-[11px] mt-0.5 hidden md:inline whitespace-nowrap">Página Inicial</span>
            {activeTab === 'feed' && (
              <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-blue-700 rounded-full" />
            )}
          </button>

          {/* 2. Reels (heels) */}
          <button
            onClick={() => setActiveTab('reels')}
            id="nav-tab-reels"
            title="Reels de Vídeo de Angola"
            className={`flex flex-col items-center justify-center px-2.5 sm:px-4 py-1.5 rounded-xl transition-all cursor-pointer relative shrink-0 ${
              activeTab === 'reels'
                ? 'text-pink-600 font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Film className="w-5 h-5" />
            <span className="text-[11px] mt-0.5 hidden md:inline whitespace-nowrap">Reels</span>
            {activeTab === 'reels' && (
              <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-pink-600 rounded-full" />
            )}
          </button>

          {/* 3. Grupos */}
          <button
            onClick={() => setActiveTab('grupos')}
            id="nav-tab-grupos"
            title="Grupos do Facebook"
            className={`flex flex-col items-center justify-center px-2.5 sm:px-4 py-1.5 rounded-xl transition-all cursor-pointer relative shrink-0 ${
              activeTab === 'grupos'
                ? 'text-blue-700 font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Users className="w-5 h-5" />
            <span className="text-[11px] mt-0.5 hidden md:inline whitespace-nowrap">Grupos</span>
            {activeTab === 'grupos' && (
              <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-blue-700 rounded-full" />
            )}
          </button>

          {/* 4. Modo Profissional / Estatística */}
          <button
            onClick={() => setActiveTab('estatisticas')}
            id="nav-tab-estatisticas"
            title="Painel Profissional & Estatísticas"
            className={`flex flex-col items-center justify-center px-2.5 sm:px-4 py-1.5 rounded-xl transition-all cursor-pointer relative shrink-0 ${
              activeTab === 'estatisticas'
                ? 'text-amber-600 font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            <span className="text-[11px] mt-0.5 hidden md:inline whitespace-nowrap">Estatística</span>
            {activeTab === 'estatisticas' && (
              <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-amber-500 rounded-full" />
            )}
          </button>

          {/* 5. Marketplace */}
          <button
            onClick={() => setActiveTab('marketplace')}
            id="nav-tab-marketplace"
            title="Marketplace Regional"
            className={`flex flex-col items-center justify-center px-2 sm:px-3 py-1.5 rounded-xl transition-all cursor-pointer relative shrink-0 ${
              activeTab === 'marketplace'
                ? 'text-blue-700 font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="text-[11px] mt-0.5 hidden lg:inline whitespace-nowrap">Marketplace</span>
            {activeTab === 'marketplace' && (
              <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-blue-700 rounded-full" />
            )}
          </button>

          {/* 6. Troca Grátis */}
          <button
            onClick={() => setActiveTab('servicos')}
            id="nav-tab-servicos"
            title="Fórum de Troca de Serviços Grátis"
            className={`flex flex-col items-center justify-center px-2 sm:px-3 py-1.5 rounded-xl transition-all cursor-pointer relative shrink-0 ${
              activeTab === 'servicos'
                ? 'text-blue-700 font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Handshake className="w-5 h-5" />
            <span className="text-[11px] mt-0.5 hidden lg:inline whitespace-nowrap">Troca Grátis</span>
            {activeTab === 'servicos' && (
              <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-blue-700 rounded-full" />
            )}
          </button>

          {/* 7. EcoCacuso */}
          <button
            onClick={() => setActiveTab('residuos')}
            id="nav-tab-residuos"
            title="EcoCacuso: Gestão de Resíduos"
            className={`flex flex-col items-center justify-center px-2 sm:px-3 py-1.5 rounded-xl transition-all cursor-pointer relative shrink-0 ${
              activeTab === 'residuos'
                ? 'text-emerald-700 font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Recycle className="w-5 h-5" />
            <span className="text-[11px] mt-0.5 hidden lg:inline whitespace-nowrap">EcoCacuso</span>
            {activeTab === 'residuos' && (
              <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-emerald-600 rounded-full" />
            )}
          </button>

          {/* 8. Criadores Oficiais */}
          <button
            onClick={() => setActiveTab('criadores')}
            id="nav-tab-criadores"
            title="Criadores Oficiais: Jelson Pereira Manuel e Liron Kilson"
            className={`flex flex-col items-center justify-center px-2 sm:px-3 py-1.5 rounded-xl transition-all cursor-pointer relative shrink-0 ${
              activeTab === 'criadores'
                ? 'text-amber-700 font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Award className="w-5 h-5" />
            <span className="text-[11px] mt-0.5 hidden lg:inline whitespace-nowrap">Criadores</span>
            {activeTab === 'criadores' && (
              <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-amber-600 rounded-full" />
            )}
          </button>
        </nav>

        {/* Right Section: Buttons & User Profile Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Botão Criar Páginas (https://www.facebook.com/profile.php?id=61576493317985) */}
          <button
            onClick={onOpenCreatePageModal}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-all cursor-pointer shadow-2xs"
            id="btn-criar-pagina-nav"
            title="Criar Nova Página no Facebook"
          >
            <Flag className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Criar Página</span>
          </button>

          {/* Botões Iniciar Sessão e Registar */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => onOpenAuthModal('login')}
              className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
              id="btn-login-nav"
              title="Iniciar Sessão"
            >
              <LogIn className="w-3.5 h-3.5 text-blue-700" />
              <span className="hidden sm:inline">Entrar</span>
            </button>

            <button
              onClick={() => onOpenAuthModal('register')}
              className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
              id="btn-register-nav"
              title="Criar Conta com confirmação SMS"
            >
              <UserPlus className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden sm:inline">Registar</span>
            </button>
          </div>

          {/* Supabase PostgreSQL DB Badge / Trigger */}
          {onOpenSupabaseModal && (
            <button
              onClick={onOpenSupabaseModal}
              id="navbar-supabase-status-btn"
              title="Base de Dados Supabase (PostgreSQL)"
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/80 text-xs font-bold transition-all cursor-pointer shadow-2xs"
            >
              <Database className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden lg:inline">Supabase</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </button>
          )}

          {/* Notifications Bell with Popover Trigger */}
          <button
            onClick={() => {
              setShowNotificationsPopover(!showNotificationsPopover);
              setShowUserDropdown(false);
            }}
            id="notifications-nav-btn"
            title="Notificações"
            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 relative cursor-pointer transition-colors"
          >
            <Bell className="w-4.5 h-4.5" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center ring-2 ring-white animate-pulse">
                {unreadNotificationsCount}
              </span>
            )}
          </button>

          {/* E2EE Messenger trigger */}
          <button
            onClick={onOpenE2EEChat}
            id="navbar-e2ee-chat-btn"
            title="Mensagens E2EE Privadas"
            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 relative cursor-pointer transition-colors"
          >
            <MessageSquareLock className="w-4.5 h-4.5 text-blue-700" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {/* User Profile Avatar with Dropdown Menu Trigger */}
          <div 
            onClick={() => {
              setShowUserDropdown(!showUserDropdown);
              setShowNotificationsPopover(false);
            }}
            className="flex items-center gap-1.5 p-0.5 rounded-full hover:ring-2 hover:ring-blue-600/30 cursor-pointer transition-all ml-0.5"
            id="user-profile-widget"
            title="Menu do Perfil"
          >
            <div className="relative">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-600/40"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>
          </div>
        </div>

        {/* User Dropdown Menu */}
        <UserMenuDropdown
          isOpen={showUserDropdown}
          onClose={() => setShowUserDropdown(false)}
          currentUser={currentUser}
          managedPages={managedPages}
          onSelectPage={onSelectPage}
          onNavigateToTab={(tab) => { setActiveTab(tab); setShowUserDropdown(false); }}
          onOpenCreatePage={onOpenCreatePageModal}
          onLogout={onLogout}
          onOpenAuth={() => onOpenAuthModal('login')}
          onToggleThemeArt={onToggleThemeArt}
          onOpenSettings={onOpenSettingsModal}
        />

        {/* Notifications Popover */}
        <NotificationsPopover
          isOpen={showNotificationsPopover}
          onClose={() => setShowNotificationsPopover(false)}
          notifications={notifications}
          friendRequests={friendRequests}
          onAcceptFriend={onAcceptFriend}
          onDeclineFriend={onDeclineFriend}
          onMarkAllAsRead={onMarkAllAsRead}
        />
      </div>
    </header>
  );
};
