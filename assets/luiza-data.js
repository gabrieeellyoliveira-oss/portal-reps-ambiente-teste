// Base de conhecimento da Luíza (assistente virtual do Portal de Representantes).
// Cada entrada = 1 "carta" do script de chatbot: gatilhos de palavras-chave que
// disparam a resposta, a resposta em si e os botões de continuação (que levam a
// outra entrada pelo `targetId`). Pra treinar a Luíza com mais dúvidas, só
// adicionar novas entradas nesse array — o widget lê tudo daqui automaticamente
// (inclusive os chips de sugestão, que são gerados a partir da lista completa).
window.LUIZA_FAQ = [
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
      'A inativação não acontece de forma automática ou imediata.',
      'Quando identificarmos que um representante está há mais de 60 dias sem realizar novas vendas ou adicionar clientes, o Agente de Sucesso entrará em contato para entender o que aconteceu e se existe algum motivo que tenha impactado sua atuação.',
      'Pode ser, por exemplo, algum imprevisto pessoal, questão familiar, ausência por saúde, férias ou qualquer outra situação que tenha impossibilitado a continuidade das vendas.',
      'A partir desse contato, avaliamos cada situação individualmente. Quando houver uma justificativa, ela será registrada e podemos combinar um período para que o representante retome suas atividades.',
      'Caso seja necessário, o representante poderá ficar temporariamente inativado para novas vendas e ter sua reativação programada para um momento posterior.',
      'O objetivo dessa regra não é simplesmente retirar representantes do canal, mas acompanhar a atuação, entender o cenário de cada um e manter uma base de parceiros ativos e engajados.'
    ].join('\n\n'),
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
      'A exclusividade se aplica somente a plataformas de Cardápio Digital.',
      'Sabemos que existem diferentes tipos de plataformas no mercado: algumas atuam como Cardápio Digital, enquanto outras são voltadas para Sistema de Gestão e possuem outra finalidade.',
      'Por isso, o representante pode, sim, atuar com outras empresas que ofereçam soluções de gestão para restaurantes. Isso não impede a parceria com a Cardápio Web.',
      'O que não permitimos é a representação simultânea de outra plataforma que também atue diretamente como Cardápio Digital, justamente por uma questão de concorrência e conflito de interesses.',
      'Ou seja: se a outra empresa trabalha com Sistema de Gestão, não há problema. A exclusividade é específica para o segmento de Cardápio Digital.'
    ].join('\n\n'),
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
      'As multas estão relacionadas a condutas específicas que não são permitidas durante ou após a parceria, principalmente em relação à concorrência, à migração de clientes e ao aliciamento da carteira:',
      '1. Não concorrência ativa: o representante não pode desenvolver, operar, licenciar, distribuir ou vender qualquer software ou plataforma de Cardápio Digital que seja concorrente direto da Cardápio Web.',
      '2. Migração de clientes ativos: durante o contrato, caso o representante incentive, ajude ou facilite a saída de um cliente da Cardápio Web para outra empresa, poderá ser aplicada uma multa correspondente a 18 vezes o valor mensal do plano de cada cliente migrado.',
      '3. Não aliciamento pós-contrato: mesmo após o encerramento da parceria, o representante não pode abordar, convidar ou induzir clientes da carteira da Cardápio Web a migrarem para plataformas concorrentes.',
      '4. Penalidade por violação pós-contratual: caso ocorra uma violação das regras de não aliciamento após o encerramento do contrato, poderá ser aplicada uma multa correspondente a 12 vezes a receita recorrente total gerada pela carteira na data do desligamento.',
      'Importante: não existe multa por inatividade, por ficar um período sem vender ou simplesmente por encerrar a parceria. As penalidades estão relacionadas a situações específicas, como incentivar migração de clientes, utilizar informações da carteira pra essa finalidade ou atuar como concorrente direto.'
    ].join('\n\n'),
    botoes: [
      { label: 'Quero saber sobre exclusividade', targetId: '003' },
      { label: 'Quero saber sobre inativação', targetId: '002' }
    ]
  }
];

window.LUIZA_CONFIG = {
  nome: 'Luíza',
  subtitulo: 'Assistente do Programa de Representantes',
  saudacao: 'Oi! Eu sou a Luíza 💜 Posso te ajudar a tirar dúvidas sobre contrato e o Programa de Representantes. Escolhe uma pergunta abaixo ou digita a sua dúvida:',
  bolhaConvite: 'Oi! Precisa de ajuda com alguma dúvida? 💬',
  fallback: 'Não consegui entender sua pergunta 🙁\nVocê pode escolher uma das opções abaixo ou digitar de outra forma.'
};
