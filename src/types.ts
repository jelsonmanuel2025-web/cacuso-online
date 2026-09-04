export type ViewTab = 
  | 'feed' 
  | 'reels' 
  | 'estatisticas' 
  | 'grupos' 
  | 'negocios'
  | 'marketplace' 
  | 'servicos' 
  | 'residuos' 
  | 'eventos' 
  | 'criadores';

export interface UserNeighbor {
  id: string;
  name: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  phone?: string;
  avatar: string;
  neighborhood: string;
  reputationScore: number; // 0 to 100
  vouchesCount: number;
  badges: string[];
  isFounder?: boolean;
  roleTitle?: string;
  keyFingerprint: string;
  completedExchanges: number;
  ecoMeritPoints: number;
  joinedDate: string;
  isProfessionalMode?: boolean;
  followersCount?: number;
  followingCount?: number;
  language?: string;
  whatsappCalibrated?: boolean;
  expressEntity?: string;
  expressReference?: string;
  isFriendWithFounders?: boolean;
  friendsList?: string[];
}

export interface BusinessProduct {
  id: string;
  title: string;
  priceKz: number;
  formattedPrice: string; // e.g. "12.500 Kz"
  description: string;
  category: string;
  imageUrl: string;
  seller: UserNeighbor;
  neighborhood: string;
  stockCount: number;
  expressEntity: string;
  expressReference: string;
  isOfficialShop?: boolean;
  rating: number;
  salesCount: number;
}

export interface UserStory {
  id: string;
  authorName: string;
  authorAvatar: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  timestamp: string;
  caption?: string;
  isViewed?: boolean;
}

export interface FacebookReel {
  id: string;
  author: UserNeighbor;
  videoUrl: string;
  thumbnailUrl: string;
  caption: string;
  audioTrack: string;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  hasLiked?: boolean;
  hasSaved?: boolean;
  tags: string[];
  viewsCount: number;
  commentsList: { id: string; author: string; avatar: string; text: string; time: string }[];
}

export interface CommunityGroup {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  memberCount: number;
  privacy: 'publico' | 'privado';
  category: string;
  isMember?: boolean;
  location?: string;
}

export interface FacebookPage {
  id: string;
  name: string;
  category: string;
  bio: string;
  avatar: string;
  coverImage: string;
  followersCount: number;
  likesCount: number;
  phone?: string;
  location?: string;
  website?: string;
  isOfficial?: boolean;
}

export interface FriendRequest {
  id: string;
  name: string;
  avatar: string;
  mutualFriendsCount: number;
  mutualFriendsPreview?: string;
  timestamp: string;
  status: 'pending' | 'accepted' | 'declined';
}

export interface FacebookNotification {
  id: string;
  type: 'friend_request' | 'reaction' | 'comment' | 'group' | 'reel';
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  targetId?: string;
}

export interface ProfessionalMetrics {
  reach: { value: number; percentChange: number };
  engagement: { value: number; percentChange: number };
  netFollowers: { value: number; percentChange: number };
  threeSecViews: { value: number; percentChange: number };
  earningsKz: number;
  starsCount: number;
  recentContentPerformance: {
    id: string;
    title: string;
    type: 'post' | 'reel';
    publishedAt: string;
    impressions: number;
    interactions: number;
    shares: number;
  }[];
}

export interface PostComment {
  id: string;
  author: UserNeighbor;
  content: string;
  timestamp: string;
}

export interface Post {
  id: string;
  author: UserNeighbor;
  neighborhood: string;
  content: string;
  timestamp: string;
  category: 'aviso' | 'ajuda' | 'sustentabilidade' | 'evento' | 'geral' | 'grupo';
  groupName?: string;
  likesCount: number;
  hasLiked?: boolean;
  comments: PostComment[];
  tags: string[];
  imageUrl?: string;
  e2eeEncryptedFlag?: boolean;
}

export interface ServiceSwap {
  id: string;
  title: string;
  type: 'oferta' | 'pedido'; // Offering service or requesting service
  category: 'educacao' | 'reparos' | 'saude' | 'agricultura' | 'tecnologia' | 'transporte' | 'outros';
  description: string;
  compensation: string; // "Sem custo monetário - Troca por ajuda" or "Banco de Tempo: 1 hora"
  provider: UserNeighbor;
  neighborhood: string;
  status: 'aberto' | 'em_andamento' | 'concluido';
  createdAt: string;
  interestedCount: number;
  hasExpressedInterest?: boolean;
}

export interface MarketplaceItem {
  id: string;
  title: string;
  price: string; // e.g., "3.500 Kz" or "Troca direta por sementes"
  category: 'terra_agricultura' | 'artesanato' | 'ferramentas' | 'alimentos' | 'outros';
  description: string;
  seller: UserNeighbor;
  neighborhood: string;
  condition: 'Novo' | 'Excelente' | 'Colheita Fresca' | 'Usado Bom';
  isTradeOrFairPrice: boolean;
  imageUrl: string;
  createdAt: string;
  status: 'disponivel' | 'reservado' | 'trocado';
}

export interface EcoWastePoint {
  id: string;
  name: string;
  location: string;
  neighborhood: string;
  acceptedTypes: ('plastico' | 'vidro' | 'metal' | 'organico' | 'eletronico')[];
  capacityPercentage: number;
  coordinator: string;
  operatingHours: string;
}

export interface EcoWasteReport {
  id: string;
  title: string;
  type: 'descarte_correto' | 'mutirao_limpeza' | 'compostagem_coletiva';
  description: string;
  reportedBy: UserNeighbor;
  neighborhood: string;
  kgCollected: number;
  ecoPointsAwarded: number;
  date: string;
  status: 'registrado' | 'verificado_vizinhos' | 'meta_alcancada';
  imageUrl?: string;
}

export interface CommunityEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  neighborhood: string;
  organizer: UserNeighbor;
  category: 'mutirao' | 'feira_troca' | 'assembleia' | 'cultural' | 'oficina';
  attendeesCount: number;
  isAttending?: boolean;
}

export interface DirectMessage {
  id: string;
  senderId: string;
  receiverId: string;
  encryptedPayload: string;
  plainText: string;
  timestamp: string;
  isMine: boolean;
  verifiedE2EE: boolean;
}

export interface ReputationVouch {
  id: string;
  fromNeighbor: UserNeighbor;
  toNeighborId: string;
  category: 'confianca_geral' | 'troca_honesta' | 'apoio_mutuo' | 'guardiao_ambiental';
  comment: string;
  timestamp: string;
  signatureHash: string;
}
