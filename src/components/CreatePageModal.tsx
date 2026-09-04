import React, { useState } from 'react';
import { 
  X, 
  Flag, 
  Sparkles, 
  Image as ImageIcon, 
  Smartphone, 
  MapPin, 
  CheckCircle2, 
  ArrowRight,
  Globe,
  SlidersHorizontal,
  Users
} from 'lucide-react';
import { FacebookPage } from '../types';

interface CreatePageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreatePage: (page: FacebookPage) => void;
  existingPages?: FacebookPage[];
  onSwitchToPage?: (page: FacebookPage) => void;
}

export const CreatePageModal: React.FC<CreatePageModalProps> = ({
  isOpen,
  onClose,
  onCreatePage,
  existingPages = [],
  onSwitchToPage,
}) => {
  const [pageName, setPageName] = useState('');
  const [category, setCategory] = useState('Gravadora & Produtora Musical');
  const [bio, setBio] = useState('');
  const [phone, setPhone] = useState('+244 940 583 598');
  const [location, setLocation] = useState('Cacuso, Angola');
  const [avatar, setAvatar] = useState('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&auto=format&fit=crop&q=80');
  const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1000&auto=format&fit=crop&q=80');
  const [activeTab, setActiveTab] = useState<'create' | 'manage'>('create');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pageName.trim()) return;

    const newPage: FacebookPage = {
      id: `page-${Date.now()}`,
      name: pageName.trim(),
      category,
      bio: bio.trim() || 'Página oficial de entretenimento e cultura criada no Cacuso Online.',
      avatar,
      coverImage,
      followersCount: 1,
      likesCount: 1,
      phone,
      location,
      isOfficial: true,
    };

    onCreatePage(newPage);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-blue-700 text-white flex items-center justify-center font-bold shadow-xs">
              <Flag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                Criar Página do Facebook
              </h2>
              <p className="text-xs text-slate-500">
                Conecte a sua marca, música, estúdio ou empresa à comunidade
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200/60 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab switcher: Criar vs As Tuas Páginas */}
        <div className="flex border-b border-slate-200 bg-slate-50/40 px-6">
          <button
            onClick={() => setActiveTab('create')}
            className={`py-3 px-4 text-xs font-bold border-b-2 cursor-pointer transition-colors ${
              activeTab === 'create'
                ? 'border-blue-700 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Criar Nova Página
          </button>
          <button
            onClick={() => setActiveTab('manage')}
            className={`py-3 px-4 text-xs font-bold border-b-2 cursor-pointer transition-colors ${
              activeTab === 'manage'
                ? 'border-blue-700 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Páginas Gerenciadas ({existingPages.length})
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {activeTab === 'create' ? (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Form Side */}
              <form onSubmit={handleSubmit} className="md:col-span-7 space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nome da Página *
                  </label>
                  <input
                    type="text"
                    required
                    value={pageName}
                    onChange={(e) => setPageName(e.target.value)}
                    placeholder="Ex: Cacuso Musik ou Estúdio Viana Som"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:border-blue-600 text-slate-900"
                    id="page-name-input"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Categoria
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:border-blue-600 text-slate-900"
                  >
                    <option value="Gravadora & Produtora Musical">Gravadora &amp; Produtora Musical</option>
                    <option value="Músico / Banda / DJ">Músico / Banda / DJ</option>
                    <option value="Loja & Comércio Local">Loja &amp; Comércio Local</option>
                    <option value="Figura Pública & Marca">Figura Pública &amp; Marca</option>
                    <option value="Comunidade & Inovação Social">Comunidade &amp; Inovação Social</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Biografia / Descrição
                  </label>
                  <textarea
                    rows={2}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Conta um pouco sobre o teu estúdio, projeto ou negócio..."
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:border-blue-600 text-slate-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Telefone (Angola)
                    </label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+244 9XX..."
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:border-blue-600 text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Localização
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Cacuso, Malanje"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:border-blue-600 text-slate-900"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm rounded-xl cursor-pointer shadow-sm transition-colors flex items-center justify-center gap-2"
                  id="submit-create-page-btn"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Criar Página Agora</span>
                </button>
              </form>

              {/* Live Preview Card */}
              <div className="md:col-span-5 flex flex-col justify-center">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Pré-visualização da Página
                </p>
                <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm bg-slate-50">
                  <div className="h-24 w-full relative bg-slate-800">
                    <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
                    <div className="absolute -bottom-6 left-4 w-12 h-12 rounded-full ring-2 ring-white overflow-hidden bg-slate-900">
                      <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div className="p-4 pt-8">
                    <h4 className="font-bold text-sm text-slate-900 leading-tight">
                      {pageName || 'Nome da Tua Página'}
                    </h4>
                    <p className="text-[10px] text-blue-700 font-semibold mt-0.5">{category}</p>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                      {bio || 'Biografia da página aparecerá aqui para os teus seguidores.'}
                    </p>
                    <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-400">
                      <span>0 Seguidores</span>
                      <span>{location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Managed Pages List with Quick Switch */
            <div className="space-y-3">
              <p className="text-xs text-slate-500 mb-2">
                Podes alternar para qualquer uma das tuas páginas oficiais para publicar e responder aos fãs como a página:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {existingPages.map(page => (
                  <div 
                    key={page.id}
                    className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between hover:bg-slate-100/80 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={page.avatar}
                        alt={page.name}
                        className="w-11 h-11 rounded-full object-cover ring-2 ring-blue-600/30"
                      />
                      <div className="overflow-hidden">
                        <h4 className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                          {page.name}
                        </h4>
                        <p className="text-[10px] text-blue-700 font-medium truncate">
                          {page.category}
                        </p>
                        <p className="text-[10px] text-slate-500">
                          {page.followersCount.toLocaleString()} seguidores
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        if (onSwitchToPage) onSwitchToPage(page);
                        onClose();
                      }}
                      className="px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl cursor-pointer shadow-xs transition-colors shrink-0"
                    >
                      Alternar
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
