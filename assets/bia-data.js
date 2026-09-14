// Base de conhecimento da Bia (assistente virtual do Portal de Representantes).
// Cada entrada = 1 "carta" do script de chatbot: gatilhos de palavras-chave que
// disparam a resposta, a resposta em si e os botões de continuação (que levam a
// outra entrada pelo `targetId`). Pra treinar a Bia com mais dúvidas, só
// adicionar novas entradas nesse array — o widget lê tudo daqui automaticamente
// (inclusive os chips de sugestão, que são gerados a partir da lista completa).
window.BIA_FAQ = [
  {
    id: '002',
    categoria: 'Contrato',
    gatilhos: [
      'inativação', 'inativacao', 'inativação do contrato', '60 dias',
      'ficar sem vender', 'ficar sem clientes', 'o que acontece se eu não vender',
      'o que acontece se eu nao vender', 'contrato inativo', 'suspensão do contrato',
      'suspensao do contrato', 'sem novos clientes'
    ],
    pergunta: 'O que acontece se eu ficar 60 dias sem adicionar clientes?',
    resposta: [
      'Não é automático nem imediato ✅',
      '• Depois de 60 dias sem vender, o Agente de Sucesso te liga',
      '• É só pra entender o motivo (saúde, férias, imprevisto...)',
      '• Se tiver justificativa, combinamos um prazo pra você voltar',
      '• A ideia é acompanhar, não excluir'
    ].join('\n'),
    botoes: [
      { label: 'Quero saber sobre exclusividade', targetId: '003' },
      { label: 'Quero saber sobre multas', targetId: '004' }
    ]
  },
  {
    id: '003',
    categoria: 'Contrato',
    gatilhos: [
      'exclusividade', 'posso trabalhar com outra empresa', 'posso representar outra plataforma',
      'concorrência', 'concorrencia', 'outra marca', 'trabalhar com concorrente', 'posso ter outro cliente'
    ],
    pergunta: 'Como funciona a exclusividade do contrato?',
    resposta: [
      'Vale só pra Cardápio Digital 👇',
      '• Pode atuar com empresas de Sistema de Gestão, sem problema',
      '• Não pode representar outro Cardápio Digital ao mesmo tempo',
      '• É concorrência direta que não é permitida, o resto pode'
    ].join('\n'),
    botoes: [
      { label: 'Quero saber sobre multas', targetId: '004' },
      { label: 'Quero saber sobre inativação', targetId: '002' }
    ]
  },
  {
    id: '004',
    categoria: 'Contrato',
    gatilhos: [
      'multa', 'multas', 'penalidade', 'o que acontece se eu sair', 'posso ser multado',
      'aliciamento', 'migração de clientes', 'migracao de clientes', 'quanto pago de multa'
    ],
    pergunta: 'Como funcionam as multas do contrato?',
    resposta: [
      'Sem vender ou sair do programa NÃO dá multa ✅',
      'Só tem multa se você:',
      '• Ajudar cliente a migrar pra concorrente → 18x o valor do plano',
      '• Aliciar clientes da carteira depois de sair → 12x a receita',
      '• Virar concorrente direto da Cardápio Web'
    ].join('\n'),
    botoes: [
      { label: 'Quero saber sobre exclusividade', targetId: '003' },
      { label: 'Quero saber sobre inativação', targetId: '002' }
    ]
  }
];

window.BIA_CONFIG = {
  nome: 'Bia',
  subtitulo: 'Assistente do Programa de Representantes',
  saudacao: 'Oi! Eu sou a Bia 💜 Posso te ajudar a tirar dúvidas sobre contrato e o Programa de Representantes. Escolhe uma pergunta abaixo ou digita a sua dúvida:',
  bolhaConvite: 'Oi! Precisa de ajuda com alguma dúvida? 💬',
  fallback: 'Não consegui entender sua pergunta 🙁\nVocê pode escolher uma das opções abaixo ou digitar de outra forma.'
};
