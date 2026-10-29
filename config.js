/**
 * CONVITE PREMIUM — CONFIGURAÇÕES
 * Adicione quantos temas e exemplos quiser. Não é necessário editar o HTML.
 *
 * IMPORTANTE: substitua os links e as imagens apenas por arquivos reais.
 */
window.SITE_CONFIG = {
  // Confirme se o número de WhatsApp abaixo continua correto. Use DDI + DDD + número.
  whatsapp: '5588994897535',

  video: {
    // Coloque o vídeo real em assets/vsl-15anos.mp4 e defina o caminho abaixo.
    // O site tenta iniciar com áudio. Se o navegador bloquear, aparece o botão
    // para o visitante tocar no vídeo e iniciar com áudio ligado.
    src: '',
    poster: 'assets/capa-15anos.webp',
    liberarAposSegundos: 1
  },

  // Um tema real foi encontrado no material enviado. Novos temas entram aqui.
  temas: [
    {
      id: 'azul-dourado',
      nome: 'Azul & Dourado',
      descricao: 'Encantado · Azul-marinho · Dourado',
      imagem: 'assets/capa-15anos.webp',
      // Personalize estas cores para cada novo tema. Use fundos escuros para
      // garantir a leitura do texto branco e detalhes claros no destaque.
      cores: { principal: '#0b2048', secundaria: '#182f61', destaque: '#e6c384' }
    }
  ],

  // Exemplos de convites finalizados na seção de cartas sobrepostas.
  // Podem ser diferentes dos temas oferecidos no catálogo.
  // O efeito de deslizar funciona automaticamente quando houver 2 ou mais exemplos.
  exemplos: [
    {
      id: 'nycolle',
      nome: '15 anos · Nycolle',
      legenda: 'Azul & Dourado',
      imagem: 'assets/capa-15anos.webp',
      url: 'https://convitepremium.github.io/convites-premium-Nycolle/?v'
    }
  ]
};
