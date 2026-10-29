# Convite Premium — Funil de 15 anos (versão consolidada)

Site estático em HTML, CSS e JavaScript, adaptado da landing page original **Convites Interativos**. O site é **mobile first** e não depende de WordPress, React, servidor, banco de dados ou bibliotecas JavaScript externas.

## Estrutura (arquivos na raiz do ZIP)

- `index.html`: apresentação em vídeo (VSL) em tela cheia. A headline é “Seus 15 anos começam antes da festa.”, acompanhada do subtítulo. Ambos surgem com fade de baixo para cima, primeiro o título, depois o subtítulo. O botão **Ver temas** só aparece após um segundo de vídeo efetivamente reproduzido e após a animação dos textos.
- `catalogo.html`: abre diretamente na seção **“MUITO ALÉM DE UMA IMAGEM / Antes da festa, um primeiro encanto.”**, com baralho sobreposto de exemplos completos. As cartas podem ser arrastadas lateralmente quando houver 2 ou mais exemplos, e o toque na carta principal abre o convite pronto em outra aba. O botão **Escolher tema** desce suavemente até os modelos em cards. Inclui opção **Sua ideia**, quatro benefícios preservados, seis cards menores com recursos do convite, etapas informativas e um fade inferior incentivando a rolagem.
- `quiz.html`: última página, **“UM ÚLTIMO PASSO / Conte um pouco sobre a festa.”**. O tema selecionado no catálogo aparece no destaque com a foto e a paleta configurada para aquele tema. Recolhe nome do responsável e da debutante, data, hora e local opcionais, além da confirmação solicitada. Apenas quem escolhe **Sua ideia** vê o campo **“Como você imagina seu convite?” (opcional)**.
- `config.js`: configura WhatsApp, vídeo, temas, cores e exemplos interativos.
- `script.js`: lógica de navegação do funil, animações de scroll, cartas e mensagem do WhatsApp.
- `style.css`: identidade visual e layout responsivo.
- `assets/`: logo e capa original de 15 anos, exatamente como estavam no ZIP original.

O funil esperado é: **WhatsApp inicial (saudação configurada no aplicativo) → VSL → Catálogo e temas → Quiz → WhatsApp com mensagem preenchida**. O cliente deve clicar em **Enviar** no WhatsApp. **Este site não cria convites, não gera prévia e não mostra preços.** O material do quiz é apenas um briefing para a criação manual.

## Pendências obrigatórias para publicar a versão final

**1. Vídeo da VSL.** Ainda não foi fornecido um MP4. Copie-o para `assets/vsl-15anos.mp4` e ajuste em `config.js`:

```js
video: {
  src: 'assets/vsl-15anos.mp4',
  poster: 'assets/capa-15anos.webp',
  liberarAposSegundos: 1
},
```

Quando `src` está vazio, `index.html` exibe a capa como **prévia temporária**, liberando o avanço após um segundo apenas para permitir testes. **Isso não significa que alguém assistiu à VSL.** Se existir um MP4 configurado e ele não puder ser reproduzido, a etapa não será liberada. Browsers móveis frequentemente **bloqueiam autoplay com áudio**: nesses casos o visitante verá **“Toque no vídeo para assistir com som”**, que reproduz o vídeo com áudio após o toque.

**2. Temas.** Atualmente há somente o tema real **Azul & Dourado**. Cadastre os futuros 7 ou mais modelos em `config.js`, cada um com um ID exclusivo, nome, descrição, foto e três cores hexadecimais. A lista cresce automaticamente; não precisa modificar o HTML.

Exemplo de cadastro (apenas modelo de configuração, não um produto já incluído):

```js
{
  id: 'rosas-vermelhas',
  nome: 'Rosas Vermelhas',
  descricao: 'Rosas · Vermelho · Elegante',
  imagem: 'assets/rosas-vermelhas.webp',
  cores: { principal: '#3b1023', secundaria: '#741e3a', destaque: '#f6c9ca' }
}
```

Coloque a imagem correspondente em `assets/`. Use cores de fundo escuras, pois o texto sobre a célula no quiz é branco. **Sua ideia** é acrescentado pelo sistema e não precisa entrar em `temas`.

**3. Exemplos reais do baralho.** A seção “Muito além de uma imagem” atualmente tem um exemplo original, **Nycolle**. Confirme se o link está publicado e se abre o convite real. Adicione quantos exemplos concluídos quiser no array `exemplos` do `config.js`:

```js
{
  id: 'mariana',
  nome: '15 anos · Mariana',
  legenda: 'Jardim de Rosas',
  imagem: 'assets/mariana.webp',
  url: 'https://seu-usuario.github.io/convite-mariana/'
}
```

As cartas se empilham automaticamente e podem ser trocadas com gesto lateral, setas ou teclado. Com apenas um exemplo, o baralho permanece no mesmo estilo, porém não tem alternância.

**4. WhatsApp.** Verifique `whatsapp` em `config.js` (apenas DDI+DDD+número, sem símbolos). Um botão `wa.me` **abre a conversa com texto pré-preenchido; não envia sozinho**. A saudação com o link do catálogo é configurada separadamente no WhatsApp Business e **não** faz parte deste site.

## Navegação e privacidade

- A navegação normal usa três páginas reais, não um formulário de etapa única.
- `sessionStorage` armazena **somente um sinal de conclusão da VSL e o ID do tema selecionado**, nesta sessão do navegador. Dados pessoais do quiz não são armazenados pelo site nem enviados a um servidor próprio; serão incluídos no link da mensagem somente se a pessoa confirmar o formulário.
- Essa proteção de sequência é **apenas de experiência do usuário**, não autenticação ou bloqueio inviolável.
- As animações de aparição usam `IntersectionObserver` e respeitam a preferência de **reduzir movimento**. O gradiente inferior some quando a pessoa começa a rolar, para não ocultar o conteúdo.

## Publicar no GitHub Pages

1. **Extraia o ZIP.** Os arquivos `index.html`, `catalogo.html`, `quiz.html`, `style.css`, `script.js`, `config.js` e a pasta `assets/` devem ficar **na raiz do repositório**, nunca dentro de uma pasta `mnt/`, `data/` ou outra subpasta extra.
2. Adicione o MP4, os modelos e seus links, e revise o número do WhatsApp.
3. Substitua os arquivos antigos no repositório `LP-Catalogo` pelo conteúdo extraído e aguarde a atualização do GitHub Pages.
4. Teste em celular real: reprodução do vídeo com som após toque; aparecimento do botão depois de um segundo; arraste dos exemplos; rolagem até os cards; escolha normal e Sua ideia; formulário; link gerado e envio manual no WhatsApp.

**Não publique como versão definitiva enquanto o vídeo e os exemplos/modelos que você promete mostrar não estiverem prontos.** O site não foi publicado automaticamente ao gerar este ZIP.
