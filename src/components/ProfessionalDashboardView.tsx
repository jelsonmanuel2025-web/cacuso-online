import React, { useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  Eye, 
  Heart, 
  DollarSign, 
  Award, 
  CheckCircle2, 
  ArrowUpRight, 
  Calendar, 
  Filter, 
  Star, 
  Share2, 
  ShieldCheck, 
  Sparkles, 
  Layers,
  ChevronRight,
  BarChart3,
  SlidersHorizontal,
  Flame
} from 'lucide-react';
import { UserNeighbor, ProfessionalMetrics } from '../types';

interface ProfessionalDashboardViewProps {
  currentUser: UserNeighbor;
  metrics: ProfessionalMetrics;
  onOpenCreatePost: () => void;
}

export const ProfessionalDashboardView: React.FC<ProfessionalDashboardViewProps> = ({
  currentUser,
  metrics,
  onOpenCreatePost,
}) => {
  const [timeRange, setTimeRange] = useState<'28d' | '7d' | '90d'>('28d');
  const [activeTab, setActiveTab] = useState<'visao_geral' | 'conteudo' | 'monetizacao'>('visao_geral');

  // Daily points for the performance chart
  const CHART_DATA = [
    { day: 'Dia 1', reach: 6200, eng: 1200 },
    { day: 'Dia 5', reach: 8400, eng: 1800 },
    { day: 'Dia 9', reach: 11200, eng: 2400 },
    { day: 'Dia 13', reach: 9800, eng: 2100 },
    { day: 'Dia 17', reach: 15400, eng: 3400 },
    { day: 'Dia 21', reach: 18900, eng: 4200 },
    { day: 'Dia 25', reach: 22400, eng: 5100 },
    { day: 'Dia 28', reach: 28400, eng: 6300 },
  ];

  return (
    <div className="max-w-5xl mx-auto py-4 px-2 sm:px-4 space-y-5">
      {/* Facebook Professional Dashboard Header */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-sm relative overflow-hidden">
        {/* Subtle Angolan Gold Accent Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover ring-4 ring-blue-600/30 shadow-md"
              />
              <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center ring-2 ring-white">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {currentUser.name}
                </h1>
                <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-blue-600" />
                  Modo Profissional Ativo
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Painel Profissional do Facebook • Criador de Conteúdo Verificado
              </p>
              <div className="flex items-center gap-4 text-xs font-semibold text-slate-700 mt-2">
                <span>
                  <strong className="text-slate-900 font-bold">{currentUser.followersCount?.toLocaleString() || '18.450'}</strong> seguidores
                </span>
                <span>•</span>
                <span>
                  <strong className="text-slate-900 font-bold">{currentUser.followingCount || '320'}</strong> a seguir
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenCreatePost}
              className="px-4 py-2.5 bg-blue-700 hover:bg-blue-800 active:scale-95 text-white font-bold text-xs sm:text-sm rounded-xl cursor-pointer shadow-sm transition-all flex items-center gap-2"
              id="dash-create-content-btn"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Criar Publicação</span>
            </button>
          </div>
        </div>

        {/* Creator Journey Progress Level (Facebook Level 3) */}
        <div className="mt-6 pt-5 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-bold text-slate-800 flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-500" />
              Nível do Modo Profissional: Nível 3 (Máximo Concluído)
            </span>
            <span className="font-bold text-emerald-600">100% Completo</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-linear-to-r from-blue-600 via-amber-400 to-emerald-500 w-full rounded-full" />
          </div>
          <p className="text-[11px] text-slate-500 mt-1.5">
            Parabéns! Desbloqueaste todas as ferramentas de monetização com Estrelas, estatísticas detalhadas e assistência de moderação.
          </p>
        </div>
      </div>

      {/* Navigation Sub-Tabs: Visão Geral | Conteúdo | Monetização */}
      <div className="flex items-center gap-2 border-b border-slate-200/80 pb-1">
        <button
          onClick={() => setActiveTab('visao_geral')}
          className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl cursor-pointer transition-all ${
            activeTab === 'visao_geral'
              ? 'bg-blue-700 text-white shadow-xs'
              : 'bg-white/80 text-slate-700 hover:bg-white'
          }`}
        >
          Visão Geral &amp; Métricas
        </button>
        <button
          onClick={() => setActiveTab('conteudo')}
          className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl cursor-pointer transition-all ${
            activeTab === 'conteudo'
              ? 'bg-blue-700 text-white shadow-xs'
              : 'bg-white/80 text-slate-700 hover:bg-white'
          }`}
        >
          Desempenho de Conteúdo
        </button>
        <button
          onClick={() => setActiveTab('monetizacao')}
          className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl cursor-pointer transition-all ${
            activeTab === 'monetizacao'
              ? 'bg-blue-700 text-white shadow-xs'
              : 'bg-white/80 text-slate-700 hover:bg-white'
          }`}
        >
          Monetização &amp; Estrelas
        </button>
      </div>

      {activeTab === 'visao_geral' && (
        <>
          {/* Key Insights 4-Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {/* Reach */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-semibold">Alcance das Contas</span>
                <Users className="w-4 h-4 text-blue-600" />
              </div>
              <p className="text-2xl font-black text-slate-900 tracking-tight">
                {metrics.reach.value.toLocaleString()}
              </p>
              <div className="flex items-center gap-1 mt-1 text-xs font-bold text-emerald-600">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>+{metrics.reach.percentChange}% vs últimos 28 dias</span>
              </div>
            </div>

            {/* Engagement */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-semibold">Envolvimento com Posts</span>
                <Heart className="w-4 h-4 text-rose-600" />
              </div>
              <p className="text-2xl font-black text-slate-900 tracking-tight">
                {metrics.engagement.value.toLocaleString()}
              </p>
              <div className="flex items-center gap-1 mt-1 text-xs font-bold text-emerald-600">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>+{metrics.engagement.percentChange}% vs últimos 28 dias</span>
              </div>
            </div>

            {/* Net Followers */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-semibold">Novos Seguidores Líquidos</span>
                <TrendingUp className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="text-2xl font-black text-slate-900 tracking-tight">
                +{metrics.netFollowers.value.toLocaleString()}
              </p>
              <div className="flex items-center gap-1 mt-1 text-xs font-bold text-emerald-600">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>+{metrics.netFollowers.percentChange}% vs últimos 28 dias</span>
              </div>
            </div>

            {/* 3-sec Video Views */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-semibold">Visualizações de Vídeo (3s)</span>
                <Eye className="w-4 h-4 text-amber-600" />
              </div>
              <p className="text-2xl font-black text-slate-900 tracking-tight">
                {metrics.threeSecViews.value.toLocaleString()}
              </p>
              <div className="flex items-center gap-1 mt-1 text-xs font-bold text-emerald-600">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>+{metrics.threeSecViews.percentChange}% vs últimos 28 dias</span>
              </div>
            </div>
          </div>

          {/* Performance Chart Component */}
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
              <div>
                <h3 className="font-bold text-base text-slate-900">Crescimento de Alcance &amp; Interações</h3>
                <p className="text-xs text-slate-500">Evolução do teu público em Cacuso e Angola</p>
              </div>

              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
                {(['7d', '28d', '90d'] as const).map(range => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-3 py-1 rounded-lg font-bold cursor-pointer transition-all ${
                      timeRange === range
                        ? 'bg-white text-blue-700 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {range === '7d' ? '7 dias' : range === '28d' ? 'Últimos 28 dias' : '90 dias'}
                  </button>
                ))}
              </div>
            </div>

            {/* Visual Bar Chart */}
            <div className="h-48 sm:h-56 flex items-end gap-2 sm:gap-4 pt-6 pb-2 border-b border-slate-100">
              {CHART_DATA.map((item, idx) => {
                const maxReach = 30000;
                const reachHeightPercent = Math.round((item.reach / maxReach) * 100);
                const engHeightPercent = Math.round((item.eng / 8000) * 80);

                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group relative">
                    {/* Tooltip on hover */}
                    <div className="absolute -top-12 bg-slate-900 text-white text-[10px] py-1 px-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20 shadow-lg">
                      <span className="font-bold text-amber-400">{item.reach.toLocaleString()} pessoas</span>
                      <br />
                      <span>{item.eng.toLocaleString()} interações</span>
                    </div>

                    <div className="w-full max-w-[28px] flex items-end justify-center gap-0.5 h-full">
                      {/* Reach bar */}
                      <div
                        style={{ height: `${reachHeightPercent}%` }}
                        className="w-1/2 bg-blue-600 group-hover:bg-blue-700 rounded-t-md transition-all"
                      />
                      {/* Engagement bar */}
                      <div
                        style={{ height: `${engHeightPercent}%` }}
                        className="w-1/2 bg-amber-400 group-hover:bg-amber-500 rounded-t-md transition-all"
                      />
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium">{item.day}</span>
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-6 mt-4 text-xs font-semibold text-slate-600">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-xs bg-blue-600" />
                <span>Alcance de Pessoas</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-xs bg-amber-400" />
                <span>Interações / Reações</span>
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'conteudo' && (
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-slate-900">Conteúdos de Melhor Desempenho</h3>
              <p className="text-xs text-slate-500">Publicações e Reels com maior retorno orgânico</p>
            </div>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full">
              Taxa de Viralidade: 9.4%
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-3">Título / Publicação</th>
                  <th className="py-3 px-3">Formato</th>
                  <th className="py-3 px-3">Data</th>
                  <th className="py-3 px-3 text-right">Impressões</th>
                  <th className="py-3 px-3 text-right">Interações</th>
                  <th className="py-3 px-3 text-right">Partilhas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {metrics.recentContentPerformance.map(item => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 font-semibold text-slate-900 max-w-xs truncate">
                      {item.title}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                        item.type === 'reel' ? 'bg-pink-100 text-pink-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {item.type === 'reel' ? 'Reel' : 'Post'}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-500">{item.publishedAt}</td>
                    <td className="py-3 px-3 text-right font-bold text-slate-900">
                      {item.impressions.toLocaleString()}
                    </td>
                    <td className="py-3 px-3 text-right font-bold text-emerald-600">
                      {item.interactions.toLocaleString()}
                    </td>
                    <td className="py-3 px-3 text-right font-bold text-blue-600">
                      {item.shares.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'monetizacao' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Facebook Stars Earnings */}
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <Star className="w-6 h-6 fill-amber-400 text-amber-500" />
              </div>
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
                Ativo &amp; Pagamentos Verificados
              </span>
            </div>

            <div>
              <h3 className="font-bold text-lg text-slate-900">Estrelas do Facebook</h3>
              <p className="text-xs text-slate-500">
                Ganhos acumulados através de doações de fãs em vídeos e lives em Cacuso.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <div className="flex items-baseline justify-between mb-1">
                <span className="text-xs text-slate-600">Saldo Disponível:</span>
                <span className="text-2xl font-black text-slate-900">
                  {metrics.earningsKz.toLocaleString()} Kz
                </span>
              </div>
              <div className="flex justify-between text-xs text-slate-500">
                <span>Total de Estrelas:</span>
                <span className="font-bold text-amber-600">{metrics.starsCount.toLocaleString()} ⭐</span>
              </div>
            </div>

            <button 
              onClick={() => alert('Transferência bancária para conta angolana solicitada com sucesso!')}
              className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl cursor-pointer shadow-xs transition-colors"
            >
              Transferir Ganhos para Conta Bancária (IBAN)
            </button>
          </div>

          {/* Bonus and Subscriptions */}
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
                <DollarSign className="w-6 h-6" />
              </div>
              <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
                Elegível
              </span>
            </div>

            <div>
              <h3 className="font-bold text-lg text-slate-900">Bónus de Criador Regional</h3>
              <p className="text-xs text-slate-500">
                Incentivo para criadores que publicam conteúdo cultural e comunitário autêntico de Angola.
              </p>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="font-semibold text-slate-800">Bónus Reels Play (Angola):</span>
                <span className="text-emerald-600 font-bold">Ativo</span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="font-semibold text-slate-800">Assinaturas de Apoiantes:</span>
                <span className="text-blue-600 font-bold">Pronto para ativar</span>
              </div>
            </div>

            <div className="pt-2">
              <p className="text-[11px] text-slate-400 leading-tight">
                * Os pagamentos são processados pontualmente no dia 21 de cada mês através do sistema financeiro nacional.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
