import React, { useState, useRef, useEffect } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  Music, 
  ChevronUp, 
  ChevronDown, 
  Send, 
  Plus, 
  Sparkles,
  Check,
  Film
} from 'lucide-react';
import { FacebookReel, UserNeighbor } from '../types';

interface ReelsViewProps {
  reels: FacebookReel[];
  currentUser: UserNeighbor;
  onLikeReel: (reelId: string) => void;
  onAddComment: (reelId: string, text: string) => void;
  onCreateReelClick: () => void;
}

export const ReelsView: React.FC<ReelsViewProps> = ({
  reels,
  currentUser,
  onLikeReel,
  onAddComment,
  onCreateReelClick,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [savedReels, setSavedReels] = useState<Record<string, boolean>>({});
  const [followingMap, setFollowingMap] = useState<Record<string, boolean>>({
    'author-liron': true,
    'author-adelaide': false,
    'author-pedro': false,
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const activeReel = reels[currentIndex] || reels[0];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      if (isPlaying) {
        videoRef.current.play().catch(() => setIsPlaying(false));
      }
    }
  }, [currentIndex]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleNext = () => {
    if (currentIndex < reels.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(reels.length - 1);
    }
  };

  const handleToggleFollow = (authorId: string) => {
    setFollowingMap(prev => ({
      ...prev,
      [authorId]: !prev[authorId]
    }));
  };

  const handleToggleSave = (reelId: string) => {
    setSavedReels(prev => ({
      ...prev,
      [reelId]: !prev[reelId]
    }));
  };

  const handleShare = () => {
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    onAddComment(activeReel.id, commentInput.trim());
    setCommentInput('');
  };

  return (
    <div className="max-w-5xl mx-auto py-3 px-2 sm:px-4">
      {/* Top Bar for Reels Section */}
      <div className="flex items-center justify-between mb-4 bg-slate-900/80 backdrop-blur-md p-3.5 rounded-2xl border border-slate-800 text-white shadow-md">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-pink-600 flex items-center justify-center text-white shadow-xs">
            <Film className="w-4 h-4" />
          </div>
          <div>
            <h1 className="font-bold text-base leading-tight flex items-center gap-1.5">
              <span>Reels de Cacuso &amp; Angola</span>
              <span className="text-[10px] bg-red-600/80 text-white font-semibold px-2 py-0.5 rounded-full">
                Em Alta 🔥
              </span>
            </h1>
            <p className="text-xs text-slate-400">Vídeos curtos de música, dança, cultura e humor</p>
          </div>
        </div>

        <button
          onClick={onCreateReelClick}
          className="px-3.5 py-1.5 bg-linear-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs transition-all active:scale-95"
          id="create-new-reel-btn"
        >
          <Plus className="w-4 h-4" />
          <span>Criar Reel</span>
        </button>
      </div>

      {/* Main Reels Content Area */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-4 sm:gap-6">
        {/* The Vertical Reel Player Card */}
        <div className="relative w-full max-w-[360px] sm:max-w-[400px] h-[640px] bg-black rounded-3xl overflow-hidden shadow-2xl border border-slate-800 flex items-center justify-center select-none group">
          {/* HTML5 Video */}
          <video
            ref={videoRef}
            src={activeReel.videoUrl}
            poster={activeReel.thumbnailUrl}
            loop
            muted={isMuted}
            playsInline
            autoPlay
            onClick={togglePlay}
            className="w-full h-full object-cover cursor-pointer"
          />

          {/* Top Overlay: Category badge & Audio status */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            <span className="bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/20 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Cacuso Criativo</span>
            </span>

            <button
              onClick={toggleMute}
              className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md hover:bg-black/80 text-white flex items-center justify-center cursor-pointer transition-colors"
              title={isMuted ? "Ativar Som" : "Silenciar"}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>

          {/* Pause overlay icon indicator */}
          {!isPlaying && (
            <div 
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer z-10"
            >
              <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white">
                <Play className="w-8 h-8 fill-white ml-1" />
              </div>
            </div>
          )}

          {/* Bottom Overlay: Author info, caption, tags, and audio track */}
          <div className="absolute bottom-0 left-0 right-16 p-4 bg-linear-to-t from-black via-black/70 to-transparent z-10 text-white">
            <div className="flex items-center gap-2.5 mb-2">
              <img
                src={activeReel.author.avatar}
                alt={activeReel.author.name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-white/60"
              />
              <div className="overflow-hidden">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm leading-tight text-white drop-shadow-md">
                    {activeReel.author.name}
                  </span>
                  <button
                    onClick={() => handleToggleFollow(activeReel.author.id)}
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold cursor-pointer transition-colors ${
                      followingMap[activeReel.author.id]
                        ? 'bg-white/20 text-slate-200'
                        : 'bg-blue-600 hover:bg-blue-500 text-white'
                    }`}
                  >
                    {followingMap[activeReel.author.id] ? 'A Seguir' : 'Seguir'}
                  </button>
                </div>
                <p className="text-[11px] text-slate-300 drop-shadow-xs">{activeReel.author.neighborhood}</p>
              </div>
            </div>

            <p className="text-xs text-white/95 leading-relaxed mb-2 drop-shadow-md line-clamp-3">
              {activeReel.caption}
            </p>

            {/* Audio Track marquee / ticker */}
            <div className="flex items-center gap-2 text-xs text-amber-300 font-medium bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-lg w-fit">
              <Music className="w-3.5 h-3.5 animate-spin" />
              <span className="truncate max-w-[200px]">{activeReel.audioTrack}</span>
            </div>
          </div>

          {/* Right Floating Vertical Action Bar */}
          <div className="absolute right-2.5 bottom-6 flex flex-col items-center gap-4 z-20">
            {/* Author Avatar with quick follow '+' */}
            <div className="relative mb-1">
              <img
                src={activeReel.author.avatar}
                alt={activeReel.author.name}
                className="w-11 h-11 rounded-full object-cover ring-2 ring-pink-500"
              />
              {!followingMap[activeReel.author.id] && (
                <button
                  onClick={() => handleToggleFollow(activeReel.author.id)}
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-pink-600 text-white flex items-center justify-center text-xs font-bold ring-2 ring-black cursor-pointer hover:scale-110 transition-transform"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Like Button */}
            <button
              onClick={() => onLikeReel(activeReel.id)}
              className="flex flex-col items-center gap-1 group cursor-pointer"
              title="Gosto"
              id="like-reel-btn"
            >
              <div className={`w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
                activeReel.hasLiked
                  ? 'bg-rose-600 text-white scale-110 shadow-lg shadow-rose-600/50'
                  : 'bg-black/50 text-white hover:bg-black/70'
              }`}>
                <Heart className={`w-6 h-6 ${activeReel.hasLiked ? 'fill-white' : ''}`} />
              </div>
              <span className="text-[11px] font-bold text-white drop-shadow-md">
                {(activeReel.likesCount / 1000).toFixed(1)}K
              </span>
            </button>

            {/* Comment Button */}
            <button
              onClick={() => setShowComments(!showComments)}
              className="flex flex-col items-center gap-1 group cursor-pointer"
              title="Comentários"
              id="comments-reel-btn"
            >
              <div className={`w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
                showComments ? 'bg-blue-600 text-white' : 'bg-black/50 text-white hover:bg-black/70'
              }`}>
                <MessageCircle className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold text-white drop-shadow-md">
                {activeReel.commentsCount}
              </span>
            </button>

            {/* Share Button */}
            <button
              onClick={handleShare}
              className="flex flex-col items-center gap-1 group cursor-pointer"
              title="Partilhar Reel"
              id="share-reel-btn"
            >
              <div className="w-11 h-11 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-md transition-colors">
                {copiedLink ? <Check className="w-5 h-5 text-emerald-400" /> : <Share2 className="w-5 h-5" />}
              </div>
              <span className="text-[11px] font-bold text-white drop-shadow-md">
                {copiedLink ? 'Copiado!' : `${(activeReel.sharesCount / 1000).toFixed(1)}K`}
              </span>
            </button>

            {/* Bookmark / Save Button */}
            <button
              onClick={() => handleToggleSave(activeReel.id)}
              className="flex flex-col items-center gap-1 group cursor-pointer"
              title="Guardar"
            >
              <div className={`w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-md transition-colors ${
                savedReels[activeReel.id] ? 'bg-amber-500 text-white' : 'bg-black/50 text-white hover:bg-black/70'
              }`}>
                <Bookmark className={`w-5 h-5 ${savedReels[activeReel.id] ? 'fill-white' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Up / Down Navigation Buttons */}
        <div className="flex lg:flex-col items-center gap-2">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center cursor-pointer shadow-md transition-transform hover:scale-105"
            title="Reel Anterior"
            id="prev-reel-btn"
          >
            <ChevronUp className="w-6 h-6" />
          </button>
          <span className="text-xs font-bold text-slate-400 px-2">
            {currentIndex + 1} / {reels.length}
          </span>
          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center cursor-pointer shadow-md transition-transform hover:scale-105"
            title="Próximo Reel"
            id="next-reel-btn"
          >
            <ChevronDown className="w-6 h-6" />
          </button>
        </div>

        {/* Lateral Drawer / Comments & Other Reels Panel */}
        <div className={`w-full lg:w-80 h-[640px] bg-slate-900/90 backdrop-blur-md rounded-3xl border border-slate-800 p-4 flex flex-col text-white ${
          showComments ? 'block' : 'hidden lg:flex'
        }`}>
          {showComments ? (
            /* Comments Panel */
            <>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="font-bold text-sm">Comentários ({activeReel.commentsList.length})</h3>
                <button
                  onClick={() => setShowComments(false)}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  Ver Reels
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-3 space-y-3 pr-1">
                {activeReel.commentsList.map(c => (
                  <div key={c.id} className="flex items-start gap-2 text-xs">
                    <img
                      src={c.avatar}
                      alt={c.author}
                      className="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5"
                    />
                    <div className="bg-slate-800/80 p-2.5 rounded-2xl flex-1 border border-slate-700/50">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-slate-200">{c.author}</span>
                        <span className="text-[10px] text-slate-400">{c.time}</span>
                      </div>
                      <p className="text-slate-300 leading-snug">{c.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendComment} className="pt-2 border-t border-slate-800 flex items-center gap-2">
                <input
                  type="text"
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  placeholder="Escreve um comentário..."
                  className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-hidden focus:border-pink-500"
                />
                <button
                  type="submit"
                  disabled={!commentInput.trim()}
                  className="p-2 bg-pink-600 hover:bg-pink-700 disabled:opacity-40 text-white rounded-xl cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </>
          ) : (
            /* More Reels in Cacuso / Playlist */
            <>
              <div className="pb-3 border-b border-slate-800">
                <h3 className="font-bold text-sm flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Em Destaque no Município</span>
                </h3>
                <p className="text-xs text-slate-400">Seleciona para assistir</p>
              </div>

              <div className="flex-1 overflow-y-auto py-3 space-y-2.5">
                {reels.map((r, idx) => (
                  <div
                    key={r.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`p-2.5 rounded-2xl flex items-center gap-3 cursor-pointer transition-all ${
                      idx === currentIndex
                        ? 'bg-pink-600/30 border border-pink-500/50 ring-1 ring-pink-500/30'
                        : 'bg-slate-800/60 hover:bg-slate-800 border border-slate-700/40'
                    }`}
                  >
                    <div className="relative w-14 h-20 rounded-xl overflow-hidden shrink-0 bg-slate-950">
                      <img
                        src={r.thumbnailUrl}
                        alt={r.caption}
                        className="w-full h-full object-cover"
                      />
                      {idx === currentIndex && (
                        <div className="absolute inset-0 bg-pink-600/40 flex items-center justify-center">
                          <Play className="w-4 h-4 fill-white" />
                        </div>
                      )}
                    </div>

                    <div className="overflow-hidden flex-1 text-xs">
                      <p className="font-bold text-slate-200 line-clamp-2 leading-tight">{r.caption}</p>
                      <p className="text-[11px] text-pink-400 mt-1 font-medium">{r.author.name}</p>
                      <span className="text-[10px] text-slate-400">{(r.viewsCount / 1000).toFixed(0)}k visualizações</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
