window.horariosAtendimento = [
  { "professor": "Anderson",        "materia": "Filosofia",                "horario": "Quarta-feira 18h10 às 19h10",                              "sala": "J202",                       "email": "anderson.lima@ifsp.edu.br"   },
  { "professor": "Carina",          "materia": "Português",                "horario": "Segunda-feira das 11h35 às 12h35",                          "sala": "J214",                       "email": "carina.zanelato@ifsp.edu.br" },
  { "professor": "Caroline Orsi",   "materia": "Geografia",                "horario": "Sexta-feira 10h40 às 11h40",                                "sala": "J202",                       "email": "caroline.orsi@ifsp.edu.br"   },
  { "professor": "Denise",          "materia": "Inglês",                   "horario": "Quarta-feira das 8h35 às 9h35",                             "sala": "J214",                       "email": "deniseemidio@ifsp.edu.br"    },
  { "professor": "Fabiana",         "materia": "Educação Física",          "horario": "Quarta-feira e Quinta-feira 18h às 19h",                    "sala": "J214",                       "email": "fabiana.freitas@ifsp.edu.br" },
  { "professor": "Gustavo",         "materia": "Introdução à computação",  "horario": "Quarta-feira das 10h35 às 12:35",                           "sala": "I105",                       "email": "gus@ifsp.edu.br"             },
  { "professor": "Helien",          "materia": "Introdução à computação",  "horario": "Segunda-feira 12h00 às 12h30 e Quinta-feira 18h30 às 19h",  "sala": "INFO1 (2ª feira); INFO3 (5ª feira)", "email": "helien@ifsp.edu.br"     },
  { "professor": "José Arnaldo",    "materia": "Interfaces Web",           "horario": "Quarta-feira das 16h às 17h",                               "sala": "J204",                       "email": "arnaldomh@ifsp.edu.br"       },
  { "professor": "Juliana",         "materia": "Artes",                    "horario": "Sexta-feira das 11h às 12h",                                "sala": "J202",                       "email": "juliana.leitao@ifsp.edu.br"  },
  { "professor": "Jurandyr",        "materia": "Física",                   "horario": "Quarta-feira das 11h30 às 12h30",                           "sala": "J215",                       "email": "jurandyr@ifsp.edu.br"        },
  { "professor": "Marcos Fernandes","materia": "Matemática",               "horario": "Quarta-feira das 11h00 às 12h00",                           "sala": "J212",                       "email": "marcos.fernandes@ifsp.edu.br"},
  { "professor": "Marcos Ribeiro",  "materia": "Física",                   "horario": "Quinta-feira das 10h00 às 11h00",                           "sala": "J215",                       "email": "marcosrs@ifsp.edu.br"        },
  { "professor": "Mauro",           "materia": "Programação",              "horario": "Quarta-feira das 11h35 às 12h35",                           "sala": "J203 (ou cantina)",           "email": "mauro.lucca@ifsp.edu.br"     },
  { "professor": "Mário Popolin",   "materia": "Programação",              "horario": "Quinta-feira 11h35 às 12h35",                               "sala": "INFO1",                      "email": "mariopopolin@ifsp.edu.br"    },
  { "professor": "Ricardo",         "materia": "Interfaces Web",           "horario": "----",                                                      "sala": "----",                       "email": "balieiro.ricador@ifsp.edu.br"},
  { "professor": "Roberta",         "materia": "Interfaces Web",           "horario": "Terça-feira das 18h às 19h",                                "sala": "J207 ou INFO3",              "email": "roberta.sinoara@ifsp.edu.br" }
];

window.portalCalendarCategories = {
  atividade: {
    label: 'Atividade',
    color: '#C68C1A',
    soft: '#FBF0D0'
  },
  tarefa: {
    label: 'Tarefa',
    color: '#4B5563',
    soft: '#F3F4F6'
  },
  prova: {
    label: 'Prova',
    color: '#B85C2A',
    soft: '#F4E2D2'
  },
  'sabado-letivo': {
    label: 'Sábado letivo',
    color: '#2D7A50',
    soft: '#D4EDE0'
  }
};

window.portalCalendarDefaults = [
  {
    id: 'default-prova-matematica',
    title: 'Prova de Matemática',
    date: '2026-05-22',
    horario: '16:20 às 18:00',
    category: 'prova',
    subject: 'Matemática',
    description: 'Avaliação bimestral. Conferir conteúdos combinados em sala.',
    links: [],
    attachments: []
  },
  {
    id: 'default-atividade-web',
    title: 'Entrega de atividade de Interfaces Web',
    date: '2026-05-28',
    horario: '14:25 às 16:05',
    category: 'atividade',
    subject: 'Interfaces Web',
    description: 'Finalizar a atividade prática e revisar responsividade antes da entrega.',
    links: [
      { label: 'SUAP', url: 'https://suap.ifsp.edu.br/' }
    ],
    attachments: []
  },
  {
    id: 'default-sabado-letivo',
    title: 'Sábado letivo',
    date: '2026-05-30',
    horario: '12:35 às 18:00',
    category: 'sabado-letivo',
    subject: 'Geral',
    description: 'Reposição letiva seguindo a grade de sexta-feira.',
    links: [],
    attachments: []
  }
];

(function () {
  const storageKey = 'portalCalendarEvents:v1';

  function readStoredCalendarEvents() {
    try {
      const raw = localStorage.getItem(storageKey);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.warn('Não foi possível carregar os eventos salvos.', error);
      return [];
    }
  }

  function saveStoredCalendarEvents(events) {
    try {
      localStorage.setItem(storageKey, JSON.stringify(Array.isArray(events) ? events : []));
      return true;
    } catch (error) {
      console.warn('Não foi possível salvar os eventos.', error);
      return false;
    }
  }

  function getPortalCalendarEvents() {
    const byId = new Map(window.portalCalendarDefaults.map((event) => [event.id, event]));
    readStoredCalendarEvents().forEach((event) => {
      if (!event || !event.id) return;
      if (event.deleted) byId.delete(event.id);
      else byId.set(event.id, event);
    });
    return [...byId.values()].sort((a, b) => {
      const dateCompare = String(a.date || '').localeCompare(String(b.date || ''));
      if (dateCompare !== 0) return dateCompare;
      return String(a.horario || '').localeCompare(String(b.horario || ''));
    });
  }

  /**
   * Deleta múltiplos eventos pelo ID (Exclusão em massa).
   * @param {string[]} ids - Lista de IDs dos eventos a serem removidos.
   */
  function deleteCalendarEvents(ids) {
    if (!Array.isArray(ids) || ids.length === 0) return false;

    const stored = readStoredCalendarEvents();
    const updated = [...stored];

    ids.forEach(id => {
      const index = updated.findIndex(e => e.id === id);
      if (index > -1) {
        updated[index].deleted = true;
      } else {
        // Se for um evento padrão (default) ainda não presente no localStorage, adiciona como deletado
        updated.push({ id, deleted: true });
      }
    });

    return saveStoredCalendarEvents(updated);
  }

  window.calendarStorageKey = storageKey;
  window.readStoredCalendarEvents = readStoredCalendarEvents;
  window.saveStoredCalendarEvents = saveStoredCalendarEvents;
  window.getPortalCalendarEvents = getPortalCalendarEvents;
  window.deleteCalendarEvents = deleteCalendarEvents;
})();
