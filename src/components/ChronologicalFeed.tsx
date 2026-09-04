import React, { useState } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Send, 
  ShieldCheck, 
  Clock, 
  AlertCircle, 
  Handshake, 
  Recycle, 
  Image as ImageIcon, 
  Lock, 
  Sparkles, 
  CheckCircle2, 
  MapPin, 
  MessageSquareLock,
  PlusCircle,
  Tag,
  Film,
  Users,
  BarChart3,
  Flag
} from 'lucide-react';
import { Post, UserNeighbor, PostComment, UserStory } from '../types';

interface ChronologicalFeedProps {
  posts: Post[];
  currentUser: UserNeighbor;
  onAddPost: (post: Omit<Post, 'id' | 'likesCount' | 'comments'>) => void;
  onLikePost: (postId: string) => void;
  onAddComment: (postId: string, commentText: string) => void;
  onOpenE2EEChatWith: (neighbor: UserNeighbor) => void;
  selectedNeighborhood: string;
  stories?: UserStory[];
  onStoryClick?: (storyId: string) => void;
  onCreateStoryClick?: () => void;
  onNavigateToTab?: (tab: any) => void;
  onOpenCreatePage?: () => void;
  onOpenShareModal?: (post: Post) => void;
}

const STORIES = [
  {
    id: 's-1',
    author: 'Jelson & Liron',
    role: 'Criadores Oficiais',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    title: 'Nova versão 100% livre',
    tag: 'Inovação',
  },
  {
    id: 's-2',
    author: 'Tânia Sebastião',
    role: 'Agricultora',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80',
    title: 'Colheita da Ginguba',
    tag: 'Terra',
  },
  {
    id: 's-3',
    author: 'Mestre António',
    role: 'Carpinteiro',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    title: 'Oficina aberta hoje',
    tag: 'Reparos',
  },
  {
    id: 's-4',
    author: 'Esperança Nzola',
    role: 'Professora',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    title: 'Reforço escolar',
    tag: 'Educação',
  },
];

export const ChronologicalFeed: React.FC<ChronologicalFeedProps> = ({
  posts,
  currentUser,
  onAddPost,
  onLikePost,
  onAddComment,
  onOpenE2EEChatWith,
  selectedNeighborhood,
  stories,
  onStoryClick,
  onCreateStoryClick,
  onNavigateToTab,
  onOpenCreatePage,
  onOpenShareModal,
}) => {
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<'geral' | 'aviso' | 'ajuda' | 'sustentabilidade' | 'evento'>('geral');
  const [imageUrl, setImageUrl] = useState('');
  const [showImageInput, setShowImageInput] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('todos');
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');

  const displayStories = stories && stories.length > 0 ? stories : STORIES.map(s => ({
    id: s.id,
    authorName: s.author,
    authorAvatar: s.avatar,
    mediaUrl: s.avatar,
    timestamp: 'Há momentos',
    isViewed: false,
    caption: s.title,
    authorRole: s.role,
  }));

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    onAddPost({
      author: currentUser,
      neighborhood: selectedNeighborhood === 'Todos os Bairros' ? currentUser.neighborhood : selectedNeighborhood,
      content,
      timestamp: 'Agora mesmo',
      category,
      imageUrl: imageUrl.trim() ? imageUrl.trim() : undefined,
      tags: category === 'aviso' ? ['#AvisoBairro', '#CacusoSeguro'] :
            category === 'sustentabilidade' ? ['#EcoCacuso', '#Sustentabilidade'] :
            category === 'ajuda' ? ['#AjudaMutua', '#Solidariedade'] : ['#CacusoOnline'],
      e2eeEncryptedFlag: false,
    });

    setContent('');
    setImageUrl('');
    setShowImageInput(false);
  };

  const handleSendComment = (postId: string) => {
    if (!commentText.trim()) return;
    onAddComment(postId, commentText);
    setCommentText('');
    setActiveCommentPostId(null);
  };

  // Filter posts
  const filteredPosts = posts.filter((post) => {
    const matchesNeighborhood = 
      selectedNeighborhood === 'Todos os Bairros' || 
      post.neighborhood.toLowerCase().includes(selectedNeighborhood.toLowerCase().replace('bairro ', ''));
    
    const matchesCategory = 
      filterCategory === 'todos' || post.category === filterCategory;

    return matchesNeighborhood && matchesCategory;
  });

  return (
    <div className="space-y-4">
      {/* Facebook Feature Shortcuts Quick Action Bar */}
      <div className="bg-white/95 backdrop-blur-md rounded-2xl p-2.5 border border-slate-200 shadow-xs flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => onNavigateToTab && onNavigateToTab('reels')}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-700 text-xs font-bold transition-colors cursor-pointer shrink-0"
        >
          <Film className="w-4 h-4 text-pink-600" />
          <span>Reels em Alta</span>
        </button>

        <button
          onClick={() => onNavigateToTab && onNavigateToTab('grupos')}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-colors cursor-pointer shrink-0"
        >
          <Users className="w-4 h-4 text-blue-600" />
          <span>Grupos de Angola</span>
        </button>

        <button
          onClick={() => onNavigateToTab && onNavigateToTab('estatisticas')}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold transition-colors cursor-pointer shrink-0"
        >
          <BarChart3 className="w-4 h-4 text-amber-600" />
          <span>Painel Profissional</span>
        </button>

        <button
          onClick={() => onOpenCreatePage && onOpenCreatePage()}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold transition-colors cursor-pointer shrink-0"
        >
          <Flag className="w-4 h-4 text-purple-600" />
          <span>Criar Página</span>
        </button>
      </div>

      {/* Stories / Vozes do Bairro bar (matching Facebook layout) */}
      <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3 border border-slate-200/90 shadow-xs">
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            Histórias &amp; Vozes de Cacuso
          </span>
          <span className="text-[10px] text-blue-700 font-bold">Clica para assistir</span>
        </div>

        <div className="flex items-center gap-2.5 overflow-x-auto pb-1.5 scrollbar-none">
          {/* Create Story card */}
          <div 
            onClick={onCreateStoryClick}
            className="shrink-0 w-28 h-38 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center p-2 text-center hover:bg-blue-50 hover:border-blue-400 transition-all cursor-pointer group shadow-2xs"
          >
            <div className="w-9 h-9 rounded-full bg-blue-700 text-white flex items-center justify-center group-hover:scale-110 transition-transform mb-1.5 shadow-xs">
              <PlusCircle className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-800 leading-tight">Criar História</span>
            <p className="text-[9px] text-slate-400 mt-0.5">Partilha o teu dia</p>
          </div>

          {displayStories.map((story) => (
            <div
              key={story.id}
              onClick={() => onStoryClick && onStoryClick(story.id)}
              className="shrink-0 w-28 h-38 rounded-2xl relative overflow-hidden group cursor-pointer border border-slate-200 shadow-xs hover:shadow-md transition-all hover:scale-[1.02]"
            >
              <img
                src={story.mediaUrl || story.authorAvatar}
                alt={story.authorName}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 brightness-95 group-hover:brightness-100"
              />
              {/* Author Ring Avatar on top left like Facebook */}
              <div className="absolute top-2 left-2 w-8 h-8 rounded-full ring-2 ring-blue-600 overflow-hidden shadow-md">
                <img
                  src={story.authorAvatar}
                  alt={story.authorName}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-2 text-white">
                <p className="text-[11px] font-black leading-tight drop-shadow-md truncate">
                  {story.authorName}
                </p>
                <p className="text-[9px] text-amber-300 font-medium truncate drop-shadow-xs">
                  {story.authorRole || story.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Post Composer: Facebook-inspired, but with privacy and category controls */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
        <div className="flex items-start gap-3 mb-3">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-600/20 shrink-0"
          />
          <div className="flex-1">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="O que está a acontecer na sua vizinhança? Partilhe um aviso, pedido de ajuda ou novidade..."
              rows={3}
              className="w-full p-2.5 bg-slate-50 hover:bg-slate-100/70 focus:bg-white rounded-xl border border-slate-200 focus:border-blue-500 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden resize-none transition-all"
              id="post-content-textarea"
            />
          </div>
        </div>

        {/* Optional Image URL Input */}
        {showImageInput && (
          <div className="mb-3 pl-13">
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Cole o link de uma foto (lavra, mutirão, conserto, etc.)..."
              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-hidden focus:border-blue-500"
              id="post-image-input"
            />
          </div>
        )}

        {/* Category selector & Action buttons */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <button
              type="button"
              onClick={() => setCategory('geral')}
              className={`px-2.5 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                category === 'geral' ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Comentário Geral
            </button>
            <button
              type="button"
              onClick={() => setCategory('aviso')}
              className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1 cursor-pointer transition-colors ${
                category === 'aviso' ? 'bg-amber-600 text-white' : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
              }`}
            >
              <AlertCircle className="w-3 h-3" /> Aviso Comunitário
            </button>
            <button
              type="button"
              onClick={() => setCategory('ajuda')}
              className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1 cursor-pointer transition-colors ${
                category === 'ajuda' ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-800 hover:bg-blue-100'
              }`}
            >
              <Handshake className="w-3 h-3" /> Ajuda Mútua
            </button>
            <button
              type="button"
              onClick={() => setCategory('sustentabilidade')}
              className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1 cursor-pointer transition-colors ${
                category === 'sustentabilidade' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
              }`}
            >
              <Recycle className="w-3 h-3" /> EcoCacuso
            </button>

            <button
              type="button"
              onClick={() => setShowImageInput(!showImageInput)}
              className="p-1.5 text-slate-500 hover:text-blue-700 hover:bg-slate-100 rounded-lg cursor-pointer"
              title="Adicionar imagem"
            >
              <ImageIcon className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
              <Lock className="w-3 h-3 text-emerald-600" /> Sem Rastreamento
            </span>
            <button
              type="button"
              onClick={handleCreatePost}
              disabled={!content.trim()}
              id="submit-post-btn"
              className="px-4 py-1.5 bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Publicar no Bairro</span>
            </button>
          </div>
        </div>
      </div>

      {/* Feed Filters Header: 100% Chronological Guarantee */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-700" />
          <h3 className="font-bold text-xs sm:text-sm text-slate-900">
            Feed 100% Cronológico Puro
          </h3>
          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full border border-emerald-200">
            Sem Algoritmo Predatório
          </span>
        </div>

        {/* Filter categories */}
        <div className="flex items-center gap-1 text-xs">
          <button
            onClick={() => setFilterCategory('todos')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
              filterCategory === 'todos' ? 'bg-slate-800 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setFilterCategory('aviso')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
              filterCategory === 'aviso' ? 'bg-amber-700 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Avisos
          </button>
          <button
            onClick={() => setFilterCategory('ajuda')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
              filterCategory === 'ajuda' ? 'bg-blue-700 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Ajuda
          </button>
          <button
            onClick={() => setFilterCategory('sustentabilidade')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
              filterCategory === 'sustentabilidade' ? 'bg-emerald-700 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Eco
          </button>
        </div>
      </div>

      {/* Posts List */}
      <div className="space-y-3.5">
        {filteredPosts.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 text-slate-500">
            <p className="text-sm font-medium">Nenhuma publicação encontrada para este filtro no momento.</p>
            <p className="text-xs text-slate-400 mt-1">Seja o primeiro vizinho a partilhar uma novidade!</p>
          </div>
        ) : (
          filteredPosts.map((post) => (
            <article 
              key={post.id}
              className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs transition-shadow hover:shadow-sm"
              id={`post-${post.id}`}
            >
              {/* Header: Author, Verification, Neighborhood, Timestamp */}
              <div className="flex items-start justify-between gap-2 mb-2.5">
                <div className="flex items-center gap-3">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-600/20"
                  />
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h4 className="font-bold text-slate-900 text-sm">{post.author.name}</h4>
                      
                      {post.author.isFounder ? (
                        <span className="bg-amber-100 text-amber-900 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-0.5 border border-amber-300">
                          <Sparkles className="w-2.5 h-2.5 text-amber-600" /> Criador Oficial
                        </span>
                      ) : (
                        <span className="bg-blue-50 text-blue-800 text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-0.5 border border-blue-200">
                          <CheckCircle2 className="w-2.5 h-2.5 text-blue-600" /> Vizinho Verificado
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                      <span className="flex items-center gap-0.5 text-slate-600">
                        <MapPin className="w-3 h-3 text-blue-600" />
                        {post.neighborhood}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-0.5">
                        <Clock className="w-3 h-3" />
                        {post.timestamp}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Category Badge */}
                <div>
                  {post.category === 'aviso' && (
                    <span className="bg-amber-100 text-amber-800 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-amber-200">
                      Aviso
                    </span>
                  )}
                  {post.category === 'ajuda' && (
                    <span className="bg-blue-100 text-blue-800 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-blue-200">
                      Ajuda Mútua
                    </span>
                  )}
                  {post.category === 'sustentabilidade' && (
                    <span className="bg-emerald-100 text-emerald-800 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                      <Recycle className="w-3 h-3" /> EcoCacuso
                    </span>
                  )}
                </div>
              </div>

              {/* Post Content */}
              <p className="text-slate-800 text-xs sm:text-sm leading-relaxed whitespace-pre-line mb-3">
                {post.content}
              </p>

              {/* Optional Post Image */}
              {post.imageUrl && (
                <div className="rounded-xl overflow-hidden mb-3 border border-slate-200">
                  <img
                    src={post.imageUrl}
                    alt="Conteúdo da comunidade"
                    className="w-full max-h-96 object-cover"
                  />
                </div>
              )}

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] text-blue-700 bg-blue-50 font-medium px-2 py-0.5 rounded-md hover:underline cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Post Actions: Facebook-style layout */}
              <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 text-xs">
                <div className="flex items-center gap-1 sm:gap-2">
                  <button
                    onClick={() => onLikePost(post.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-medium transition-colors cursor-pointer ${
                      post.hasLiked
                        ? 'bg-rose-50 text-rose-600 font-bold'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                    id={`like-btn-${post.id}`}
                  >
                    <Heart className={`w-4 h-4 ${post.hasLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                    <span>{post.likesCount} Apoios</span>
                  </button>

                  <button
                    onClick={() => setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-medium text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                    id={`comment-toggle-${post.id}`}
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.comments.length} Respostas</span>
                  </button>

                  {/* Partilhar Button (Story, Feed, WhatsApp, Feed do Amigo, Mensagem, Copiar Link, Grupo) */}
                  <button
                    onClick={() => onOpenShareModal?.(post)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-700 transition-colors cursor-pointer"
                    id={`share-btn-${post.id}`}
                    title="Partilhar esta publicação"
                  >
                    <Share2 className="w-4 h-4 text-blue-600" />
                    <span>Partilhar</span>
                  </button>
                </div>

                {/* Direct Private E2EE Chat button with Author */}
                {post.author.id !== currentUser.id && (
                  <button
                    onClick={() => onOpenE2EEChatWith(post.author)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer border border-blue-200"
                    id={`chat-author-${post.author.id}`}
                  >
                    <MessageSquareLock className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Mensagem E2EE</span>
                    <span className="sm:hidden">Chat</span>
                  </button>
                )}
              </div>

              {/* Comments Section */}
              {post.comments.length > 0 && (
                <div className="mt-3 pt-3 border-t border-slate-100 space-y-2">
                  {post.comments.map((comment) => (
                    <div key={comment.id} className="flex items-start gap-2.5 bg-slate-50 p-2.5 rounded-xl text-xs">
                      <img
                        src={comment.author.avatar}
                        alt={comment.author.name}
                        className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-300 shrink-0"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900">{comment.author.name}</span>
                          <span className="text-[10px] text-slate-400">{comment.timestamp}</span>
                        </div>
                        <p className="text-slate-700 mt-0.5">{comment.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Active Comment Input Form */}
              {activeCommentPostId === post.id && (
                <div className="mt-3 pt-2 flex items-center gap-2">
                  <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Escreva uma resposta solidária para este vizinho..."
                    className="flex-1 px-3 py-1.5 bg-slate-100 rounded-xl text-xs text-slate-800 border border-transparent focus:border-blue-500 focus:bg-white focus:outline-hidden"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSendComment(post.id);
                    }}
                  />
                  <button
                    onClick={() => handleSendComment(post.id)}
                    className="p-1.5 bg-blue-700 text-white rounded-xl hover:bg-blue-800 transition-colors cursor-pointer"
                    id={`send-comment-${post.id}`}
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              )}
            </article>
          ))
        )}
      </div>
    </div>
  );
};
