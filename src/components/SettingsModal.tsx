import React, { useState } from 'react';
import { 
  X, 
  Settings, 
  Globe, 
  ShieldCheck, 
  History, 
  Smartphone, 
  Lock, 
  Eye, 
  EyeOff, 
  AlertTriangle, 
  Check, 
  LogOut, 
  CreditCard, 
  MessageSquare, 
  Sparkles,
  ExternalLink,
  PhoneCall,
  UserCheck,
  Database
} from 'lucide-react';
import { UserNeighbor } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserNeighbor;
  onUpdateUser: (updatedFields: Partial<UserNeighbor>) => void;
  onLogout: () => void;
  onOpenSupabaseModal?: () => void;
}

export const LANGUAGES = [
  { code: 'pt', name: 'Português (Angola)', flag: '🇦🇴', region: 'Oficial' },
  { code: 'kmb', name: 'Kimbundu Angolano', flag: '🇦🇴', region: 'Malanje & Cacuso' },
  { code: 'kik', name: 'Kikongo', flag: '🇦🇴', region: 'Norte de Angola' },
  { code: 'sng', name: 'Songo', flag: '🇦🇴', region: 'Malanje & Região' },
  { code: 'cwe', name: 'Kiokwe / Cokwe', flag: '🇦🇴', region: 'Leste de Angola' },
  { code: 'umb', name: 'Umbundu', flag: '🇦🇴', region: 'Centro & Sul de Angola' },
  { code: 'fr', name: 'Français (Francês)', flag: '🇫🇷', region: 'Internacional' },
  { code: 'en', name: 'English (Inglês)', flag: '🇬🇧', region: 'Internacional' },
  { code: 'es', name: 'Español (Espanhol)', flag: '🇪🇸', region: 'Internacional' },
];

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onUpdateUser,
  onLogout,
  onOpenSupabaseModal,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'idioma' | 'atividade' | 'privacidade' | 'conteudo_sensivel' | 'whatsapp' | 'express'>('idioma');
  const [selectedLanguage, setSelectedLanguage] = useState(currentUser.language || 'pt');
  const [isWhatsappCalibrated, setIsWhatsappCalibrated] = useState(currentUser.whatsappCalibrated ?? true);
  const [whatsappPhone, setWhatsappPhone] = useState(currentUser.phone || '+244 940 583 598');
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [calibrationSuccess, setCalibrationSuccess] = useState(false);

  // Privacy toggles
  const [publicFeedShield, setPublicFeedShield] = useState(true);
  const [e2eeEnabled, setE2eeEnabled] = useState(true);
  const [hideAdultContentInPublic, setHideAdultContentInPublic] = useState(true);

  if (!isOpen) return null;

  const handleLanguageSelect = (code: string) => {
    setSelectedLanguage(code);
    onUpdateUser({ language: code });
  };

  const handleCalibrateWhatsapp = () => {
    setIsCalibrating(true);
    setTimeout(() => {
      setIsCalibrating(false);
      setIsWhatsappCalibrated(true);
      setCalibrationSuccess(true);
      onUpdateUser({ whatsappCalibrated: true, phone: whatsappPhone });
      setTimeout(() => setCalibrationSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        id="settings-preferences-modal"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-700 text-white flex items-center justify-center shadow-xs">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                Definições da Conta &amp; Privacidade
              </h3>
              <p className="text-xs text-slate-500">
                Configurações éticas, idiomas nacionais e segurança soberana
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-200 text-slate-500 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Horizontal Navigation Pills */}
        <div className="flex items-center gap-1.5 p-3 bg-white border-b border-slate-100 overflow-x-auto no-scrollbar text-xs">
          <button
            onClick={() => setActiveSubTab('idioma')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap cursor-pointer transition-colors flex items-center gap-1.5 ${
              activeSubTab === 'idioma' ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Idioma da Rede</span>
          </button>

          <button
            onClick={() => setActiveSubTab('atividade')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap cursor-pointer transition-colors flex items-center gap-1.5 ${
              activeSubTab === 'atividade' ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Registo de Atividade</span>
          </button>

          <button
            onClick={() => setActiveSubTab('privacidade')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap cursor-pointer transition-colors flex items-center gap-1.5 ${
              activeSubTab === 'privacidade' ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Centro de Privacidade</span>
          </button>

          <button
            onClick={() => setActiveSubTab('conteudo_sensivel')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap cursor-pointer transition-colors flex items-center gap-1.5 ${
              activeSubTab === 'conteudo_sensivel' ? 'bg-rose-700 text-white' : 'bg-rose-50 text-rose-800 hover:bg-rose-100'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Conteúdo Sensível (Só no Privado)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('whatsapp')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap cursor-pointer transition-colors flex items-center gap-1.5 ${
              activeSubTab === 'whatsapp' ? 'bg-emerald-700 text-white' : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Calibrar WhatsApp</span>
          </button>

          <button
            onClick={() => setActiveSubTab('express')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap cursor-pointer transition-colors flex items-center gap-1.5 ${
              activeSubTab === 'express' ? 'bg-amber-700 text-white' : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Multicaixa Express (Kz)</span>
          </button>

          {onOpenSupabaseModal && (
            <button
              onClick={() => {
                onOpenSupabaseModal();
                onClose();
              }}
              id="settings-open-supabase-pill"
              className="px-3 py-1.5 rounded-xl font-bold whitespace-nowrap cursor-pointer transition-colors flex items-center gap-1.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-300/80"
            >
              <Database className="w-3.5 h-3.5 text-emerald-600" />
              <span>Base Supabase (Postgres)</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </button>
          )}
        </div>

        {/* Tab Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          {/* TAB 1: IDIOMAS (Português, Francês, Inglês, Espanhol, Kimbundu, Kikongo, Songo, Kiokwe, etc.) */}
          {activeSubTab === 'idioma' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-slate-900">
                    Selecione o Idioma da Aplicação
                  </h4>
                  <p className="text-xs text-slate-500">
                    Inclui línguas nacionais angolanas faladas em Malanje, Cacuso e no país.
                  </p>
                </div>
                <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full">
                  {LANGUAGES.find(l => l.code === selectedLanguage)?.name}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageSelect(lang.code)}
                    className={`p-3 rounded-2xl border text-left flex items-center justify-between cursor-pointer transition-all ${
                      selectedLanguage === lang.code
                        ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-500/20 shadow-xs'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{lang.flag}</span>
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-slate-800">
                          {lang.name}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          {lang.region}
                        </p>
                      </div>
                    </div>
                    {selectedLanguage === lang.code && (
                      <Check className="w-4 h-4 text-blue-700" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: REGISTO DE ATIVIDADE */}
          {activeSubTab === 'atividade' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div>
                  <h4 className="font-bold text-sm text-slate-900">
                    O Teu Registo de Atividade
                  </h4>
                  <p className="text-xs text-slate-500">
                    Transparência total sobre todas as tuas ações no Cacuso Online
                  </p>
                </div>
                <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                  Sem Rastreamento Central
                </span>
              </div>

              <div className="space-y-2">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
                      <UserCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">Amizade Automática com Fundadores</p>
                      <p className="text-[10px] text-slate-400">Conectado a Jelson Pereira Manuel e Liron Kilson</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-blue-700">Ativo</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                      <Lock className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">Geração de Par de Chaves E2EE</p>
                      <p className="text-[10px] text-slate-400">Chave pública: {currentUser.keyFingerprint || '4A9F:882C'}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-700">Criptografado</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">Carteira Multicaixa Express Atribuída</p>
                      <p className="text-[10px] text-slate-400">Entidade: 00845 • Ref: {currentUser.expressReference || '940 583 291'}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-amber-800">Pronta para Kwanza</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CENTRO DE PRIVACIDADE */}
          {activeSubTab === 'privacidade' && (
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-sm text-slate-900">
                  Centro de Privacidade &amp; Soberania Digital
                </h4>
                <p className="text-xs text-slate-500">
                  Diferente do Facebook, os teus dados nunca são comercializados para anunciantes.
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between gap-3">
                  <div>
                    <h5 className="font-bold text-xs text-slate-800">
                      Criptografia Ponta a Ponta (E2EE) em Todas as Mensagens
                    </h5>
                    <p className="text-[11px] text-slate-500">
                      Nenhum servidor ou intermediário consegue ler as tuas conversas.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={e2eeEnabled}
                    onChange={(e) => setE2eeEnabled(e.target.checked)}
                    className="w-5 h-5 accent-blue-600 cursor-pointer rounded"
                  />
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between gap-3">
                  <div>
                    <h5 className="font-bold text-xs text-slate-800">
                      Feed Cronológico Puro Ativo
                    </h5>
                    <p className="text-[11px] text-slate-500">
                      Desativa qualquer tentativa de ordenação por algoritmos viciantes.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={publicFeedShield}
                    onChange={(e) => setPublicFeedShield(e.target.checked)}
                    className="w-5 h-5 accent-blue-600 cursor-pointer rounded"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: CONTEÚDO SENSÍVEL / COISAS OBSCENAS SÓ NO PRIVADO */}
          {activeSubTab === 'conteudo_sensivel' && (
            <div className="space-y-4">
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-rose-800 font-black text-sm">
                  <AlertTriangle className="w-5 h-5 text-rose-600" />
                  <span>Regulamento Ético: Coisas Obscenas Só no Privado</span>
                </div>
                <p className="text-xs text-rose-900 leading-relaxed">
                  Para proteger as crianças, famílias e os valores morais da comunidade de Cacuso, <strong>é terminantemente proibida qualquer publicação de nudez, vídeos pornográficos ou material sexualmente explícito nos canais públicos</strong> (Feed, Stories, Marketplace e Grupos Comunitários Abertos).
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-slate-800 font-bold text-xs">
                  <Lock className="w-4 h-4 text-blue-700" />
                  <span>Espaço Privado e Consentido (E2EE)</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Qualquer partilha de foro íntimo entre maiores de 18 anos deve ocorrer <strong>estritamente através de mensagens privadas criptografadas de ponta a ponta (E2EE)</strong>, onde ninguém além do remetente e do destinatário tem acesso às mídias.
                </p>

                <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">
                      Filtro de Blindagem Familiar no Feed Público
                    </span>
                    <span className="text-[10px] text-slate-500">
                      Oculta e reporta automaticamente conteúdos obscenos nos canais abertos
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={hideAdultContentInPublic}
                    onChange={(e) => setHideAdultContentInPublic(e.target.checked)}
                    className="w-5 h-5 accent-rose-600 cursor-pointer rounded"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: CALIBRAR COM WHATSAPP */}
          {activeSubTab === 'whatsapp' && (
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-emerald-600" />
                  Calibrar Conta com WhatsApp
                </h4>
                <p className="text-xs text-slate-500">
                  Vincule o seu número angolano (+244) para receber confirmações rápidas, alertas de segurança e autenticação.
                </p>
              </div>

              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-3">
                <label className="block text-xs font-bold text-emerald-950">
                  Número de WhatsApp (+244 Angola):
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={whatsappPhone}
                    onChange={(e) => setWhatsappPhone(e.target.value)}
                    placeholder="+244 940 583 598"
                    className="flex-1 text-xs p-3 rounded-xl border border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
                  />
                  <button
                    onClick={handleCalibrateWhatsapp}
                    disabled={isCalibrating}
                    className="px-4 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl cursor-pointer transition-colors shadow-xs shrink-0 flex items-center gap-1.5"
                  >
                    {isCalibrating ? (
                      <span>Calibrando...</span>
                    ) : (
                      <>
                        <PhoneCall className="w-4 h-4" />
                        <span>Calibrar com WhatsApp</span>
                      </>
                    )}
                  </button>
                </div>

                {isWhatsappCalibrated && (
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-100 p-2.5 rounded-xl">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Conta Calibrada com Sucesso no WhatsApp ({whatsappPhone})</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 6: MULTICAIXA EXPRESS (KWANZA AOA) */}
          {activeSubTab === 'express' && (
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-amber-600" />
                  Aba de Negócios &amp; Pagamentos Multicaixa Express (Kwanza Kz)
                </h4>
                <p className="text-xs text-slate-500">
                  Dados de cobrança e recebimento em moeda nacional para comércio local
                </p>
              </div>

              <div className="p-5 bg-linear-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-3xl space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black uppercase tracking-wider text-amber-900 bg-amber-200 px-2.5 py-0.5 rounded-full">
                    Multicaixa Express Angola 🇦🇴
                  </span>
                  <span className="text-xs font-bold text-slate-700">Moeda: Kwanza (AOA)</span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-white p-3 rounded-2xl border border-amber-200">
                    <span className="text-[10px] text-slate-400 font-bold block">ENTIDADE</span>
                    <span className="text-base font-black text-slate-900 font-mono">00845</span>
                    <p className="text-[9px] text-slate-500 mt-0.5">Cacuso Pay / EMIS Express</p>
                  </div>

                  <div className="bg-white p-3 rounded-2xl border border-amber-200">
                    <span className="text-[10px] text-slate-400 font-bold block">REFERÊNCIA PESSOAL</span>
                    <span className="text-base font-black text-blue-700 font-mono">
                      {currentUser.expressReference || '940 583 291'}
                    </span>
                    <p className="text-[9px] text-slate-500 mt-0.5">Válida para compras e vendas</p>
                  </div>
                </div>

                <p className="text-xs text-amber-900 leading-relaxed">
                  Quando compras ou vendes produtos na Aba de Negócios de Cacuso, o pagamento é processado instantaneamente através do aplicativo Multicaixa Express ou no ATM mais próximo em Cacuso.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer with Prominent Logout Option */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3">
          <button
            onClick={() => {
              onLogout();
              onClose();
            }}
            id="settings-logout-btn"
            className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-xl flex items-center gap-2 transition-colors cursor-pointer border border-rose-200"
          >
            <LogOut className="w-4 h-4 text-rose-600" />
            <span>Terminar Sessão</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer shadow-xs"
          >
            Guardar e Concluir
          </button>
        </div>
      </div>
    </div>
  );
};
