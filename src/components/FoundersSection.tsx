import React from 'react';
import { 
  Award, 
  Sparkles, 
  ShieldCheck, 
  Lock, 
  Heart, 
  Code2, 
  Globe, 
  Users, 
  CheckCircle2, 
  Leaf, 
  Handshake, 
  ArrowRight, 
  Key,
  X,
  Clock
} from 'lucide-react';
import { FOUNDERS } from '../mockData';
import { UserNeighbor } from '../types';

interface FoundersSectionProps {
  onOpenE2EEChatWith?: (founder: UserNeighbor) => void;
  isModal?: boolean;
  onCloseModal?: () => void;
}

export const FoundersSection: React.FC<FoundersSectionProps> = ({
  onOpenE2EEChatWith,
  isModal = false,
  onCloseModal,
}) => {
  return (
    <div className={`space-y-4 ${isModal ? 'p-1' : ''}`}>
      {/* Header Banner */}
      <div className="bg-linear-to-br from-blue-950 via-slate-900 to-indigo-950 text-white rounded-2xl p-5 sm:p-7 shadow-sm border border-blue-800/40 relative overflow-hidden">
        {isModal && onCloseModal && (
          <button
            onClick={onCloseModal}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <div className="flex items-center gap-2 mb-3">
          <span className="bg-amber-400 text-amber-950 font-black text-xs uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
            <Award className="w-4 h-4" /> Criadores Oficiais &amp; Inovação Social
          </span>
          <span className="text-xs text-blue-300 font-medium">
            Município de Cacuso • Angola
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2">
          Jelson Pereira Manuel &amp; Liron Kilson
        </h2>
        <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed max-w-3xl">
          Dois visionários que uniram forças para construir o <strong className="text-white">Cacuso Online</strong>: uma rede social de nova geração que supera o modelo do Facebook ao eliminar o capitalismo de vigilância e priorizar o bem-estar comunitário, a sustentabilidade ecológica e a segurança das famílias locais.
        </p>
      </div>

      {/* Founders Profiles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {FOUNDERS.map((founder) => (
          <div
            key={founder.id}
            className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4 hover:border-blue-300 transition-colors"
            id={`founder-card-${founder.id}`}
          >
            <div className="space-y-3">
              <div className="flex items-start gap-3.5">
                <img
                  src={founder.avatar}
                  alt={founder.name}
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-blue-700/30 shrink-0 shadow-xs"
                />
                <div className="overflow-hidden">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h3 className="font-bold text-slate-900 text-base">{founder.name}</h3>
                    <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
                      <CheckCircle2 className="w-2.5 h-2.5 text-blue-600" /> Oficial
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-blue-700 mt-0.5">{founder.roleTitle}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{founder.neighborhood}</p>
                </div>
              </div>

              {/* Bio & Focus */}
              <p className="text-xs text-slate-600 leading-relaxed">
                {founder.id === 'founder-jelson' ? (
                  <>
                    <strong>Jelson Pereira Manuel</strong> lidera o desenho da arquitetura de impacto social e a organização comunitária de Cacuso. Defensor fervoroso de que a tecnologia deve empoderar a vizinhança na vida real, articulou o sistema de banco de tempo sem custos monetários e a gestão sustentável de resíduos.
                  </>
                ) : (
                  <>
                    <strong>Liron Kilson</strong> arquiteta as camadas de criptografia ponta-a-ponta (E2EE), soberania digital e o modelo de reputação descentralizado. Garantindo que nenhum algoritmo predatório determine o que a população consome e que as conversas privadas pertençam estritamente aos cidadãos.
                  </>
                )}
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {founder.badges.map((badge) => (
                  <span
                    key={badge}
                    className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200/60"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              {/* Cryptographic Key Verification */}
              <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-200 text-[11px] font-mono text-slate-600 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-blue-700" />
                  Chave P2P: {founder.keyFingerprint}
                </span>
                <span className="text-emerald-700 font-sans font-bold text-[10px] bg-emerald-50 px-1.5 py-0.5 rounded-sm">
                  Auditada
                </span>
              </div>
            </div>

            {/* Action */}
            {onOpenE2EEChatWith && (
              <button
                onClick={() => onOpenE2EEChatWith(founder)}
                className="w-full py-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                id={`chat-founder-${founder.id}`}
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Conversar com {founder.name.split(' ')[0]} via E2EE</span>
              </button>
            )}
          </div>
        ))}
      </div>

      {/* The Social Innovation Manifesto: How Cacuso Online Surpasses Facebook */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <h3 className="font-bold text-slate-900 text-base">
            O Manifesto de Inovação Social: Por que Cacuso Online Supera o Facebook
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70 space-y-1.5">
            <div className="flex items-center gap-1.5 text-blue-700 font-bold text-xs">
              <ShieldCheck className="w-4 h-4" />
              <span>1. Soberania &amp; Privacidade Pura</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              O Facebook monetiza a atenção e vende perfis comportamentais. No Cacuso Online, os dados pertencem ao usuário e todas as mensagens contam com criptografia de ponta a ponta.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70 space-y-1.5">
            <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-xs">
              <Handshake className="w-4 h-4" />
              <span>2. Banco de Tempo Sem Dinheiro</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Troca gratuita de serviços: reforço escolar, reparos mecânicos, caronas e apoio a idosos. Solidariedade real em vez de anúncios pagos.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70 space-y-1.5">
            <div className="flex items-center gap-1.5 text-teal-700 font-bold text-xs">
              <Leaf className="w-4 h-4" />
              <span>3. Sustentabilidade &amp; EcoCacuso</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Gestão comunitária de resíduos, mapa de ecopontos e incentivo à compostagem coletiva para hortas familiares do município.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70 space-y-1.5">
            <div className="flex items-center gap-1.5 text-purple-700 font-bold text-xs">
              <Clock className="w-4 h-4" />
              <span>4. Feed Cronológico Sem Vício</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Sem feeds que promovem polarização para reter o usuário. Você vê exatamente o que os seus vizinhos postaram, em ordem de tempo.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70 space-y-1.5">
            <div className="flex items-center gap-1.5 text-amber-700 font-bold text-xs">
              <Award className="w-4 h-4" />
              <span>5. Reputação Descentralizada</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Selos de confiança validados por vizinhos conhecidos através de transações justas, sem algoritmos opacos de censura centralizada.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70 space-y-1.5">
            <div className="flex items-center gap-1.5 text-indigo-700 font-bold text-xs">
              <Globe className="w-4 h-4" />
              <span>6. Economia Regional de Cacuso</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Marketplace direto para pequenos agricultores de mandioca, mel silvestre e artesãos da nossa terra, sem taxas corporativas.
            </p>
          </div>
        </div>

        <div className="p-4 bg-blue-50/70 rounded-xl border border-blue-100 flex items-center justify-between flex-wrap gap-2 text-xs">
          <p className="text-blue-950 font-medium">
            Dúvidas ou sugestões para a expansão do Cacuso Online? Converse diretamente com os criadores via chat seguro.
          </p>
          <span className="text-blue-700 font-bold">
            Feito com dedicação em Cacuso, Angola
          </span>
        </div>
      </div>

      {/* Biografia Oficial do Fundador (solicitada expressamente para constar no fim) */}
      <div className="bg-linear-to-b from-white to-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-200">
          <div className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center font-black text-sm shadow-xs">
            LK
          </div>
          <div>
            <span className="text-[11px] font-bold text-amber-600 uppercase tracking-widest block">
              Documento Histórico Oficial
            </span>
            <h3 className="text-lg font-black text-slate-900 leading-tight">
              Biografia do Fundador
            </h3>
          </div>
        </div>

        {/* Verbatim text as provided by the user */}
        <div className="space-y-3.5 text-slate-700 text-xs sm:text-sm leading-relaxed">
          <p>
            <strong>Jelson Pereira Manuel</strong>, conhecido artisticamente como <strong>Liron Kilson</strong>, é natural da província de Malanje, município de Cacuso, concretamente do <strong>Bairro Kilamba Kiaxe</strong>.
          </p>

          <p>
            Filho de Francisco José Manuel e Isabel Domingos Pereira, Jelson cresceu ligado à sua comunidade e desenvolveu uma forte visão sobre o potencial de Cacuso e das pessoas que fazem parte da sua história.
          </p>

          <p>
            Movido pelo desejo de aproximar pessoas, divulgar talentos, valorizar iniciativas locais e fortalecer a comunicação dentro da comunidade, idealizou o <strong>Cacuso Online</strong>, uma plataforma criada para conectar Cacuso ao mundo através da tecnologia.
          </p>

          <p>
            O Cacuso Online nasce como um espaço digital dedicado à comunidade, permitindo que pessoas, jovens, criadores, empreendedores, artistas e organizações tenham um lugar para partilhar ideias, informações, histórias e oportunidades.
          </p>

          <p>
            Mais do que uma rede social, o projeto representa uma visão de futuro: um Cacuso mais conectado, participativo e digitalmente presente.
          </p>
        </div>

        {/* Official Closing & Signature */}
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-100">
          <div>
            <h4 className="font-black text-slate-900 text-sm">Cacuso Online</h4>
            <p className="text-xs text-blue-700 font-semibold italic">
              Conectando Cacuso ao mundo.
            </p>
          </div>
          <div className="text-left sm:text-right">
            <span className="text-xs font-bold text-slate-700 block">12 de Junho de 2026</span>
            <span className="text-xs font-black tracking-wider text-amber-700 uppercase bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 inline-block mt-0.5">
              WayamSt
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
