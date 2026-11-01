/**
 * CONVITE PREMIUM — CONFIGURAÇÃO DO FUNIL
 * Os sete temas abaixo são exemplos demonstrativos para testar o baralho.
 * Cada tema possui MP4/WebM: a carta da frente reproduz seu vídeo em loop.
 * Os seis vídeos além de Azul & Dourado são movimentos suaves criados a partir das capas estáticas.
 * Substitua as imagens e vídeos demonstrativos pelos materiais finais antes de divulgar.
 */
window.SITE_CONFIG = {
  whatsapp: '5588994897535', // Confirme o número antes da publicação (DDI + DDD + número).
  video: {
    src: 'assets/video/vsl-15anos.mp4',
    webm: 'assets/video/vsl-15anos.webm',
    poster: 'assets/video/vsl-15anos-poster.webp',
    revealAfterSeconds: 3
  },
  temas: [
    {
      id: 'azul-dourado',
      nome: 'Azul & Dourado',
      descricao: 'Azul-marinho · Dourado · Clássico',
      imagem: 'assets/temas/azul-dourado.webp',
      videoMp4: 'assets/temas/azul-dourado.mp4',
      videoWebm: 'assets/temas/azul-dourado.webm',
      textura: 'stars',
      cores: { principal: '#07132c', secundaria: '#19345c', destaque: '#e1b869' }
    },
    {
      id: 'rosas-vermelhas',
      nome: 'Rosas Vermelhas',
      descricao: 'Romântico · Vermelho · Rosas',
      imagem: 'assets/temas/rosas-vermelhas.webp',
      videoMp4: 'assets/temas/rosas-vermelhas.mp4',
      videoWebm: 'assets/temas/rosas-vermelhas.webm',
      textura: 'roses',
      cores: { principal: '#30081a', secundaria: '#751834', destaque: '#f5bebe' }
    },
    {
      id: 'jardim-encantado',
      nome: 'Jardim Encantado',
      descricao: 'Mágico · Verde · Dourado',
      imagem: 'assets/temas/jardim-encantado.webp',
      videoMp4: 'assets/temas/jardim-encantado.mp4',
      videoWebm: 'assets/temas/jardim-encantado.webm',
      textura: 'garden',
      cores: { principal: '#0a241f', secundaria: '#1c5745', destaque: '#dcc27a' }
    },
    {
      id: 'borboletas-lilas',
      nome: 'Borboletas Lilás',
      descricao: 'Delicado · Lilás · Lavanda',
      imagem: 'assets/temas/borboletas-lilas.webp',
      videoMp4: 'assets/temas/borboletas-lilas.mp4',
      videoWebm: 'assets/temas/borboletas-lilas.webm',
      textura: 'butterflies',
      cores: { principal: '#221641', secundaria: '#63448f', destaque: '#dec2f5' }
    },
    {
      id: 'noite-de-gala',
      nome: 'Noite de Gala',
      descricao: 'Preto · Prata · Sofisticado',
      imagem: 'assets/temas/noite-de-gala.webp',
      videoMp4: 'assets/temas/noite-de-gala.mp4',
      videoWebm: 'assets/temas/noite-de-gala.webm',
      textura: 'artdeco',
      cores: { principal: '#0c0e17', secundaria: '#313644', destaque: '#d7dce6' }
    },
    {
      id: 'perolas-champagne',
      nome: 'Pérolas & Champagne',
      descricao: 'Champagne · Pérolas · Elegante',
      imagem: 'assets/temas/perolas-champagne.webp',
      videoMp4: 'assets/temas/perolas-champagne.mp4',
      videoWebm: 'assets/temas/perolas-champagne.webm',
      textura: 'pearls',
      cores: { principal: '#3e2e23', secundaria: '#906f4d', destaque: '#f8e1b8' }
    },
    {
      id: 'ceu-estrelado',
      nome: 'Céu Estrelado',
      descricao: 'Azul profundo · Prata · Lua',
      imagem: 'assets/temas/ceu-estrelado.webp',
      videoMp4: 'assets/temas/ceu-estrelado.mp4',
      videoWebm: 'assets/temas/ceu-estrelado.webm',
      textura: 'moon',
      cores: { principal: '#0f1237', secundaria: '#33366f', destaque: '#c7d3f8' }
    }
  ]
};
