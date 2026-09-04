import React, { useState } from 'react';
import { 
  ShoppingBag, 
  PlusCircle, 
  MapPin, 
  Tag, 
  MessageSquareLock, 
  ShieldCheck, 
  Search, 
  Sparkles,
  CheckCircle2,
  Sprout
} from 'lucide-react';
import { MarketplaceItem, UserNeighbor } from '../types';

interface MarketplaceRegionalProps {
  items: MarketplaceItem[];
  currentUser: UserNeighbor;
  onAddItem: (newItem: Omit<MarketplaceItem, 'id' | 'createdAt' | 'status'>) => void;
  onOpenE2EEChatWith: (neighbor: UserNeighbor) => void;
  selectedNeighborhood: string;
}

export const MarketplaceRegional: React.FC<MarketplaceRegionalProps> = ({
  items,
  currentUser,
  onAddItem,
  onOpenE2EEChatWith,
  selectedNeighborhood,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState('');

  // Form State
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState<MarketplaceItem['category']>('terra_agricultura');
  const [description, setDescription] = useState('');
  const [condition, setCondition] = useState<MarketplaceItem['condition']>('Colheita Fresca');
  const [imageUrl, setImageUrl] = useState('');
  const [neighborhood, setNeighborhood] = useState(
    selectedNeighborhood === 'Todos os Bairros' ? currentUser.neighborhood.split(',')[0] : selectedNeighborhood
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !price.trim()) return;

    onAddItem({
      title,
      price,
      category,
      description,
      seller: currentUser,
      neighborhood,
      condition,
      isTradeOrFairPrice: true,
      imageUrl: imageUrl.trim() || 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=600&auto=format&fit=crop&q=80',
    });

    setTitle('');
    setPrice('');
    setDescription('');
    setImageUrl('');
    setShowForm(false);
  };

  const filteredItems = items.filter((item) => {
    const matchesNeighborhood = 
      selectedNeighborhood === 'Todos os Bairros' || 
      item.neighborhood.toLowerCase().includes(selectedNeighborhood.toLowerCase().replace('bairro ', ''));

    const matchesCategory = 
      activeCategory === 'todos' || item.category === activeCategory;

    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesNeighborhood && matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-4">
      {/* Banner */}
      <div className="bg-linear-to-r from-amber-700 via-amber-800 to-amber-950 text-white rounded-2xl p-4 sm:p-5 shadow-sm border border-amber-600/40 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <span className="bg-amber-300 text-amber-950 font-bold text-xs uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <ShoppingBag className="w-3.5 h-3.5" /> Economia Colaborativa Regional
            </span>
            <span className="text-xs text-amber-200">
              Zero Comissões de Intermediários
            </span>
          </div>

          <h2 className="text-lg sm:text-xl font-bold text-white mb-1">
            Marketplace Comunitário de Cacuso
          </h2>
          <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed max-w-2xl mb-3">
            Compre, troque ou apoie produtores da terra, mel artesanal de Cacuso, artesanato e ferramentas partilhadas entre vizinhos com confiança mútua.
          </p>

          <button
            onClick={() => setShowForm(!showForm)}
            id="open-marketplace-form-btn"
            className="px-4 py-2 bg-white hover:bg-amber-50 text-amber-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <PlusCircle className="w-4 h-4 text-amber-700" />
            <span>{showForm ? 'Fechar Formulário' : 'Anunciar Produto ou Colheita'}</span>
          </button>
        </div>
      </div>

      {/* Item Creation Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl p-4 sm:p-5 border border-amber-200 shadow-sm space-y-3"
          id="new-marketplace-item-form"
        >
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" />
              Novo Item no Marketplace Regional
            </h3>
            <span className="text-[11px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full font-semibold">
              Comércio Justo
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Título do Produto / Colheita
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Mandioca fresca da lavra (Saco 25kg)..."
                required
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Preço Justo ou Proposta de Troca
              </label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Ex: 2.000 Kz ou Troca por Farinha/Feijão"
                required
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Categoria
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-amber-500"
              >
                <option value="terra_agricultura">Produtos da Lavra &amp; Terra</option>
                <option value="alimentos">Alimentos &amp; Mel Puro</option>
                <option value="artesanato">Artesanato Tradicional</option>
                <option value="ferramentas">Ferramentas &amp; Equipamentos</option>
                <option value="outros">Outros</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Estado / Condição
              </label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value as any)}
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-amber-500"
              >
                <option value="Colheita Fresca">Colheita Fresca</option>
                <option value="Novo">Novo / Feito à Mão</option>
                <option value="Excelente">Excelente Estado</option>
                <option value="Usado Bom">Usado Bom</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Bairro / Localidade
              </label>
              <input
                type="text"
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Descrição do Produto
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva a origem, quantidade, qualidade e como o vizinho pode retirar ou combinar a entrega..."
              rows={2}
              required
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Foto do Produto (URL)
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://exemplo.com/foto-mandioca.jpg (opcional)"
              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-amber-500"
            />
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
              id="confirm-create-marketplace-btn"
              className="px-4 py-1.5 bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer shadow-xs"
            >
              Publicar no Marketplace
            </button>
          </div>
        </form>
      )}

      {/* Filter and Search */}
      <div className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1 text-xs overflow-x-auto">
          <button
            onClick={() => setActiveCategory('todos')}
            className={`px-3 py-1 rounded-lg font-medium cursor-pointer transition-colors ${
              activeCategory === 'todos' ? 'bg-amber-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Todos ({items.length})
          </button>
          <button
            onClick={() => setActiveCategory('terra_agricultura')}
            className={`px-3 py-1 rounded-lg font-medium cursor-pointer transition-colors ${
              activeCategory === 'terra_agricultura' ? 'bg-amber-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Produtos da Terra
          </button>
          <button
            onClick={() => setActiveCategory('alimentos')}
            className={`px-3 py-1 rounded-lg font-medium cursor-pointer transition-colors ${
              activeCategory === 'alimentos' ? 'bg-amber-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Mel &amp; Alimentos
          </button>
          <button
            onClick={() => setActiveCategory('artesanato')}
            className={`px-3 py-1 rounded-lg font-medium cursor-pointer transition-colors ${
              activeCategory === 'artesanato' ? 'bg-amber-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Artesanato
          </button>
          <button
            onClick={() => setActiveCategory('ferramentas')}
            className={`px-3 py-1 rounded-lg font-medium cursor-pointer transition-colors ${
              activeCategory === 'ferramentas' ? 'bg-amber-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Ferramentas
          </button>
        </div>

        <div className="relative w-full sm:w-56">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar itens no município..."
            className="w-full pl-8 pr-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-hidden focus:border-amber-500"
          />
        </div>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col justify-between hover:border-amber-300 transition-all hover:shadow-sm"
            id={`marketplace-item-${item.id}`}
          >
            {/* Image & Condition Tag */}
            <div className="relative h-48 bg-slate-100 overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {item.condition}
              </span>
              <span className="absolute top-2 right-2 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                Comércio Justo
              </span>
            </div>

            {/* Details */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="font-bold text-slate-900 text-sm leading-snug">
                    {item.title}
                  </h4>
                </div>

                <p className="text-base font-black text-amber-800 mb-2">
                  {item.price}
                </p>

                <p className="text-xs text-slate-600 leading-relaxed mb-3 line-clamp-2">
                  {item.description}
                </p>
              </div>

              {/* Seller & Action */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <img
                    src={item.seller.avatar}
                    alt={item.seller.name}
                    className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200 shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-800 truncate">
                      {item.seller.name}
                    </p>
                    <p className="text-[10px] text-slate-400 truncate flex items-center gap-0.5">
                      <MapPin className="w-2.5 h-2.5 text-amber-600" />
                      {item.neighborhood}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onOpenE2EEChatWith(item.seller)}
                  className="px-3 py-1.5 bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs rounded-xl flex items-center gap-1 transition-colors cursor-pointer shrink-0 shadow-xs"
                  id={`buy-e2ee-${item.id}`}
                >
                  <MessageSquareLock className="w-3.5 h-3.5" />
                  <span>Negociar E2EE</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
