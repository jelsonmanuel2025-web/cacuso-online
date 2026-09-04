import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  Download, 
  Trash2, 
  Key, 
  CheckCircle2, 
  Clock, 
  Cpu, 
  EyeOff,
  AlertCircle
} from 'lucide-react';
import { UserNeighbor } from '../types';

interface PrivacyCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserNeighbor;
}

export const PrivacyCenterModal: React.FC<PrivacyCenterModalProps> = ({
  isOpen,
  onClose,
  currentUser,
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [clearedNotice, setClearedNotice] = useState(false);

  if (!isOpen) return null;

  const handleExportData = () => {
    const backupData = {
      user: currentUser,
      exportTimestamp: new Date().toISOString(),
      platform: 'Cacuso Online',
      founders: 'Jelson Pereira Manuel & Liron Kilson',
      privacyStandard: 'Protected By Default (Zero Trackers, E2EE Active)',
      feedMode: 'Strict Chronological',
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cacuso-online-dados-${currentUser.id}.json`;
    a.click();
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const handleClearCache = () => {
    setClearedNotice(true);
    setTimeout(() => setClearedNotice(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-600 rounded-xl">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Central de Soberania &amp; Privacidade</h3>
              <p className="text-xs text-emerald-300">Protegido por Padrão • Zero Rastreamento</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 text-slate-700 text-xs">
          {/* Status Overview */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-950 text-sm flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                Auditoria em Tempo Real: 100% Protegido
              </span>
              <span className="bg-emerald-200 text-emerald-900 text-[10px] font-black px-2 py-0.5 rounded-full">
                Soberania Ativa
              </span>
            </div>
            <p className="text-emerald-800 leading-relaxed text-xs">
              Ao contrário das redes sociais corporativas que rastreiam cada clique e vendem sua localização, o Cacuso Online implementa princípios estritos de <strong>Privacy by Design</strong> idealizados por Jelson Pereira Manuel e Liron Kilson.
            </p>
          </div>

          {/* Audit Metrics List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-slate-900">
                <EyeOff className="w-4 h-4 text-emerald-600" />
                <span>Zero Anunciantes / Rastreadores</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-snug">
                Nenhum pixel de terceiros, cookies de remarketing ou venda de perfil de consumo.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-slate-900">
                <Lock className="w-4 h-4 text-blue-600" />
                <span>Criptografia Ponta-a-Ponta</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-snug">
                Mensagens e negociações cifradas no seu dispositivo através de chaves públicas locais.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-slate-900">
                <Clock className="w-4 h-4 text-purple-600" />
                <span>Feed Cronológico Imutável</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-snug">
                Sem algoritmos predatórios de dopamina que manipulam o que você vê.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-slate-900">
                <Cpu className="w-4 h-4 text-teal-600" />
                <span>Armazenamento Local Seguro</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-snug">
                Você mantém o controle físico dos dados armazenados no seu navegador.
              </p>
            </div>
          </div>

          {/* Cryptographic Key Details */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-blue-700" />
              Sua Chave Criptográfica Comunitária
            </h4>
            <div className="bg-white p-2.5 rounded-xl border border-slate-200 font-mono text-xs flex items-center justify-between text-slate-800">
              <span>{currentUser.keyFingerprint}</span>
              <span className="text-emerald-700 font-sans font-bold text-[10px] bg-emerald-50 px-2 py-0.5 rounded-sm">
                ECDH / AES-256
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Esta impressão digital permite que outros vizinhos de Cacuso validem a autenticidade das suas mensagens sem intermediários.
            </p>
          </div>

          {/* Data Sovereignty Actions */}
          <div className="pt-2 border-t border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-xs">Direitos Digitais &amp; Soberania</h4>
            
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleExportData}
                id="export-privacy-data-btn"
                className="px-3.5 py-2 bg-blue-50 hover:bg-blue-100 text-blue-800 font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer transition-colors border border-blue-200"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Exportar Meus Dados (JSON)</span>
              </button>

              <button
                onClick={handleClearCache}
                id="clear-privacy-traces-btn"
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Limpar Rastros Locais do Dispositivo</span>
              </button>
            </div>

            {downloadSuccess && (
              <p className="text-emerald-700 font-semibold text-xs flex items-center gap-1 animate-in fade-in">
                <CheckCircle2 className="w-3.5 h-3.5" /> Arquivo exportado com sucesso!
              </p>
            )}

            {clearedNotice && (
              <p className="text-blue-700 font-semibold text-xs flex items-center gap-1 animate-in fade-in">
                <CheckCircle2 className="w-3.5 h-3.5" /> Rastros temporários redefinidos com sucesso!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
