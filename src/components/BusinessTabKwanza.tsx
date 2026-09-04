import React, { useState } from 'react';
import { 
  ShoppingBag, 
  CreditCard, 
  Plus, 
  Search, 
  Filter, 
  Check, 
  ArrowRight, 
  X, 
  Store, 
  Phone, 
  MapPin, 
  Sparkles, 
  MessageCircle, 
  CheckCircle2, 
  TrendingUp, 
  ShieldCheck,
  Tag,
  Clock,
  Send
} from 'lucide-react';
import { UserNeighbor, BusinessProduct } from '../types';
import { saveSupabaseProduct, sanitizeText } from '../lib/supabase';

interface BusinessTabKwanzaProps {
  currentUser: UserNeighbor;
  onOpenSettings?: () => void;
}

const INITIAL_BUSINESS_PRODUCTS: BusinessProduct[] = [
  {
    id: 'biz-1',
    title: 'Saco de Fuba de Mandioca Pura de Cacuso (50kg)',
    priceKz: 14500,
    formattedPrice: '14.500 Kz',
    description: 'Fuba de primeira qualidade produzida nas lavras familiares de Cacuso. Moagem fina e fresca, pronta para funge tradicional.',
    category: 'Agricultura & Alimentação',
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80',
    seller: {
      id: 'seller-antonio',
      name: 'Cooperativa AgroCacuso',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      neighborhood: 'Povoação de Quizenga, Cacuso',
      reputationScore: 98,
      vouchesCount: 84,
      badges: ['Produtor Certificado', 'Entrega Segura'],
      keyFingerprint: '98C1:4410:AA72',
      completedExchanges: 110,
      ecoMeritPoints: 450,
      joinedDate: 'Janeiro 2025'
    },
    neighborhood: 'Quizenga, Cacuso',
    stockCount: 25,
    expressEntity: '00845',
    expressReference: '940 583 291',
    isOfficialShop: true,
    rating: 4.9,
    salesCount: 142
  },
  {
    id: 'biz-2',
    title: 'Mel Silvestre Puro da Floresta de Malanje (1 Litro)',
    priceKz: 4500,
    formattedPrice: '4.500 Kz',
    description: 'Mel cru e 100% natural colhido nos apiários tradicionais de Malanje e Cacuso. Sem adição de açúcar.',
    category: 'Produtos Naturais',
    imageUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&auto=format&fit=crop&q=80',
    seller: {
      id: 'seller-maria',
      name: 'Dona Maria Domingos',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
      neighborhood: 'Bairro Kilamba Kiaxe, Cacuso',
      reputationScore: 99,
      vouchesCount: 67,
      badges: ['Apicultura Local', 'Vendedora de Confiança'],
      keyFingerprint: 'B219:9021:11FF',
      completedExchanges: 75,
      ecoMeritPoints: 310,
      joinedDate: 'Fevereiro 2025'
    },
    neighborhood: 'Bairro Kilamba Kiaxe, Cacuso',
    stockCount: 40,
    expressEntity: '00845',
    expressReference: '923 881 904',
    isOfficialShop: false,
    rating: 5.0,
    salesCount: 88
  },
  {
    id: 'biz-3',
    title: 'Cesto de Hortaliças Frescas da Horta Municipal',
    priceKz: 6000,
    formattedPrice: '6.000 Kz',
    description: 'Couve, rama de batata, tomate, cebola e quiabos colhidos no mesmo dia com adubo orgânico de compostagem comunitária.',
    category: 'Hortifruti',
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80',
    seller: {
      id: 'seller-horta',
      name: 'Associação Verde de Cacuso',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      neighborhood: 'Bairro 1º de Maio, Cacuso',
      reputationScore: 97,
      vouchesCount: 52,
      badges: ['EcoSustentável', '100% Orgânico'],
      keyFingerprint: '77F2:4102:CC90',
      completedExchanges: 60,
      ecoMeritPoints: 600,
      joinedDate: 'Fevereiro 2025'
    },
    neighborhood: '1º de Maio, Cacuso',
    stockCount: 18,
    expressEntity: '00845',
    expressReference: '912 344 556',
    isOfficialShop: true,
    rating: 4.8,
    salesCount: 65
  },
  {
    id: 'biz-4',
    title: 'Kit de Panos Tradicionais de Malanje (3 Peças)',
    priceKz: 18000,
    formattedPrice: '18.000 Kz',
    description: 'Tecidos típicos de alta qualidade para trajes de cerimónia, confeccionados por costureiras artesanais de Cacuso.',
    category: 'Moda & Artesanato',
    imageUrl: 'https://images.unsplash.com/photo-1528458876885-5b6aae76183a?w=600&auto=format&fit=crop&q=80',
    seller: {
      id: 'seller-artesanato',
      name: 'Ateliê Rainha Ginga',
      avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&auto=format&fit=crop&q=80',
      neighborhood: 'Bairro Capalanga, Cacuso',
      reputationScore: 96,
      vouchesCount: 39,
      badges: ['Artesã Registrada', 'Cultura Nacional'],
      keyFingerprint: 'C881:9920:3341',
      completedExchanges: 40,
      ecoMeritPoints: 190,
      joinedDate: 'Março 2025'
    },
    neighborhood: 'Capalanga, Cacuso',
    stockCount: 12,
    expressEntity: '00845',
    expressReference: '931 092 118',
    isOfficialShop: false,
    rating: 4.9,
    salesCount: 34
  }
];

export const BusinessTabKwanza: React.FC<BusinessTabKwanzaProps> = ({
  currentUser,
  onOpenSettings,
}) => {
  const [products, setProducts] = useState<BusinessProduct[]>(INITIAL_BUSINESS_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  
  // Express Payment Modal State
  const [selectedProductToBuy, setSelectedProductToBuy] = useState<BusinessProduct | null>(null);
  const [isProcessingExpress, setIsProcessingExpress] = useState(false);
  const [paymentSuccessReceipt, setPaymentSuccessReceipt] = useState<string | null>(null);

  // New Product Modal
  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newPriceKz, setNewPriceKz] = useState('');
  const [newCategory, setNewCategory] = useState('Agricultura & Alimentação');
  const [newDescription, setNewDescription] = useState('');
  const [newNeighborhood, setNewNeighborhood] = useState('Bairro Central, Cacuso');

  const categories = ['Todas', 'Agricultura & Alimentação', 'Produtos Naturais', 'Hortifruti', 'Moda & Artesanato', 'Construção & Reparos'];

  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'Todas' || p.category === selectedCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.neighborhood.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanTitle = sanitizeText(newTitle, 150);
    if (!cleanTitle) return;

    const priceNum = Math.max(1, parseInt(newPriceKz.replace(/\D/g, ''), 10) || 5000);
    const formatted = `${priceNum.toLocaleString('pt-AO')} Kz`;
    const cleanDesc = sanitizeText(newDescription, 800) || 'Produto verificado no comércio regional de Cacuso.';
    const prodId = `biz-${Date.now()}`;

    const newProd: BusinessProduct = {
      id: prodId,
      title: cleanTitle,
      priceKz: priceNum,
      formattedPrice: formatted,
      description: cleanDesc,
      category: newCategory,
      imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80',
      seller: currentUser,
      neighborhood: newNeighborhood,
      stockCount: 10,
      expressEntity: currentUser.expressEntity || '00845',
      expressReference: currentUser.expressReference || '940 583 291',
      rating: 5.0,
      salesCount: 1
    };

    setProducts([newProd, ...products]);
    setIsNewProductModalOpen(false);
    setNewTitle('');
    setNewPriceKz('');
    setNewDescription('');

    // Persist securely to Supabase business_products table
    saveSupabaseProduct({
      id: prodId,
      sellerId: currentUser.id,
      sellerName: currentUser.name,
      sellerPhone: currentUser.phone,
      title: cleanTitle,
      description: cleanDesc,
      priceKwanza: priceNum,
      category: newCategory,
      imageUrl: newProd.imageUrl,
      multicaixaEntity: newProd.expressEntity,
      multicaixaReference: newProd.expressReference,
      neighborhood: newNeighborhood,
    });
  };

  const handleSimulateExpressPayment = () => {
    setIsProcessingExpress(true);
    setTimeout(() => {
      setIsProcessingExpress(false);
      const receiptId = `MCX-${Math.floor(10000000 + Math.random() * 90000000)}`;
      setPaymentSuccessReceipt(receiptId);
    }, 1200);
  };

  return (
    <div className="space-y-5 animate-fadeIn pb-12" id="aba-de-negocios-kwanza">
      {/* Banner / Header */}
      <div className="bg-linear-to-r from-amber-600 via-orange-600 to-amber-700 rounded-3xl p-5 sm:p-7 text-white shadow-lg relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
          <Store className="w-64 h-64" />
        </div>

        <div className="relative z-10 max-w-2xl space-y-2.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-white/20 backdrop-blur-xs text-white text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full border border-white/30">
              Aba de Negócios • Moeda Kwanza (Kz) 🇦🇴
            </span>
            <span className="bg-emerald-500/90 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <CreditCard className="w-3 h-3" />
              Multicaixa Express Angola
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            Comércio Regional &amp; Pagamentos via Multicaixa Express
          </h2>

          <p className="text-xs sm:text-sm text-amber-50 leading-relaxed">
            Compre e venda produtos em moeda nacional (Kwanza) diretamente com produtores e vizinhos de Cacuso. Toda conta possui entidade e referência automáticas para pagamentos sem taxas corporativas.
          </p>

          {/* User Express Wallet Widget */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <div className="bg-slate-950/40 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/20 flex items-center gap-3 text-xs">
              <div>
                <span className="text-[10px] text-amber-200 font-medium block">TUA ENTIDADE EXPRESS</span>
                <span className="font-mono font-bold text-white text-sm">{currentUser.expressEntity || '00845'}</span>
              </div>
              <div className="h-6 w-px bg-white/20" />
              <div>
                <span className="text-[10px] text-amber-200 font-medium block">TUA REFERÊNCIA DE RECEBIMENTO</span>
                <span className="font-mono font-bold text-amber-300 text-sm">{currentUser.expressReference || '940 583 291'}</span>
              </div>
            </div>

            <button
              onClick={() => setIsNewProductModalOpen(true)}
              id="btn-new-business-product"
              className="px-4 py-2.5 bg-white text-amber-900 hover:bg-amber-50 font-bold text-xs rounded-2xl transition-transform active:scale-95 shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-amber-700" />
              <span>Publicar Venda em Kwanza</span>
            </button>
          </div>
        </div>
      </div>

      {/* Search & Categories */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Pesquisar fuba, mel, mandioca, produtos em Cacuso..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-amber-600 focus:outline-hidden"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                  selectedCategory === cat
                    ? 'bg-amber-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {filteredProducts.map((prod) => (
          <div 
            key={prod.id}
            className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
          >
            {/* Image & Badges */}
            <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
              <img
                src={prod.imageUrl}
                alt={prod.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
                <span className="bg-slate-950/80 backdrop-blur-xs text-white text-[10px] font-black px-2.5 py-0.5 rounded-full">
                  {prod.category}
                </span>
                {prod.isOfficialShop && (
                  <span className="bg-blue-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    Loja Local Verificada
                  </span>
                )}
              </div>

              {/* Price Tag in Kwanza */}
              <div className="absolute bottom-3 right-3 bg-amber-500 text-slate-950 font-black text-sm px-3 py-1 rounded-xl shadow-lg flex items-center gap-1">
                <span>{prod.formattedPrice}</span>
              </div>
            </div>

            {/* Product Body */}
            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-amber-600 transition-colors line-clamp-1">
                  {prod.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                  {prod.description}
                </p>
              </div>

              {/* Seller info & Express details */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <img
                    src={prod.seller.avatar}
                    alt={prod.seller.name}
                    className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-800 block truncate max-w-[130px]">
                      {prod.seller.name}
                    </span>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {prod.neighborhood}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">Express Ref</span>
                  <span className="font-mono text-[11px] font-bold text-blue-700">{prod.expressReference}</span>
                </div>
              </div>

              {/* Buy via Express CTA */}
              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={() => {
                    setSelectedProductToBuy(prod);
                    setPaymentSuccessReceipt(null);
                  }}
                  className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-600 active:scale-[0.99] text-slate-950 font-black text-xs rounded-xl transition-all cursor-pointer shadow-xs flex items-center justify-center gap-1.5"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Pagar via Multicaixa Express</span>
                </button>

                {/* Direct WhatsApp Negotiation */}
                <button
                  onClick={() => {
                    const msg = `Olá ${prod.seller.name}, vi o seu anúncio no Cacuso Online sobre "${prod.title}" (${prod.formattedPrice}). Gostaria de comprar via Multicaixa Express!`;
                    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`, '_blank');
                  }}
                  title="Conversar no WhatsApp"
                  className="p-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl transition-colors cursor-pointer border border-emerald-200"
                >
                  <MessageCircle className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL 1: Pagar via Multicaixa Express */}
      {selectedProductToBuy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl border border-slate-200 overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-amber-50/80">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    Pagamento Multicaixa Express
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Transação oficial segura em Kwanza (AOA)
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedProductToBuy(null)}
                className="p-1.5 rounded-full hover:bg-slate-200 text-slate-400 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4">
              {paymentSuccessReceipt ? (
                /* Payment Success View */
                <div className="text-center space-y-3 animate-fadeIn py-2">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-black text-slate-900 text-base">
                    Pagamento Multicaixa Express Confirmado!
                  </h4>
                  <p className="text-xs text-slate-600">
                    O vendedor <strong>{selectedProductToBuy.seller.name}</strong> recebeu a confirmação instantânea em Kwanzas.
                  </p>

                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1 text-left font-mono">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Recibo:</span>
                      <span className="font-bold text-slate-800">{paymentSuccessReceipt}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Valor Pago:</span>
                      <span className="font-bold text-emerald-700">{selectedProductToBuy.formattedPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Canal:</span>
                      <span>Multicaixa Express / EMIS</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedProductToBuy(null)}
                    className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl cursor-pointer transition-colors shadow-xs"
                  >
                    Fechar e Voltar aos Negócios
                  </button>
                </div>
              ) : (
                /* Payment Details */
                <>
                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Produto:</span>
                      <span className="font-bold text-slate-900 text-right">{selectedProductToBuy.title}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Vendedor:</span>
                      <span className="font-medium text-slate-800">{selectedProductToBuy.seller.name}</span>
                    </div>
                    <div className="flex items-center justify-between pt-1 border-t border-slate-200">
                      <span className="font-bold text-slate-700">Total a Pagar:</span>
                      <span className="text-base font-black text-amber-600">{selectedProductToBuy.formattedPrice}</span>
                    </div>
                  </div>

                  {/* Official Multicaixa Coordinates */}
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between text-[11px] font-bold text-amber-900">
                      <span>COORDENADAS DE PAGAMENTO</span>
                      <span>ATM / EXPRESS</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-white p-2.5 rounded-xl border border-amber-200">
                        <span className="text-[9px] text-slate-400 font-bold block">ENTIDADE</span>
                        <span className="text-sm font-black font-mono text-slate-900">{selectedProductToBuy.expressEntity}</span>
                      </div>
                      <div className="bg-white p-2.5 rounded-xl border border-amber-200">
                        <span className="text-[9px] text-slate-400 font-bold block">REFERÊNCIA</span>
                        <span className="text-sm font-black font-mono text-blue-700">{selectedProductToBuy.expressReference}</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-amber-950 leading-relaxed">
                      1. Abra o aplicativo <strong>Multicaixa Express</strong> no seu telemóvel.<br />
                      2. Selecione <em>Pagamentos &gt; Compras / Serviços</em>.<br />
                      3. Digite a Entidade <strong>{selectedProductToBuy.expressEntity}</strong> e Referência <strong>{selectedProductToBuy.expressReference}</strong>.
                    </p>
                  </div>

                  {/* Simulate Immediate Verification */}
                  <button
                    onClick={handleSimulateExpressPayment}
                    disabled={isProcessingExpress}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
                  >
                    {isProcessingExpress ? (
                      <span>Validando Pagamento na Rede Express...</span>
                    ) : (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Confirmar Pagamento Express ({selectedProductToBuy.formattedPrice})</span>
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Publicar Novo Produto / Negócio */}
      {isNewProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    Publicar Venda na Aba de Negócios
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Venda a Kwanza com pagamento via Multicaixa Express
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsNewProductModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-200 text-slate-400 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="p-5 space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nome do Produto ou Mercadoria *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ex: Mandioca fresca colhida hoje (Saco 50kg)"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-amber-600 bg-slate-50 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Preço em Kwanza (Kz) *
                  </label>
                  <input
                    type="number"
                    required
                    value={newPriceKz}
                    onChange={(e) => setNewPriceKz(e.target.value)}
                    placeholder="Ex: 14500"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-amber-600 bg-slate-50 focus:bg-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Categoria *
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-amber-600 bg-slate-50 focus:bg-white"
                  >
                    <option>Agricultura &amp; Alimentação</option>
                    <option>Produtos Naturais</option>
                    <option>Hortifruti</option>
                    <option>Moda &amp; Artesanato</option>
                    <option>Construção &amp; Reparos</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Bairro ou Local de Entrega em Cacuso
                </label>
                <input
                  type="text"
                  value={newNeighborhood}
                  onChange={(e) => setNewNeighborhood(e.target.value)}
                  placeholder="Ex: Bairro Kilamba Kiaxe, Cacuso"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-amber-600 bg-slate-50 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Descrição dos Detalhes
                </label>
                <textarea
                  rows={2}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Explique a origem, qualidade e disponibilidade do produto..."
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-amber-600 bg-slate-50 focus:bg-white resize-none"
                />
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900 space-y-1">
                <span className="font-bold block">Cobrança Direta Multicaixa Express:</span>
                <p>
                  O pagamento do cliente será creditado na Entidade <strong>{currentUser.expressEntity || '00845'}</strong> com a tua Referência <strong>{currentUser.expressReference || '940 583 291'}</strong>.
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-amber-600 hover:bg-amber-700 active:scale-[0.99] text-white font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer shadow-md"
              >
                Publicar Anúncio de Negócio
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
