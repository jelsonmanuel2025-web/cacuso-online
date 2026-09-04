import React, { useState, useEffect } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Heart, 
  Send, 
  Sparkles,
  Pause,
  Play
} from 'lucide-react';
import { UserStory } from '../types';

interface StoryViewerModalProps {
  stories: UserStory[];
  initialStoryId: string | null;
  onClose: () => void;
  onReplyStory?: (storyId: string, message: string) => void;
}

export const StoryViewerModal: React.FC<StoryViewerModalProps> = ({
  stories,
  initialStoryId,
  onClose,
  onReplyStory,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [showReactionAnim, setShowReactionAnim] = useState<string | null>(null);

  useEffect(() => {
    if (initialStoryId) {
      const idx = stories.findIndex(s => s.id === initialStoryId);
      if (idx !== -1) setCurrentIndex(idx);
    }
  }, [initialStoryId, stories]);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          if (currentIndex < stories.length - 1) {
            setCurrentIndex(c => c + 1);
            return 0;
          } else {
            onClose();
            return 100;
          }
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [currentIndex, isPaused, stories.length, onClose]);

  const activeStory = stories[currentIndex] || stories[0];

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setProgress(0);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setProgress(0);
    }
  };

  const handleReact = (emoji: string) => {
    setShowReactionAnim(emoji);
    setTimeout(() => setShowReactionAnim(null), 1200);
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    if (onReplyStory) onReplyStory(activeStory.id, replyText);
    setReplyText('');
    handleReact('❤️');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-2 sm:p-4 select-none">
      {/* Reaction Flying Animation */}
      {showReactionAnim && (
        <div className="absolute inset-0 pointer-events-none z-60 flex items-center justify-center animate-bounce">
          <span className="text-7xl">{showReactionAnim}</span>
        </div>
      )}

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-60 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center cursor-pointer transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Story Card Container */}
      <div className="relative w-full max-w-sm sm:max-w-md h-[90vh] max-h-[780px] bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col justify-between">
        {/* Top Progress Bars */}
        <div className="absolute top-3 left-3 right-3 z-30 flex items-center gap-1.5">
          {stories.map((s, idx) => (
            <div key={s.id} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white transition-all"
                style={{
                  width: idx === currentIndex ? `${progress}%` : idx < currentIndex ? '100%' : '0%'
                }}
              />
            </div>
          ))}
        </div>

        {/* Story Author Header */}
        <div className="absolute top-6 left-4 right-4 z-30 flex items-center justify-between text-white">
          <div className="flex items-center gap-2.5">
            <img
              src={activeStory.authorAvatar}
              alt={activeStory.authorName}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500 shadow-md"
            />
            <div>
              <p className="font-bold text-sm leading-tight drop-shadow-md">
                {activeStory.authorName}
              </p>
              <p className="text-[11px] text-slate-300 drop-shadow-xs">{activeStory.timestamp}</p>
            </div>
          </div>

          <button
            onClick={() => setIsPaused(!isPaused)}
            className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center cursor-pointer"
          >
            {isPaused ? <Play className="w-4 h-4 text-white" /> : <Pause className="w-4 h-4 text-white" />}
          </button>
        </div>

        {/* Media Background */}
        <div className="relative w-full h-full">
          <img
            src={activeStory.mediaUrl}
            alt={activeStory.caption || 'Story'}
            className="w-full h-full object-cover"
          />

          {/* Left/Right Click Navigators */}
          <div 
            onClick={handlePrev}
            className="absolute left-0 top-16 bottom-24 w-1/3 cursor-pointer z-20"
          />
          <div 
            onClick={handleNext}
            className="absolute right-0 top-16 bottom-24 w-1/3 cursor-pointer z-20"
          />
        </div>

        {/* Bottom Area: Caption + Quick Reply & Reactions */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black via-black/80 to-transparent z-30 space-y-3">
          {activeStory.caption && (
            <p className="text-sm font-semibold text-white leading-relaxed drop-shadow-md text-center">
              {activeStory.caption}
            </p>
          )}

          {/* Emoji Reactions Bar */}
          <div className="flex items-center justify-center gap-3 py-1">
            {['❤️', '🔥', '😂', '👏', '🇦🇴'].map(emoji => (
              <button
                key={emoji}
                onClick={() => handleReact(emoji)}
                className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 hover:scale-125 text-xl flex items-center justify-center transition-transform cursor-pointer"
              >
                {emoji}
              </button>
            ))}
          </div>

          {/* Reply Input Form */}
          <form onSubmit={handleSendReply} className="flex items-center gap-2">
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Responder à história..."
              className="flex-1 px-4 py-2.5 bg-white/20 hover:bg-white/30 focus:bg-white/35 backdrop-blur-md rounded-full text-xs text-white placeholder:text-slate-300 focus:outline-hidden border border-white/20"
            />
            <button
              type="submit"
              disabled={!replyText.trim()}
              className="p-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white rounded-full cursor-pointer shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Previous & Next Navigation Floating Buttons */}
        {currentIndex > 0 && (
          <button
            onClick={handlePrev}
            className="hidden sm:flex absolute left-[-60px] top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/20 hover:bg-white/30 text-white items-center justify-center cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}
        {currentIndex < stories.length - 1 && (
          <button
            onClick={handleNext}
            className="hidden sm:flex absolute right-[-60px] top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/20 hover:bg-white/30 text-white items-center justify-center cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
};
