import React, { useState } from 'react';
import { 
  Check, 
  X, 
  UserPlus, 
  Heart, 
  MessageCircle, 
  Film, 
  Users, 
  Clock,
  CheckCircle2
} from 'lucide-react';
import { FacebookNotification, FriendRequest } from '../types';

interface NotificationsPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: FacebookNotification[];
  friendRequests: FriendRequest[];
  onAcceptFriend: (requestId: string) => void;
  onDeclineFriend: (requestId: string) => void;
  onMarkAllAsRead: () => void;
}

export const NotificationsPopover: React.FC<NotificationsPopoverProps> = ({
  isOpen,
  onClose,
  notifications,
  friendRequests,
  onAcceptFriend,
  onDeclineFriend,
  onMarkAllAsRead,
}) => {
  const [activeTab, setActiveTab] = useState<'tudo' | 'nao_lidas'>('tudo');

  if (!isOpen) return null;

  const filteredNotifications = activeTab === 'tudo' 
    ? notifications 
    : notifications.filter(n => !n.isRead);

  return (
    <div 
      className="absolute top-14 right-2 sm:right-16 z-50 w-80 sm:w-96 bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-slate-200 select-none overflow-hidden animate-fadeIn"
      id="notifications-dropdown-popover"
    >
      {/* Popover Header */}
      <div className="p-4 pb-2 border-b border-slate-100 flex items-center justify-between">
        <h3 className="font-bold text-lg text-slate-900">Notificações</h3>
        <button
          onClick={onMarkAllAsRead}
          className="text-xs text-blue-700 hover:underline font-semibold cursor-pointer"
        >
          Marcar todas como lidas
        </button>
      </div>

      {/* Tabs: Tudo vs Não lida(s) (Matching Screenshot 3) */}
      <div className="flex items-center gap-2 px-4 py-2 bg-slate-50/70 border-b border-slate-100 text-xs font-bold">
        <button
          onClick={() => setActiveTab('tudo')}
          className={`px-3 py-1.5 rounded-full cursor-pointer transition-colors ${
            activeTab === 'tudo'
              ? 'bg-blue-100 text-blue-800'
              : 'text-slate-600 hover:bg-slate-200/60'
          }`}
        >
          Tudo
        </button>
        <button
          onClick={() => setActiveTab('nao_lidas')}
          className={`px-3 py-1.5 rounded-full cursor-pointer transition-colors ${
            activeTab === 'nao_lidas'
              ? 'bg-blue-100 text-blue-800'
              : 'text-slate-600 hover:bg-slate-200/60'
          }`}
        >
          Não lida(s)
        </button>
      </div>

      {/* Content Body */}
      <div className="max-h-[460px] overflow-y-auto p-2 divide-y divide-slate-100">
        {/* Friend Requests Section (Matching Screenshot 3: Reservado Memer II) */}
        {friendRequests.filter(r => r.status === 'pending').length > 0 && (
          <div className="pb-2 mb-2">
            <div className="px-2 py-1 flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
              <span>Pedidos de Amizade</span>
              <span className="text-blue-700 font-semibold lowercase">ver todos</span>
            </div>

            <div className="space-y-2 mt-1">
              {friendRequests.filter(r => r.status === 'pending').map(req => (
                <div key={req.id} className="p-2 hover:bg-slate-50 rounded-2xl flex items-start gap-3 transition-colors">
                  <img
                    src={req.avatar}
                    alt={req.name}
                    className="w-12 h-12 rounded-full object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-900 leading-tight">
                      {req.name}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {req.mutualFriendsPreview || `${req.mutualFriendsCount} amigos em comum`}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => onAcceptFriend(req.id)}
                        className="flex-1 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl cursor-pointer transition-colors text-center"
                      >
                        Confirmar
                      </button>
                      <button
                        onClick={() => onDeclineFriend(req.id)}
                        className="flex-1 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs rounded-xl cursor-pointer transition-colors text-center"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* General Notifications List */}
        <div className="pt-1 space-y-1">
          <div className="px-2 py-1 text-xs font-bold text-slate-500 uppercase tracking-wider">
            Mais Recentes
          </div>

          {filteredNotifications.map(item => (
            <div
              key={item.id}
              className={`p-2.5 rounded-2xl flex items-start gap-3 cursor-pointer transition-colors ${
                !item.isRead ? 'bg-blue-50/70 hover:bg-blue-50' : 'hover:bg-slate-100'
              }`}
            >
              <div className="relative shrink-0">
                <img
                  src={item.senderAvatar}
                  alt={item.senderName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] ring-2 ring-white ${
                  item.type === 'reaction' ? 'bg-rose-500' :
                  item.type === 'reel' ? 'bg-pink-600' :
                  item.type === 'group' ? 'bg-blue-600' : 'bg-emerald-600'
                }`}>
                  {item.type === 'reaction' ? <Heart className="w-2.5 h-2.5 fill-white" /> :
                   item.type === 'reel' ? <Film className="w-2.5 h-2.5" /> :
                   item.type === 'group' ? <Users className="w-2.5 h-2.5" /> : <Check className="w-2.5 h-2.5" />}
                </span>
              </div>

              <div className="flex-1 text-xs text-slate-800 leading-snug">
                <p>
                  <strong className="font-bold text-slate-900">{item.senderName}</strong>{' '}
                  {item.content}
                </p>
                <span className="text-[10px] text-slate-400 mt-1 block font-medium">
                  {item.timestamp}
                </span>
              </div>

              {!item.isRead && (
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0 mt-2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
