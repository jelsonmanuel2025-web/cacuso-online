import React, { useState } from 'react';
import { 
  X, 
  Share2, 
  Sparkles, 
  Send, 
  Users, 
  MessageSquare, 
  Copy, 
  Check, 
  Globe, 
  Film,
  MessageCircle,
  Clock,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { Post, UserNeighbor, CommunityGroup } from '../types';

interface SharePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: Post | null;
  currentUser: UserNeighbor;
  groups: CommunityGroup[];
  friends?: UserNeighbor[];
  onShareToFeed: (post: Post, userNote?: string) => void;
  onShareToStory: (post: Post) => void;
  onShareToFriendFeed: (post: Post, friend: UserNeighbor, note?: string) => void;
  onShareToGroup: (post: Post, group: CommunityGroup) => void;
  onShareAsMessage: (post: Post, recipient: UserNeighbor) => void;
}

export const SharePostModal: React.FC<SharePostModalProps> = ({
  isOpen,
  onClose,
  post,
  currentUser,
  groups,
  friends = [],
  onShareToFeed,
  onShareToStory,
  onShareToFriendFeed,
  onShareToGroup,
  onShareAsMessage,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [userNote, setUserNote] = useState('');
  const [selectedSubView, setSelectedSubView] = useState<'options' | 'select_group' | 'select_friend_feed' | 'select_friend_msg'>('options');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  if (!isOpen || !post) return null;

  const showNotification = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => {
      setSuccessToast(null);
      onClose();
      setSelectedSubView('options');
      setUserNote('');
    }, 1200);
  };

  // 1. Partilhar no WhatsApp
  const handleShareWhatsApp = () => {
    const postSnippet = post.content.length > 100 ? post.content.substring(0, 100) + '...' : post.content;
    const shareText = `*Cacuso Online* 🇦🇴\nPublicação de *${post.author.name}* (${post.neighborhood}):\n\n"${postSnippet}"\n\nVeja no Cacuso Online (Rede Social Segura & Comunitária):\nhttps://cacusoonline.ao/p/${post.id}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(whatsappUrl, '_blank');
    showNotification('Abrindo WhatsApp...');
  };

  // 2. Copiar Link
  const handleCopyLink = () => {
    const url = `https://cacusoonline.ao/post/${post.id}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
    showNotification('Link da publicação copiado!');
  };

  // 3. Partilhar no Feed
  const handleFeedShare = () => {
    onShareToFeed(post, userNote);
    showNotification('Publicado com sucesso no teu Feed!');
  };

  // 4. Partilhar no Story
  const handleStoryShare = () => {
    onShareToStory(post);
    showNotification('Adicionado às tuas Histórias do Bairro!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        id="share-post-modal"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                {selectedSubView === 'options' && 'Partilhar Publicação'}
                {selectedSubView === 'select_group' && 'Escolher Grupo de Angola'}
                {selectedSubView === 'select_friend_feed' && 'Partilhar no Feed do Amigo'}
                {selectedSubView === 'select_friend_msg' && 'Enviar por Mensagem Privada'}
              </h3>
              <p className="text-[11px] text-slate-500">
                Sem rastreamento predatório • Soberania comunitária
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              if (selectedSubView !== 'options') {
                setSelectedSubView('options');
              } else {
                onClose();
              }
            }}
            className="p-2 rounded-full hover:bg-slate-200 text-slate-500 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Toast */}
        {successToast && (
          <div className="bg-emerald-600 text-white p-3 text-xs font-bold flex items-center justify-center gap-2 animate-fadeIn">
            <Check className="w-4 h-4" />
            <span>{successToast}</span>
          </div>
        )}

        {/* Content Area */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
          {/* Preview of the Post being shared */}
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs flex items-start gap-3">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-10 h-10 rounded-full object-cover shrink-0 ring-1 ring-slate-300"
            />
            <div className="overflow-hidden flex-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-bold text-slate-900">{post.author.name}</span>
                <span className="text-[10px] text-slate-400">• {post.neighborhood}</span>
              </div>
              <p className="text-slate-700 mt-1 line-clamp-2 italic">
                "{post.content}"
              </p>
            </div>
          </div>

          {/* SubView: Main 7 Options */}
          {selectedSubView === 'options' && (
            <>
              {/* Optional user caption for feed shares */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Diz algo sobre esta publicação (opcional):
                </label>
                <textarea
                  value={userNote}
                  onChange={(e) => setUserNote(e.target.value)}
                  placeholder="Partilhe o que achou com os seus vizinhos de Cacuso..."
                  rows={2}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none bg-white"
                />
              </div>

              {/* 7 Sharing Destinations */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block px-1">
                  Destinos de Partilha
                </span>

                {/* 1. No Story */}
                <button
                  onClick={handleStoryShare}
                  id="share-option-story"
                  className="w-full p-3 rounded-2xl hover:bg-blue-50 border border-slate-200/80 hover:border-blue-300 flex items-center justify-between transition-all cursor-pointer text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Film className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-800">
                        Partilhar no Story
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Fica visível no carrossel de Histórias do Bairro
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                </button>

                {/* 2. No Feed */}
                <button
                  onClick={handleFeedShare}
                  id="share-option-feed"
                  className="w-full p-3 rounded-2xl hover:bg-blue-50 border border-slate-200/80 hover:border-blue-300 flex items-center justify-between transition-all cursor-pointer text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Globe className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-800">
                        Partilhar no Feed (Página Inicial)
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Republicar na cronologia pura dos vizinhos
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                    Imediato
                  </span>
                </button>

                {/* 3. No WhatsApp */}
                <button
                  onClick={handleShareWhatsApp}
                  id="share-option-whatsapp"
                  className="w-full p-3 rounded-2xl hover:bg-emerald-50 border border-slate-200/80 hover:border-emerald-300 flex items-center justify-between transition-all cursor-pointer text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-800 flex items-center gap-1.5">
                        Partilhar no WhatsApp
                        <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full font-black">
                          Directo
                        </span>
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Envie para grupos e contactos de Angola no WhatsApp
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-emerald-600" />
                </button>

                {/* 4. No Feed do Amigo */}
                <button
                  onClick={() => setSelectedSubView('select_friend_feed')}
                  id="share-option-friend-feed"
                  className="w-full p-3 rounded-2xl hover:bg-purple-50 border border-slate-200/80 hover:border-purple-300 flex items-center justify-between transition-all cursor-pointer text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-800">
                        Partilhar no Feed do Amigo
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Publicar diretamente na cronologia de um vizinho
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600" />
                </button>

                {/* 5. Como Mensagem (E2EE Chat) */}
                <button
                  onClick={() => setSelectedSubView('select_friend_msg')}
                  id="share-option-message"
                  className="w-full p-3 rounded-2xl hover:bg-amber-50 border border-slate-200/80 hover:border-amber-300 flex items-center justify-between transition-all cursor-pointer text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-800 flex items-center gap-1.5">
                        Enviar como Mensagem Privada
                        <span className="text-[9px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded-full font-bold">
                          E2EE
                        </span>
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Conversa privada com criptografia de ponta-a-ponta
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600" />
                </button>

                {/* 6. No Grupo */}
                <button
                  onClick={() => setSelectedSubView('select_group')}
                  id="share-option-group"
                  className="w-full p-3 rounded-2xl hover:bg-blue-50 border border-slate-200/80 hover:border-blue-300 flex items-center justify-between transition-all cursor-pointer text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-800">
                        Partilhar no Grupo
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Música, produtores, agricultura e fóruns de Cacuso
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600" />
                </button>

                {/* 7. Copiar Link */}
                <button
                  onClick={handleCopyLink}
                  id="share-option-copy-link"
                  className="w-full p-3 rounded-2xl hover:bg-slate-100 border border-slate-200/80 flex items-center justify-between transition-all cursor-pointer text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                      {copiedLink ? <Check className="w-5 h-5 text-emerald-600" /> : <Copy className="w-5 h-5" />}
                    </div>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-800">
                        {copiedLink ? 'Link Copiado para a Área de Transferência!' : 'Copiar Link da Publicação'}
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        https://cacusoonline.ao/post/{post.id}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-blue-700">Copiar</span>
                </button>
              </div>
            </>
          )}

          {/* SubView: Select Group */}
          {selectedSubView === 'select_group' && (
            <div className="space-y-2">
              <p className="text-xs text-slate-600 mb-2">
                Selecione o grupo onde deseja partilhar esta publicação:
              </p>
              {groups.map((group) => (
                <div
                  key={group.id}
                  onClick={() => {
                    onShareToGroup(post, group);
                    showNotification(`Partilhado no grupo "${group.name}"!`);
                  }}
                  className="p-3 bg-white hover:bg-blue-50 rounded-2xl border border-slate-200 flex items-center justify-between cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={group.coverImage}
                      alt={group.name}
                      className="w-10 h-10 rounded-xl object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">{group.name}</h4>
                      <p className="text-[10px] text-slate-500">{group.memberCount} membros • {group.category}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-blue-700 bg-blue-100 px-3 py-1 rounded-xl">
                    Partilhar
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* SubView: Select Friend for Feed */}
          {selectedSubView === 'select_friend_feed' && (
            <div className="space-y-2">
              <p className="text-xs text-slate-600 mb-2">
                Escolha o amigo para partilhar na respetiva cronologia:
              </p>
              {friends.map((friend) => (
                <div
                  key={friend.id}
                  onClick={() => {
                    onShareToFriendFeed(post, friend, userNote);
                    showNotification(`Publicado no feed de ${friend.name}!`);
                  }}
                  className="p-3 bg-white hover:bg-purple-50 rounded-2xl border border-slate-200 flex items-center justify-between cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={friend.avatar}
                      alt={friend.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">{friend.name}</h4>
                      <p className="text-[10px] text-slate-500">{friend.neighborhood}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-purple-700 bg-purple-100 px-3 py-1 rounded-xl">
                    Publicar
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* SubView: Select Friend for E2EE Message */}
          {selectedSubView === 'select_friend_msg' && (
            <div className="space-y-2">
              <p className="text-xs text-slate-600 mb-2">
                Selecione o amigo para enviar em conversa criptografada E2EE:
              </p>
              {friends.map((friend) => (
                <div
                  key={friend.id}
                  onClick={() => {
                    onShareAsMessage(post, friend);
                    showNotification(`Enviando mensagem segura para ${friend.name}...`);
                  }}
                  className="p-3 bg-white hover:bg-amber-50 rounded-2xl border border-slate-200 flex items-center justify-between cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={friend.avatar}
                      alt={friend.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 flex items-center gap-1">
                        {friend.name}
                        {friend.isFounder && (
                          <span className="text-[9px] bg-blue-100 text-blue-800 font-bold px-1.5 rounded-sm">
                            Fundador
                          </span>
                        )}
                      </h4>
                      <p className="text-[10px] text-slate-500">{friend.neighborhood}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-xl">
                    Enviar
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
