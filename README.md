# Multimídia Academy

## Objetivo

Protótipo educacional sobre **Áudio Digital para Sistemas Multimídia**, com três seções curtas e navegação não linear por âncoras. O conteúdo foi resumido para apoiar uma apresentação de até 15 minutos, incluindo demonstrações; o tempo total deve ser conferido em ensaio.

O curso apresenta conceitos essenciais, um fluxo visual de digitalização e cards sobre formatos e qualidade. As mídias de áudio ainda serão integradas em espaços identificados, sem players fictícios. Imagens Digitais permanece como complemento, com explicações e zoom PNG/SVG. O quiz existente não foi alterado nesta simplificação.

## Navegação

- `modules/audio-digital.html#fundamentals`: O que é áudio digital?
- `modules/audio-digital.html#recording-digitization`: Como o som vira um arquivo?
- `modules/audio-digital.html#formats-compression`: Formatos e Qualidade.
- `modules/digital-images.html`: conteúdo complementar existente.
- `quiz.html`: quiz interativo.

A arquitetura mantém quatro páginas HTML: homepage, curso principal, complemento e quiz. O quiz possui 15 perguntas cadastradas, sorteia cinco por tentativa e mostra acertos, percentual e explicações.

## Tecnologias

- HTML5 para estrutura e conteúdo semântico.
- CSS3 para apresentação, responsividade e efeitos visuais.
- JavaScript puro para as interações da interface.

## Estrutura de pastas

```text
Multimidia-Academy/
├── index.html
├── quiz.html
├── README.md
├── modules/
│   ├── audio-digital.html
│   └── digital-images.html
├── css/
│   ├── style.css
│   ├── audio-digital.css
│   ├── quiz.css
│   └── digital-images.css
├── js/
│   ├── main.js
│   ├── questions.js
│   ├── quiz.js
│   └── digital-images.js
└── assets/
    ├── images/
    │   ├── raster/
    │   └── vector/
    ├── audio/
    ├── midi/
    ├── video/
    ├── animations/
    └── source/
```

## Como executar localmente

Abra `index.html` diretamente em um navegador. Não há build nem backend; os textos e a navegação do curso funcionam sem JavaScript. O quiz e o zoom de Imagens Digitais utilizam JavaScript.

As imagens atuais dos cards e as fontes tipográficas são carregadas de serviços externos; é necessária conexão com a internet para exibi-las. Durante o desenvolvimento, também é possível abrir a pasta no VS Code e usar uma extensão de servidor local, como Live Server.

Ao integrar futuras mídias, validar a execução local e os formatos realmente utilizados. Um servidor de arquivos estáticos, quando necessário, não constitui um backend da aplicação.

## Organização dos recursos multimídia

- `assets/images/raster/`: imagens matriciais originais, como fotografias em JPG ou WebP.
- `assets/images/vector/`: ilustrações vetoriais, preferencialmente em SVG.
- `assets/audio/`: áudio digital, como narrações e efeitos sonoros em formatos como MP3, WAV ou OGG.
- `assets/midi/`: arquivos de música ou sequências MIDI (`.mid` ou `.midi`).
- `assets/video/`: vídeos, por exemplo em MP4 ou WebM.
- `assets/animations/`: recursos de animação usados pelo projeto, como GIFs ou animações implementadas em CSS e JavaScript.
- `assets/source/`: arquivos-fonte editáveis, como o projeto XCF existente.

### Imagens dos cards

| Card | Caminho local planejado |
| --- | --- |
| O que é áudio digital? / Como o som vira um arquivo? | `assets/images/raster/audio-studio.jpg` |
| Formatos e Qualidade | `assets/images/raster/digital-animation.jpg` |
| Complemento Imagens Digitais | `assets/images/raster/photography-camera.jpg` |
