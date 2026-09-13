(function () {
  // Tela de login desativada temporariamente a pedido da usuária (2026-09-12).
  // Para reativar: descomente o bloco abaixo.
  // if (sessionStorage.getItem('cw_test_authorized') !== '1') {
  //   window.location.replace('/index.html');
  //   return;
  // }

  // Menu implementado a partir do código-fonte real do artefato Claude Design
  // (claude.ai/code/artifact/c22b3be7-dd66-4130-acaf-d90cc17ef8d7) — extraído
  // do template do bundle, não de captura de tela. Aplicado só ao menu/header
  // via escopo #sidebar/#top-header — nada mais foi alterado.
  var brandCss = '' +
    "@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@500;600;700;800;900&display=swap');" +
    '#sidebar, #top-header {' +
      '--roxo-vibrante:#A543FA; --roxo-profundo:#59327A; --lavanda-bg:#F4EDF7;' +
      '--dourado:#FFB600; --grafite:#3A1F52; --cinza-role:#8B7A98;' +
      '--shadow-card: 0 4px 12px rgba(89,50,122,.08);' +
      '--icon-gradient: linear-gradient(140deg,#A543FA,#59327A);' +
      'font-family: "Nunito", "Inter", sans-serif;' +
    '}' +
    '#sidebar { background: transparent; border-right: none; }' +
    '#sidebar .sidebar-logo { background: transparent; }' +
    '#sidebar .sidebar-topwave { display: none; }' +
    /* ── Cartão da logo ── */
    '#sidebar .sidebar-logo { margin: 14px 20px 10px; padding: 12px 16px; border-radius: 20px; background: #fff; box-shadow: 0 8px 22px rgba(89,50,122,.10); min-height: 0; }' +
    '#sidebar .sidebar-logo img { height: 60px; }' +
    /* ── Cartão do usuário ── */
    '#sidebar .sidebar-user { margin: 0 20px 12px; padding: 8px 10px; border-radius: 18px; background: #fff; box-shadow: var(--shadow-card); }' +
    '#sidebar .sidebar-user-avatar { width: 38px; height: 38px; background: linear-gradient(135deg,#EADBF4,#C79BE8); box-shadow: none; font-size: 0; }' +
    '#sidebar .sidebar-user-name { font-weight: 900; font-size: 14px; color: var(--grafite); }' +
    '#sidebar .sidebar-user-role { background: none !important; color: var(--cinza-role); padding: 0; text-transform: none; letter-spacing: normal; font-weight: 600; font-size: 11.5px; }' +
    '#sidebar .sidebar-user-logout { width: 36px; height: 36px; border-radius: 11px; border: 0; background: var(--lavanda-bg); color: var(--roxo-vibrante); display: flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0; transition: background-color .15s ease; }' +
    '#sidebar .sidebar-user-logout:hover { background: #EADBF4; }' +
    /* ── Cada item do menu é seu próprio cartão branco flutuante ── */
    '#sidebar .sidebar-nav { display: flex; flex-direction: column; gap: 6px; padding: 0 20px 8px; }' +
    '#sidebar .nav-item, #sidebar .nav-group { background: #fff; border-radius: 16px; box-shadow: var(--shadow-card); flex-shrink: 0; }' +
    '#sidebar .nav-item { color: var(--grafite); margin-bottom: 0; padding: 6px 12px 6px 6px; min-height: 56px; flex-shrink: 0; font-weight: 800; font-size: 14.5px; }' +
    '#sidebar .nav-item:hover { background: #fff; color: var(--grafite); }' +
    '#sidebar .nav-item.active { background: #fff; color: var(--grafite); }' +
    '#sidebar .nav-item.active::before { background: var(--roxo-vibrante); left: -6px; }' +
    '#sidebar .nav-chevron, #sidebar .nav-group-trigger { color: var(--roxo-vibrante); }' +
    '#sidebar .nav-chevron { transform: rotate(0deg); }' +
    '#sidebar .nav-group.open .nav-chevron { transform: rotate(90deg); }' +
    '#sidebar .nav-sub-inner::before { background: #EADBF4; }' +
    '#sidebar .nav-subitem { color: #7C6389; }' +
    '#sidebar .nav-item-icon { width: 44px; height: 44px; border-radius: 14px; background: var(--lavanda-bg); color: var(--roxo-vibrante); box-shadow: none; }' +
    '#sidebar .nav-item:hover .nav-item-icon, #sidebar .nav-item.active .nav-item-icon { background: var(--lavanda-bg); color: var(--roxo-vibrante); box-shadow: none; }' +
    '#sidebar .nav-badge { background: var(--roxo-vibrante); box-shadow: none; font-weight: 900; font-size: 9.5px; letter-spacing: .06em; }' +
    '#sidebar .nav-badge--warn { background: var(--roxo-vibrante); color: #fff; }' +
    '#sidebar .nav-badge--info { background: var(--roxo-vibrante); }' +
    '#sidebar .sum-item:hover { background: #fff0ef; color: #FF5959; }' +
    '#sidebar .sum-item:hover .sum-icon { background: #ffe4e2; }' +
    '#sidebar .sidebar-footer a:hover { color: #FF5959; }' +
    '#sidebar .sidebar-footer a:hover .nav-icon { background: #fff0ef; border-color: #ffd6d3; color: #FF5959; }' +
    '#sidebar .ssb-bar { border-color: rgba(89,50,122,.1); background: #fff; color: var(--roxo-profundo); box-shadow: var(--shadow-card); }' +
    '#sidebar .ssb-bar-icon { background: var(--roxo-vibrante); box-shadow: 0 4px 10px rgba(165,67,250,.3); }' +
    '#sidebar .ssb-bar-chevron { color: var(--roxo-vibrante); }' +
    '#sidebar .sidebar-suggest-box { background: #fff; border-color: rgba(89,50,122,.1); box-shadow: var(--shadow-card); }' +
    '#sidebar .ssb-icon-circle { background: var(--roxo-vibrante); box-shadow: 0 6px 14px rgba(165,67,250,.32); }' +
    '#sidebar .ssb-title, #sidebar .ssb-text { color: var(--roxo-profundo); }' +
    '#sidebar .ssb-btn, #sidebar .ssb-btn-sm { background: var(--roxo-vibrante); box-shadow: 0 6px 14px rgba(165,67,250,.28); }' +
    '#sidebar .ssb-btn:hover, #sidebar .ssb-btn-sm:hover { background: var(--roxo-profundo); }' +
    '#sidebar .ssb-link { color: var(--roxo-vibrante) !important; border-color: rgba(89,50,122,.1); }' +
    '#sidebar .ssb-link:hover { background: var(--lavanda-bg); }' +
    '#sidebar .ssb-mascot { width: 84px; top: -18px; }' +
    '#top-header .header-xp-fill { background: linear-gradient(90deg, var(--dourado), var(--roxo-vibrante)); }' +
    /* ── Rodapé: estrelinhas + mascote sobre a onda (imagem já traz a onda) ── */
    '#sidebar .sidebar-wave { height: 130px; overflow: hidden; flex-shrink: 0; }' +
    '#sidebar .sw-full { display: block; width: 100%; height: auto; position: absolute; left: 0; right: 0; bottom: 0; }' +
    '#sidebar .sw-star { position: absolute; color: var(--dourado); z-index: 2; }';
  var brandStyleEl = document.createElement('style');
  brandStyleEl.textContent = brandCss;
  document.head.appendChild(brandStyleEl);

  var NAV = [
    { href: '/dashboard.html', label: 'Dashboard', icon: 'grid' },
    { href: '/opportunities.html', label: 'Quadro de Leads', icon: 'columns', badge: '99+' },
    { href: '/map.html', label: 'Mapa de Prospecção', icon: 'circle', badge: '99+' },
    { group: 'clientes', label: 'Clientes', icon: 'building', items: [
      { href: '/clients.html', label: 'Assinantes' },
      { href: '/faturas-comissoes.html', label: 'Faturas e Comissões' },
      { href: '/controle-inadimplencia.html', label: 'Inadimplência' }
    ]},
    { group: 'vendas', label: 'Vendas', icon: 'box', items: [
      { href: '/nova-assinatura.html', label: 'Nova Assinatura' },
      { href: '/landing_pages.html', label: 'Página de Captura' },
      { href: '/indicadores.html', label: 'Indicadores' },
      { href: '/calculadora-proposta.html', label: 'Calculadora de Proposta' },
      { href: '/calculator.html', label: 'Calculadora de Comissão' }
    ]},
    { group: 'capacitacao', label: 'Capacitação', icon: 'tv', items: [
      { href: '/encontros.html', label: 'Encontros' },
      { href: '/trainings.html', label: 'Treinamentos Online' },
      { href: '/estudo-concorrentes.html', label: 'Estudo de Concorrentes' },
      { href: '/certificacoes.html', label: 'Certificações' }
    ]},
    { group: 'administracao', label: 'Administração', icon: 'shield', items: [
      { href: '/representatives.html', label: 'Representantes' },
      { href: '/painel-aquisicao.html', label: 'Painel de Aquisição' },
      { href: '/rfv.html', label: 'Matriz RFV' },
      { href: '/contracts.html', label: 'Contratos' },
      { href: '/comunicados.html', label: 'Comunicados' },
      { href: '/gestao-encontros.html', label: 'Gestão de Encontros' },
      { href: '/onboarding_dashboard.html', label: 'Dashboard Capacitação' },
      { href: '/onboarding_templates.html', label: 'Templates Onboarding' },
      { href: '/admin_certificacoes.html', label: 'Certificações (gestão)' },
      { href: '/admin_certificacoes_relatorio.html', label: 'Relatório de Certificações' },
      { href: '/pipeline-onboarding.html', label: 'Pipeline Onboarding' },
      { href: '/roleplays.html', label: 'Avaliações Roleplay' },
      { href: '/locations.html', label: 'Base de Leads' },
      { href: '/zones.html', label: 'Zonas dos Reps' },
      { href: '/municipalities.html', label: 'Estudo de Região' }
    ] },
    { href: '/ajuda.html', label: 'Central de Ajuda', icon: 'circle' }
  ];

  // Ícones extraídos do template real do artefato Claude Design (paths exatos).
  var ICONS = {
    grid: '<path d="M3 11.5 12 4l9 7.5"></path><path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9"></path>',
    columns: '<path d="M4 20h16"></path><rect x="6" y="12" width="3.6" height="6" rx="1"></rect><rect x="11.2" y="8" width="3.6" height="10" rx="1"></rect><rect x="16.4" y="4" width="3.6" height="14" rx="1"></rect>',
    circle: '<circle cx="12" cy="12" r="10"></circle>',
    building: '<circle cx="9" cy="8" r="3.4"></circle><path d="M3 20a6 6 0 0 1 12 0"></path><path d="M16 6.4a3 3 0 0 1 0 5.8M18.5 20a5.4 5.4 0 0 0-2.5-4.6"></path>',
    box: '<path d="M5 7h14l-1.4 10.2a2 2 0 0 1-2 1.8H8.4a2 2 0 0 1-2-1.8L5 7Z"></path><path d="M9 7V5.5a3 3 0 0 1 6 0V7"></path>',
    tv: '<rect x="3" y="5" width="18" height="14" rx="3"></rect><path d="M10 9.5v5l4.5-2.5-4.5-2.5Z" fill="currentColor" stroke="none"></path>',
    shield: '<path d="M12 2l9 5v10l-9 5-9-5V7z"></path>'
  };

  function icon(name) {
    return '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' + (ICONS[name] || ICONS.circle) + '</svg>';
  }

  var here = window.location.pathname.split('/').pop() || 'dashboard.html';

  function isHere(href) { return href.split('/').pop() === here; }

  var navHtml = '';
  NAV.forEach(function (entry) {
    if (!entry.group) {
      var active = isHere(entry.href) ? ' active' : '';
      navHtml += '<a class="nav-item' + active + '" href="' + entry.href + '">' +
        '<span class="nav-item-icon">' + icon(entry.icon) + '</span>' +
        '<span class="nav-item-label">' + entry.label + '</span>' +
        (entry.badge ? '<span class="nav-badge nav-badge--warn">' + entry.badge + '</span>' : '') +
        '</a>';
    } else {
      var hasActive = entry.items.some(function (i) { return isHere(i.href); });
      var subHtml = entry.items.map(function (i) {
        var subActive = isHere(i.href) ? ' active' : '';
        return '<li><a class="nav-subitem' + subActive + '" href="' + i.href + '">' + i.label + '</a></li>';
      }).join('');
      navHtml += '<div class="nav-group' + (hasActive ? ' open' : '') + '" data-group="' + entry.group + '">' +
        '<button type="button" class="nav-item nav-group-trigger' + (hasActive ? ' has-active' : '') + '" aria-expanded="' + (hasActive ? 'true' : 'false') + '" aria-controls="navsub-' + entry.group + '">' +
        '<span class="nav-item-icon">' + icon(entry.icon) + '</span>' +
        '<span class="nav-item-label">' + entry.label + '</span>' +
        '<svg class="nav-chevron" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="m9 6 6 6-6 6"></path></svg>' +
        '</button>' +
        '<div class="nav-sub" id="navsub-' + entry.group + '"><ul class="nav-sub-inner">' + subHtml + '</ul></div>' +
        '</div>';
    }
  });

  var USER_NAME = 'Gabrielly Oliveira';
  var USER_EMAIL = 'gabrielly.oliveira@cardapioweb.com';
  var USER_ROLE = 'Administrador';
  var USER_INITIALS = 'GO';

  var sidebarUserHtml = '<div class="sidebar-user">' +
    '<div class="sidebar-user-avatar">' +
    '<svg width="34" height="34" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="15" r="7" fill="#3A1F52"></circle><path d="M6 38c1.5-8 8-12 14-12s12.5 4 14 12" fill="#3A6FD3"></path><rect x="12" y="20" width="16" height="8" fill="#F4C67A" rx="1"></rect></svg>' +
    '<div class="sidebar-avatar-overlay"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg></div>' +
    '</div>' +
    '<div class="sidebar-user-info"><div class="sidebar-user-name">' + USER_NAME + '</div>' +
    '<span class="sidebar-user-role">' + USER_ROLE + '</span></div>' +
    '<button type="button" class="sidebar-user-logout" title="Sair da conta" onclick="sessionStorage.removeItem(\'cw_test_authorized\'); window.location=\'/index.html\';"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3"></path><path d="M10 8l-4 4 4 4M6 12h11"></path></svg></button>' +
    '</div>';

  var sidebarTopWaveHtml = '<svg class="sidebar-topwave" viewBox="0 0 264 22" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path d="M0,0 C 60,22 200,22 264,0 L264,22 L0,22 Z"></path></svg>';

  var sidebarSuggestHtml = '<div class="sidebar-suggest"><div class="ssb-body"><div class="ssb-body-inner">' +
    '<div class="sidebar-suggest-box"><img class="ssb-mascot" src="/assets/mascots/cardapinho.png" alt="Cardapinho">' +
    '<div class="ssb-title">Sugestões</div>' +
    '<span class="ssb-text">Sua ideia molda o futuro da plataforma. Compartilhe e vote!</span>' +
    '<div class="ssb-row"><a class="ssb-link" href="#">Ver Sugestões</a><a class="ssb-btn-sm" href="#">+ Sugerir</a></div></div>' +
    '</div></div><div class="ssb-bar"><span class="ssb-bar-icon">💡</span><span class="ssb-bar-label">Sugestões</span></div></div>';

  var sidebarWaveHtml = '<div class="sidebar-wave">' +
    '<span class="sw-star" style="left:22px;top:14px;font-size:16px;">✦</span>' +
    '<span class="sw-star" style="left:46px;top:52px;font-size:10px;">✦</span>' +
    '<img class="sw-full" src="/assets/mascots/mascote-sacola.png" alt="Cardapinho">' +
    '</div>';

  var sidebarHtml = '<div class="sidebar-logo"><img alt="Cardápio Web" src="/assets/logo-stack.png" /></div>' +
    sidebarTopWaveHtml +
    sidebarUserHtml +
    '<nav class="sidebar-nav">' + navHtml + '</nav>' +
    sidebarSuggestHtml +
    sidebarWaveHtml;

  var pageTitle = document.currentScript.getAttribute('data-title') || 'Dashboard';
  var headerHtml = '<div class="top-header-left">' +
    '<button class="sidebar-toggle" onclick="document.getElementById(\'sidebar\').classList.toggle(\'open\')">☰</button>' +
    '<div class="top-header-title">' + pageTitle + '</div>' +
    '</div>' +
    '<div class="top-header-actions">' +
    '<a href="#" class="header-xp-bar" title="Seu progresso de XP"><span class="header-xp-level">Nv.0</span><div class="header-xp-track"><div class="header-xp-fill" style="width:0%"></div></div><span class="header-xp-text">0/100</span></a>' +
    '<button class="header-icon" title="Notificações"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg></button>' +
    '<div class="profile-dropdown" id="profile-dropdown">' +
    '<div class="profile-dropdown-trigger" id="profile-dropdown-trigger" style="color:#fff;font-weight:700;font-size:.8rem;">' + USER_INITIALS + '</div>' +
    '<div class="profile-dropdown-menu"><div class="profile-dropdown-header"><div class="profile-dropdown-name">Olá, ' + USER_NAME + '!</div><div class="profile-dropdown-email">' + USER_EMAIL + '</div></div>' +
    '<a class="sum-item danger" href="/index.html" onclick="sessionStorage.removeItem(\'cw_test_authorized\');">Sair da conta</a></div>' +
    '</div>' +
    '</div>';

  document.addEventListener('DOMContentLoaded', function () {
    var sidebarEl = document.getElementById('sidebar');
    var headerEl = document.getElementById('top-header');
    if (sidebarEl) sidebarEl.innerHTML = sidebarHtml;
    if (headerEl) headerEl.innerHTML = headerHtml;

    document.querySelectorAll('.nav-group-trigger').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var group = btn.closest('.nav-group');
        var open = group.classList.toggle('open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    });

    var profileDropdown = document.getElementById('profile-dropdown');
    var profileTrigger = document.getElementById('profile-dropdown-trigger');
    if (profileTrigger) {
      profileTrigger.addEventListener('click', function () { profileDropdown.classList.toggle('open'); });
    }
    document.addEventListener('click', function (e) {
      if (profileDropdown && !e.target.closest('.profile-dropdown')) profileDropdown.classList.remove('open');
    });
  });
})();
