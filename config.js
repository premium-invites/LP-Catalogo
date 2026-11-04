/**
 * CONVITE PREMIUM — CONFIGURAÇÃO DO FUNIL
 * Os sete temas abaixo são exemplos demonstrativos para testar o baralho.
 * Cada tema possui MP4/WebM: a carta da frente reproduz seu vídeo em loop.
 * Os seis vídeos além de Azul & Dourado são movimentos suaves criados a partir das capas estáticas.
 * Substitua as imagens e vídeos demonstrativos pelos materiais finais antes de divulgar.
 */
window.SITE_CONFIG = {
  whatsapp: '5588981346442', // Confirme o número antes da publicação (DDI + DDD + número).
  video: {
    src: 'assets/video/vsl-15anos.mp4',
    webm: 'assets/video/vsl-15anos.webm',
    poster: 'assets/video/vsl-15anos-poster.webp',
    revealAfterSeconds: 1.5
  },
  temas: [
    {
      id: 'baile-de-mascaras',
      nome: 'Baile de Máscaras',
      descricao: 'Misterioso · Elegante · Dourado',
      imagem: 'assets/temas/baile-de-mascaras.webp',
      videoMp4: 'assets/temas/baile-de-mascaras.mp4',
      textura: 'artdeco',
      cores: { principal: '#15121d', secundaria: '#49322f', destaque: '#e5c58d' }
    },
    {
      id: 'borbolletas-encantadas',
      nome: 'Borbolletas Encantadas',
      descricao: 'Delicado · Borboletas · Lavanda',
      imagem: 'assets/temas/borbolletas-encantadas.webp',
      videoMp4: 'assets/temas/borbolletas-encantadas.mp4',
      textura: 'butterflies',
      cores: { principal: '#25183f', secundaria: '#6d5794', destaque: '#e8d4ff' }
    },
    {
      id: 'ceu-de-vangog',
      nome: 'Céu de Vangog',
      descricao: 'Artístico · Céu azul · Sonhador',
      imagem: 'assets/temas/ceu-de-vangog.webp',
      videoMp4: 'assets/temas/ceu-de-vangog.mp4',
      textura: 'moon',
      cores: { principal: '#101d39', secundaria: '#315a73', destaque: '#d8e5e8' }
    },
    {
      id: 'lampadas-magicas',
      nome: 'Lampadas Mágicas',
      descricao: 'Mágico · Luzes · Dourado',
      imagem: 'assets/temas/lampadas-magicas.webp',
      videoMp4: 'assets/temas/lampadas-magicas.mp4',
      textura: 'stars',
      cores: { principal: '#25113f', secundaria: '#593b83', destaque: '#f1cf83' }
    },
    {
      id: 'noite-estrelada',
      nome: 'Noite Estrelada',
      descricao: 'Noturno · Estrelas · Azul profundo',
      imagem: 'assets/temas/noite-estrelada.webp',
      videoMp4: 'assets/temas/noite-estrelada.mp4',
      textura: 'moon',
      cores: { principal: '#090f27', secundaria: '#283b68', destaque: '#d5ddf5' }
    },
    {
      id: 'pais-das-maravilhas',
      nome: 'País das Maravilhas',
      descricao: 'Fantasia · Encantado · Colorido',
      imagem: 'assets/temas/pais-das-maravilhas.webp',
      videoMp4: 'assets/temas/pais-das-maravilhas.mp4',
      textura: 'garden',
      cores: { principal: '#17343b', secundaria: '#47776c', destaque: '#e9c98a' }
    },
    {
      id: 'pool-partty',
      nome: 'Pool Partty',
      descricao: 'Verão · Piscina · Tropical',
      imagem: 'assets/temas/pool-partty.webp',
      videoMp4: 'assets/temas/pool-partty.mp4',
      textura: 'pearls',
      cores: { principal: '#0a3440', secundaria: '#247e8a', destaque: '#ffcfb5' }
    }
  ]
};
