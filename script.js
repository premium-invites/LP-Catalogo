(() => {
  'use strict';

  const config = window.SITE_CONFIG || {};
  const temas = Array.isArray(config.temas) ? config.temas : [];
  const exemplos = Array.isArray(config.exemplos) ? config.exemplos : [];
  const page = document.body.dataset.page;
  const KEY_INTRO = 'convite-premium-vsl-ok';
  const KEY_TEMA = 'convite-premium-tema-selecionado';
  const one = (selector) => document.querySelector(selector);

  // O controle de etapas é feito no navegador, sem servidor ou armazenamento de dados pessoais.
  // Não é uma barreira de segurança: evita apenas pular etapas pela navegação comum.
  const flow = {
    read(key) { try { return sessionStorage.getItem(key); } catch { return null; } },
    write(key, value) { try { sessionStorage.setItem(key, value); } catch { /* Navegação básica sem sessão. */ } }
  };

  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

  if (page !== 'intro' && flow.read(KEY_INTRO) !== '1') {
    window.location.replace('index.html');
    return;
  }

  if (page === 'intro') initIntro();
  if (page === 'catalogo') { initCatalog(); initReveals(); }
  if (page === 'quiz') { initQuiz(); initReveals(); }

  function initIntro() {
    const video = one('#introVideo');
    const fallback = one('#videoFallback');
    const tapToPlay = one('#vslTapToPlay');
    const status = one('#vslStatus');
    const retryButton = one('#retryVideo');
    const continueButton = one('#continueButton');
    const soundButton = one('#soundButton');
    const playButton = one('#playButton');
    const progress = one('#videoProgress');
    const controlLabel = one('#videoControlLabel');
    const data = config.video || {};
    const src = typeof data.src === 'string' ? data.src.trim() : '';
    const unlockSeconds = Math.max(1, Number(data.liberarAposSegundos) || 1);
    const introStart = performance.now();
    let unlocked = false;
    let fallbackMode = false;
    let waitingToReveal = false;
    let loadTimer = null;

    // Título → subtítulo → CTA. O botão somente pode aparecer após
    // o tempo real de reprodução (1s) E depois da entrada dos textos.
    function unlock() {
      if (unlocked || waitingToReveal) return;
      waitingToReveal = true;
      const waitForCopy = Math.max(0, 1550 - (performance.now() - introStart));
      window.setTimeout(() => {
        unlocked = true;
        status.hidden = true;
        continueButton.hidden = false;
      }, waitForCopy);
    }
    retryButton.addEventListener('click', () => window.location.reload());
    continueButton.addEventListener('click', (event) => {
      if (!unlocked) { event.preventDefault(); return; }
      flow.write(KEY_INTRO, '1');
    });

    function showFallback(message) {
      if (fallbackMode) return;
      fallbackMode = true;
      clearTimeout(loadTimer);
      tapToPlay.hidden = true;
      video.pause();
      video.hidden = true;
      fallback.hidden = false;
      playButton.hidden = true;
      soundButton.hidden = true;
      status.hidden = false;
      status.textContent = message;
      controlLabel.textContent = src ? 'VÍDEO INDISPONÍVEL' : 'PRÉVIA ESTÁTICA · VÍDEO PENDENTE';
      if (!src) {
        // Apenas a prévia de teste SEM vídeo permite seguir após 1s.
        window.setTimeout(unlock, unlockSeconds * 1000);
      } else {
        // Com vídeo configurado, uma falha NÃO pode pular a etapa obrigatória.
        status.textContent = message + '. Recarregue para tentar novamente.';
        retryButton.hidden = false;
      }
    }

    if (!src) {
      showFallback('Vídeo não adicionado · acesso para teste');
      return;
    }

    video.poster = typeof data.poster === 'string' && data.poster.trim()
      ? data.poster : 'assets/capa-15anos.webp';
    video.src = src;
    video.muted = false;
    video.volume = 1;
    video.hidden = false;
    fallback.hidden = true;
    soundButton.hidden = false;
    playButton.hidden = false;
    status.textContent = 'Assista ao primeiro segundo para liberar os temas';
    controlLabel.textContent = '15 ANOS · CONVITE PREMIUM';

    function refreshControls() {
      playButton.textContent = video.paused ? 'Reproduzir' : 'Pausar';
      playButton.setAttribute('aria-label', video.paused ? 'Reproduzir vídeo' : 'Pausar vídeo');
      soundButton.textContent = video.muted ? 'Ativar som' : 'Silenciar';
      soundButton.setAttribute('aria-label', video.muted ? 'Ativar som' : 'Silenciar vídeo');
    }
    function updateProgress() {
      if (Number.isFinite(video.duration) && video.duration > 0) {
        progress.style.width = Math.min(100, video.currentTime / video.duration * 100) + '%';
      }
      if (!video.seeking && video.currentTime >= unlockSeconds) unlock();
    }

    function beginWithSound() {
      video.muted = false;
      refreshControls();
      // Chamado diretamente pelo toque; browsers bloqueiam autoplay
      // com áudio sem gesto humano. Nenhuma promessa de autoplay garantido.
      const playing = video.play();
      if (playing && typeof playing.then === 'function') {
        playing.then(() => { tapToPlay.hidden = true; status.hidden = true; })
          .catch(() => {
            tapToPlay.hidden = false;
            status.hidden = false;
            status.textContent = 'Toque para iniciar a apresentação';
          });
      }
    }

    tapToPlay.addEventListener('click', beginWithSound);
    playButton.addEventListener('click', () => {
      if (video.paused || video.ended) {
        if (video.ended) video.currentTime = 0;
        beginWithSound();
      } else video.pause();
      refreshControls();
    });
    soundButton.addEventListener('click', () => {
      video.muted = !video.muted;
      refreshControls();
    });
    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('playing', () => {
      clearTimeout(loadTimer);
      tapToPlay.hidden = true;
      if (!unlocked && !waitingToReveal) {
        status.hidden = false;
        status.textContent = 'Assista ao primeiro segundo para liberar os temas';
      }
      refreshControls();
    });
    video.addEventListener('pause', refreshControls);
    video.addEventListener('ended', () => { refreshControls(); updateProgress(); });
    video.addEventListener('error', () => showFallback('Não foi possível carregar o vídeo'));
    video.addEventListener('stalled', () => {
      if (!unlocked) status.textContent = 'Carregando apresentação…';
    });
    loadTimer = window.setTimeout(() => {
      if (video.readyState < 2 && !unlocked && !video.currentTime) {
        showFallback('Vídeo indisponível');
      }
    }, 10000);

    refreshControls();
    // Tenta autoplay com áudio. Se bloqueado, um toque sobre o próprio
    // vídeo o reproduz imediatamente com áudio, sem autoplay mudo.
    video.play().then(() => {
      tapToPlay.hidden = true;
    }).catch(() => {
      if (!fallbackMode) {
        tapToPlay.hidden = false;
        status.hidden = true;
      }
    });
  }

  function initReveals() {
    const nodes = [...document.querySelectorAll('.reveal')];
    if (!nodes.length || !('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    document.body.classList.add('has-motion');
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.08, rootMargin: '0px 0px 32px 0px' });
    nodes.forEach((node, index) => {
      if (node.closest('.theme-grid') || node.closest('.benefits-grid') || node.closest('.features-grid')) {
        node.style.transitionDelay = (index % 3) * 75 + 'ms';
      }
      observer.observe(node);
    });
  }

  function el(tag, className, text) {
    const item = document.createElement(tag);
    if (className) item.className = className;
    if (text !== undefined) item.textContent = text;
    return item;
  }
  function validHttps(value) {
    if (!value || typeof value !== 'string') return null;
    try { const url = new URL(value); return url.protocol === 'https:' ? url.href : null; }
    catch { return null; }
  }
  function chooseTheme(id) {
    if (!id || (id !== 'outro' && !temas.some(t => t && t.id === id))) return;
    flow.write(KEY_TEMA, id);
    window.location.assign('quiz.html?tema=' + encodeURIComponent(id));
  }
  function initCatalog() {
    const grid = one('#themeGrid');
    const available = temas.filter(t => t && typeof t.id === 'string' && typeof t.nome === 'string' && t.id !== 'outro');
    available.forEach((theme, index) => grid.append(buildThemeCard(theme, index)));
    grid.append(buildOtherCard());
    initDeck();
    initScrollCue();
    initThemeJump();
  }
  function initThemeJump() {
    const target = one('#temas');
    if (!target) return;
    const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.querySelectorAll('a[href="#temas"]').forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
      });
    });
  }
  function buildThemeCard(theme, index) {
    const article = el('article', 'theme-card reveal');
    const art = el('div', 'theme-art');
    const image = el('img');
    image.src = theme.imagem || 'assets/capa-15anos.webp';
    image.alt = 'Capa do convite de 15 anos no estilo ' + theme.nome;
    image.loading = index < 2 ? 'eager' : 'lazy';
    image.decoding = 'async';
    image.addEventListener('error', () => {
      image.remove();
      art.classList.add('theme-art-missing');
      art.append(el('span', 'theme-image-fallback', 'Imagem em preparação'));
    });
    art.append(image, el('span', 'theme-number', String(index + 1).padStart(2, '0') + ' · TEMA'));
    const details = el('div', 'theme-details');
    details.append(el('h3', '', theme.nome), el('p', '', theme.descricao || 'Convite digital de 15 anos'));
    // A escolha é a única ação do card; exemplos interativos ficam no baralho.
    const actions = el('div', 'theme-actions');
    const choose = el('button', 'theme-choose', 'Escolher tema →');
    choose.type = 'button';
    choose.addEventListener('click', () => chooseTheme(theme.id));
    actions.append(choose);
    details.append(actions);
    article.append(art, details);
    return article;
  }
  function buildOtherCard() {
    const card = el('article', 'theme-card theme-card-other reveal');
    const art = el('div', 'theme-art other-art');
    art.append(el('span', '', '✧'), el('strong', '', 'O seu estilo, do seu jeito.'));
    const details = el('div', 'theme-details');
    details.append(el('h3', '', 'Sua ideia'), el('p', '', 'Tem uma inspiração única? Conte para nós.'));
    const actions = el('div', 'theme-actions');
    const choose = el('button', 'theme-choose', 'Descrever minha ideia →');
    choose.type = 'button';
    choose.addEventListener('click', () => chooseTheme('outro'));
    actions.append(choose);
    details.append(actions);
    card.append(art, details);
    return card;
  }

  function initScrollCue() {
    const edge = one('#scrollEdge');
    if (!edge) return;
    let scheduled = false;
    // Sinal visual somente no início da página: depois que a pessoa começa
    // a rolar, o degradê deixa de cobrir os convites e os botões.
    const update = () => {
      const bottom = document.documentElement.scrollHeight - innerHeight - 120;
      edge.classList.toggle('is-hidden', scrollY > 180 || scrollY >= bottom);
      scheduled = false;
    };
    const queue = () => {
      if (!scheduled) { scheduled = true; requestAnimationFrame(update); }
    };
    addEventListener('scroll', queue, { passive: true });
    addEventListener('resize', queue, { passive: true });
    queue();
  }

  function initDeck() {
    const stage = one('#deckStage');
    const current = one('#deckCurrent');
    const total = one('#deckTotal');
    const controls = one('#deckControls');
    const hint = one('#deckHint');
    if (!stage) return;
    const entries = exemplos.filter(e => e && e.nome && validHttps(e.url));
    let active = 0;
    let suppressedClick = false;
    let wheelAt = 0;
    let dragStart = null;
    const cards = entries.map((entry, index) => {
      const article = el('article', 'deck-card');
      const link = el('a', '', undefined);
      link.href = validHttps(entry.url);
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.setAttribute('aria-label', 'Abrir o convite completo ' + entry.nome + ' em uma nova aba');
      const img = el('img');
      img.src = entry.imagem || 'assets/capa-15anos.webp';
      img.alt = 'Convite interativo de ' + entry.nome;
      img.draggable = false;
      img.loading = index === 0 ? 'eager' : 'lazy';
      const overlay = el('div', 'deck-card-overlay');
      overlay.append(el('strong', '', entry.nome), el('small', '', (entry.legenda ? entry.legenda + ' · ' : '') + 'Abrir convite completo ↗'));
      link.append(img, overlay);
      article.append(link);
      stage.append(article);
      return article;
    });
    const n = cards.length;
    total.textContent = String(n).padStart(2, '0');
    if (n <= 1) {
      controls.classList.add('is-single');
      hint.textContent = n === 1 ? 'TOQUE PARA ABRIR O CONVITE' : 'EXEMPLOS EM PREPARAÇÃO';
    } else stage.classList.add('has-multiple');
    if (!n) {
      const empty = el('div', 'deck-empty', 'Os exemplos interativos serão adicionados aqui.');
      stage.append(empty);
    }

    function paint() {
      current.textContent = String(n ? active + 1 : 0).padStart(2, '0');
      cards.forEach((card, index) => {
        const depth = (index - active + n) % n;
        const positions = [
          { x: 0, y: 0, rotate: 0, scale: 1 },
          { x: 23, y: -7, rotate: 8, scale: .945 },
          { x: -20, y: -8, rotate: -9, scale: .89 },
          { x: 30, y: 0, rotate: 12, scale: .85 }
        ];
        const pos = positions[Math.min(depth, 3)];
        card.style.transform = `translate3d(${pos.x}px,${pos.y}px,0) rotate(${pos.rotate}deg) scale(${pos.scale})`;
        card.style.opacity = depth > 3 ? '0' : '1';
        card.style.zIndex = String(n - depth + 1);
        card.style.pointerEvents = depth === 0 ? 'auto' : 'none';
        card.setAttribute('aria-hidden', depth === 0 ? 'false' : 'true');
        const link = card.querySelector('a');
        if (link) link.tabIndex = depth === 0 ? 0 : -1;
      });
    }
    function move(delta) {
      if (n <= 1) return;
      active = (active + delta + n) % n;
      paint();
    }
    one('#deckPrev').addEventListener('click', () => move(-1));
    one('#deckNext').addEventListener('click', () => move(1));
    stage.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowRight') { event.preventDefault(); move(1); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
    });
    stage.addEventListener('pointerdown', (event) => {
      if (event.button !== 0 || n <= 1) return;
      dragStart = { x: event.clientX, y: event.clientY };
    });
    stage.addEventListener('pointerup', (event) => {
      if (!dragStart) return;
      const dx = event.clientX - dragStart.x;
      const dy = event.clientY - dragStart.y;
      dragStart = null;
      if (Math.abs(dx) > 32 && Math.abs(dx) > Math.abs(dy) * 1.25) {
        move(dx < 0 ? 1 : -1);
        suppressedClick = true;
      }
    });
    stage.addEventListener('pointercancel', () => { dragStart = null; });
    stage.addEventListener('click', (event) => {
      if (!suppressedClick) return;
      event.preventDefault();
      event.stopPropagation();
      suppressedClick = false;
    }, true);
    stage.addEventListener('wheel', (event) => {
      if (n <= 1 || Math.abs(event.deltaX) < 15 || Math.abs(event.deltaX) <= Math.abs(event.deltaY) * 1.25) return;
      event.preventDefault();
      if (performance.now() - wheelAt > 410) { move(event.deltaX > 0 ? 1 : -1); wheelAt = performance.now(); }
    }, { passive: false });
    paint();
  }

  function initQuiz() {
    const params = new URLSearchParams(location.search);
    const id = params.get('tema');
    const theme = id === 'outro' ? { id: 'outro', nome: 'Sua ideia' } : temas.find(t => t && t.id === id);
    // Uma seleção válida na etapa anterior é necessária para montar o briefing.
    if (!theme || !id || flow.read(KEY_TEMA) !== id) {
      window.location.replace('catalogo.html#temas');
      return;
    }
    one('#chosenTheme').textContent = theme.nome;
    const other = id === 'outro';
    const chosen = one('#chosenThemeCard');
    const image = one('#chosenThemeImage');
    const icon = one('#chosenThemeIcon');
    const colors = theme.cores || {};
    const hex = (value, fallback) => typeof value === 'string' && /^#[0-9a-f]{6}$/i.test(value) ? value : fallback;
    chosen.style.setProperty('--selected-main', hex(colors.principal, '#10213e'));
    chosen.style.setProperty('--selected-secondary', hex(colors.secundaria, '#1c3869'));
    chosen.style.setProperty('--selected-accent', hex(colors.destaque, '#e0c38b'));
    if (!other && typeof theme.imagem === 'string' && theme.imagem.trim()) {
      image.src = theme.imagem;
      image.hidden = false;
      icon.hidden = true;
      image.addEventListener('error', () => { image.hidden = true; icon.hidden = false; }, { once: true });
    }

    one('#otherDescriptionField').hidden = !other;
    one('#outroTema').disabled = !other;
    const form = one('#quizForm');
    const whatsapp = String(config.whatsapp || '').replace(/\D/g, '');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      if (!/^\d{10,15}$/.test(whatsapp)) {
        alert('O WhatsApp ainda não foi configurado corretamente. Avise o responsável pelo catálogo.');
        return;
      }
      const clean = value => String(value || '').trim().replace(/[\r\n]+/g, ' ').replace(/\s{2,}/g, ' ');
      const formatDate = iso => {
        const parts = iso.split('-');
        return parts.length === 3 ? parts.reverse().join('/') : iso;
      };
      const contact = clean(one('#responsavel').value);
      const debutante = clean(one('#aniversariante').value);
      const eventDate = one('#dataEvento').value;
      const eventTime = one('#horaEvento').value;
      const eventPlace = clean(one('#localEvento').value);
      const description = other ? clean(one('#outroTema').value) : '';
      const lines = [
        'Olá! Vim pelo catálogo da Convite Premium e gostaria de solicitar um convite de 15 anos. ✨',
        '',
        '📋 *DADOS DO PEDIDO*',
        '• Responsável: ' + contact,
        '• Nome da debutante: ' + debutante,
        '• Comemoração: 15 anos',
        '• Tema escolhido: ' + theme.nome
      ];
      if (eventDate) lines.push('• Data da festa: ' + formatDate(eventDate));
      if (eventTime) lines.push('• Horário: ' + eventTime);
      if (eventPlace) lines.push('• Local: ' + eventPlace);
      if (other) lines.push('• Ideia de tema: ' + (description || 'Prefiro explicar pelo WhatsApp.'));
      lines.push('', 'Gostaria de confirmar os detalhes e conversar sobre a criação da prévia.');
      window.location.assign('https://wa.me/' + whatsapp + '?text=' + encodeURIComponent(lines.join('\n')));
    });
  }
})();
