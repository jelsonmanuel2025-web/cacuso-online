import React, { useState } from 'react';
import { 
  Sparkles, 
  Award, 
  ShieldCheck, 
  Clock, 
  Handshake, 
  Recycle, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Lock,
  ArrowRight
} from 'lucide-react';
import { FOUNDERS } from '../mockData';

interface SocialInnovationBannerProps {
  onOpenFoundersModal: () => void;
  onOpenPrivacyModal: () => void;
}

export const SocialInnovationBanner: React.FC<SocialInnovationBannerProps> = ({
  onOpenFoundersModal,
  onOpenPrivacyModal,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-linear-to-r from-blue-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-4 sm:p-5 shadow-sm border border-blue-800/40 relative overflow-hidden mb-4">
      {/* Subtle ambient lighting */}
      <div className="absolute -top-10 -right-10 w-44 h-44 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="bg-amber-400 text-amber-950 font-black text-[11px] uppercase tracking-wider px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
              <Award className="w-3.5 h-3.5" /> Criadores Oficiais
            </span>
            <span className="text-xs font-semibold text-blue-200">
              Jelson Pereira Manuel &amp; Liron Kilson
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Lock className="w-3 h-3 text-emerald-400" />
              Soberania &amp; Criptografia E2EE
            </span>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-200 hover:text-white text-xs font-medium flex items-center gap-1 cursor-pointer transition-colors"
              id="toggle-innovation-banner-btn"
            >
              {isExpanded ? (
                <>Menos detalhes <ChevronUp className="w-3.5 h-3.5" /></>
              ) : (
                <>Por que supera o Facebook? <ChevronDown className="w-3.5 h-3.5" /></>
              )}
            </button>
          </div>
        </div>

        {/* Core Headline */}
        <div className="mb-2">
          <h2 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-2">
            <span>Cacuso Online: A Rede Social Que Devolve o Poder à Comunidade</span>
            <Sparkles className="w-4 h-4 text-amber-300 hidden sm:inline" />
          </h2>
          <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed max-w-3xl mt-1">
            Diferente das redes tradicionais baseadas em vigilância e algoritmos de vício, o Cacuso Online foi projetado por <strong className="text-white font-bold">Jelson Pereira Manuel</strong> e <strong className="text-white font-bold">Liron Kilson</strong> como uma infraestrutura comunitária ética: 100% cronológica, com troca de serviços solidários sem custo, marketplace regional e gestão ecológica de resíduos.
          </p>
        </div>

        {/* Pillars Strip (Always visible or expanded) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 pt-3 border-t border-white/10">
          <div className="bg-white/5 hover:bg-white/10 p-2.5 rounded-xl border border-white/10 transition-colors">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs mb-1">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Privacidade Total</span>
            </div>
            <p className="text-[11px] text-blue-200/80 leading-snug">
              Sem venda de dados pessoais, sem anúncios invasivos.
            </p>
          </div>

          <div className="bg-white/5 hover:bg-white/10 p-2.5 rounded-xl border border-white/10 transition-colors">
            <div className="flex items-center gap-1.5 text-blue-400 font-bold text-xs mb-1">
              <Clock className="w-4 h-4 shrink-0" />
              <span>Feed Cronológico</span>
            </div>
            <p className="text-[11px] text-blue-200/80 leading-snug">
              Ordem real do tempo, sem algoritmos que causam discórdia.
            </p>
          </div>

          <div className="bg-white/5 hover:bg-white/10 p-2.5 rounded-xl border border-white/10 transition-colors">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs mb-1">
              <Handshake className="w-4 h-4 shrink-0" />
              <span>Troca Sem Custo</span>
            </div>
            <p className="text-[11px] text-blue-200/80 leading-snug">
              Banco de Tempo solidário: habilidades e apoio mútuo.
            </p>
          </div>

          <div className="bg-white/5 hover:bg-white/10 p-2.5 rounded-xl border border-white/10 transition-colors">
            <div className="flex items-center gap-1.5 text-teal-400 font-bold text-xs mb-1">
              <Recycle className="w-4 h-4 shrink-0" />
              <span>Eco-Sustentabilidade</span>
            </div>
            <p className="text-[11px] text-blue-200/80 leading-snug">
              Gestão comunitária de resíduos e ecopontos locais.
            </p>
          </div>
        </div>

        {/* Expanded In-depth Comparison with Traditional Platforms (Facebook etc.) */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-white/15 bg-black/20 rounded-xl p-3.5 space-y-3">
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
              Comparativo de Inovação Social: Cacuso Online vs. Redes Tradicionais (Facebook)
            </h4>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/20 text-slate-300">
                    <th className="py-1.5 pr-3 font-semibold">Aspecto</th>
                    <th className="py-1.5 px-3 font-semibold text-rose-300">Plataformas Tradicionais (Facebook)</th>
                    <th className="py-1.5 pl-3 font-semibold text-emerald-300">Cacuso Online (Inovação Local)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-[11px]">
                  <tr>
                    <td className="py-2 pr-3 font-medium text-white">Privacidade &amp; Vigilância</td>
                    <td className="py-2 px-3 text-slate-300">Coleta dados para vender anúncios direcionados</td>
                    <td className="py-2 pl-3 text-emerald-200 font-semibold">Criptografia E2EE e zero perfilamento comercial</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-3 font-medium text-white">Feed de Notícias</td>
                    <td className="py-2 px-3 text-slate-300">Algoritmo de engajamento que privilegia polêmicas</td>
                    <td className="py-2 pl-3 text-emerald-200 font-semibold">Cronológico estrito: você vê o que os vizinhos postam</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-3 font-medium text-white">Economia do Bairro</td>
                    <td className="py-2 px-3 text-slate-300">Cobrança de taxas ou anúncios promovidos pagos</td>
                    <td className="py-2 pl-3 text-emerald-200 font-semibold">Fórum de serviços 100% sem custo e marketplace justo</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-3 font-medium text-white">Reputação</td>
                    <td className="py-2 px-3 text-slate-300">Controle centralizado opaco e suscetível a bloqueios</td>
                    <td className="py-2 pl-3 text-emerald-200 font-semibold">Descentralizada: selos concedidos por vizinhos reais</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-3 font-medium text-white">Impacto Ecológico</td>
                    <td className="py-2 px-3 text-slate-300">Nenhuma integração com gestão ambiental do município</td>
                    <td className="py-2 pl-3 text-emerald-200 font-semibold">EcoCacuso: Ecopontos e monitoramento de resíduos</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
              <p className="text-[11px] text-slate-300 italic">
                &ldquo;A verdadeira tecnologia serve para unir pessoas na vida real, proteger sua dignidade e preservar a nossa terra.&rdquo; — Jelson Pereira Manuel &amp; Liron Kilson
              </p>
              <button
                onClick={onOpenFoundersModal}
                className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold rounded-lg text-xs flex items-center gap-1 transition-colors cursor-pointer"
                id="banner-meet-founders-btn"
              >
                <span>Conhecer os Criadores Oficiais</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
