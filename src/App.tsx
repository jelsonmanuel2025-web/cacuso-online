import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LeftSidebar } from './components/LeftSidebar';
import { RightSidebar } from './components/RightSidebar';
import { SocialInnovationBanner } from './components/SocialInnovationBanner';
import { ChronologicalFeed } from './components/ChronologicalFeed';
import { ServiceSwapForum } from './components/ServiceSwapForum';
import { MarketplaceRegional } from './components/MarketplaceRegional';
import { WasteManagementEco } from './components/WasteManagementEco';
import { EventsView } from './components/EventsView';
import { FoundersSection } from './components/FoundersSection';
import { E2EEMessagingModal } from './components/E2EEMessagingModal';
import { DecentralizedReputationModal } from './components/DecentralizedReputationModal';
import { PrivacyCenterModal } from './components/PrivacyCenterModal';

// Facebook-inspired modules & Angolan Flag Art Theme
import { AngolaHomeArtBackground } from './components/AngolaHomeArtBackground';
import { AuthModal } from './components/AuthModal';
import { CreatePageModal } from './components/CreatePageModal';
import { StoryViewerModal } from './components/StoryViewerModal';
import { ReelsView } from './components/ReelsView';
import { GroupsView } from './components/GroupsView';
import { ProfessionalDashboardView } from './components/ProfessionalDashboardView';
import { BusinessTabKwanza } from './components/BusinessTabKwanza';
import { SettingsModal } from './components/SettingsModal';
import { SharePostModal } from './components/SharePostModal';
import { SupabaseManagerModal } from './components/SupabaseManagerModal';
import { fetchSupabasePosts, saveSupabasePost, saveSupabaseProfile, setSupabaseActiveUser, sanitizeText } from './lib/supabase';

import { 
  ViewTab, 
  UserNeighbor, 
  Post, 
  ServiceSwap, 
  MarketplaceItem, 
  EcoWastePoint, 
  EcoWasteReport, 
  CommunityEvent, 
  ReputationVouch,
  UserStory,
  FacebookReel,
  CommunityGroup,
  FacebookPage,
  ProfessionalMetrics,
  FacebookNotification,
  FriendRequest
} from './types';

import { 
  CURRENT_USER, 
  NEIGHBORS, 
  FOUNDERS, 
  INITIAL_POSTS, 
  INITIAL_SERVICE_SWAPS, 
  INITIAL_MARKETPLACE_ITEMS, 
  INITIAL_ECO_POINTS, 
  INITIAL_ECO_REPORTS, 
  INITIAL_EVENTS, 
  INITIAL_VOUCHES,
  FACEBOOK_STORIES,
  FACEBOOK_REELS,
  COMMUNITY_GROUPS,
  FACEBOOK_PAGES,
  PROFESSIONAL_METRICS,
  FACEBOOK_NOTIFICATIONS,
  FRIEND_REQUESTS
} from './mockData';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<ViewTab>('feed');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('Todos os Bairros');
  const [searchQuery, setSearchQuery] = useState('');
  const [isArtThemeActive, setIsArtThemeActive] = useState(true);

  // Modals State
  const [isE2EEChatOpen, setIsE2EEChatOpen] = useState(false);
  const [activeChatNeighbor, setActiveChatNeighbor] = useState<UserNeighbor>(FOUNDERS[0]);
  const [isReputationModalOpen, setIsReputationModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isFoundersModalOpen, setIsFoundersModalOpen] = useState(false);
  
  // Facebook Auth & Profile Modals
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const [isCreatePageModalOpen, setIsCreatePageModalOpen] = useState(false);
  const [activeStoryId, setActiveStoryId] = useState<string | null>(null);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [sharingPost, setSharingPost] = useState<Post | null>(null);
  const [isSupabaseModalOpen, setIsSupabaseModalOpen] = useState(false);

  // Community Data States with localStorage persistence
  const [posts, setPosts] = useState<Post[]>(() => {
    const saved = localStorage.getItem('cacuso_posts');
    return saved ? JSON.parse(saved) : INITIAL_POSTS;
  });

  const [stories, setStories] = useState<UserStory[]>(() => {
    const saved = localStorage.getItem('cacuso_stories');
    return saved ? JSON.parse(saved) : FACEBOOK_STORIES;
  });

  const [reels, setReels] = useState<FacebookReel[]>(() => {
    const saved = localStorage.getItem('cacuso_reels');
    return saved ? JSON.parse(saved) : FACEBOOK_REELS;
  });

  const [groups, setGroups] = useState<CommunityGroup[]>(() => {
    const saved = localStorage.getItem('cacuso_groups');
    return saved ? JSON.parse(saved) : COMMUNITY_GROUPS;
  });

  const [managedPages, setManagedPages] = useState<FacebookPage[]>(() => {
    const saved = localStorage.getItem('cacuso_pages');
    return saved ? JSON.parse(saved) : FACEBOOK_PAGES;
  });

  const [professionalMetrics, setProfessionalMetrics] = useState<ProfessionalMetrics>(() => {
    const saved = localStorage.getItem('cacuso_metrics');
    return saved ? JSON.parse(saved) : PROFESSIONAL_METRICS;
  });

  const [notifications, setNotifications] = useState<FacebookNotification[]>(() => {
    const saved = localStorage.getItem('cacuso_notifications');
    return saved ? JSON.parse(saved) : FACEBOOK_NOTIFICATIONS;
  });

  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>(() => {
    const saved = localStorage.getItem('cacuso_friend_requests');
    return saved ? JSON.parse(saved) : FRIEND_REQUESTS;
  });

  const [services, setServices] = useState<ServiceSwap[]>(() => {
    const saved = localStorage.getItem('cacuso_services');
    return saved ? JSON.parse(saved) : INITIAL_SERVICE_SWAPS;
  });

  const [marketplaceItems, setMarketplaceItems] = useState<MarketplaceItem[]>(() => {
    const saved = localStorage.getItem('cacuso_marketplace');
    return saved ? JSON.parse(saved) : INITIAL_MARKETPLACE_ITEMS;
  });

  const [ecoReports, setEcoReports] = useState<EcoWasteReport[]>(() => {
    const saved = localStorage.getItem('cacuso_eco_reports');
    return saved ? JSON.parse(saved) : INITIAL_ECO_REPORTS;
  });

  const [events, setEvents] = useState<CommunityEvent[]>(() => {
    const saved = localStorage.getItem('cacuso_events');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  const [vouches, setVouches] = useState<ReputationVouch[]>(() => {
    const saved = localStorage.getItem('cacuso_vouches');
    return saved ? JSON.parse(saved) : INITIAL_VOUCHES;
  });

  const [currentUser, setCurrentUser] = useState<UserNeighbor>(() => {
    const saved = localStorage.getItem('cacuso_user');
    return saved ? JSON.parse(saved) : CURRENT_USER;
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('cacuso_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('cacuso_stories', JSON.stringify(stories));
  }, [stories]);

  useEffect(() => {
    localStorage.setItem('cacuso_reels', JSON.stringify(reels));
  }, [reels]);

  useEffect(() => {
    localStorage.setItem('cacuso_groups', JSON.stringify(groups));
  }, [groups]);

  useEffect(() => {
    localStorage.setItem('cacuso_pages', JSON.stringify(managedPages));
  }, [managedPages]);

  useEffect(() => {
    localStorage.setItem('cacuso_metrics', JSON.stringify(professionalMetrics));
  }, [professionalMetrics]);

  useEffect(() => {
    localStorage.setItem('cacuso_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('cacuso_friend_requests', JSON.stringify(friendRequests));
  }, [friendRequests]);

  useEffect(() => {
    localStorage.setItem('cacuso_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('cacuso_marketplace', JSON.stringify(marketplaceItems));
  }, [marketplaceItems]);

  useEffect(() => {
    localStorage.setItem('cacuso_eco_reports', JSON.stringify(ecoReports));
  }, [ecoReports]);

  useEffect(() => {
    localStorage.setItem('cacuso_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('cacuso_vouches', JSON.stringify(vouches));
  }, [vouches]);

  useEffect(() => {
    localStorage.setItem('cacuso_user', JSON.stringify(currentUser));
    setSupabaseActiveUser(currentUser.id);
  }, [currentUser]);

  // Initial fetch/sync from Supabase Database
  useEffect(() => {
    setSupabaseActiveUser(currentUser.id);
    fetchSupabasePosts().then((res) => {
      if (res.posts && res.posts.length > 0) {
        setPosts((prev) => {
          const existingIds = new Set(prev.map((p) => p.id));
          const fresh = res.posts!.filter((p) => !existingIds.has(p.id));
          if (fresh.length > 0) {
            return [...fresh, ...prev];
          }
          return prev;
        });
      }
    });
  }, []);

  // Handlers
  const handleAddPost = (newPostData: Omit<Post, 'id' | 'likesCount' | 'comments'>) => {
    const sanitizedContent = sanitizeText(newPostData.content, 4000);
    if (!sanitizedContent) return;

    const newPost: Post = {
      ...newPostData,
      content: sanitizedContent,
      id: `post-${Date.now()}`,
      likesCount: 1,
      hasLiked: true,
      comments: [],
    };
    // Prepend strictly for immediate chronological view
    setPosts((prev) => [newPost, ...prev]);

    // Persist asynchronously to Supabase PostgreSQL database
    saveSupabasePost(newPost);

    // Update professional dashboard metrics
    setProfessionalMetrics((prev) => ({
      ...prev,
      contentCount: prev.contentCount + 1,
      postEngagement: prev.postEngagement + 1,
    }));
  };

  const handleLikePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const hasLiked = !p.hasLiked;
          return {
            ...p,
            hasLiked,
            likesCount: hasLiked ? p.likesCount + 1 : Math.max(0, p.likesCount - 1),
          };
        }
        return p;
      })
    );
  };

  const handleAddComment = (postId: string, commentText: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            comments: [
              ...p.comments,
              {
                id: `comm-${Date.now()}`,
                author: currentUser,
                content: commentText,
                timestamp: 'Agora mesmo',
              },
            ],
          };
        }
        return p;
      })
    );
  };

  const handleLikeReel = (reelId: string) => {
    setReels((prev) =>
      prev.map((r) => {
        if (r.id === reelId) {
          const hasLiked = !r.hasLiked;
          return {
            ...r,
            hasLiked,
            likesCount: hasLiked ? r.likesCount + 1 : Math.max(0, r.likesCount - 1),
          };
        }
        return r;
      })
    );
  };

  const handleAddReelComment = (reelId: string, text: string) => {
    setReels((prev) =>
      prev.map((r) => {
        if (r.id === reelId) {
          return {
            ...r,
            commentsCount: r.commentsCount + 1,
          };
        }
        return r;
      })
    );
  };

  const handleJoinGroup = (groupId: string) => {
    setGroups((prev) =>
      prev.map((g) => {
        if (g.id === groupId) {
          const isMember = !g.isMember;
          return {
            ...g,
            isMember,
            memberCount: isMember ? g.memberCount + 1 : Math.max(1, g.memberCount - 1),
          };
        }
        return g;
      })
    );
  };

  const handleCreateGroup = (groupData: Omit<CommunityGroup, 'id' | 'memberCount'>) => {
    const newGroup: CommunityGroup = {
      ...groupData,
      id: `group-${Date.now()}`,
      memberCount: 1,
      isMember: true,
    };
    setGroups((prev) => [newGroup, ...prev]);
  };

  const handleCreatePage = (newPage: FacebookPage) => {
    setManagedPages((prev) => [newPage, ...prev]);
    // Switch to page mode or notify user
    const notice: FacebookNotification = {
      id: `notif-page-${Date.now()}`,
      senderName: newPage.name,
      senderAvatar: newPage.avatar,
      content: `A tua nova página "${newPage.name}" já está ativa para os vizinhos de Cacuso.`,
      timestamp: 'Agora mesmo',
      isRead: false,
      type: 'group',
      targetId: newPage.id,
    };
    setNotifications((prev) => [notice, ...prev]);
  };

  const handleAcceptFriend = (requestId: string) => {
    const req = friendRequests.find(r => r.id === requestId);
    if (req) {
      setFriendRequests(prev => prev.filter(r => r.id !== requestId));
      const notif: FacebookNotification = {
        id: `notif-friend-${Date.now()}`,
        senderName: req.name,
        senderAvatar: req.avatar,
        content: `Aceitou o teu pedido de amizade no Cacuso Online.`,
        timestamp: 'Agora mesmo',
        isRead: false,
        type: 'friend_request',
        targetId: req.id,
      };
      setNotifications(prev => [notif, ...prev]);
    }
  };

  const handleDeclineFriend = (requestId: string) => {
    setFriendRequests(prev => prev.filter(r => r.id !== requestId));
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const handleAuthSuccess = (newUser: UserNeighbor) => {
    setCurrentUser(newUser);
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('cacuso_user');
    setCurrentUser({
      ...CURRENT_USER,
      id: 'guest',
      name: 'Visitante Cacuso',
      neighborhood: 'Cacuso Central',
    });
    setAuthModalMode('login');
    setIsAuthModalOpen(true);
  };

  const handleUpdateUserSettings = (updated: Partial<UserNeighbor>) => {
    setCurrentUser((prev) => {
      const next = { ...prev, ...updated };
      localStorage.setItem('cacuso_user', JSON.stringify(next));
      return next;
    });
  };

  const handleShareSuccess = (channel: string, targetName?: string) => {
    if (channel === 'feed' && sharingPost) {
      const newPost: Post = {
        id: `post-share-${Date.now()}`,
        author: currentUser,
        content: `🔁 [Partilha de ${sharingPost.author.name}]:\n\n"${sharingPost.content}"`,
        timestamp: 'Agora mesmo',
        neighborhood: currentUser.neighborhood,
        category: sharingPost.category,
        likesCount: 1,
        comments: [],
        hasLiked: true,
        imageUrl: sharingPost.imageUrl,
        tags: sharingPost.tags,
      };
      setPosts((prev) => [newPost, ...prev]);
    }
  };

  const handleAddService = (newServiceData: Omit<ServiceSwap, 'id' | 'createdAt' | 'interestedCount'>) => {
    const newService: ServiceSwap = {
      ...newServiceData,
      id: `srv-${Date.now()}`,
      createdAt: 'Agora mesmo',
      interestedCount: 1,
    };
    setServices((prev) => [newService, ...prev]);
  };

  const handleAddMarketplaceItem = (newItemData: Omit<MarketplaceItem, 'id' | 'createdAt' | 'status'>) => {
    const newItem: MarketplaceItem = {
      ...newItemData,
      id: `mkt-${Date.now()}`,
      createdAt: 'Agora mesmo',
      status: 'disponivel',
    };
    setMarketplaceItems((prev) => [newItem, ...prev]);
  };

  const handleAddEcoReport = (newReportData: Omit<EcoWasteReport, 'id' | 'date' | 'status'>) => {
    const newReport: EcoWasteReport = {
      ...newReportData,
      id: `rep-${Date.now()}`,
      date: 'Hoje',
      status: 'verificado_vizinhos',
    };
    setEcoReports((prev) => [newReport, ...prev]);

    // Update user's eco merit points
    setCurrentUser((prev) => ({
      ...prev,
      ecoMeritPoints: prev.ecoMeritPoints + newReportData.ecoPointsAwarded,
    }));

    // Also automatically publish an announcement to the chronological feed
    const ecoPost: Post = {
      id: `post-eco-${Date.now()}`,
      author: currentUser,
      neighborhood: newReportData.neighborhood,
      content: `🌿 Nova ação registrada no EcoCacuso: "${newReportData.title}". ${newReportData.kgCollected} kg de resíduos desviados do descarte inadequado!`,
      timestamp: 'Agora mesmo',
      category: 'sustentabilidade',
      likesCount: 3,
      hasLiked: true,
      comments: [],
      tags: ['#EcoCacuso', '#Sustentabilidade', '#AçãoColetiva'],
    };
    setPosts((prev) => [ecoPost, ...prev]);
  };

  const handleAddEvent = (newEventData: Omit<CommunityEvent, 'id' | 'attendeesCount'>) => {
    const newEvent: CommunityEvent = {
      ...newEventData,
      id: `ev-${Date.now()}`,
      attendeesCount: 1,
    };
    setEvents((prev) => [newEvent, ...prev]);
  };

  const handleToggleAttend = (eventId: string) => {
    setEvents((prev) =>
      prev.map((ev) => {
        if (ev.id === eventId) {
          const isAttending = !ev.isAttending;
          return {
            ...ev,
            isAttending,
            attendeesCount: isAttending ? ev.attendeesCount + 1 : Math.max(0, ev.attendeesCount - 1),
          };
        }
        return ev;
      })
    );
  };

  const handleAddVouch = (newVouch: ReputationVouch) => {
    setVouches((prev) => [newVouch, ...prev]);
    // If vouch is for current user, increment score
    if (newVouch.toNeighborId === currentUser.id) {
      setCurrentUser((prev) => ({
        ...prev,
        vouchesCount: prev.vouchesCount + 1,
        reputationScore: Math.min(100, prev.reputationScore + 1),
      }));
    }
  };

  const handleOpenE2EEChatWith = (neighbor: UserNeighbor) => {
    setActiveChatNeighbor(neighbor);
    setIsE2EEChatOpen(true);
  };

  return (
    <div className={`min-h-screen relative text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white transition-colors duration-500 ${
      isArtThemeActive ? 'bg-black/30' : 'bg-slate-100'
    }`}>
      {/* Vibrant Angola Flag Art Background - Red, Black, Gold transmitting warmth of Home */}
      {isArtThemeActive && (
        <AngolaHomeArtBackground themeVariant="angola-vibrant" />
      )}

      {/* Top Header with Facebook-matching features & Auth */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        onOpenE2EEChat={() => setIsE2EEChatOpen(true)}
        onOpenPrivacyModal={() => setIsPrivacyModalOpen(true)}
        onOpenFoundersModal={() => setIsFoundersModalOpen(true)}
        selectedNeighborhood={selectedNeighborhood}
        setSelectedNeighborhood={setSelectedNeighborhood}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenAuthModal={(mode) => {
          setAuthModalMode(mode);
          setIsAuthModalOpen(true);
        }}
        onOpenCreatePageModal={() => setIsCreatePageModalOpen(true)}
        notifications={notifications}
        friendRequests={friendRequests}
        onAcceptFriend={handleAcceptFriend}
        onDeclineFriend={handleDeclineFriend}
        onMarkAllAsRead={handleMarkAllNotificationsRead}
        managedPages={managedPages}
        onSelectPage={(page) => {
          // Switch to page context
          setActiveTab('feed');
        }}
        onLogout={handleLogout}
        onToggleThemeArt={() => setIsArtThemeActive(prev => !prev)}
        onOpenSettingsModal={() => setIsSettingsModalOpen(true)}
        onOpenSupabaseModal={() => setIsSupabaseModalOpen(true)}
      />

      {/* Main Container - 3 Column Layout inspired by Facebook */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-2 sm:px-4 lg:px-6 flex gap-5">
        {/* Left Column (Navigation, Founders spotlight, Neighborhoods) */}
        <LeftSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          currentUser={currentUser}
          selectedNeighborhood={selectedNeighborhood}
          setSelectedNeighborhood={setSelectedNeighborhood}
          onOpenFoundersModal={() => setIsFoundersModalOpen(true)}
          onOpenPrivacyModal={() => setIsPrivacyModalOpen(true)}
          onOpenReputationModal={() => setIsReputationModalOpen(true)}
          onOpenCreatePageModal={() => setIsCreatePageModalOpen(true)}
          onOpenAuthModal={(mode) => {
            setAuthModalMode(mode);
            setIsAuthModalOpen(true);
          }}
          onOpenSettingsModal={() => setIsSettingsModalOpen(true)}
          onLogout={handleLogout}
          onOpenSupabaseModal={() => setIsSupabaseModalOpen(true)}
        />

        {/* Center Main Column */}
        <main className="flex-1 min-w-0 py-4 pb-12">
          {/* Highlight Social Innovation & Official Founders Banner */}
          <SocialInnovationBanner
            onOpenFoundersModal={() => setIsFoundersModalOpen(true)}
            onOpenPrivacyModal={() => setIsPrivacyModalOpen(true)}
          />

          {/* Active View Render */}
          {activeTab === 'feed' && (
            <ChronologicalFeed
              posts={posts}
              currentUser={currentUser}
              onAddPost={handleAddPost}
              onLikePost={handleLikePost}
              onAddComment={handleAddComment}
              onOpenE2EEChatWith={handleOpenE2EEChatWith}
              selectedNeighborhood={selectedNeighborhood}
              stories={stories}
              onStoryClick={(storyId) => setActiveStoryId(storyId)}
              onCreateStoryClick={() => setActiveStoryId(stories[0]?.id || null)}
              onNavigateToTab={(tab) => setActiveTab(tab)}
              onOpenCreatePage={() => setIsCreatePageModalOpen(true)}
              onOpenShareModal={(post) => setSharingPost(post)}
            />
          )}

          {activeTab === 'reels' && (
            <ReelsView
              reels={reels}
              currentUser={currentUser}
              onLikeReel={handleLikeReel}
              onAddComment={handleAddReelComment}
              onCreateReelClick={() => {
                alert('Carregar vídeo do Reel direto da galeria');
              }}
            />
          )}

          {activeTab === 'grupos' && (
            <GroupsView
              groups={groups}
              posts={posts}
              currentUser={currentUser}
              onJoinGroup={handleJoinGroup}
              onCreateGroup={handleCreateGroup}
              onLikePost={handleLikePost}
            />
          )}

          {activeTab === 'estatisticas' && (
            <ProfessionalDashboardView
              currentUser={currentUser}
              metrics={professionalMetrics}
              onOpenCreatePost={() => setActiveTab('feed')}
            />
          )}

          {activeTab === 'servicos' && (
            <ServiceSwapForum
              services={services}
              currentUser={currentUser}
              onAddService={handleAddService}
              onOpenE2EEChatWith={handleOpenE2EEChatWith}
              selectedNeighborhood={selectedNeighborhood}
            />
          )}

          {activeTab === 'marketplace' && (
            <MarketplaceRegional
              items={marketplaceItems}
              currentUser={currentUser}
              onAddItem={handleAddMarketplaceItem}
              onOpenE2EEChatWith={handleOpenE2EEChatWith}
              selectedNeighborhood={selectedNeighborhood}
            />
          )}

          {activeTab === 'negocios' && (
            <BusinessTabKwanza
              currentUser={currentUser}
              onOpenE2EEChatWith={handleOpenE2EEChatWith}
            />
          )}

          {activeTab === 'residuos' && (
            <WasteManagementEco
              ecoPoints={INITIAL_ECO_POINTS}
              reports={ecoReports}
              currentUser={currentUser}
              onAddReport={handleAddEcoReport}
              selectedNeighborhood={selectedNeighborhood}
            />
          )}

          {activeTab === 'eventos' && (
            <EventsView
              events={events}
              currentUser={currentUser}
              onAddEvent={handleAddEvent}
              onToggleAttend={handleToggleAttend}
              onOpenE2EEChatWith={handleOpenE2EEChatWith}
              selectedNeighborhood={selectedNeighborhood}
            />
          )}

          {activeTab === 'criadores' && (
            <FoundersSection
              onOpenE2EEChatWith={handleOpenE2EEChatWith}
            />
          )}
        </main>

        {/* Right Column (Web of Trust, Waste Progress, Secure Contacts) */}
        <RightSidebar
          onOpenE2EEChatWith={handleOpenE2EEChatWith}
          onOpenReputationModal={() => setIsReputationModalOpen(true)}
          onOpenWasteModal={() => setActiveTab('residuos')}
          onNavigateToTab={(tab) => setActiveTab(tab)}
        />
      </div>

      {/* Real-Time E2EE Messaging Modal */}
      <E2EEMessagingModal
        isOpen={isE2EEChatOpen}
        onClose={() => setIsE2EEChatOpen(false)}
        activeNeighbor={activeChatNeighbor}
        currentUser={currentUser}
        onSelectNeighbor={(neighbor) => setActiveChatNeighbor(neighbor)}
        allNeighbors={NEIGHBORS}
      />

      {/* Decentralized Web of Trust & Reputation Modal */}
      <DecentralizedReputationModal
        isOpen={isReputationModalOpen}
        onClose={() => setIsReputationModalOpen(false)}
        currentUser={currentUser}
        allNeighbors={NEIGHBORS}
        onAddVouch={handleAddVouch}
        vouches={vouches}
      />

      {/* Privacy Center & Digital Sovereignty Modal */}
      <PrivacyCenterModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
        currentUser={currentUser}
      />

      {/* Auth Modal (Login / Register with 3-part name, phone and SMS confirmation) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
        initialMode={authModalMode}
      />

      {/* Create Page Modal (Gravadora, estúdio, empresa com link de perfil do Facebook) */}
      <CreatePageModal
        isOpen={isCreatePageModalOpen}
        onClose={() => setIsCreatePageModalOpen(false)}
        onCreatePage={handleCreatePage}
        existingPages={managedPages}
      />

      {/* Interactive Story Viewer Modal */}
      {activeStoryId && (
        <StoryViewerModal
          stories={stories}
          initialStoryId={activeStoryId}
          onClose={() => setActiveStoryId(null)}
          onReplyStory={(storyId, reply) => {
            alert(`Resposta enviada de forma privada e criptografada: "${reply}"`);
          }}
        />
      )}

      {/* Founders Official Modal */}
      {isFoundersModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-slate-100 w-full max-w-4xl max-h-[92vh] rounded-3xl shadow-2xl overflow-y-auto p-4 sm:p-6 border border-slate-300">
            <FoundersSection
              isModal={true}
              onCloseModal={() => setIsFoundersModalOpen(false)}
              onOpenE2EEChatWith={(founder) => {
                setIsFoundersModalOpen(false);
                handleOpenE2EEChatWith(founder);
              }}
            />
          </div>
        </div>
      )}

      {/* Settings & Privacy Modal (Languages, Activity Log, Privacy Center, Sensitive Content, WhatsApp) */}
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        currentUser={currentUser}
        onUpdateUser={handleUpdateUserSettings}
        onLogout={handleLogout}
        onOpenSupabaseModal={() => setIsSupabaseModalOpen(true)}
      />

      {/* Supabase PostgreSQL Database Manager Modal */}
      <SupabaseManagerModal
        isOpen={isSupabaseModalOpen}
        onClose={() => setIsSupabaseModalOpen(false)}
        posts={posts}
        onSyncPostsFromSupabase={(synced) => {
          setPosts((prev) => {
            const map = new Map<string, Post>();
            synced.forEach((p) => map.set(p.id, p));
            prev.forEach((p) => map.set(p.id, p));
            return Array.from(map.values());
          });
        }}
      />

      {/* Share Post Modal (Story, Feed, WhatsApp, Friend's Feed, Message, Copy Link, Group) */}
      {sharingPost && (
        <SharePostModal
          isOpen={!!sharingPost}
          onClose={() => setSharingPost(null)}
          post={sharingPost}
          currentUser={currentUser}
          onShareSuccess={handleShareSuccess}
        />
      )}
    </div>
  );
}
