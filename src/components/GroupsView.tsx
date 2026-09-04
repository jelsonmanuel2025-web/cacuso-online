import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  ShieldCheck, 
  Lock, 
  Globe, 
  Compass, 
  Sparkles, 
  MessageSquare, 
  Heart, 
  Share2, 
  Check, 
  Image as ImageIcon,
  MapPin,
  X
} from 'lucide-react';
import { CommunityGroup, Post, UserNeighbor } from '../types';

interface GroupsViewProps {
  groups: CommunityGroup[];
  posts: Post[];
  currentUser: UserNeighbor;
  onJoinGroup: (groupId: string) => void;
  onCreateGroup: (group: Omit<CommunityGroup, 'id' | 'memberCount'>) => void;
  onLikePost: (postId: string) => void;
}

export const GroupsView: React.FC<GroupsViewProps> = ({
  groups,
  posts,
  currentUser,
  onJoinGroup,
  onCreateGroup,
  onLikePost,
}) => {
  const [activeTab, setActiveTab] = useState<'feed' | 'descobrir'>('feed');
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  // Create Group Form State
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDesc, setNewGroupDesc] = useState('');
  const [newGroupPrivacy, setNewGroupPrivacy] = useState<'publico' | 'privado'>('publico');
  const [newGroupCategory, setNewGroupCategory] = useState('Música & Cultura');
  const [newGroupCover, setNewGroupCover] = useState('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80');

  // Filter posts that belong to groups or general community discussion
  const groupPosts = posts.filter(p => p.category === 'geral' || p.tags.some(t => t.toLowerCase().includes('kuduro') || t.toLowerCase().includes('grupo')));

  const handleCreateGroupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGroupName.trim()) return;

    onCreateGroup({
      name: newGroupName.trim(),
      description: newGroupDesc.trim() || 'Comunidade criada no Cacuso Online para conectar vizinhos e criadores.',
      coverImage: newGroupCover,
      privacy: newGroupPrivacy,
      category: newGroupCategory,
      isMember: true,
      location: 'Cacuso, Angola',
    });

    setNewGroupName('');
    setNewGroupDesc('');
    setShowCreateModal(false);
  };

  return (
    <div className="max-w-6xl mx-auto py-4 px-2 sm:px-4">
      {/* Create Group Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-base text-slate-900">Criar Novo Grupo</h3>
              </div>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateGroupSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nome do Grupo *
                </label>
                <input
                  type="text"
                  required
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  placeholder="Ex: Produtores de Beat & Kuduro em Malanje"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:border-blue-600 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Privacidade
                </label>
                <select
                  value={newGroupPrivacy}
                  onChange={(e) => setNewGroupPrivacy(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:border-blue-600 text-slate-900"
                >
                  <option value="publico">Público (Qualquer vizinho pode ver quem está no grupo e o que publicam)</option>
                  <option value="privado">Privado (Apenas membros podem ver publicações e membros)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Categoria
                </label>
                <input
                  type="text"
                  value={newGroupCategory}
                  onChange={(e) => setNewGroupCategory(e.target.value)}
                  placeholder="Ex: Música, Negócios, Bairro, Agricultura"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:border-blue-600 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Descrição do Grupo
                </label>
                <textarea
                  rows={3}
                  value={newGroupDesc}
                  onChange={(e) => setNewGroupDesc(e.target.value)}
                  placeholder="Explique o propósito da comunidade para os vizinhos..."
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:border-blue-600 text-slate-900"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm rounded-xl cursor-pointer shadow-xs transition-colors"
              >
                Criar Grupo Agora
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Main Groups Layout with Sidebar and Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Sub-Sidebar for Groups */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-base text-slate-900">Grupos</h2>
              <button
                onClick={() => setShowCreateModal(true)}
                className="p-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                id="create-group-btn"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Criar Grupo</span>
              </button>
            </div>

            {/* Sub-Navigation Tabs */}
            <div className="space-y-1">
              <button
                onClick={() => { setActiveTab('feed'); setSelectedGroupId(null); }}
                className={`w-full px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2.5 transition-colors cursor-pointer text-left ${
                  activeTab === 'feed' && !selectedGroupId
                    ? 'bg-blue-700 text-white shadow-xs'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>O Teu Feed de Grupos</span>
              </button>

              <button
                onClick={() => { setActiveTab('descobrir'); setSelectedGroupId(null); }}
                className={`w-full px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2.5 transition-colors cursor-pointer text-left ${
                  activeTab === 'descobrir'
                    ? 'bg-blue-700 text-white shadow-xs'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Compass className="w-4 h-4" />
                <span>Descobrir Grupos</span>
              </button>
            </div>

            {/* My Joined Groups List */}
            <div className="mt-5 pt-4 border-t border-slate-100">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Os Teus Grupos ({groups.filter(g => g.isMember).length})
              </h3>
              <div className="space-y-1.5">
                {groups.filter(g => g.isMember).map(group => (
                  <div
                    key={group.id}
                    onClick={() => { setSelectedGroupId(group.id); setActiveTab('feed'); }}
                    className={`p-2 rounded-2xl flex items-center gap-2.5 cursor-pointer transition-colors ${
                      selectedGroupId === group.id
                        ? 'bg-blue-50 border border-blue-200 text-blue-900'
                        : 'hover:bg-slate-100 text-slate-800'
                    }`}
                  >
                    <img
                      src={group.coverImage}
                      alt={group.name}
                      className="w-10 h-10 rounded-xl object-cover shrink-0"
                    />
                    <div className="overflow-hidden flex-1 text-left">
                      <p className="font-bold text-xs truncate leading-tight">{group.name}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">
                        {(group.memberCount / 1000).toFixed(1)}k membros
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Area: Feed or Discovery */}
        <div className="lg:col-span-8 space-y-4">
          {activeTab === 'feed' ? (
            <>
              {/* Active Selected Group Header Banner if a group is clicked */}
              {selectedGroupId && (
                <div className="bg-white/95 backdrop-blur-md rounded-3xl overflow-hidden border border-slate-200 shadow-sm">
                  {(() => {
                    const g = groups.find(item => item.id === selectedGroupId);
                    if (!g) return null;
                    return (
                      <div>
                        <div className="h-32 w-full overflow-hidden relative">
                          <img src={g.coverImage} alt={g.name} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
                          <div className="absolute bottom-3 left-4 text-white">
                            <h2 className="font-black text-lg">{g.name}</h2>
                            <p className="text-xs text-slate-300 flex items-center gap-2">
                              <span>{g.privacy === 'publico' ? 'Grupo Público' : 'Grupo Privado'}</span>
                              <span>•</span>
                              <span>{g.memberCount.toLocaleString()} membros</span>
                            </p>
                          </div>
                        </div>
                        <div className="p-3.5 bg-slate-50 flex items-center justify-between text-xs">
                          <p className="text-slate-600 line-clamp-1">{g.description}</p>
                          <span className="bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full shrink-0">
                            ✓ Membro
                          </span>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* Feed of Group Posts */}
              <div className="space-y-4">
                {groupPosts.map(post => (
                  <div 
                    key={post.id}
                    className="bg-white/95 backdrop-blur-md rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-sm"
                  >
                    {/* Post Header with Group Tag */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-600/20"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-xs sm:text-sm text-slate-900">
                              {post.author.name}
                            </span>
                            <span className="text-xs text-slate-400">em</span>
                            <span className="font-bold text-xs text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                              Kuduro &amp; Ritmos Angolanos
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                            <span>{post.timestamp}</span>
                            <span>•</span>
                            <Globe className="w-3 h-3 text-slate-400" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <p className="text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line mb-3">
                      {post.content}
                    </p>

                    {/* Image if present */}
                    {post.imageUrl && (
                      <div className="rounded-2xl overflow-hidden mb-3 border border-slate-100">
                        <img
                          src={post.imageUrl}
                          alt="Post attachment"
                          className="w-full max-h-96 object-cover"
                        />
                      </div>
                    )}

                    {/* Action Bar */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-around text-xs font-semibold text-slate-600">
                      <button
                        onClick={() => onLikePost(post.id)}
                        className={`flex items-center gap-1.5 py-1.5 px-3 rounded-xl hover:bg-slate-100 cursor-pointer transition-colors ${
                          post.hasLiked ? 'text-rose-600' : ''
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${post.hasLiked ? 'fill-rose-600' : ''}`} />
                        <span>{post.likesCount} Gostos</span>
                      </button>

                      <button className="flex items-center gap-1.5 py-1.5 px-3 rounded-xl hover:bg-slate-100 cursor-pointer transition-colors">
                        <MessageSquare className="w-4 h-4" />
                        <span>{post.comments.length} Comentários</span>
                      </button>

                      <button className="flex items-center gap-1.5 py-1.5 px-3 rounded-xl hover:bg-slate-100 cursor-pointer transition-colors">
                        <Share2 className="w-4 h-4" />
                        <span>Partilhar</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            /* Discover Groups Grid */
            <div className="space-y-4">
              <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 border border-slate-200 shadow-sm">
                <h3 className="font-bold text-base text-slate-900 mb-1">
                  Grupos Sugeridos para Si em Angola
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  Comunidades ativas com vizinhos, artistas e produtores da região
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {groups.map(group => (
                    <div
                      key={group.id}
                      className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                    >
                      <div>
                        <div className="h-28 w-full overflow-hidden">
                          <img
                            src={group.coverImage}
                            alt={group.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-3.5">
                          <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded-md">
                            {group.category}
                          </span>
                          <h4 className="font-bold text-xs sm:text-sm text-slate-900 mt-1.5 leading-tight">
                            {group.name}
                          </h4>
                          <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                            {group.description}
                          </p>
                          <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-2">
                            <Users className="w-3.5 h-3.5" />
                            <span>{group.memberCount.toLocaleString()} membros</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-3.5 pt-0">
                        <button
                          onClick={() => onJoinGroup(group.id)}
                          className={`w-full py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                            group.isMember
                              ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                              : 'bg-blue-700 hover:bg-blue-800 text-white shadow-xs'
                          }`}
                        >
                          {group.isMember ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Membro</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>Aderir ao Grupo</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
