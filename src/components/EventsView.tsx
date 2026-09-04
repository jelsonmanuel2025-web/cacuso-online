import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  PlusCircle, 
  CheckCircle2, 
  MessageSquareLock,
  Sparkles
} from 'lucide-react';
import { CommunityEvent, UserNeighbor } from '../types';

interface EventsViewProps {
  events: CommunityEvent[];
  currentUser: UserNeighbor;
  onAddEvent: (newEvent: Omit<CommunityEvent, 'id' | 'attendeesCount'>) => void;
  onToggleAttend: (eventId: string) => void;
  onOpenE2EEChatWith: (neighbor: UserNeighbor) => void;
  selectedNeighborhood: string;
}

export const EventsView: React.FC<EventsViewProps> = ({
  events,
  currentUser,
  onAddEvent,
  onToggleAttend,
  onOpenE2EEChatWith,
  selectedNeighborhood,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState<CommunityEvent['category']>('mutirao');
  const [neighborhood, setNeighborhood] = useState(
    selectedNeighborhood === 'Todos os Bairros' ? currentUser.neighborhood.split(',')[0] : selectedNeighborhood
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !date.trim()) return;

    onAddEvent({
      title,
      description,
      date,
      time,
      location,
      neighborhood,
      category,
      organizer: currentUser,
      isAttending: true,
    });

    setTitle('');
    setDescription('');
    setDate('');
    setTime('');
    setLocation('');
    setShowForm(false);
  };

  const filteredEvents = events.filter((ev) => {
    return selectedNeighborhood === 'Todos os Bairros' ||
      ev.neighborhood.toLowerCase().includes(selectedNeighborhood.toLowerCase().replace('bairro ', ''));
  });

  return (
    <div className="space-y-4">
      {/* Banner */}
      <div className="bg-linear-to-r from-purple-800 to-indigo-950 text-white rounded-2xl p-4 sm:p-5 shadow-sm border border-purple-700/40 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <span className="bg-purple-300 text-purple-950 font-bold text-xs uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> Eventos &amp; Mutirões em Tempo Real
            </span>
            <span className="text-xs text-purple-200">
              Vizinhança Ativa de Cacuso
            </span>
          </div>

          <h2 className="text-lg sm:text-xl font-bold text-white mb-1">
            Encontros, Mutirões &amp; Feiras Comunitárias
          </h2>
          <p className="text-xs sm:text-sm text-purple-100/90 leading-relaxed max-w-2xl mb-4">
            Fortaleça laços reais. Participe de mutirões ecológicos, feiras de troca de sementes e assembleias comunitárias sem algoritmos para esconder avisos importantes.
          </p>

          <button
            onClick={() => setShowForm(!showForm)}
            id="open-event-form-btn"
            className="px-4 py-2 bg-white hover:bg-purple-50 text-purple-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <PlusCircle className="w-4 h-4 text-purple-700" />
            <span>{showForm ? 'Fechar Formulário' : 'Organizar Novo Evento Comunitário'}</span>
          </button>
        </div>
      </div>

      {/* Event Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl p-4 sm:p-5 border border-purple-200 shadow-sm space-y-3"
          id="new-community-event-form"
        >
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-purple-600" />
              Propor Evento no Bairro
            </h3>
            <span className="text-[11px] text-purple-800 bg-purple-50 px-2 py-0.5 rounded-full font-semibold">
              Mobilização Popular
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Título do Evento
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Mutirão de Plantio de Árvores Nativas..."
                required
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Categoria
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-purple-500"
              >
                <option value="mutirao">Mutirão de Limpeza / Obra Coletiva</option>
                <option value="feira_troca">Feira de Trocas Solidárias</option>
                <option value="assembleia">Assembleia do Bairro</option>
                <option value="oficina">Oficina Educativa / Horta</option>
                <option value="cultural">Encontro Cultural &amp; Lazer</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Data
              </label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="Ex: Sábado, 12 de Abril"
                required
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Horário
              </label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="Ex: 08:30 às 12:00"
                required
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Bairro
              </label>
              <input
                type="text"
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Local Exato
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Ex: Centro Comunitário de Cacuso ou Escola Primária"
              required
              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Descrição e Recomendações
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="O que os vizinhos devem levar (água, enxada, luvas, sementes)?..."
              rows={2}
              required
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-purple-500"
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
              id="confirm-create-event-btn"
              className="px-4 py-1.5 bg-purple-700 hover:bg-purple-800 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer shadow-xs"
            >
              Publicar Evento
            </button>
          </div>
        </form>
      )}

      {/* Events List */}
      <div className="space-y-3.5">
        {filteredEvents.map((ev) => (
          <div
            key={ev.id}
            className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-purple-200 transition-colors"
            id={`event-${ev.id}`}
          >
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-100 text-purple-900 border border-purple-200">
                  {ev.category}
                </span>
                <span className="text-xs font-bold text-purple-700 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {ev.date} às {ev.time}
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-600 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-purple-600" />
                  {ev.location} ({ev.neighborhood})
                </span>
              </div>

              <h3 className="font-bold text-slate-900 text-base leading-snug">
                {ev.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
                {ev.description}
              </p>

              <div className="flex items-center gap-2 pt-1 text-xs text-slate-500">
                <span>Organizado por: <strong className="text-slate-800">{ev.organizer.name}</strong></span>
                <span>•</span>
                <span className="flex items-center gap-1 font-semibold text-purple-800">
                  <Users className="w-3.5 h-3.5" /> {ev.attendeesCount} vizinhos confirmados
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex md:flex-col items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
              <button
                onClick={() => onToggleAttend(ev.id)}
                className={`w-full py-2 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs ${
                  ev.isAttending
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                    : 'bg-purple-700 text-white hover:bg-purple-800'
                }`}
                id={`attend-btn-${ev.id}`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{ev.isAttending ? 'Presença Confirmada' : 'Vou Participar'}</span>
              </button>

              {ev.organizer.id !== currentUser.id && (
                <button
                  onClick={() => onOpenE2EEChatWith(ev.organizer)}
                  className="w-full py-1.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                  id={`chat-organizer-${ev.id}`}
                >
                  <MessageSquareLock className="w-3.5 h-3.5 text-blue-700" />
                  <span>Dúvidas (E2EE)</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
