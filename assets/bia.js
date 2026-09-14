(function () {
  var FAQ = window.BIA_FAQ || [];
  var CFG = window.BIA_CONFIG || {};
  var STORAGE_KEY = 'bia_chat_state_v1';

  var css = '' +
    '.bia-fab { position: fixed; right: 24px; bottom: 24px; width: 60px; height: 60px; border-radius: 50%;' +
    ' background: linear-gradient(140deg, var(--roxo-vibrante,#A543FA), var(--roxo-profundo,#59327A)); border: 0; cursor: pointer;' +
    ' box-shadow: 0 10px 24px rgba(89,50,122,.35); display: flex; align-items: center; justify-content: center; z-index: 9998;' +
    ' transition: transform .15s ease; }' +
    '.bia-fab:hover { transform: scale(1.06); }' +
    '.bia-fab svg { width: 28px; height: 28px; }' +
    '.bia-fab-badge { position: absolute; top: -2px; right: -2px; width: 14px; height: 14px; border-radius: 50%; background: var(--dourado,#FFB600); border: 2px solid #fff; }' +
    '.bia-bubble { position: fixed; right: 24px; bottom: 94px; max-width: 230px; background: #fff; color: var(--grafite,#3A1F52);' +
    ' padding: 12px 14px; border-radius: 16px 16px 4px 16px; box-shadow: 0 8px 22px rgba(89,50,122,.18); font-size: 13.5px; font-weight: 600;' +
    ' z-index: 9997; cursor: pointer; animation: bia-pop .25s ease; }' +
    '.bia-bubble-close { position: absolute; top: -6px; right: -6px; width: 20px; height: 20px; border-radius: 50%; background: #fff; border: 1px solid #eee;' +
    ' color: #999; font-size: 12px; line-height: 18px; text-align: center; cursor: pointer; box-shadow: 0 2px 6px rgba(0,0,0,.12); }' +
    '@keyframes bia-pop { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }' +
    '.bia-panel { position: fixed; right: 24px; bottom: 24px; width: 368px; max-width: calc(100vw - 32px); height: 540px; max-height: calc(100vh - 48px);' +
    ' background: #fff; border-radius: 22px; box-shadow: 0 20px 50px rgba(89,50,122,.28); display: flex; flex-direction: column; overflow: hidden; z-index: 9999;' +
    ' font-family: "Nunito","Inter",sans-serif; }' +
    '.bia-head { background: linear-gradient(140deg, var(--roxo-vibrante,#A543FA), var(--roxo-profundo,#59327A)); color: #fff; padding: 16px 16px; display: flex; align-items: center; gap: 10px; flex-shrink: 0; }' +
    '.bia-head-avatar { width: 38px; height: 38px; border-radius: 50%; background: rgba(255,255,255,.22); display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 15px; flex-shrink: 0; }' +
    '.bia-head-text { flex: 1; min-width: 0; }' +
    '.bia-head-name { font-weight: 900; font-size: 15px; }' +
    '.bia-head-sub { font-size: 11.5px; opacity: .85; font-weight: 600; }' +
    '.bia-head-close { background: rgba(255,255,255,.18); border: 0; color: #fff; width: 30px; height: 30px; border-radius: 10px; cursor: pointer; flex-shrink: 0;' +
    ' display: flex; align-items: center; justify-content: center; }' +
    '.bia-head-close:hover { background: rgba(255,255,255,.3); }' +
    '.bia-body { flex: 1; overflow-y: auto; padding: 16px 14px; background: #FBF8FD; display: flex; flex-direction: column; gap: 10px; }' +
    '.bia-row { display: flex; gap: 8px; align-items: flex-end; }' +
    '.bia-row.bia-user { flex-direction: row-reverse; }' +
    '.bia-avatar-sm { width: 26px; height: 26px; border-radius: 50%; background: var(--lavanda-bg,#F4EDF7); color: var(--roxo-vibrante,#A543FA);' +
    ' display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 11px; flex-shrink: 0; }' +
    '.bia-msg { max-width: 80%; padding: 11px 14px; border-radius: 16px; font-size: 15.5px; line-height: 1.6; white-space: pre-line; }' +
    '.bia-bot .bia-msg { background: #fff; color: var(--grafite,#3A1F52); border-bottom-left-radius: 4px; box-shadow: 0 2px 8px rgba(89,50,122,.08); }' +
    '.bia-user .bia-msg { background: linear-gradient(140deg, var(--roxo-vibrante,#A543FA), var(--roxo-profundo,#59327A)); color: #fff; border-bottom-right-radius: 4px; }' +
    '.bia-chips { display: flex; flex-wrap: wrap; gap: 6px; padding-left: 34px; }' +
    '.bia-chip { background: #fff; border: 1.5px solid var(--roxo-vibrante,#A543FA); color: var(--roxo-vibrante,#A543FA); font-weight: 700; font-size: 13.5px;' +
    ' padding: 8px 13px; border-radius: 999px; cursor: pointer; transition: background-color .12s ease, color .12s ease; }' +
    '.bia-chip:hover { background: var(--roxo-vibrante,#A543FA); color: #fff; }' +
    '.bia-typing { display: flex; gap: 4px; padding: 12px 14px; background: #fff; border-radius: 16px; border-bottom-left-radius: 4px; width: fit-content;' +
    ' box-shadow: 0 2px 8px rgba(89,50,122,.08); }' +
    '.bia-typing span { width: 6px; height: 6px; border-radius: 50%; background: var(--cinza-role,#8B7A98); opacity: .5; animation: bia-blink 1.1s infinite; }' +
    '.bia-typing span:nth-child(2) { animation-delay: .18s; } .bia-typing span:nth-child(3) { animation-delay: .36s; }' +
    '@keyframes bia-blink { 0%,80%,100% { opacity: .3; } 40% { opacity: 1; } }' +
    '.bia-foot { border-top: 1px solid #F0E8F6; padding: 10px; display: flex; gap: 8px; flex-shrink: 0; background: #fff; }' +
    '.bia-input { flex: 1; border: 1.5px solid #EADBF4; border-radius: 999px; padding: 10px 16px; font-size: 13.5px; font-family: inherit; outline: none; color: var(--grafite,#3A1F52); }' +
    '.bia-input:focus { border-color: var(--roxo-vibrante,#A543FA); }' +
    '.bia-send { width: 40px; height: 40px; border-radius: 50%; border: 0; background: var(--roxo-vibrante,#A543FA); color: #fff; cursor: pointer; flex-shrink: 0;' +
    ' display: flex; align-items: center; justify-content: center; }' +
    '.bia-send:hover { background: var(--roxo-profundo,#59327A); }' +
    '@media (max-width: 480px) { .bia-panel { right: 12px; left: 12px; width: auto; bottom: 12px; } .bia-fab, .bia-bubble { right: 16px; } }';

  var styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  function stripAccents(s) {
    return s.normalize ? s.normalize('NFD').replace(/[̀-ͯ]/g, '') : s;
  }
  function normalize(s) {
    return stripAccents(String(s || '').toLowerCase()).trim();
  }

  function findEntry(id) {
    for (var i = 0; i < FAQ.length; i++) if (FAQ[i].id === id) return FAQ[i];
    return null;
  }

  function matchEntry(text) {
    var norm = normalize(text);
    if (!norm) return null;
    var best = null, bestScore = 0;
    FAQ.forEach(function (entry) {
      var score = 0;
      (entry.gatilhos || []).forEach(function (g) {
        if (norm.indexOf(normalize(g)) !== -1) score += normalize(g).length;
      });
      if (normalize(entry.pergunta) === norm) score += 1000;
      if (score > bestScore) { bestScore = score; best = entry; }
    });
    return best;
  }

  function loadState() {
    try {
      var raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return { open: false, greeted: false, invited: false, history: [] };
  }
  function saveState() {
    try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) {}
  }

  var state = loadState();

  var fab = document.createElement('button');
  fab.className = 'bia-fab';
  fab.title = 'Falar com a ' + (CFG.nome || 'Bia');
  fab.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>';

  var panel = document.createElement('div');
  panel.className = 'bia-panel';
  panel.style.display = 'none';
  panel.innerHTML =
    '<div class="bia-head">' +
      '<div class="bia-head-avatar">B</div>' +
      '<div class="bia-head-text"><div class="bia-head-name">' + (CFG.nome || 'Bia') + '</div>' +
      '<div class="bia-head-sub">' + (CFG.subtitulo || 'Assistente') + '</div></div>' +
      '<button type="button" class="bia-head-close" aria-label="Fechar">' +
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"></path></svg>' +
      '</button>' +
    '</div>' +
    '<div class="bia-body" id="bia-body"></div>' +
    '<div class="bia-foot">' +
      '<input type="text" class="bia-input" id="bia-input" placeholder="Digite sua dúvida..." autocomplete="off" />' +
      '<button type="button" class="bia-send" id="bia-send" aria-label="Enviar">' +
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2 11 13"></path><path d="M22 2 15 22l-4-9-9-4 20-7z"></path></svg>' +
      '</button>' +
    '</div>';

  var bubble = null;

  function init() {
    document.body.appendChild(fab);
    document.body.appendChild(panel);

    var body = panel.querySelector('#bia-body');
    var input = panel.querySelector('#bia-input');
    var sendBtn = panel.querySelector('#bia-send');
    var closeBtn = panel.querySelector('.bia-head-close');

    function scrollDown() { body.scrollTop = body.scrollHeight; }

    function addBotMessage(text, chips) {
      var row = document.createElement('div');
      row.className = 'bia-row bia-bot';
      row.innerHTML = '<div class="bia-avatar-sm">B</div><div class="bia-msg"></div>';
      row.querySelector('.bia-msg').textContent = text;
      body.appendChild(row);
      if (chips && chips.length) {
        var chipsWrap = document.createElement('div');
        chipsWrap.className = 'bia-chips';
        chips.forEach(function (c) {
          var chip = document.createElement('button');
          chip.type = 'button';
          chip.className = 'bia-chip';
          chip.textContent = c.label;
          chip.addEventListener('click', function () { handleSelect(c); });
          chipsWrap.appendChild(chip);
        });
        body.appendChild(chipsWrap);
      }
      scrollDown();
    }

    function addUserMessage(text) {
      var row = document.createElement('div');
      row.className = 'bia-row bia-user';
      row.innerHTML = '<div class="bia-msg"></div>';
      row.querySelector('.bia-msg').textContent = text;
      body.appendChild(row);
      scrollDown();
    }

    function showTyping(cb) {
      var row = document.createElement('div');
      row.className = 'bia-row bia-bot bia-typing-row';
      row.innerHTML = '<div class="bia-avatar-sm">B</div><div class="bia-typing"><span></span><span></span><span></span></div>';
      body.appendChild(row);
      scrollDown();
      setTimeout(function () {
        row.remove();
        cb();
      }, 500 + Math.random() * 300);
    }

    function allChips() {
      return FAQ.map(function (e) { return { label: e.pergunta, targetId: e.id }; });
    }

    function respondWithEntry(entry) {
      state.history.push({ type: 'bot', id: entry.id });
      saveState();
      showTyping(function () {
        var chips = (entry.botoes || []).map(function (b) { return { label: b.label, targetId: b.targetId }; });
        addBotMessage(entry.resposta, chips);
      });
    }

    function respondWithFallback() {
      showTyping(function () {
        addBotMessage(CFG.fallback || 'Não consegui entender. Escolha uma opção abaixo.', allChips());
      });
    }

    function handleSelect(chip) {
      addUserMessage(chip.label);
      state.history.push({ type: 'user', text: chip.label });
      saveState();
      var entry = findEntry(chip.targetId);
      if (entry) respondWithEntry(entry); else respondWithFallback();
    }

    function handleUserText(text) {
      text = text.trim();
      if (!text) return;
      addUserMessage(text);
      state.history.push({ type: 'user', text: text });
      saveState();
      var entry = matchEntry(text);
      if (entry) respondWithEntry(entry); else respondWithFallback();
    }

    function openPanel() {
      panel.style.display = 'flex';
      state.open = true;
      hideBubble();
      if (!state.greeted) {
        state.greeted = true;
        saveState();
        showTyping(function () { addBotMessage(CFG.saudacao || 'Oi! Como posso ajudar?', allChips()); });
      } else {
        saveState();
      }
      setTimeout(function () { input.focus(); }, 150);
    }
    function closePanel() {
      panel.style.display = 'none';
      state.open = false;
      saveState();
    }

    function hideBubble() {
      if (bubble) { bubble.remove(); bubble = null; }
    }

    function showInviteBubble() {
      if (state.invited || state.greeted) return;
      bubble = document.createElement('div');
      bubble.className = 'bia-bubble';
      bubble.innerHTML = (CFG.bolhaConvite || 'Precisa de ajuda?') + '<span class="bia-bubble-close">✕</span>';
      document.body.appendChild(bubble);
      bubble.addEventListener('click', function (e) {
        if (e.target.classList.contains('bia-bubble-close')) { hideBubble(); state.invited = true; saveState(); return; }
        openPanel();
      });
      state.invited = true;
      saveState();
    }

    fab.addEventListener('click', function () {
      if (panel.style.display === 'none') openPanel(); else closePanel();
    });
    closeBtn.addEventListener('click', closePanel);
    sendBtn.addEventListener('click', function () { handleUserText(input.value); input.value = ''; });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { handleUserText(input.value); input.value = ''; }
    });

    (state.history || []).forEach(function (item) {
      if (item.type === 'user') {
        addUserMessage(item.text);
      } else if (item.type === 'bot') {
        var entry = findEntry(item.id);
        if (entry) {
          var chips = (entry.botoes || []).map(function (b) { return { label: b.label, targetId: b.targetId }; });
          addBotMessage(entry.resposta, chips);
        }
      }
    });

    if (state.open) {
      panel.style.display = 'flex';
    } else if (!state.invited) {
      setTimeout(showInviteBubble, 2200);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
