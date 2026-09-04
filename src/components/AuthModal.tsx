import React, { useState } from 'react';
import { 
  X, 
  Smartphone, 
  Lock, 
  User, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  RefreshCw, 
  Eye, 
  EyeOff, 
  Sparkles,
  MessageSquare,
  CreditCard,
  PhoneCall,
  Users,
  Check
} from 'lucide-react';
import { UserNeighbor } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: UserNeighbor) => void;
  initialMode?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onAuthSuccess,
  initialMode = 'login',
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  
  // Registration Form State
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('+244 9');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Login Form State
  const [loginIdentifier, setLoginIdentifier] = useState('+244 940 583 598');
  const [loginPassword, setLoginPassword] = useState('cacuso2026');

  // SMS Verification Step for Registration
  const [smsStep, setSmsStep] = useState<boolean>(false);
  const [generatedSmsCode, setGeneratedSmsCode] = useState<string>('');
  const [enteredSmsCode, setEnteredSmsCode] = useState<string>('');
  const [smsNotificationVisible, setSmsNotificationVisible] = useState<boolean>(false);
  const [resendCooldown, setResendCooldown] = useState<number>(0);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // New Registration Success Onboarding State
  const [createdUser, setCreatedUser] = useState<UserNeighbor | null>(null);
  const [isWhatsappCalibrated, setIsWhatsappCalibrated] = useState(false);

  if (!isOpen) return null;

  const handleSendSmsCode = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!firstName.trim() || !lastName.trim()) {
      setErrorMsg('Por favor preencha o seu Primeiro Nome e Último Nome.');
      return;
    }
    if (phone.length < 9) {
      setErrorMsg('Por favor insira um número de telefone válido com indicativo.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('A palavra-passe deve ter pelo menos 6 caracteres.');
      return;
    }

    // Generate simulated 6-digit Angolan SMS code
    const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedSmsCode(randomCode);
    setSmsStep(true);
    setSmsNotificationVisible(true);
    setResendCooldown(30);

    // Simulated SMS arrival timer
    setTimeout(() => {
      setSmsNotificationVisible(true);
    }, 400);
  };

  const handleResendSms = () => {
    if (resendCooldown > 0) return;
    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedSmsCode(newCode);
    setSmsNotificationVisible(true);
    setResendCooldown(30);
  };

  const handleVerifySmsAndRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (enteredSmsCode.trim() !== generatedSmsCode.trim()) {
      setErrorMsg('Código SMS incorreto. Verifique a notificação de SMS recebida.');
      return;
    }

    setIsSubmitting(true);
    const fullName = [firstName.trim(), middleName.trim(), lastName.trim()].filter(Boolean).join(' ');

    setTimeout(() => {
      // Generate unique Multicaixa Express reference based on phone or random
      const phoneDigits = phone.replace(/\D/g, '');
      const ref = phoneDigits.length >= 9 ? phoneDigits.slice(-9) : Math.floor(100000000 + Math.random() * 900000000).toString();

      const newUser: UserNeighbor = {
        id: `user-${Date.now()}`,
        name: fullName,
        firstName: firstName.trim(),
        middleName: middleName.trim(),
        lastName: lastName.trim(),
        phone: phone.trim(),
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
        neighborhood: 'Bairro Central, Cacuso',
        reputationScore: 95,
        vouchesCount: 2,
        badges: ['Vizinho Confirmado por SMS', 'Amigo Oficial dos Fundadores', 'Identidade Segura'],
        keyFingerprint: `${Math.random().toString(36).substring(2, 6).toUpperCase()}:${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
        completedExchanges: 0,
        ecoMeritPoints: 50,
        joinedDate: 'Hoje',
        isProfessionalMode: true,
        followersCount: 2,
        followingCount: 2,
        isFriendWithFounders: true,
        friendsList: ['founder-jelson', 'founder-liron'],
        expressEntity: '00845',
        expressReference: ref.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3'),
        whatsappCalibrated: false,
        language: 'pt',
      };

      setIsSubmitting(false);
      setCreatedUser(newUser);
    }, 700);
  };

  const handleFinishOnboarding = () => {
    if (createdUser) {
      onAuthSuccess({
        ...createdUser,
        whatsappCalibrated: isWhatsappCalibrated,
      });
      onClose();
      setCreatedUser(null);
      setSmsStep(false);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    setIsSubmitting(true);
    setTimeout(() => {
      // Default to Liron Kilson if matching or generic login
      const loggedUser: UserNeighbor = {
        id: 'user-liron',
        name: 'Liron Kilson',
        firstName: 'Liron',
        middleName: 'Kilson',
        lastName: 'Manuel',
        phone: loginIdentifier,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
        neighborhood: 'Bairro Central, Cacuso',
        reputationScore: 99,
        vouchesCount: 138,
        badges: ['Criador Oficial', 'Criptografia & Privacidade', 'Modo Profissional', 'Nó de Validação'],
        isFounder: true,
        roleTitle: 'Co-Fundador & Engenheiro de Redes',
        keyFingerprint: 'B18C:330F:D721:A855:40EC:66F2',
        completedExchanges: 52,
        ecoMeritPoints: 890,
        joinedDate: 'Fevereiro 2025',
        isProfessionalMode: true,
        followersCount: 18450,
        followingCount: 320,
      };

      setIsSubmitting(false);
      onAuthSuccess(loggedUser);
      onClose();
    }, 600);
  };

  const handleQuickLoginAs = (name: 'liron' | 'jelson') => {
    if (name === 'liron') {
      const lironUser: UserNeighbor = {
        id: 'user-liron',
        name: 'Liron Kilson',
        firstName: 'Liron',
        middleName: 'Kilson',
        lastName: 'Manuel',
        phone: '+244 940 583 598',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
        neighborhood: 'Bairro Central, Cacuso',
        reputationScore: 99,
        vouchesCount: 138,
        badges: ['Criador Oficial', 'Criptografia & Privacidade', 'Modo Profissional'],
        isFounder: true,
        roleTitle: 'Co-Fundador & Engenheiro de Privacidade',
        keyFingerprint: 'B18C:330F:D721:A855:40EC:66F2',
        completedExchanges: 52,
        ecoMeritPoints: 890,
        joinedDate: 'Fevereiro 2025',
        isProfessionalMode: true,
        followersCount: 18450,
        followingCount: 320,
      };
      onAuthSuccess(lironUser);
    } else {
      const jelsonUser: UserNeighbor = {
        id: 'founder-jelson',
        name: 'Jelson Pereira Manuel',
        firstName: 'Jelson',
        middleName: 'Pereira',
        lastName: 'Manuel',
        phone: '+244 923 881 904',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
        neighborhood: 'Bairro Central, Cacuso',
        reputationScore: 99,
        vouchesCount: 142,
        badges: ['Criador Oficial', 'Inovador Social', 'Guardião Comunitário'],
        isFounder: true,
        roleTitle: 'Co-Fundador & Arquiteto de Inovação Social',
        keyFingerprint: '4A9F:882C:E310:7B99:99F1:D0A4',
        completedExchanges: 48,
        ecoMeritPoints: 920,
        joinedDate: 'Fevereiro 2025',
        isProfessionalMode: true,
        followersCount: 22100,
        followingCount: 280,
      };
      onAuthSuccess(jelsonUser);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      {/* Simulated SMS Notification Banner */}
      {smsNotificationVisible && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-60 w-11/12 max-w-md bg-slate-900/95 text-white p-3.5 rounded-2xl shadow-2xl border border-amber-500/40 flex items-start gap-3 animate-bounce">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div className="flex-1 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-400 uppercase tracking-wide">SMS Recebido • Unitel/Movicel</span>
              <span className="text-[10px] text-slate-400">Agora</span>
            </div>
            <p className="text-slate-200 mt-1 font-medium">
              Cacuso Online: O teu código de confirmação por SMS é{' '}
              <span className="font-mono font-black text-amber-300 text-sm tracking-wider bg-amber-950/60 px-2 py-0.5 rounded-md">
                {generatedSmsCode}
              </span>
            </p>
          </div>
          <button 
            onClick={() => setSmsNotificationVisible(false)}
            className="text-slate-400 hover:text-white text-sm cursor-pointer p-1"
          >
            ✕
          </button>
        </div>
      )}

      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Decorative Angolan Flag Accent Header */}
        <div className="h-2 w-full bg-linear-to-r from-red-600 via-amber-400 to-slate-950" />

        {/* Modal Header */}
        <div className="p-5 sm:p-6 pb-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-blue-700 text-white flex items-center justify-center font-black text-xl shadow-xs">
              C
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
                <span>Cacuso Online</span>
                <span className="text-xs bg-amber-100 text-amber-900 font-semibold px-2 py-0.5 rounded-full">
                  Angola 🇦🇴
                </span>
              </h2>
              <p className="text-xs text-slate-500">O teu lar digital seguro e conectado</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center cursor-pointer transition-colors"
            id="close-auth-modal-btn"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher: Iniciar Sessão vs Registrar */}
        <div className="flex border-b border-slate-200 bg-slate-50/60 px-6 pt-3">
          <button
            onClick={() => {
              setMode('login');
              setSmsStep(false);
              setErrorMsg('');
            }}
            id="tab-login-btn"
            className={`flex-1 py-2.5 text-xs sm:text-sm font-semibold text-center border-b-2 cursor-pointer transition-all ${
              mode === 'login'
                ? 'border-blue-700 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Iniciar Sessão
          </button>
          <button
            onClick={() => {
              setMode('register');
              setErrorMsg('');
            }}
            id="tab-register-btn"
            className={`flex-1 py-2.5 text-xs sm:text-sm font-semibold text-center border-b-2 cursor-pointer transition-all ${
              mode === 'register'
                ? 'border-blue-700 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Criar Nova Conta
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7">
          {errorMsg && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200 font-medium">
              {errorMsg}
            </div>
          )}

          {createdUser ? (
            /* REGISTRATION SUCCESS & ONBOARDING (FOUNDER FRIENDSHIP + EXPRESS ENTIDADE/REFERÊNCIA + CALIBRAR WHATSAPP) */
            <div className="space-y-4 animate-fadeIn" id="auth-welcome-onboarding">
              <div className="text-center space-y-1">
                <div className="w-14 h-14 rounded-3xl bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center shadow-xs">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  Bem-vindo ao Cacuso Online!
                </h3>
                <p className="text-xs text-slate-600">
                  A tua conta foi confirmada e ativada com sucesso.
                </p>
              </div>

              {/* 1. Amizade Automática com os Fundadores */}
              <div className="p-3.5 bg-blue-50/80 rounded-2xl border border-blue-200 space-y-2">
                <div className="flex items-center gap-2 text-blue-900 font-bold text-xs">
                  <Users className="w-4 h-4 text-blue-700" />
                  <span>Amizade Oficial Automática com os Fundadores</span>
                </div>
                <p className="text-xs text-blue-800 leading-relaxed">
                  Para garantir apoio direto e acolhimento comunitário, agora és oficialmente <strong>amigo de Jelson Pereira Manuel e Liron Kilson</strong>. As publicações dos fundadores e o suporte oficial já estão integrados na tua rede.
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[10px] font-bold bg-blue-200/80 text-blue-900 px-2 py-0.5 rounded-md">
                    ✓ Amigo de Liron Kilson
                  </span>
                  <span className="text-[10px] font-bold bg-blue-200/80 text-blue-900 px-2 py-0.5 rounded-md">
                    ✓ Amigo de Jelson Pereira Manuel
                  </span>
                </div>
              </div>

              {/* 2. Opção Automática de Entidade e Referência Multicaixa Express (Venda a Kwanza) */}
              <div className="p-4 bg-linear-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-300 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-amber-950 font-bold text-xs">
                    <CreditCard className="w-4 h-4 text-amber-700" />
                    <span>Carteira Multicaixa Express Gerada (Moeda Kz)</span>
                  </div>
                  <span className="text-[10px] font-black text-amber-900 bg-amber-200 px-2 py-0.5 rounded-full">
                    AOA Kwanza
                  </span>
                </div>
                <p className="text-[11px] text-amber-900 leading-snug">
                  Criada automaticamente para transacionares na <strong>Aba de Negócios</strong> com total segurança:
                </p>
                
                <div className="grid grid-cols-2 gap-2 bg-white/90 p-2.5 rounded-xl border border-amber-200">
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 block">ENTIDADE EXPRESS</span>
                    <span className="text-sm font-black font-mono text-slate-900">{createdUser.expressEntity || '00845'}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 block">REFERÊNCIA PESSOAL</span>
                    <span className="text-sm font-black font-mono text-blue-700">{createdUser.expressReference}</span>
                  </div>
                </div>
              </div>

              {/* 3. Botão para Calibrar com WhatsApp */}
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                    <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Calibrar com WhatsApp (+244)</span>
                  </div>
                  <p className="text-[10px] text-slate-500">
                    Vincular notificações e alertas seguros ao {createdUser.phone}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsWhatsappCalibrated(true)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 ${
                    isWhatsappCalibrated 
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800'
                  }`}
                >
                  {isWhatsappCalibrated ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Calibrado</span>
                    </>
                  ) : (
                    <span>Calibrar com WhatsApp</span>
                  )}
                </button>
              </div>

              {/* Concluir e Entrar */}
              <button
                type="button"
                onClick={handleFinishOnboarding}
                id="finish-onboarding-btn"
                className="w-full py-3 bg-blue-700 hover:bg-blue-800 active:scale-[0.99] text-white font-bold text-sm rounded-xl transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
              >
                <span>Aceder ao Meu Feed no Cacuso Online</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : mode === 'login' ? (
            /* LOGIN FORM */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Número de Telefone ou Nome Completo
                </label>
                <div className="relative">
                  <Smartphone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    placeholder="+244 940 583 598 ou Liron Kilson"
                    className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:border-blue-600 focus:outline-hidden text-slate-900 transition-all"
                    id="login-phone-input"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Senha ou Palavra-Passe
                  </label>
                  <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Código de redefinição enviado via SMS para o teu telemóvel!'); }} className="text-[11px] text-blue-600 hover:underline">
                    Esqueceste a senha?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:border-blue-600 focus:outline-hidden text-slate-900 transition-all"
                    id="login-password-input"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-blue-700 hover:bg-blue-800 active:scale-[0.99] text-white font-bold text-sm rounded-xl transition-all cursor-pointer shadow-sm flex items-center justify-center gap-2"
                id="login-submit-btn"
              >
                {isSubmitting ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>Entrar no Cacuso Online</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Quick 1-Click Login for Demonstration */}
              <div className="pt-4 border-t border-slate-100">
                <p className="text-[11px] text-slate-400 font-medium text-center uppercase tracking-wider mb-2.5">
                  Acesso Rápido de Teste (Criadores Oficiais)
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickLoginAs('liron')}
                    className="p-2 bg-slate-100 hover:bg-slate-200/80 rounded-xl text-left flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                      alt="Liron"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold text-slate-900 truncate">Liron Kilson</p>
                      <p className="text-[10px] text-blue-700">Criador &amp; Redes</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickLoginAs('jelson')}
                    className="p-2 bg-slate-100 hover:bg-slate-200/80 rounded-xl text-left flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                      alt="Jelson"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold text-slate-900 truncate">Jelson Pereira</p>
                      <p className="text-[10px] text-amber-700">Inovação Social</p>
                    </div>
                  </button>
                </div>
              </div>
            </form>
          ) : !smsStep ? (
            /* REGISTRATION FORM - STEP 1 (Name, Phone, Password) */
            <form onSubmit={handleSendSmsCode} className="space-y-3.5">
              {/* First Name, Middle Name, Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Primeiro Nome *
                  </label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Ex: Liron"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:border-blue-600 focus:outline-hidden text-slate-900"
                    id="register-firstname-input"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nome do Meio
                  </label>
                  <input
                    type="text"
                    value={middleName}
                    onChange={(e) => setMiddleName(e.target.value)}
                    placeholder="Ex: Kilson"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:border-blue-600 focus:outline-hidden text-slate-900"
                    id="register-middlename-input"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Último Nome *
                  </label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Ex: Manuel"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:border-blue-600 focus:outline-hidden text-slate-900"
                    id="register-lastname-input"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Número de Telefone (para confirmação com SMS) *
                </label>
                <div className="relative">
                  <Smartphone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+244 9XX XXX XXX"
                    className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:border-blue-600 focus:outline-hidden text-slate-900 font-medium"
                    id="register-phone-input"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Enviaremos uma SMS com código de segurança de 6 dígitos.
                </p>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Palavra-Passe ou Senha *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mínimo 6 caracteres"
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:border-blue-600 focus:outline-hidden text-slate-900"
                    id="register-password-input"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-start gap-2 text-emerald-800 text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <p>
                  <strong>Privacidade Garantida:</strong> No Cacuso Online, os teus dados nunca são vendidos ou usados para anúncios predatórios.
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm rounded-xl transition-all cursor-pointer shadow-sm flex items-center justify-center gap-2"
                id="send-sms-code-btn"
              >
                <span>Enviar Código SMS de Confirmação</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            /* REGISTRATION FORM - STEP 2 (SMS Code Verification) */
            <form onSubmit={handleVerifySmsAndRegister} className="space-y-4">
              <div className="text-center">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 mx-auto flex items-center justify-center mb-2">
                  <Smartphone className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base text-slate-900">Confirmar Número por SMS</h3>
                <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto">
                  Enviámos um código de 6 dígitos para o número <strong className="text-slate-800">{phone}</strong>
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 text-center">
                  Digita o Código de 6 Dígitos
                </label>
                <div className="max-w-xs mx-auto">
                  <input
                    type="text"
                    maxLength={6}
                    required
                    autoFocus
                    value={enteredSmsCode}
                    onChange={(e) => setEnteredSmsCode(e.target.value.replace(/\D/g, ''))}
                    placeholder="Ex: 724915"
                    className="w-full py-3 text-center tracking-[0.5em] font-mono text-xl font-bold bg-slate-50 border-2 border-blue-500 rounded-xl focus:bg-white focus:outline-hidden text-slate-900 shadow-inner"
                    id="sms-code-input"
                  />
                </div>
              </div>

              {/* Hint button to auto-fill for testing */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setEnteredSmsCode(generatedSmsCode)}
                  className="text-[11px] text-blue-700 hover:underline cursor-pointer font-medium"
                >
                  Preencher com o código recebido ({generatedSmsCode})
                </button>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                <button
                  type="button"
                  onClick={() => setSmsStep(false)}
                  className="hover:text-slate-800 underline cursor-pointer"
                >
                  ← Alterar número
                </button>

                <button
                  type="button"
                  onClick={handleResendSms}
                  disabled={resendCooldown > 0}
                  className="text-blue-700 hover:underline cursor-pointer disabled:text-slate-400 flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reenviar SMS</span>
                </button>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || enteredSmsCode.length < 6}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-bold text-sm rounded-xl transition-all cursor-pointer shadow-sm flex items-center justify-center gap-2"
                id="verify-sms-submit-btn"
              >
                {isSubmitting ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Confirmar SMS &amp; Entrar</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
