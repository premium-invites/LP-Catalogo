# Convite Premium — atualização do catálogo

Projeto estático para GitHub Pages. Extraia o conteúdo deste ZIP diretamente na raiz do repositório.

## Alterações desta versão
- Headline da VSL atualizada para: **Seu aniversário começa muito antes da festa.**
- Nova imagem social `assets/catalogo-whatsapp.webp` para a prévia de compartilhamento no WhatsApp.
- Campo **Local da festa** é texto livre e opcional: aceita nome do espaço, endereço ou link do Google Maps.
- Seletor de idade em formato de roleta vertical, de 1 a 99 anos, com **15 anos** selecionado inicialmente.
- Idade escolhida é incluída no briefing do WhatsApp.

## Conteúdo
- `index.html`, `catalogo.html`, `quiz.html`
- `style.css`, `script.js`, `config.js`
- VSL em MP4/WebM e capa
- Sete temas com vídeos MP4 H.264 sem áudio e capas WebP
- Logo Convite Premium
- Imagem de compartilhamento para WhatsApp

## Temas cadastrados
- Baile de Máscaras
- Borbolletas Encantadas
- Céu de Vangog
- Lampadas Mágicas
- Noite Estrelada
- País das Maravilhas
- Pool Partty

## Testes antes da publicação
1. Confirme o número `whatsapp` em `config.js` (DDI + DDD + número).
2. Teste o seletor de idade no celular e confirme valores abaixo e acima de 15.
3. Teste o campo Local da festa deixando vazio, digitando apenas o nome do espaço e colando um link.
4. Envie um briefing de teste para confirmar a mensagem gerada.
5. Publique os arquivos na raiz do GitHub Pages.

O site não armazena os dados nem envia mensagens sozinho: ele prepara o briefing e abre o WhatsApp, onde a pessoa confirma o envio.
