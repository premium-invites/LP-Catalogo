(() => {
  'use strict';
  const config = window.SITE_CONFIG || {};
  const themes = Array.isArray(config.temas) ? config.temas : [];
  const page = document.body.dataset.page;
  const KEY_THEME = 'convite-premium-tema-selecionado';
  const one = (selector, root = document) => root.querySelector(selector);
  const all = (selector, root = document) => [...root.querySelectorAll(selector)];
  const flow = {
    read(key) { try { return sessionStorage.getItem(key); } catch { return null; } },
    write(key, value) { try { sessionStorage.setItem(key, value); } catch { /* O parâmetro da URL identifica o tema. */ } }
  };

  all('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
  initReveals();
  if (page === 'home') {
    initVSL();
    initThemeDeck();
    initScrollFade();
    initAnchorScroll();
  } else if (page === 'quiz') initQuiz();

  function initVSL() {
    const video = one('#introVideo');
    const soundButton = one('#soundButton');
    const soundText = one('#soundButtonText');
    const playOverlay = one('#vslPlayOverlay');
    const headline = one('.vsl-headline');
    const subheadline = one('.vsl-summary');
    const cta = one('#continueButton');
    const revealAt = Math.max(1, Number(config.video?.revealAfterSeconds) || 3);
    const sourceMp4 = one('source[type="video/mp4"]', video);
    const sourceWebm = one('source[type="video/webm"]', video);
    if (sourceMp4 && config.video?.src) sourceMp4.src = config.video.src;
    if (sourceWebm && config.video?.webm) sourceWebm.src = config.video.webm;
    if (config.video?.poster) video.poster = config.video.poster;
    video.load();
    let copyStarted = false;

    function updateSoundControl() {
      soundButton.setAttribute('aria-pressed', String(!video.muted));
      soundButton.setAttribute('aria-label', video.muted ? 'Ativar som do vídeo' : 'Silenciar vídeo');
      soundText.textContent = video.muted ? 'Ativar som' : 'Som ativado';
      soundButton.classList.toggle('is-on', !video.muted);
    }
    function revealCopy() {
      if (copyStarted) return;
      copyStarted = true;
      headline.classList.add('is-visible');
      window.setTimeout(() => subheadline.classList.add('is-visible'), 1050);
      window.setTimeout(() => cta.classList.add('is-visible'), 2150);
    }
    function startPlaybackFromGesture() {
      video.muted = true;
      const result = video.play();
      if (result && typeof result.then === 'function') result.then(() => { playOverlay.hidden = true; }).catch(() => { playOverlay.hidden = false; });
      updateSoundControl();
    }

    video.muted = true;
    video.playsInline = true;
    video.loop = true;
    video.autoplay = true;
    video.addEventListener('timeupdate', () => {
      if (!copyStarted && !video.seeking && video.currentTime >= revealAt) revealCopy();
    });
    video.addEventListener('playing', () => { playOverlay.hidden = true; });
    video.addEventListener('error', () => {
      playOverlay.hidden = false;
      const label = one('span:last-child', playOverlay);
      if (label) label.textContent = 'Vídeo indisponível · toque para tentar novamente';
    });
    playOverlay.addEventListener('click', startPlaybackFromGesture);
    soundButton.addEventListener('click', () => {
      if (video.muted) {
        video.muted = false;
        const result = video.play();
        if (result && typeof result.catch === 'function') result.catch(() => { video.muted = true; updateSoundControl(); });
      } else video.muted = true;
      updateSoundControl();
    });
    cta.addEventListener('click', event => {
      event.preventDefault();
      cta.classList.remove('ripple-active');
      void cta.offsetWidth;
      cta.classList.add('ripple-active');
      const target = one('#catalogo');
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.setTimeout(() => {
        target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
        cta.classList.remove('ripple-active');
      }, 360);
    });
    updateSoundControl();
    // Autoplay silencioso: o áudio só é ativado após ação explícita do visitante.
    const result = video.play();
    if (result && typeof result.then === 'function') result.then(() => { playOverlay.hidden = true; }).catch(() => { playOverlay.hidden = false; });
  }

  function initReveals() {
    const nodes = all('.reveal');
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!nodes.length || !('IntersectionObserver' in window) || reduced) {
      nodes.forEach(node => node.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px 42px 0px' });
    nodes.forEach((node, index) => {
      if (node.closest('.benefits-grid') || node.closest('.features-grid') || node.closest('.process-list')) node.style.transitionDelay = `${(index % 3) * 85}ms`;
      observer.observe(node);
    });
  }

  function safeHex(value, fallback) {
    return typeof value === 'string' && /^#[0-9a-f]{6}$/i.test(value) ? value : fallback;
  }
  function chooseTheme(id) {
    if (!id || (id !== 'outro' && !themes.some(theme => theme && theme.id === id))) return;
    flow.write(KEY_THEME, id);
    window.location.assign(`quiz.html?tema=${encodeURIComponent(id)}`);
  }

  function initThemeDeck() {
    const stage = one('#deckStage');
    const currentLabel = one('#deckCurrent');
    const totalLabel = one('#deckTotal');
    const previousButton = one('#deckPrev');
    const nextButton = one('#deckNext');
    const hint = one('#deckHint');
    if (!stage) return;

    const entries = [
      ...themes.filter(theme => theme && typeof theme.id === 'string' && theme.id !== 'outro'),
      { id: 'outro', nome: 'Sua ideia', descricao: 'O seu estilo, do seu jeito.', textura: 'idea', cores: { principal: '#14213c', secundaria: '#273b62', destaque: '#e5c58c' } }
    ];
    let active = 0;
    let drag = null;
    let suppressClick = false;
    let wheelAt = 0;
    let deckVisible = !('IntersectionObserver' in window);

    const cards = entries.map((theme, index) => {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = `deck-card${theme.id === 'outro' ? ' deck-card-idea' : ''}`;
      card.dataset.themeId = theme.id;
      card.setAttribute('aria-label', theme.id === 'outro' ? 'Escolher Sua ideia e descrever um tema personalizado' : `Escolher o tema ${theme.nome}`);
      card.style.setProperty('--card-main', safeHex(theme.cores?.principal, '#10213e'));
      card.style.setProperty('--card-secondary', safeHex(theme.cores?.secundaria, '#1c3869'));
      card.style.setProperty('--card-accent', safeHex(theme.cores?.destaque, '#e0c38b'));
      card.dataset.texture = theme.textura || 'stars';

      const media = document.createElement('span');
      media.className = 'deck-card-media';
      if (theme.id === 'outro') {
        const ideaArt = document.createElement('span');
        ideaArt.className = 'deck-idea-art';
        ideaArt.innerHTML = '<span class="idea-star" aria-hidden="true">✧</span><strong>O seu estilo,<br>do seu jeito.</strong><small>CRIE UMA IDEIA ÚNICA</small>';
        media.append(ideaArt);
      } else if (theme.videoMp4 || theme.videoWebm || theme.video) {
        const video = document.createElement('video');
        video.className = 'deck-card-video';
        video.muted = true;
        video.setAttribute('muted', '');
        video.loop = true;
        video.autoplay = false;
        video.playsInline = true;
        video.setAttribute('playsinline', '');
        video.preload = 'none';
        video.poster = theme.imagem;
        video.setAttribute('aria-hidden', 'true');
        if (theme.videoMp4) {
          const mp4 = document.createElement('source');
          mp4.src = theme.videoMp4;
          mp4.type = 'video/mp4';
          video.append(mp4);
        }
        const webmPath = theme.videoWebm || (!theme.videoMp4 ? theme.video : '');
        if (webmPath) {
          const webm = document.createElement('source');
          webm.src = webmPath;
          webm.type = 'video/webm';
          video.append(webm);
        }
        media.append(video);
      } else {
        const image = document.createElement('img');
        image.className = 'deck-card-image';
        image.src = theme.imagem || 'assets/video/vsl-preview-poster.webp';
        image.alt = '';
        image.loading = index < 2 ? 'eager' : 'lazy';
        image.decoding = 'async';
        media.append(image);
      }

      const number = document.createElement('span');
      number.className = 'deck-card-number';
      number.textContent = theme.id === 'outro' ? 'ÚLTIMA CARTA' : `${String(index + 1).padStart(2, '0')} · TEMA`;
      const overlay = document.createElement('span');
      overlay.className = 'deck-card-overlay';
      const title = document.createElement('strong');
      title.textContent = theme.nome;
      const subtitle = document.createElement('small');
      subtitle.textContent = theme.id === 'outro' ? 'Não encontrou seu tema? Conte sua ideia.' : (theme.descricao || 'Convite digital de 15 anos');
      overlay.append(title, subtitle);
      card.append(media, number, overlay);
      card.addEventListener('click', () => {
        if (suppressClick) { suppressClick = false; return; }
        chooseTheme(theme.id);
      });
      stage.append(card);
      return card;
    });

    totalLabel.textContent = String(entries.length).padStart(2, '0');

    function updateActiveVideo() {
      cards.forEach((card, index) => {
        const video = one('video', card);
        if (!video) return;
        if (index === active && deckVisible) {
          video.preload = 'auto';
          if (video.readyState === 0 && !video.dataset.loadRequested) {
            video.dataset.loadRequested = 'true';
            video.load();
          }
          const playResult = video.play();
          if (playResult && typeof playResult.catch === 'function') {
            playResult.catch(() => {
              // O poster permanece visível se o navegador bloquear a reprodução.
            });
          }
        } else {
          video.pause();
          try {
            if (video.readyState > 0) video.currentTime = 0;
          } catch { /* Metadados ainda não carregados. */ }
        }
      });
    }

    function paint() {
      currentLabel.textContent = String(active + 1).padStart(2, '0');
      previousButton.disabled = active === 0;
      nextButton.disabled = active === cards.length - 1;
      hint.textContent = active === cards.length - 1 ? 'SUA IDEIA · ÚLTIMA OPÇÃO' : 'DESLIZE PARA VER OS TEMAS';
      cards.forEach((card, index) => {
        const depth = index - active;
        let x = 0, y = 0, rotate = 0, scale = 1, opacity = 1, z = 20, pointer = 'auto';
        if (depth === 1) { x = 22; y = -8; rotate = 7; scale = .955; z = 19; pointer = 'none'; }
        else if (depth === 2) { x = -20; y = -15; rotate = -7; scale = .91; z = 18; pointer = 'none'; }
        else if (depth === 3) { x = 29; y = -21; rotate = 10; scale = .87; z = 17; pointer = 'none'; }
        else if (depth > 3) { x = 38; y = -26; rotate = 12; scale = .83; opacity = 0; z = 1; pointer = 'none'; }
        else if (depth === -1) { x = -34; y = -13; rotate = -12; scale = .86; opacity = .72; z = 5; pointer = 'none'; }
        else if (depth < -1) { x = -42; y = -18; rotate = -14; scale = .82; opacity = 0; z = 1; pointer = 'none'; }
        card.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotate}deg) scale(${scale})`;
        card.style.opacity = String(opacity);
        card.style.zIndex = String(z);
        card.style.pointerEvents = pointer;
        card.tabIndex = depth === 0 ? 0 : -1;
        card.setAttribute('aria-hidden', depth === 0 ? 'false' : 'true');
      });
      updateActiveVideo();
    }

    function move(delta) {
      const next = Math.max(0, Math.min(cards.length - 1, active + delta));
      if (next === active) return;
      active = next;
      paint();
    }

    previousButton.addEventListener('click', () => move(-1));
    nextButton.addEventListener('click', () => move(1));
    stage.addEventListener('keydown', event => {
      if (event.key === 'ArrowRight') { event.preventDefault(); move(1); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); chooseTheme(entries[active].id); }
    });

    stage.addEventListener('pointerdown', event => {
      if (event.button !== 0) return;
      const clickedCard = event.target.closest('.deck-card');
      if (clickedCard && clickedCard !== cards[active]) return;
      drag = { x: event.clientX, y: event.clientY, dx: 0, dy: 0, moved: false, card: cards[active] };
      stage.classList.add('is-dragging');
      try { stage.setPointerCapture(event.pointerId); } catch { /* Alguns navegadores não suportam captura neste alvo. */ }
    });
    stage.addEventListener('pointermove', event => {
      if (!drag) return;
      drag.dx = event.clientX - drag.x;
      drag.dy = event.clientY - drag.y;
      if (Math.abs(drag.dx) > 7 && Math.abs(drag.dx) > Math.abs(drag.dy) * 1.15) {
        drag.moved = true;
        const tilt = Math.max(-12, Math.min(12, drag.dx * .055));
        drag.card.style.transform = `translate3d(${drag.dx * .72}px, ${drag.dy * .12}px, 0) rotate(${tilt}deg) scale(1.015)`;
      }
    });
    function finishDrag() {
      if (!drag) return;
      const { dx, dy, moved } = drag;
      drag = null;
      stage.classList.remove('is-dragging');
      if (moved && Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.2) {
        suppressClick = true;
        move(dx < 0 ? 1 : -1);
        window.setTimeout(() => { suppressClick = false; }, 450);
      } else paint();
    }
    stage.addEventListener('pointerup', finishDrag);
    stage.addEventListener('pointercancel', finishDrag);
    stage.addEventListener('wheel', event => {
      if (Math.abs(event.deltaX) < 15 || Math.abs(event.deltaX) < Math.abs(event.deltaY) * 1.2) return;
      event.preventDefault();
      if (performance.now() - wheelAt > 380) { move(event.deltaX > 0 ? 1 : -1); wheelAt = performance.now(); }
    }, { passive: false });
    paint();
    if ('IntersectionObserver' in window) {
      const deckObserver = new IntersectionObserver(entries => {
        deckVisible = Boolean(entries[0] && entries[0].isIntersecting);
        updateActiveVideo();
      }, { threshold: 0.3, rootMargin: '80px 0px' });
      deckObserver.observe(stage);
    }
  }

  function initScrollFade() {
    const edge = one('#scrollEdge');
    if (!edge) return;
    let scheduled = false;
    const update = () => {
      const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 24;
      const hasStartedScrolling = window.scrollY > 90;
      edge.classList.toggle('is-visible', hasStartedScrolling && !atBottom);
      edge.classList.toggle('is-hidden', atBottom);
      scheduled = false;
    };
    const queue = () => {
      if (!scheduled) { scheduled = true; requestAnimationFrame(update); }
    };
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue, { passive: true });
    if ('ResizeObserver' in window) new ResizeObserver(queue).observe(document.body);
    queue();
  }

  function initAnchorScroll() {
    all('a[href^="#"]').forEach(link => {
      link.addEventListener('click', event => {
        const target = one(link.getAttribute('href'));
        if (!target) return;
        event.preventDefault();
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
      });
    });
  }

  function initQuiz() {
    const params = new URLSearchParams(location.search);
    const id = params.get('tema') || flow.read(KEY_THEME);
    const theme = id === 'outro'
      ? { id: 'outro', nome: 'Sua ideia', descricao: 'O seu estilo, do seu jeito.', textura: 'idea', cores: { principal: '#14213c', secundaria: '#273b62', destaque: '#e5c58c' } }
      : themes.find(item => item && item.id === id);

    if (!theme || !id || flow.read(KEY_THEME) !== id) {
      window.location.replace('index.html#catalogo');
      return;
    }

    const chosen = one('#chosenThemeCard');
    const image = one('#chosenThemeImage');
    const icon = one('#chosenThemeIcon');
    one('#chosenTheme').textContent = theme.nome;
    one('#chosenThemeDescription').textContent = theme.descricao || '';
    chosen.dataset.texture = theme.textura || 'stars';
    chosen.style.setProperty('--selected-main', safeHex(theme.cores?.principal, '#10213e'));
    chosen.style.setProperty('--selected-secondary', safeHex(theme.cores?.secundaria, '#1c3869'));
    chosen.style.setProperty('--selected-accent', safeHex(theme.cores?.destaque, '#e0c38b'));
    if (theme.imagem) {
      image.src = theme.imagem;
      image.hidden = false;
      icon.hidden = true;
      image.addEventListener('error', () => { image.hidden = true; icon.hidden = false; }, { once: true });
    }

    const other = id === 'outro';
    const descriptionField = one('#otherDescriptionField');
    const descriptionInput = one('#outroTema');
    descriptionField.hidden = !other;
    descriptionInput.disabled = !other;

    const ageSelect = one('#idadeSelect');
    const otherAgeField = one('#otherAgeField');
    const otherAgeInput = one('#idadeOutra');
    function syncAgeField() {
      const isOther = ageSelect.value === 'outra';
      otherAgeField.hidden = !isOther;
      otherAgeInput.disabled = !isOther;
      otherAgeInput.required = isOther;
      if (!isOther) otherAgeInput.value = '';
    }
    ageSelect.addEventListener('change', syncAgeField);
    syncAgeField();

    const form = one('#quizForm');
    const whatsapp = String(config.whatsapp || '').replace(/\D/g, '');
    form.addEventListener('submit', event => {
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
      const age = ageSelect.value === 'outra' ? clean(otherAgeInput.value) : '15';
      const contact = clean(one('#responsavel').value);
      const debutante = clean(one('#aniversariante').value);
      const eventDate = one('#dataEvento').value;
      const eventTime = one('#horaEvento').value;
      const mapLink = clean(one('#localEvento').value);
      const description = other ? clean(descriptionInput.value) : '';
      const lines = [
        'Olá! Vim pelo catálogo da Convite Premium e gostaria de solicitar um convite. ✨',
        '',
        '📋 *DADOS DO PEDIDO*',
        '• Responsável: ' + contact,
        '• Nome da debutante: ' + debutante,
        '• Comemoração: ' + age + ' anos',
        '• Tema escolhido: ' + theme.nome
      ];
      if (eventDate) lines.push('• Data da festa: ' + formatDate(eventDate));
      if (eventTime) lines.push('• Horário: ' + eventTime);
      if (mapLink) lines.push('• Link do local: ' + mapLink);
      if (other) lines.push('• Ideia de tema: ' + (description || 'Prefiro explicar pelo WhatsApp.'));
      lines.push('', 'Gostaria de confirmar os detalhes e conversar sobre a criação da prévia.');
      window.location.assign('https://wa.me/' + whatsapp + '?text=' + encodeURIComponent(lines.join('\n')));
    });
  }
})();
