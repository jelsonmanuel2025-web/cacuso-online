import React, { useState } from 'react';
import { 
  Handshake, 
  PlusCircle, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  MessageSquareLock, 
  Search, 
  Filter,
  Sparkles,
  Heart,
  Wrench,
  BookOpen,
  Sprout,
  Car,
  Laptop,
  Check
} from 'lucide-react';
import { ServiceSwap, UserNeighbor } from '../types';

interface ServiceSwapForumProps {
  services: ServiceSwap[];
  currentUser: UserNeighbor;
  onAddService: (newService: Omit<ServiceSwap, 'id' | 'createdAt' | 'interestedCount'>) => void;
  onOpenE2EEChatWith: (neighbor: UserNeighbor) => void;
  selectedNeighborhood: string;
}

export const ServiceSwapForum: React.FC<ServiceSwapForumProps> = ({
  services,
  currentUser,
  onAddService,
  onOpenE2EEChatWith,
  selectedNeighborhood,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [activeType, setActiveType] = useState<'todos' | 'oferta' | 'pedido'>('todos');
  const [searchQuery, setSearchQuery] = useState('');

  // Form State
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'oferta' | 'pedido'>('oferta');
  const [category, setCategory] = useState<ServiceSwap['category']>('reparos');
  const [description, setDescription] = useState('');
  const [compensation, setCompensation] = useState('Sem custo monetário - Banco de Tempo / Troca por ajuda');
  const [neighborhood, setNeighborhood] = useState(
    selectedNeighborhood === 'Todos os Bairros' ? currentUser.neighborhood.split(',')[0] : selectedNeighborhood
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    onAddService({
      title,
      type,
      category,
      description,
      compensation,
      provider: currentUser,
      neighborhood,
      status: 'aberto',
      hasExpressedInterest: false,
    });

    setTitle('');
    setDescription('');
    setShowForm(false);
  };

  const filteredServices = services.filter((srv) => {
    const matchesNeighborhood = 
      selectedNeighborhood === 'Todos os Bairros' || 
      srv.neighborhood.toLowerCase().includes(selectedNeighborhood.toLowerCase().replace('bairro ', ''));

    const matchesCategory = 
      activeCategory === 'todos' || srv.category === activeCategory;

    const matchesType = 
      activeType === 'todos' || srv.type === activeType;

    const matchesSearch = 
      srv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      srv.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesNeighborhood && matchesCategory && matchesType && matchesSearch;
  });

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'educacao': return <BookOpen className="w-3.5 h-3.5" />;
      case 'reparos': return <Wrench className="w-3.5 h-3.5" />;
      case 'agricultura': return <Sprout className="w-3.5 h-3.5" />;
      case 'transporte': return <Car className="w-3.5 h-3.5" />;
      case 'tecnologia': return <Laptop className="w-3.5 h-3.5" />;
      default: return <Handshake className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Hero Header for Free Service Swap */}
      <div className="bg-linear-to-r from-emerald-800 to-teal-900 text-white rounded-2xl p-4 sm:p-5 shadow-sm border border-emerald-700/40 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <span className="bg-emerald-400 text-emerald-950 font-bold text-xs uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Handshake className="w-3.5 h-3.5" /> 100% Sem Custo Monetário
            </span>
            <span className="text-xs text-emerald-200">
              Banco de Tempo Comunitário de Cacuso
            </span>
          </div>

          <h2 className="text-lg sm:text-xl font-bold text-white mb-1">
            Fórum Solidário de Troca de Serviços
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-2xl mb-3">
            Aqui a dignidade e a cooperação substituem a exploração financeira. Troque horas de trabalho, aulas, consertos caseiros e caronas por solidariedade ou apoio mútuo.
          </p>

          <button
            onClick={() => setShowForm(!showForm)}
            id="open-service-form-btn"
            className="px-4 py-2 bg-white hover:bg-emerald-50 text-emerald-900 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <PlusCircle className="w-4 h-4 text-emerald-700" />
            <span>{showForm ? 'Fechar Formulário' : 'Publicar Oferta ou Pedido Gratuito'}</span>
          </button>
        </div>
      </div>

      {/* Service Submission Modal / Form */}
      {showForm && (
        <form 
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl p-4 sm:p-5 border border-emerald-200 shadow-sm space-y-3"
          id="new-service-swap-form"
        >
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              Novo Serviço para o Banco de Tempo
            </h3>
            <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">
              Gratuito &amp; Solidário
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tipo de Publicação
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setType('oferta')}
                  className={`flex-1 py-1.5 rounded-xl text-xs font-semibold border cursor-pointer ${
                    type === 'oferta' 
                      ? 'bg-emerald-50 border-emerald-600 text-emerald-800' 
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Estou a Oferecer Ajuda
                </button>
                <button
                  type="button"
                  onClick={() => setType('pedido')}
                  className={`flex-1 py-1.5 rounded-xl text-xs font-semibold border cursor-pointer ${
                    type === 'pedido' 
                      ? 'bg-blue-50 border-blue-600 text-blue-800' 
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Estou a Pedir Ajuda
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Categoria
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-emerald-500"
              >
                <option value="reparos">Reparos &amp; Manutenção</option>
                <option value="educacao">Educação &amp; Aulas</option>
                <option value="agricultura">Agricultura &amp; Hortas</option>
                <option value="transporte">Transporte &amp; Carona</option>
                <option value="tecnologia">Tecnologia &amp; Elétrica</option>
                <option value="saude">Saúde &amp; Bem-Estar</option>
                <option value="outros">Outros</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Título do Serviço
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Reforço de Português e Leitura para Jovens..."
              required
              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Descrição Detalhada
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explique o que você sabe fazer, seus horários disponíveis e como os vizinhos podem se organizar..."
              rows={3}
              required
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Compensação Comunitária (Zero Custo Monetário)
              </label>
              <input
                type="text"
                value={compensation}
                onChange={(e) => setCompensation(e.target.value)}
                placeholder="Ex: Troca por 1h de ajuda na horta / Banco de tempo"
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Bairro de Atendimento
              </label>
              <input
                type="text"
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                placeholder="Ex: Bairro Quizenga"
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              id="confirm-create-service-btn"
              className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer shadow-xs"
            >
              Publicar Gratuitamente
            </button>
          </div>
        </form>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1 text-xs overflow-x-auto">
          <button
            onClick={() => setActiveType('todos')}
            className={`px-3 py-1 rounded-lg font-medium cursor-pointer transition-colors ${
              activeType === 'todos' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Todos ({services.length})
          </button>
          <button
            onClick={() => setActiveType('oferta')}
            className={`px-3 py-1 rounded-lg font-medium cursor-pointer transition-colors ${
              activeType === 'oferta' ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Ofertas de Ajuda
          </button>
          <button
            onClick={() => setActiveType('pedido')}
            className={`px-3 py-1 rounded-lg font-medium cursor-pointer transition-colors ${
              activeType === 'pedido' ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Pedidos da Vizinhança
          </button>
        </div>

        <div className="relative w-full sm:w-56">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por serviço..."
            className="w-full pl-8 pr-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-hidden focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-emerald-300 transition-colors"
            id={`service-${service.id}`}
          >
            <div>
              {/* Type tag & Category */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1 ${
                  service.type === 'oferta'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    : 'bg-blue-100 text-blue-800 border border-blue-200'
                }`}>
                  {service.type === 'oferta' ? '✨ Oferecendo Ajuda' : '🤝 Precisa de Ajuda'}
                </span>

                <span className="text-[11px] text-slate-500 flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                  {getCategoryIcon(service.category)}
                  <span className="capitalize">{service.category}</span>
                </span>
              </div>

              {/* Title & Description */}
              <h4 className="font-bold text-slate-900 text-sm leading-snug mb-1.5">
                {service.title}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                {service.description}
              </p>

              {/* Compensation */}
              <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-2 mb-3">
                <span className="text-[10px] font-bold text-emerald-800 uppercase block mb-0.5">
                  Troca Comunitária Proposta:
                </span>
                <p className="text-xs font-semibold text-emerald-900">
                  {service.compensation}
                </p>
              </div>
            </div>

            {/* Footer: Provider info & Contact Button */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <img
                  src={service.provider.avatar}
                  alt={service.provider.name}
                  className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200 shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-900 truncate">
                    {service.provider.name}
                  </p>
                  <p className="text-[10px] text-slate-400 truncate flex items-center gap-0.5">
                    <MapPin className="w-2.5 h-2.5 text-blue-600" />
                    {service.neighborhood} • Confiança: {service.provider.reputationScore}%
                  </p>
                </div>
              </div>

              {/* Propor Troca E2EE */}
              <button
                onClick={() => onOpenE2EEChatWith(service.provider)}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl flex items-center gap-1 transition-colors cursor-pointer shrink-0 shadow-xs"
                id={`contact-service-${service.id}`}
              >
                <MessageSquareLock className="w-3.5 h-3.5" />
                <span>Propor Troca E2EE</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
