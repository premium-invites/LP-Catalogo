# Convite Premium — Funil integrado (versão de teste)

Projeto estático **mobile-first** para GitHub Pages. A primeira página reúne a VSL e o catálogo; o quiz continua em uma página separada.

## Estrutura

- `index.html` — VSL em tela cheia + catálogo na mesma página + benefícios + recursos + processo.
- `quiz.html` — briefing personalizado, tema pré-selecionado, idade ajustável e envio preparado para WhatsApp.
- `catalogo.html` — redirecionamento de compatibilidade para `index.html#catalogo` (links antigos continuam funcionando).
- `style.css` — identidade visual, animações, baralho e layout mobile-first.
- `script.js` — reprodução do vídeo, animações, baralho, seleção de tema, quiz e WhatsApp.
- `config.js` — número de WhatsApp, vídeo e cadastro de temas.
- `assets/logo-convite-premium.webp` — logo utilizada nos cabeçalhos e rodapé.
- `assets/video/vsl-preview.mp4` e `assets/video/vsl-preview.webm` — vídeo ambiente demonstrativo em dois formatos para testar o autoplay e a sequência de texto.
- `assets/temas/` — sete capas demonstrativas; a primeira também possui MP4 e WebM curtos para testar o vídeo no baralho.

## O que está implementado

### VSL

- Vídeo em tela cheia com `autoplay`, `muted`, `loop` e `playsinline`.
- O vídeo inicia sem áudio; o botão **Ativar som / Som ativado** permite ligar ou desligar o áudio após interação do visitante.
- Após **3 segundos de reprodução efetiva**, a headline aparece em fade de baixo para cima; depois entra a subheadline e, por último, o botão **Ver temas**.
- O botão flutua suavemente e executa uma ondulação ao toque; em seguida rola para o catálogo na mesma página.
- Não há linhas de progresso nem a mensagem “prévia estática / vídeo pendente”.

### Catálogo

- O cabeçalho mostra apenas **Catálogo**, em tamanho maior, sem estrela ou “15 anos”.
- A seção “Muito além de uma imagem / Antes da festa, um primeiro encanto” aparece logo após o cabeçalho.
- O baralho é o seletor de temas: sete temas demonstrativos e a carta **Sua ideia** como última opção.
- Arraste para a esquerda/direita, use as setas ou navegue pelo teclado. A carta ativa inclina e acompanha o dedo; as cartas de trás mudam de posição com transição elástica.
- Só a primeira carta usa vídeo (MP4 com WebM alternativo) e reproduz automaticamente, sem áudio, quando o baralho entra na tela e essa carta está na frente. As outras cartas usam capas estáticas. Ao trocar de carta ou sair da área visível, o vídeo é pausado.
- Tocar na carta da frente seleciona o tema e abre o quiz.
- O degradê inferior é suave, permanece durante a rolagem e desaparece ao chegar ao final da página.
- Benefícios, “Tudo em um único link”, processo e rodapé foram mantidos.

### Quiz

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

As sete artes são **mockups demonstrativos para testar o baralho**, não convites finais vendidos. Substitua as capas pelos materiais reais quando estiverem prontos. Para adicionar um tema, inclua um novo objeto no array `temas` de `config.js` e coloque a imagem correspondente em `assets/temas/`. A carta “Sua ideia” é adicionada automaticamente e não deve ser cadastrada no array.

## Vídeos: o que substituir antes de divulgar

Este pacote inclui dois vídeos de teste:

- `assets/video/vsl-preview.mp4` / `assets/video/vsl-preview.webm`: fundo animado demonstrativo da VSL. **Não é a VSL comercial final** e não contém narração/áudio.
- `assets/temas/azul-dourado.mp4` / `assets/temas/azul-dourado.webm`: animação curta para testar a reprodução apenas na primeira carta do baralho.

Quando seu vídeo real da VSL estiver pronto:

1. Coloque o arquivo em `assets/video/` (recomendo MP4 H.264; WebM pode ser usado como alternativa).
2. Abra `config.js` e altere `video.src` para o caminho MP4 real e `video.webm` para o WebM alternativo, se houver.
3. Se necessário, altere `video.poster` para a imagem de capa correspondente.
4. O botão de som já está preparado: o vídeo começa silencioso e o visitante pode ativar o áudio.

Autoplay com áudio não é garantido por navegadores móveis. Por isso, o vídeo começa silencioso; o áudio só é ativado após o toque no controle.

Para adicionar vídeo a outro tema, inclua `videoMp4: 'assets/temas/nome-do-arquivo.mp4'` e/ou `videoWebm: 'assets/temas/nome-do-arquivo.webm'` no objeto daquele tema em `config.js`. O script só reproduz o vídeo da carta ativa; as demais continuam com suas capas.

## Configuração obrigatória antes da publicação

1. **WhatsApp:** confirme o valor `whatsapp` em `config.js` (formato internacional com DDI + DDD + número, somente dígitos). O projeto preservou o número que já constava na versão anterior: `5588994897535`.
2. **VSL:** substitua o vídeo ambiente demonstrativo pelo vídeo comercial real.
3. **Temas:** substitua os mockups pelos convites/temas finais e atualize nomes, descrições, paletas e texturas no `config.js`.
4. **Primeira carta:** quando tiver o WebM final do tema Azul & Dourado, substitua `assets/temas/azul-dourado.webm` ou retire a propriedade `video` do tema se não quiser vídeo nele.

## Como publicar no GitHub Pages

1. Faça backup do repositório atual.
2. Extraia **todo o conteúdo deste ZIP** diretamente na raiz do repositório `LP-Catalogo`, mantendo a pasta `assets/` e os arquivos `index.html`, `quiz.html`, `catalogo.html`, `style.css`, `script.js`, `config.js` e `README.md` na raiz.
3. Faça commit e aguarde o GitHub Pages atualizar.
4. Teste em celular real e em aba anônima: autoplay silencioso, ativar som, texto após 3 segundos, rolagem do botão, arraste das cartas, seleção de todos os temas, carta final “Sua ideia”, idade alternativa, campo do Maps e mensagem do WhatsApp.

## Privacidade e limites

- O site não cria convites nem prévias. Ele apenas coleta os dados no navegador e prepara o briefing.
- Não há banco de dados ou envio dos campos para um servidor próprio.
- A mensagem abre no WhatsApp; **o cliente precisa confirmar e tocar em Enviar**.
- `sessionStorage` é usado apenas para manter o ID do tema escolhido durante o fluxo do navegador. Isso não é uma barreira de segurança.
