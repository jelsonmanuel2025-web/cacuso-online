import React, { useState } from 'react';
import { 
  Recycle, 
  Leaf, 
  MapPin, 
  PlusCircle, 
  CheckCircle2, 
  Users, 
  Award, 
  Sparkles, 
  Trash2, 
  Clock, 
  Calendar,
  AlertTriangle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { EcoWastePoint, EcoWasteReport, UserNeighbor } from '../types';

interface WasteManagementEcoProps {
  ecoPoints: EcoWastePoint[];
  reports: EcoWasteReport[];
  currentUser: UserNeighbor;
  onAddReport: (newReport: Omit<EcoWasteReport, 'id' | 'date' | 'status'>) => void;
  selectedNeighborhood: string;
}

export const WasteManagementEco: React.FC<WasteManagementEcoProps> = ({
  ecoPoints,
  reports,
  currentUser,
  onAddReport,
  selectedNeighborhood,
}) => {
  const [showReportForm, setShowReportForm] = useState(false);
  const [title, setTitle] = useState('');
  const [type, setType] = useState<EcoWasteReport['type']>('descarte_correto');
  const [description, setDescription] = useState('');
  const [kgCollected, setKgCollected] = useState<number>(15);
  const [neighborhood, setNeighborhood] = useState(
    selectedNeighborhood === 'Todos os Bairros' ? currentUser.neighborhood.split(',')[0] : selectedNeighborhood
  );

  const totalKg = reports.reduce((sum, r) => sum + r.kgCollected, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const points = Math.max(10, Math.round(kgCollected * 1.5));

    onAddReport({
      title,
      type,
      description,
      reportedBy: currentUser,
      neighborhood,
      kgCollected: Number(kgCollected),
      ecoPointsAwarded: points,
    });

    // Celebrate eco-contribution
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#059669', '#10B981', '#34D399']
      });
    } catch (err) {
      // Ignore if confetti not supported
    }

    setTitle('');
    setDescription('');
    setShowReportForm(false);
  };

  const filteredPoints = ecoPoints.filter((pt) => {
    return selectedNeighborhood === 'Todos os Bairros' ||
      pt.neighborhood.toLowerCase().includes(selectedNeighborhood.toLowerCase().replace('bairro ', ''));
  });

  return (
    <div className="space-y-4">
      {/* Eco Banner */}
      <div className="bg-linear-to-r from-teal-800 via-emerald-900 to-slate-900 text-white rounded-2xl p-4 sm:p-5 shadow-sm border border-emerald-700/40 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <span className="bg-emerald-400 text-emerald-950 font-bold text-xs uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Leaf className="w-3.5 h-3.5" /> Gestão Comunitária de Resíduos
            </span>
            <span className="text-xs text-emerald-200">
              EcoCacuso • Sustentabilidade Municipal
            </span>
          </div>

          <h2 className="text-lg sm:text-xl font-bold text-white mb-1">
            EcoCacuso: Limpeza, Compostagem &amp; Reciclagem Local
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-2xl mb-4">
            Transformando resíduos em adubo orgânico e reciclagem real. Monitore ecopontos nos bairros, registre seu descarte consciente e participe dos mutirões comunitários para ganhar Eco-Pontos de Mérito.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white/10 rounded-xl p-3 backdrop-blur-xs border border-white/10 mb-3">
            <div>
              <span className="text-[10px] text-emerald-200 uppercase block font-medium">Coletados / Reciclados</span>
              <span className="text-lg font-black text-white">{totalKg} kg</span>
            </div>
            <div>
              <span className="text-[10px] text-emerald-200 uppercase block font-medium">Ecopontos Ativos</span>
              <span className="text-lg font-black text-emerald-300">{ecoPoints.length} postos</span>
            </div>
            <div>
              <span className="text-[10px] text-emerald-200 uppercase block font-medium">Adubo Criado</span>
              <span className="text-lg font-black text-teal-300">340 kg</span>
            </div>
            <div>
              <span className="text-[10px] text-emerald-200 uppercase block font-medium">Seus Eco-Pontos</span>
              <span className="text-lg font-black text-amber-300">{currentUser.ecoMeritPoints} pts</span>
            </div>
          </div>

          <button
            onClick={() => setShowReportForm(!showReportForm)}
            id="open-eco-report-form-btn"
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{showReportForm ? 'Fechar Formulário' : 'Registrar Descarte ou Propor Mutirão'}</span>
          </button>
        </div>
      </div>

      {/* Report Creation Form */}
      {showReportForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl p-4 sm:p-5 border border-emerald-300 shadow-sm space-y-3"
          id="eco-waste-report-form"
        >
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              Registrar Ação de Sustentabilidade no Bairro
            </h3>
            <span className="text-[11px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold">
              Ganha Eco-Pontos
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tipo de Ação Ecológica
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-emerald-500"
              >
                <option value="descarte_correto">Descarte Correto em Ecoponto</option>
                <option value="compostagem_coletiva">Compostagem Orgânica de Resíduos</option>
                <option value="mutirao_limpeza">Mutirão de Limpeza Comunitária</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Estimativa de Resíduos (kg)
              </label>
              <input
                type="number"
                min={1}
                max={5000}
                value={kgCollected}
                onChange={(e) => setKgCollected(Number(e.target.value))}
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Título da Ação
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Entrega de 20kg de garrafas plásticas no Ecoponto Quizenga..."
              required
              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Descrição e Detalhes
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Compartilhe como foi a separação, vizinhos envolvidos e recomendações..."
              rows={2}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-emerald-700 font-semibold">
              Recompensa estimada: +{Math.max(10, Math.round(kgCollected * 1.5))} Eco-Pontos no perfil
            </span>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowReportForm(false)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                id="submit-eco-report-btn"
                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer shadow-xs"
              >
                Registrar Ação
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Ecopontos Comunitários de Cacuso */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <h3 className="font-bold text-slate-900 text-sm">
              Ecopontos Oficiais no Município de Cacuso
            </h3>
          </div>
          <span className="text-[11px] text-slate-500">Monitoramento Comunitário</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filteredPoints.map((point) => (
            <div
              key={point.id}
              className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-2 hover:border-emerald-300 transition-colors"
              id={`ecopoint-${point.id}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{point.name}</h4>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span>{point.location}</span>
                  </p>
                </div>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                  {point.neighborhood}
                </span>
              </div>

              {/* Capacity Bar */}
              <div>
                <div className="flex justify-between text-[11px] font-medium text-slate-600 mb-1">
                  <span>Nível de Lotação:</span>
                  <span className={point.capacityPercentage > 80 ? 'text-rose-600 font-bold' : 'text-slate-800 font-bold'}>
                    {point.capacityPercentage}%
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all ${
                      point.capacityPercentage > 80 ? 'bg-rose-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${point.capacityPercentage}%` }}
                  />
                </div>
              </div>

              {/* Accepted Types */}
              <div className="flex flex-wrap gap-1 pt-1">
                {point.acceptedTypes.map((type) => (
                  <span
                    key={type}
                    className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium capitalize"
                  >
                    {type}
                  </span>
                ))}
              </div>

              {/* Footer info */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  {point.operatingHours}
                </span>
                <span>Coord: {point.coordinator}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Community Waste Actions */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
        <h4 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-1.5">
          <Award className="w-4 h-4 text-emerald-600" />
          Últimas Ações &amp; Mutirões Registrados
        </h4>

        <div className="space-y-2.5">
          {reports.map((report) => (
            <div
              key={report.id}
              className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start justify-between gap-3 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-xs">{report.title}</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.2 rounded-full font-bold">
                    +{report.ecoPointsAwarded} pts
                  </span>
                </div>
                <p className="text-slate-600 text-[11px]">{report.description}</p>
                <div className="flex items-center gap-3 text-[10px] text-slate-400">
                  <span>Por: {report.reportedBy.name}</span>
                  <span>•</span>
                  <span>{report.neighborhood}</span>
                  <span>•</span>
                  <span>{report.date}</span>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-xs font-black text-emerald-700 block">
                  {report.kgCollected} kg
                </span>
                <span className="text-[9px] text-slate-400">processados</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
