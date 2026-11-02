# Convite Premium — Funil atualizado

Projeto estático para GitHub Pages. Extraia o conteúdo deste ZIP diretamente na raiz do repositório.

## Fluxo
1. VSL em tela cheia na `index.html`.
2. Catálogo integrado na mesma página, com baralho de temas.
3. Quiz em `quiz.html`, com o tema selecionado aplicado automaticamente.
4. Mensagem de briefing preparada para envio manual pelo WhatsApp.

## Temas incluídos
Os sete vídeos enviados foram integrados como temas do catálogo, com os nomes apresentados:
- Baile de Máscaras
- Borbolletas Encantadas
- Céu de Vangog
- Lampadas Mágicas
- Noite Estrelada
- País das Maravilhas
- Pool Partty

Cada tema tem um MP4 H.264 compatível com navegadores móveis e uma capa WebP extraída do próprio vídeo. A carta ativa reproduz seu vídeo em loop, sem áudio; as demais ficam pausadas. O vídeo ativo muda quando o visitante arrasta o baralho.

## Personalizar os temas
Edite `config.js`, dentro de `temas`. Para cada novo tema, informe:
- `id`: identificador único sem espaços;
- `nome`: nome exibido na carta e no quiz;
- `descricao`: breve descrição;
- `imagem`: caminho da capa WebP;
- `videoMp4`: caminho do vídeo MP4;
- `textura`: estilo de textura do cartão do quiz;
- `cores`: `principal`, `secundaria` e `destaque`, em hexadecimal.

Mantenha `Sua ideia` como última carta; ela é adicionada automaticamente pelo JavaScript.

## VSL e áudio
A VSL utiliza `assets/video/vsl-15anos.mp4` e `assets/video/vsl-15anos.webm`. Ela inicia automaticamente sem som. O botão **Ativar som** só habilita o áudio após um clique explícito. Quando a seção da VSL sai da área visível durante a rolagem, o áudio é silenciado imediatamente; o vídeo pode continuar reproduzindo.

## Quiz
- A idade inicial é 15 anos, mas o visitante pode escolher outra idade.
- O campo de mapa é opcional e aceita um link do Google Maps.
- O nome do campo é “Nome da aniversariante”.
- O tema selecionado aparece com a paleta e textura correspondentes.

## Configuração antes de publicar
1. Confira o número `whatsapp` no `config.js` (DDI + DDD + número).
2. Substitua a VSL demonstrativa pelo arquivo final, se necessário, mantendo os caminhos configurados.
3. Teste no celular real (autoplay, áudio, arraste do baralho e envio para WhatsApp).
4. Publique os arquivos na raiz do GitHub Pages.

Não há backend: o site prepara a mensagem e abre o WhatsApp; o visitante ainda precisa tocar em Enviar.
