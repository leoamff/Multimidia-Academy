const questionBank = [
  {
    id: "fundamentals-01",
    question: "Por que conseguimos ouvir alguém falando através do ar?",
    options: ["Porque o som dispensa um meio.", "Porque variações de pressão se propagam pelo ar.", "Porque as partículas viajam da boca até o ouvido.", "Porque a voz é uma onda de luz."],
    correctIndex: 1,
    explanation: "As partículas oscilam localmente enquanto a perturbação se propaga pelo meio."
  },
  {
    id: "fundamentals-02",
    question: "Em tons simples, aumentar a frequência tende a produzir um som:",
    options: ["Mais agudo.", "Mais grave.", "Necessariamente mais intenso.", "Necessariamente mais longo."],
    correctIndex: 0,
    explanation: "A frequência está relacionada à percepção de grave e agudo."
  },
  {
    id: "fundamentals-03",
    question: "Uma flauta e um violino podem ser reconhecidos mesmo tocando a mesma nota principalmente por diferenças de:",
    options: ["Formato de arquivo.", "Tamanho do alto-falante.", "Timbre.", "Quantidade de canais."],
    correctIndex: 2,
    explanation: "O timbre envolve a composição do som e sua evolução no tempo."
  },
  {
    id: "recording-01",
    question: "Na captação, o microfone transforma:",
    options: ["Arquivos em notas MIDI.", "Dados binários em imagens.", "Frequência em tamanho de arquivo.", "Variações de pressão sonora em sinal elétrico."],
    correctIndex: 3,
    explanation: "O sinal elétrico representa as variações captadas pelo microfone."
  },
  {
    id: "recording-02",
    question: "O que acontece na amostragem?",
    options: ["O sinal é medido em instantes regulares.", "Todo ruído é removido.", "O arquivo é necessariamente comprimido.", "O som deixa de precisar de um meio."],
    correctIndex: 0,
    explanation: "Cada medida realizada é uma amostra do sinal."
  },
  {
    id: "recording-03",
    question: "Na quantização, cada medida é:",
    options: ["Transformada obrigatoriamente em MP3.", "Representada por um dos valores disponíveis.", "Reproduzida por um alto-falante.", "Convertida em uma nota musical."],
    correctIndex: 1,
    explanation: "A profundidade de bits determina quantos níveis podem ser utilizados."
  },
  {
    id: "quality-01",
    question: "Depois de gravar uma fala com clipping, apenas diminuir seu volume:",
    options: ["Reconstrói exatamente os picos.", "Remove qualquer distorção.", "Não recupera os picos já cortados.", "Transforma a gravação em estéreo."],
    correctIndex: 2,
    explanation: "A redução posterior de volume não desfaz a informação perdida na sobrecarga."
  },
  {
    id: "quality-02",
    question: "Qual afirmação sobre mono e estéreo está correta?",
    options: ["Estéreo sempre tem menos ruído.", "Mono não pode registrar voz.", "Estéreo significa arquivo sem perdas.", "Mono tem um canal e estéreo tem dois."],
    correctIndex: 3,
    explanation: "O número de canais não determina sozinho a qualidade da captação."
  },
  {
    id: "quality-03",
    question: "Qual atitude ajuda a obter uma gravação clara?",
    options: ["Aumentar o ganho até distorcer.", "Testar a gravação em um ambiente tranquilo.", "Converter qualquer arquivo para WAV.", "Escolher sempre o maior arquivo."],
    correctIndex: 1,
    explanation: "O teste permite perceber problemas de ruído, posicionamento e ganho."
  },
  {
    id: "formats-01",
    question: "Qual formato da lista utiliza compressão sem perdas?",
    options: ["FLAC.", "MP3.", "AAC.", "Nenhum dos três."],
    correctIndex: 0,
    explanation: "FLAC permite recuperar os mesmos dados de áudio fornecidos à codificação."
  },
  {
    id: "formats-02",
    question: "Qual afirmação sobre WAV está correta?",
    options: ["É sempre MIDI.", "É sempre menor que MP3.", "Garante uma captação sem ruído.", "É um contêiner frequentemente usado com áudio PCM."],
    correctIndex: 3,
    explanation: "WAV organiza dados de áudio; não garante qualidade de gravação."
  },
  {
    id: "formats-03",
    question: "MP3 e AAC têm em comum o uso de:",
    options: ["Eventos de notas em vez de áudio.", "Compressão necessariamente sem perdas.", "Compressão com perdas.", "Dois canais obrigatórios."],
    correctIndex: 2,
    explanation: "Ambos podem reduzir o tamanho descartando parte da informação do sinal."
  },
  {
    id: "applications-01",
    question: "Para comparar duas configurações de compressão, qual procedimento é mais adequado?",
    options: ["Usar gravações diferentes e volumes diferentes.", "Usar o mesmo trecho, duração e reprodução comparável.", "Comparar apenas os nomes dos arquivos.", "Escolher músicas de durações diferentes."],
    correctIndex: 1,
    explanation: "Controlar outras diferenças ajuda a observar o efeito da variável estudada."
  },
  {
    id: "applications-02",
    question: "Ao ouvir a mesma sequência MIDI renderizada com outro instrumento, o que pode mudar?",
    options: ["O timbre, mesmo mantendo os eventos de notas.", "O MIDI passa a conter a gravação de um microfone.", "O som deixa de precisar de reprodução.", "O arquivo se torna obrigatoriamente WAV."],
    correctIndex: 0,
    explanation: "O instrumento que interpreta os eventos influencia o som produzido."
  },
  {
    id: "applications-03",
    question: "Na demonstração de ondas, para estudar apenas a amplitude, devemos:",
    options: ["Alterar também a frequência.", "Trocar simultaneamente todos os controles.", "Manter a frequência e variar somente a amplitude.", "Alterar apenas o nome do arquivo."],
    correctIndex: 2,
    explanation: "Mudar uma variável por vez facilita compreender seu efeito."
  }
];