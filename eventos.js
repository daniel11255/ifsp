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

// Recarrega a página sempre que o usuário voltar para a aba (mesmo se já estava aberta)
document.addEventListener('visibilitychange', function() {
  if (document.visibilityState === 'visible') window.location.reload();
});

window.addEventListener('pageshow', function(e) {
  if (e.persisted) window.location.reload();
});
