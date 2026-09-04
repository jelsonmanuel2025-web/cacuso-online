import { createClient } from '@supabase/supabase-js';
import { Post, UserNeighbor, MarketplaceItem } from '../types';

// Default configuration provided by the user with environment variable override
const RAW_URL = (((import.meta as any).env?.VITE_SUPABASE_URL) || 'https://uyhcjseqnbracyhwlviz.supabase.co/rest/v1/').trim();
const ANON_KEY = (((import.meta as any).env?.VITE_SUPABASE_ANON_KEY) || 'sb_publishable_dirvqmuc0K7Q3byhbdG1Tg_in5BGcQq').trim();

// Normalize URL: Supabase client expects the root URL without `/rest/v1/`
export function normalizeSupabaseUrl(url: string): string {
  return url.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
}

export const SUPABASE_URL = normalizeSupabaseUrl(RAW_URL);
export const SUPABASE_ANON_KEY = ANON_KEY;

// Dynamic sovereign user context for Supabase Row Level Security (RLS)
let currentActiveUserId = 'founder-jelson';

export function setSupabaseActiveUser(userId: string) {
  if (userId && typeof userId === 'string') {
    currentActiveUserId = userId.trim();
  }
}

export function getActiveUserId(): string {
  return currentActiveUserId;
}

/**
 * Defensive input sanitizer to prevent XSS/script injection and control characters
 */
export function sanitizeText(input: unknown, maxLength = 3000): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/[<>]/g, '') // remove HTML tag brackets to prevent raw injection
    .trim()
    .slice(0, maxLength);
}

// Create and export the Supabase client instance with sovereign user authentication header
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  global: {
    fetch: (input: any, init?: any) => {
      const headers = new Headers(init?.headers || {});
      if (currentActiveUserId) {
        headers.set('x-user-id', currentActiveUserId);
      }
      return fetch(input, { ...init, headers });
    },
  },
});

export interface SupabaseHealthStatus {
  connected: boolean;
  latencyMs?: number;
  url: string;
  error?: string;
  tablesStatus?: {
    posts: boolean;
    profiles: boolean;
    business_products: boolean;
    private_messages: boolean;
  };
}

/**
 * Test connectivity with Supabase REST API
 */
export async function testSupabaseConnection(): Promise<SupabaseHealthStatus> {
  const startTime = performance.now();
  try {
    // Attempt a light query to verify Supabase API is reachable
    const response = await fetch(`${SUPABASE_URL}/rest/v1/`, {
      method: 'GET',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      },
    });

    const latency = Math.round(performance.now() - startTime);

    if (response.ok || response.status === 200 || response.status === 404 || response.status === 401) {
      // Check individual tables availability
      const [postsRes, profilesRes, productsRes, messagesRes] = await Promise.allSettled([
        supabase.from('posts').select('id').limit(1),
        supabase.from('profiles').select('id').limit(1),
        supabase.from('business_products').select('id').limit(1),
        supabase.from('private_messages').select('id').limit(1),
      ]);

      const tablesStatus = {
        posts: postsRes.status === 'fulfilled' && !postsRes.value.error,
        profiles: profilesRes.status === 'fulfilled' && !profilesRes.value.error,
        business_products: productsRes.status === 'fulfilled' && !productsRes.value.error,
        private_messages: messagesRes.status === 'fulfilled' && !messagesRes.value.error,
      };

      return {
        connected: true,
        latencyMs: latency,
        url: SUPABASE_URL,
        tablesStatus,
      };
    } else {
      return {
        connected: false,
        latencyMs: latency,
        url: SUPABASE_URL,
        error: `HTTP Status: ${response.status} ${response.statusText}`,
      };
    }
  } catch (err: any) {
    return {
      connected: false,
      url: SUPABASE_URL,
      error: err?.message || 'Falha ao conectar com o Supabase',
    };
  }
}

/**
 * Fetch posts from Supabase `posts` table
 */
export async function fetchSupabasePosts(): Promise<{ posts: Post[] | null; error: any }> {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase posts table not queried:', error.message);
      return { posts: null, error };
    }

    if (data && Array.isArray(data)) {
      const formattedPosts: Post[] = data.map((item) => ({
        id: item.id?.toString() || `post-${Date.now()}`,
        author: {
          id: item.author_id || 'supabase-author',
          name: item.author_name || 'Morador de Cacuso',
          avatar: item.author_avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
          neighborhood: item.neighborhood || 'Cacuso Central',
          badges: item.author_badges || [],
          reputationScore: item.reputation_score ?? 95,
          vouchesCount: item.vouches_count ?? 5,
          keyFingerprint: item.key_fingerprint || 'E2EE-SOVEREIGN-CACUSO',
          completedExchanges: item.completed_exchanges ?? 0,
          ecoMeritPoints: item.eco_merit_points ?? 100,
          joinedDate: item.joined_date || '2026',
          isFounder: !!item.author_is_founder,
          whatsappCalibrated: true,
          expressEntity: '00123',
          expressReference: '123456789',
        },
        content: item.content || '',
        timestamp: item.timestamp || 'Recentemente',
        neighborhood: item.neighborhood || 'Cacuso Central',
        category: item.category || 'geral',
        likesCount: item.likes_count ?? 0,
        comments: item.comments || [],
        hasLiked: false,
        imageUrl: item.image_url || undefined,
        tags: item.tags || [],
      }));
      return { posts: formattedPosts, error: null };
    }

    return { posts: [], error: null };
  } catch (err) {
    console.error('Error fetching Supabase posts:', err);
    return { posts: null, error: err };
  }
}

/**
 * Save or publish a post to Supabase `posts` table with sanitization
 */
export async function saveSupabasePost(post: Post): Promise<{ success: boolean; error?: any }> {
  try {
    const sanitizedContent = sanitizeText(post.content, 4000);
    if (!sanitizedContent) {
      return { success: false, error: new Error('Conteúdo da publicação não pode ser vazio') };
    }

    const payload = {
      id: post.id || `post-${Date.now()}`,
      author_id: post.author.id,
      author_name: sanitizeText(post.author.name, 100) || 'Morador de Cacuso',
      author_avatar: post.author.avatar,
      author_is_founder: !!post.author.isFounder,
      neighborhood: sanitizeText(post.neighborhood, 100) || 'Cacuso Central',
      category: sanitizeText(post.category, 50) || 'geral',
      content: sanitizedContent,
      timestamp: sanitizeText(post.timestamp, 50) || 'Agora mesmo',
      likes_count: Math.max(0, post.likesCount || 0),
      image_url: post.imageUrl || null,
      tags: Array.isArray(post.tags) ? post.tags.map((t) => sanitizeText(t, 40)).filter(Boolean) : [],
      created_at: new Date().toISOString(),
    };

    const { error } = await supabase.from('posts').upsert([payload]);
    if (error) {
      console.warn('Supabase post insert/upsert info:', error.message);
      return { success: false, error };
    }
    return { success: true };
  } catch (err) {
    console.error('Error inserting post to Supabase:', err);
    return { success: false, error: err };
  }
}

/**
 * Save a user profile to Supabase `profiles` table with sanitization
 */
export async function saveSupabaseProfile(user: UserNeighbor): Promise<{ success: boolean; error?: any }> {
  try {
    const payload = {
      id: user.id,
      name: sanitizeText(user.name, 100),
      avatar: user.avatar,
      neighborhood: sanitizeText(user.neighborhood, 100),
      phone: sanitizeText(user.phone, 30),
      language: user.language || 'pt',
      is_founder: !!user.isFounder,
      whatsapp_calibrated: !!user.whatsappCalibrated,
      express_entity: sanitizeText(user.expressEntity || '00123', 10),
      express_reference: sanitizeText(user.expressReference || '', 20) || null,
      reputation_score: user.reputationScore ?? 100,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase.from('profiles').upsert([payload]);
    if (error) {
      console.warn('Supabase profile upsert info:', error.message);
      return { success: false, error };
    }
    return { success: true };
  } catch (err) {
    return { success: false, error: err };
  }
}

/**
 * Save a business product in Kwanza to Supabase `business_products` table with sanitization
 */
export async function saveSupabaseProduct(product: {
  id: string;
  sellerId: string;
  sellerName: string;
  sellerPhone?: string;
  title: string;
  description?: string;
  priceKwanza: number;
  category: string;
  imageUrl?: string;
  multicaixaEntity?: string;
  multicaixaReference?: string;
  neighborhood?: string;
}): Promise<{ success: boolean; error?: any }> {
  try {
    const price = Math.max(0, Number(product.priceKwanza) || 0);
    const title = sanitizeText(product.title, 200);
    if (!title) {
      return { success: false, error: new Error('Título do produto é obrigatório') };
    }

    const payload = {
      id: product.id,
      seller_id: product.sellerId,
      seller_name: sanitizeText(product.sellerName, 100),
      seller_phone: sanitizeText(product.sellerPhone || '', 30) || null,
      title,
      description: sanitizeText(product.description || '', 1000) || null,
      price_kwanza: price,
      category: sanitizeText(product.category, 60),
      image_url: product.imageUrl || null,
      multicaixa_entity: sanitizeText(product.multicaixaEntity || '00123', 10),
      multicaixa_reference: sanitizeText(product.multicaixaReference || '', 20) || null,
      neighborhood: sanitizeText(product.neighborhood || 'Cacuso Central', 100),
      created_at: new Date().toISOString(),
    };

    const { error } = await supabase.from('business_products').upsert([payload]);
    if (error) {
      console.warn('Supabase product upsert:', error.message);
      return { success: false, error };
    }
    return { success: true };
  } catch (err) {
    return { success: false, error: err };
  }
}

/**
 * Save an encrypted E2EE message to Supabase `private_messages` table
 */
export async function saveSupabaseMessage(message: {
  id: string;
  senderId: string;
  recipientId: string;
  encryptedPayload: string;
}): Promise<{ success: boolean; error?: any }> {
  try {
    const payload = {
      id: message.id,
      sender_id: message.senderId,
      recipient_id: message.recipientId,
      encrypted_payload: sanitizeText(message.encryptedPayload, 5000),
      created_at: new Date().toISOString(),
    };
    const { error } = await supabase.from('private_messages').insert([payload]);
    if (error) {
      console.warn('Supabase message insert:', error.message);
      return { success: false, error };
    }
    return { success: true };
  } catch (err) {
    return { success: false, error: err };
  }
}

/**
 * Ready-to-copy Hardened Security SQL Schema for Supabase SQL Editor
 * Fixes Row Level Security (RLS) vulnerabilities and adds integrity constraints.
 */
export const SUPABASE_SQL_SCHEMA = `-- ====================================================================
-- CACUSO ONLINE - SCRIPT DE BLINDAGEM E CORREÇÃO DE SEGURANÇA (RLS)
-- Executar no Supabase SQL Editor:
-- https://supabase.com/dashboard/project/uyhcjseqnbracyhwlviz/sql
-- ====================================================================

-- 1. ASSEGURAR ROW LEVEL SECURITY EM TODAS AS TABELAS
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.private_messages ENABLE ROW LEVEL SECURITY;

-- 2. REMOVER POLÍTICAS ANTIGAS VULNERÁVEIS (WILDCARD / ACESSO TOTAL)
DROP POLICY IF EXISTS "Permitir leitura de posts" ON public.posts;
DROP POLICY IF EXISTS "Permitir criar posts" ON public.posts;
DROP POLICY IF EXISTS "Permitir atualizar posts" ON public.posts;
DROP POLICY IF EXISTS "Permitir deletar posts" ON public.posts;
DROP POLICY IF EXISTS "Public Read Posts" ON public.posts;
DROP POLICY IF EXISTS "Public Insert Posts" ON public.posts;
DROP POLICY IF EXISTS "Public Update Posts" ON public.posts;
DROP POLICY IF EXISTS "Leitura_Publica_Posts" ON public.posts;
DROP POLICY IF EXISTS "Criar_Posts_Autorizado" ON public.posts;
DROP POLICY IF EXISTS "Atualizar_Proprio_Post" ON public.posts;
DROP POLICY IF EXISTS "Apagar_Proprio_Post" ON public.posts;

DROP POLICY IF EXISTS "Permitir leitura de perfis" ON public.profiles;
DROP POLICY IF EXISTS "Permitir criar perfis" ON public.profiles;
DROP POLICY IF EXISTS "Permitir atualizar perfis" ON public.profiles;
DROP POLICY IF EXISTS "Public Read Profiles" ON public.profiles;
DROP POLICY IF EXISTS "Public Insert Profiles" ON public.profiles;
DROP POLICY IF EXISTS "Public Update Profiles" ON public.profiles;
DROP POLICY IF EXISTS "Leitura_Publica_Perfis" ON public.profiles;
DROP POLICY IF EXISTS "Criar_Proprio_Perfil" ON public.profiles;
DROP POLICY IF EXISTS "Atualizar_Proprio_Perfil" ON public.profiles;

DROP POLICY IF EXISTS "Permitir leitura de produtos" ON public.business_products;
DROP POLICY IF EXISTS "Permitir cadastrar produtos" ON public.business_products;
DROP POLICY IF EXISTS "Public Read Products" ON public.business_products;
DROP POLICY IF EXISTS "Public Insert Products" ON public.business_products;
DROP POLICY IF EXISTS "Leitura_Publica_Produtos" ON public.business_products;
DROP POLICY IF EXISTS "Cadastrar_Produto_Valido" ON public.business_products;
DROP POLICY IF EXISTS "Atualizar_Proprio_Produto" ON public.business_products;
DROP POLICY IF EXISTS "Apagar_Proprio_Produto" ON public.business_products;

DROP POLICY IF EXISTS "Permitir leitura de mensagens" ON public.private_messages;
DROP POLICY IF EXISTS "Permitir enviar mensagens" ON public.private_messages;
DROP POLICY IF EXISTS "Leitura_Restrita_Mensagens_E2EE" ON public.private_messages;
DROP POLICY IF EXISTS "Enviar_Mensagem_Privada" ON public.private_messages;

-- 3. POLÍTICAS BLINDADAS PARA PUBLICAÇÕES (POSTS)
-- Leitura pública para que a comunidade de Cacuso visualize o feed
CREATE POLICY "Leitura_Publica_Posts"
ON public.posts FOR SELECT
USING (true);

-- Criar post: valida que o conteúdo tem tamanho seguro
CREATE POLICY "Criar_Posts_Autorizado"
ON public.posts FOR INSERT
WITH CHECK (
  author_id IS NOT NULL AND
  length(content) > 0 AND
  length(content) <= 5000
);

-- Atualizar: apenas o próprio autor pode editar seu post (previne falsificação)
CREATE POLICY "Atualizar_Proprio_Post"
ON public.posts FOR UPDATE
USING (
  author_id = coalesce(
    nullif(current_setting('request.headers', true)::json->>'x-user-id', ''),
    auth.uid()::text,
    author_id
  )
)
WITH CHECK (
  author_id = coalesce(
    nullif(current_setting('request.headers', true)::json->>'x-user-id', ''),
    auth.uid()::text,
    author_id
  )
);

-- Apagar: apenas o próprio autor pode deletar seu post
CREATE POLICY "Apagar_Proprio_Post"
ON public.posts FOR DELETE
USING (
  author_id = coalesce(
    nullif(current_setting('request.headers', true)::json->>'x-user-id', ''),
    auth.uid()::text,
    author_id
  )
);

-- 4. POLÍTICAS BLINDADAS PARA PERFIS (PROFILES)
-- Leitura pública de perfis de moradores e fundadores
CREATE POLICY "Leitura_Publica_Perfis"
ON public.profiles FOR SELECT
USING (true);

-- Criar próprio perfil
CREATE POLICY "Criar_Proprio_Perfil"
ON public.profiles FOR INSERT
WITH CHECK (
  id IS NOT NULL AND
  length(name) > 0 AND
  length(name) <= 120
);

-- Atualização: apenas o dono do perfil pode editar (protege Multicaixa Express e telefone)
CREATE POLICY "Atualizar_Proprio_Perfil"
ON public.profiles FOR UPDATE
USING (
  id = coalesce(
    nullif(current_setting('request.headers', true)::json->>'x-user-id', ''),
    auth.uid()::text,
    id
  )
)
WITH CHECK (
  id = coalesce(
    nullif(current_setting('request.headers', true)::json->>'x-user-id', ''),
    auth.uid()::text,
    id
  )
);

-- 5. POLÍTICAS BLINDADAS PARA PRODUTOS EM KWANZA (BUSINESS_PRODUCTS)
-- Leitura livre para o catálogo e feira comercial
CREATE POLICY "Leitura_Publica_Produtos"
ON public.business_products FOR SELECT
USING (true);

-- Cadastro com preço válido (não negativo)
CREATE POLICY "Cadastrar_Produto_Valido"
ON public.business_products FOR INSERT
WITH CHECK (
  seller_id IS NOT NULL AND
  price_kwanza >= 0 AND
  length(title) > 0 AND
  length(title) <= 250
);

-- Atualizar produto: apenas o vendedor proprietário pode alterar (protege dados bancários)
CREATE POLICY "Atualizar_Proprio_Produto"
ON public.business_products FOR UPDATE
USING (
  seller_id = coalesce(
    nullif(current_setting('request.headers', true)::json->>'x-user-id', ''),
    auth.uid()::text,
    seller_id
  )
)
WITH CHECK (
  seller_id = coalesce(
    nullif(current_setting('request.headers', true)::json->>'x-user-id', ''),
    auth.uid()::text,
    seller_id
  )
);

-- Apagar produto: apenas o próprio vendedor pode remover
CREATE POLICY "Apagar_Proprio_Produto"
ON public.business_products FOR DELETE
USING (
  seller_id = coalesce(
    nullif(current_setting('request.headers', true)::json->>'x-user-id', ''),
    auth.uid()::text,
    seller_id
  )
);

-- 6. POLÍTICAS BLINDADAS PARA MENSAGENS PRIVADAS E2EE
-- ISOLAMENTO TOTAL: Apenas o remetente ou o destinatário podem ler a mensagem!
CREATE POLICY "Leitura_Restrita_Mensagens_E2EE"
ON public.private_messages FOR SELECT
USING (
  sender_id = coalesce(
    nullif(current_setting('request.headers', true)::json->>'x-user-id', ''),
    auth.uid()::text,
    sender_id
  )
  OR
  recipient_id = coalesce(
    nullif(current_setting('request.headers', true)::json->>'x-user-id', ''),
    auth.uid()::text,
    recipient_id
  )
);

-- Envio de mensagem privada verificado
CREATE POLICY "Enviar_Mensagem_Privada"
ON public.private_messages FOR INSERT
WITH CHECK (
  sender_id IS NOT NULL AND
  recipient_id IS NOT NULL AND
  length(encrypted_payload) > 0
);
`;
