# Convite Premium — Funil integrado V5

Projeto estático **mobile-first** para GitHub Pages. A VSL e o catálogo ficam na mesma página; o quiz continua em uma página separada.

## Estrutura

- `index.html` — VSL em tela cheia + catálogo na mesma página + benefícios + recursos + processo.
- `quiz.html` — briefing personalizado, tema pré-selecionado, idade ajustável e envio preparado para WhatsApp.
- `catalogo.html` — redirecionamento de compatibilidade para `index.html#catalogo` (links antigos continuam funcionando).
- `style.css` — identidade visual, transições, baralho e layout mobile-first.
- `script.js` — reprodução da VSL, animações, baralho, vídeos ativos, seleção de tema, quiz e WhatsApp.
- `config.js` — número de WhatsApp, vídeo e cadastro de temas.
- `assets/logo-convite-premium.webp` — logo utilizada na VSL e no rodapé.
- `assets/video/` — VSL enviada pelo usuário, convertida para MP4 H.264 e WebM VP9, com poster otimizado.
- `assets/temas/` — sete capas demonstrativas e vídeos MP4/WebM para cada carta.

## O que está implementado

### VSL

- Vídeo em tela cheia com `autoplay`, `muted`, `loop` e `playsinline`.
- O vídeo inicia sem áudio; o botão **Ativar som / Som ativado** permite ligar ou desligar o áudio após interação do visitante.
- Após **3 segundos de reprodução efetiva**, a headline aparece em fade de baixo para cima; depois entra a subheadline e, por último, o botão **Ver temas**.
- O botão tem texto centralizado, sem seta lateral, flutua suavemente e executa uma ondulação ao toque; em seguida rola para o catálogo na mesma página.
- Não há faixa branca de cabeçalho entre a VSL e o catálogo.
- A transição de fundo entre a VSL e o catálogo começa no mesmo azul-marinho escuro, misturando-se gradualmente ao azul do catálogo.
- Não há linhas de progresso nem a mensagem “prévia estática / vídeo pendente”.

### Catálogo

- O catálogo começa imediatamente após a VSL, sem uma faixa branca com logo, título ou botão.
- A seção “Muito além de uma imagem / Antes da festa, um primeiro encanto” é o início do catálogo.
- O baralho é o seletor de temas: sete temas demonstrativos e a carta **Sua ideia** como última opção.
- Arraste para a esquerda/direita, use as setas ou navegue pelo teclado. A carta ativa inclina e acompanha o dedo; as cartas de trás mudam de posição com transição elástica.
- **Todas as sete cartas de temas possuem MP4 e WebM.** Somente a carta que está na frente e quando o baralho está visível reproduz seu vídeo, automaticamente e sem áudio. As outras cartas ficam em pausa e mostram a capa/poster. Ao trocar de carta ou sair da área visível, o vídeo anterior é pausado.
- A carta **Sua ideia** é uma carta gráfica final, sem vídeo, e conduz ao quiz com a descrição opcional.
- Tocar na carta da frente seleciona o tema e abre o quiz.
- O degradê inferior é suave, permanece durante a rolagem e desaparece ao chegar ao final da página.
- Benefícios, “Tudo em um único link”, processo e rodapé foram mantidos.

### Quiz

- O cabeçalho do quiz não mostra logo nem o título “Catálogo”; contém apenas o botão **← Voltar**, alinhado à esquerda.
- O tema escolhido é exibido em um cartão com cores e textura configuradas para aquele tema.
- A idade começa selecionada em **15 anos**. Se o visitante escolher **Escolher outra idade**, aparece um campo numérico obrigatório.
- O campo de local pede o link do Google Maps ou do mapa do local; é opcional e pode ser preenchido depois.
- Para **Sua ideia**, aparece o campo de descrição opcional.
- O formulário monta a mensagem e abre o WhatsApp; o visitante ainda precisa tocar em **Enviar**.

## Temas demonstrativos incluídos

1. Azul & Dourado
2. Rosas Vermelhas
3. Jardim Encantado
4. Borboletas Lilás
5. Noite de Gala
6. Pérolas & Champagne
7. Céu Estrelado
8. Sua ideia (carta final automática)

As sete artes são **mockups demonstrativos para testar o baralho**, não convites finais vendidos.

### Sobre os vídeos dos temas

- Azul & Dourado usa o vídeo demonstrativo já existente.
- Os outros seis vídeos são loops curtos criados a partir das capas estáticas, com movimento suave de aproximação/afastamento para demonstrar o autoplay ao trocar a carta.
- Esses seis loops **não representam animações reais dos convites finais**. Substitua-os pelos vídeos finais dos convites quando estiverem prontos.
- Cada tema usa `videoMp4` e `videoWebm` no `config.js`. O MP4 é a primeira opção, para melhor compatibilidade com celulares; o WebM é a alternativa.

Para adicionar outro tema, inclua um objeto no array `temas` de `config.js`, coloque a capa em `assets/temas/` e adicione os caminhos `videoMp4` e `videoWebm`. A carta **Sua ideia** é inserida automaticamente e não deve ser cadastrada no array.

## VSL real integrada

O vídeo enviado foi integrado ao projeto e convertido para formatos compatíveis com navegadores atuais:

- `assets/video/vsl-15anos.mp4`: MP4 H.264, 1080 × 1920, áudio AAC estéreo.
- `assets/video/vsl-15anos.webm`: WebM VP9, 720 × 1280, áudio Opus estéreo.
- `assets/video/vsl-15anos-poster.webp`: imagem de capa extraída do vídeo.
- Duração original preservada: aproximadamente 12,17 segundos.

A página inicia a reprodução automaticamente, sem som, em `autoplay`, `muted` e `playsinline`. O botão **Ativar som** permite ligar o áudio após o toque do visitante. Após 3 segundos de reprodução efetiva, entram a headline, a subheadline e o botão **Ver temas**.

O arquivo original enviado estava em HEVC. A conversão para H.264/WebM foi feita para melhorar a compatibilidade entre Safari, Chrome e navegadores móveis, preservando a trilha de áudio.

Os arquivos `assets/temas/*.mp4` e `assets/temas/*.webm` continuam sendo loops demonstrativos dos temas. Substitua-os pelas prévias finais dos convites quando estiverem prontas.

## Configuração obrigatória antes da publicação

1. **WhatsApp:** confirme o valor `whatsapp` em `config.js` (formato internacional com DDI + DDD + número, somente dígitos). O projeto preservou o número que já constava na versão anterior: `5588994897535`.
2. **VSL:** a versão enviada já está integrada. Confira a reprodução e o áudio no celular de destino.
3. **Temas:** substitua os mockups pelas artes finais e atualize nomes, descrições, paletas e texturas no `config.js`.
4. **Vídeos dos temas:** substitua os loops de demonstração por prévias reais de cada convite quando disponíveis.

## Como publicar no GitHub Pages

1. Faça backup do repositório atual.
2. Extraia **todo o conteúdo deste ZIP** diretamente na raiz do repositório `LP-Catalogo`, mantendo a pasta `assets/` e os arquivos `index.html`, `quiz.html`, `catalogo.html`, `style.css`, `script.js`, `config.js` e `README.md` na raiz.
3. Faça commit e aguarde o GitHub Pages atualizar.
4. Teste em celular real: autoplay silencioso da VSL, ativar som, texto após 3 segundos, botão centralizado, transição sem cabeçalho branco, troca entre as sete cartas com vídeo, carta final **Sua ideia**, botão Voltar, idade alternativa, campo do Maps e mensagem do WhatsApp.

## Privacidade e limites

- O site não cria convites nem prévias. Ele apenas coleta os dados no navegador e prepara o briefing.
- Não há banco de dados ou envio dos campos para um servidor próprio.
- A mensagem abre no WhatsApp; **o cliente precisa confirmar e tocar em Enviar**.
- `sessionStorage` é usado apenas para manter o ID do tema escolhido durante o fluxo do navegador. Isso não é uma barreira de segurança.
