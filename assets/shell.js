(function () {
  // Tela de login desativada temporariamente a pedido da usuária (2026-09-12).
  // Para reativar: descomente o bloco abaixo.
  // if (sessionStorage.getItem('cw_test_authorized') !== '1') {
  //   window.location.replace('/index.html');
  //   return;
  // }

  // Tokens exatos do Manual da Marca "Central Dev · Cardápio Web" (manual-marca-cardapio-web.html,
  // extraído da tela Início) — aplicados só ao menu/header via escopo #sidebar/#top-header,
  // sem mexer no resto das páginas.
  var brandCss = '' +
    '#sidebar, #top-header {' +
      '--roxo-primario:#8B2FF7; --roxo-vibrante:#A543F9; --roxo-texto-ativo:#8A55D3;' +
      '--roxo-profundo:#5A3279; --roxo-eyebrow:#732DEC; --dourado:#FEB500; --grafite:#17102B;' +
      '--cinza-arroxeado:#55536B; --cinza-claro:#8B899E; --lavanda-bg:#F3EDFB;' +
      '--lavanda-destaque:#EADFFA; --borda:#E7DFF5; --shadow-manual: 0 10px 30px rgba(107, 63, 160, 0.10);' +
      /* aliases para os nomes de variável que o CSS de produção já usa */
      '--cw-purple-50: #F3EDFB; --cw-purple-100: #EADFFA; --cw-purple-300: #cfa3f7;' +
      '--cw-purple-400: #b478f8; --cw-purple-500: #9d54f8; --cw-purple-600: #8B2FF7;' +
      '--cw-purple-700: #732DEC; --cw-purple-800: #5A3279; --cw-orange: #FEB500;' +
      '--cw-orange-light: #ffc933; --cw-red: #FF5959;' +
    '}' +
    '#sidebar { background: linear-gradient(180deg, var(--roxo-primario) 0%, var(--roxo-profundo) 100%); border-right-color: var(--roxo-profundo); }' +
    '#sidebar .sidebar-logo { background: #fff; }' +
    '#sidebar .sidebar-topwave { fill: var(--roxo-primario); }' +
    '#sidebar .nav-item { color: rgba(255,255,255,0.82); }' +
    '#sidebar .nav-item:hover { color: #fff; background: rgba(255,255,255,0.08); }' +
    '#sidebar .nav-chevron, #sidebar .nav-group-trigger { color: rgba(255,255,255,0.65); }' +
    '#sidebar .nav-group-trigger.has-active, #sidebar .nav-group-trigger:hover { color: #fff; }' +
    '#sidebar .nav-sub-inner::before { background: rgba(255,255,255,0.25); }' +
    '#sidebar .nav-subitem { color: rgba(255,255,255,0.7); }' +
    '#sidebar .nav-divider { background: rgba(255,255,255,0.15); }' +
    '#sidebar .sidebar-user { box-shadow: var(--shadow-manual); }' +
    '#sidebar .sidebar-user-avatar { background: linear-gradient(135deg,#f6c6b8,#f3a8c9); box-shadow: 0 0 0 2px var(--lavanda-bg), 0 2px 8px rgba(107,63,160,0.2); }' +
    '#sidebar .sidebar-user-logout { width: 34px; height: 34px; border-radius: 50%; border: 0; background: var(--lavanda-bg); color: var(--roxo-primario); display: flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0; transition: background-color .15s ease; }' +
    '#sidebar .sidebar-user-logout:hover { background: var(--lavanda-destaque); }' +
    '#sidebar .nav-item.active { background: linear-gradient(180deg,#EFE7FB,var(--lavanda-destaque)); color: var(--roxo-texto-ativo); }' +
    '#sidebar .nav-item.active::before { background: var(--roxo-primario); }' +
    '#sidebar .nav-item-icon { background: var(--lavanda-bg); color: var(--roxo-vibrante); border-radius: 12px; }' +
    '#sidebar .nav-item:hover .nav-item-icon { background: var(--lavanda-destaque); }' +
    '#sidebar .nav-item.active .nav-item-icon { background: #fff; color: var(--roxo-vibrante); box-shadow: 0 3px 8px rgba(107,63,160,.18); }' +
    '#sidebar .nav-badge { background: linear-gradient(90deg,#7B2FF7,#9C3CF9); box-shadow: 0 3px 8px rgba(139,47,247,0.3); }' +
    '#sidebar .nav-badge--warn { background: var(--dourado); box-shadow: 0 3px 8px rgba(254,181,0,0.35); color: var(--roxo-profundo); }' +
    '#sidebar .nav-badge--info { background: linear-gradient(90deg,#7B2FF7,#9C3CF9); }' +
    '#sidebar .sum-item:hover { background: #fff0ef; color: #FF5959; }' +
    '#sidebar .sum-item:hover .sum-icon { background: #ffe4e2; }' +
    '#sidebar .sidebar-footer a:hover { color: #FF5959; }' +
    '#sidebar .sidebar-footer a:hover .nav-icon { background: #fff0ef; border-color: #ffd6d3; color: #FF5959; }' +
    '#sidebar .ssb-bar { border-color: var(--borda); background: linear-gradient(135deg, #FBF8FF, #F4EEFC); color: var(--roxo-profundo); box-shadow: var(--shadow-manual); }' +
    '#sidebar .ssb-bar-icon { background: var(--roxo-primario); box-shadow: 0 4px 10px rgba(139,47,247,0.3); }' +
    '#sidebar .ssb-bar-chevron { color: var(--roxo-primario); }' +
    '#sidebar .sidebar-suggest-box { background: linear-gradient(120deg,#FBF8FF,#F4EEFC); border-color: var(--borda); box-shadow: var(--shadow-manual); }' +
    '#sidebar .ssb-icon-circle { background: var(--roxo-primario); box-shadow: 0 6px 14px rgba(139,47,247,0.32); }' +
    '#sidebar .ssb-title, #sidebar .ssb-text { color: var(--roxo-profundo); }' +
    '#sidebar .ssb-btn, #sidebar .ssb-btn-sm { background: linear-gradient(90deg,#7B2FF7,#9C3CF9); box-shadow: 0 6px 14px rgba(139,47,247,0.28); }' +
    '#sidebar .ssb-btn:hover, #sidebar .ssb-btn-sm:hover { background: var(--roxo-primario); }' +
    '#sidebar .ssb-link { color: var(--roxo-primario) !important; border-color: var(--borda); }' +
    '#sidebar .ssb-link:hover { background: var(--lavanda-bg); }' +
    '#sidebar .ssb-mascot { width: 84px; top: -18px; }' +
    '#top-header .header-xp-fill { background: linear-gradient(90deg, var(--dourado), var(--roxo-primario)); }' +
    /* ── Onda branca entre a logo e o cartão do usuário ── */
    '#sidebar .sidebar-topwave { display: block; width: 100%; height: 22px; margin-top: -4px; }' +
    /* ── Primeiro item (Início/Dashboard) com ícone em destaque dourado ── */
    '#sidebar .sidebar-nav > .nav-item:first-child .nav-item-icon { background: #FFF3D6; color: #b3790a; }' +
    '#sidebar .sidebar-nav > .nav-item:first-child.active .nav-item-icon, #sidebar .sidebar-nav > .nav-item:first-child:hover .nav-item-icon { background: #FFE9AD; color: #8a5c06; }' +
    /* ── Onda roxa do rodapé com o mascote cardapinho ── */
    '#sidebar .sidebar-wave { height: 112px; overflow: visible; }' +
    '#sidebar .sidebar-wave .sw-back { height: 92px; fill: var(--roxo-profundo); }' +
    '#sidebar .sidebar-wave .sw-front { height: 72px; fill: var(--roxo-primario); }' +
    '#sidebar .sidebar-wave .sw-spark { color: var(--dourado); opacity: 0.95; }' +
    '#sidebar .sidebar-wave .sw-cloche { width: 108px; right: 14px; bottom: 0; opacity: 1; filter: drop-shadow(0 6px 10px rgba(46,16,101,0.35)); }';
  var brandStyleEl = document.createElement('style');
  brandStyleEl.textContent = brandCss;
  document.head.appendChild(brandStyleEl);

  var NAV = [
    { href: '/dashboard.html', label: 'Dashboard', icon: 'grid', dividerAfter: true },
    { href: '/opportunities.html', label: 'Quadro de Leads', icon: 'columns', badge: '99+', dividerAfter: true },
    { href: '/map.html', label: 'Mapa de Prospecção', icon: 'circle', badge: '99+', dividerAfter: true },
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
    { group: 'capacitacao', label: 'Capacitação', icon: 'circle', items: [
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
    ], dividerAfter: true },
    { href: '/ajuda.html', label: 'Central de Ajuda', icon: 'circle' }
  ];

  var ICONS = {
    grid: '<rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect>',
    columns: '<rect x="3" y="3" width="5" height="18" rx="1"></rect><rect x="10" y="3" width="5" height="12" rx="1"></rect><rect x="17" y="3" width="5" height="15" rx="1"></rect>',
    circle: '<circle cx="12" cy="12" r="10"></circle>',
    building: '<rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path>',
    box: '<path d="M21 8V21H3V8"></path><path d="M1 3h22v5H1z"></path><path d="M10 12h4"></path>',
    shield: '<path d="M12 2l9 5v10l-9 5-9-5V7z"></path>'
  };

  function icon(name) {
    return '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + (ICONS[name] || ICONS.circle) + '</svg>';
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
        '<svg class="nav-chevron" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>' +
        '</button>' +
        '<div class="nav-sub" id="navsub-' + entry.group + '"><ul class="nav-sub-inner">' + subHtml + '</ul></div>' +
        '</div>';
    }
    if (entry.dividerAfter) navHtml += '<div class="nav-divider"></div>';
  });

  var USER_NAME = 'Gabrielly Oliveira';
  var USER_EMAIL = 'gabrielly.oliveira@cardapioweb.com';
  var USER_ROLE = 'Administrador';
  var USER_INITIALS = 'GO';

  var sidebarUserHtml = '<div class="sidebar-user">' +
    '<div class="sidebar-user-avatar">' + USER_INITIALS +
    '<div class="sidebar-avatar-overlay"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg></div>' +
    '</div>' +
    '<div class="sidebar-user-info"><div class="sidebar-user-name">' + USER_NAME + '</div>' +
    '<span class="sidebar-user-role" style="background:#8B2FF7;">🛡 ' + USER_ROLE + '</span></div>' +
    '<button type="button" class="sidebar-user-logout" title="Sair da conta" onclick="sessionStorage.removeItem(\'cw_test_authorized\'); window.location=\'/index.html\';"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg></button>' +
    '</div>';

  var sidebarTopWaveHtml = '<svg class="sidebar-topwave" viewBox="0 0 264 22" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path d="M0,0 C 60,22 200,22 264,0 L264,22 L0,22 Z"></path></svg>';

  var sidebarSuggestHtml = '<div class="sidebar-suggest"><div class="ssb-body"><div class="ssb-body-inner">' +
    '<div class="sidebar-suggest-box"><img class="ssb-mascot" src="/assets/mascots/cardapinho.png" alt="Cardapinho">' +
    '<div class="ssb-title">Sugestões</div>' +
    '<span class="ssb-text">Sua ideia molda o futuro da plataforma. Compartilhe e vote!</span>' +
    '<div class="ssb-row"><a class="ssb-link" href="#">Ver Sugestões</a><a class="ssb-btn-sm" href="#">+ Sugerir</a></div></div>' +
    '</div></div><div class="ssb-bar"><span class="ssb-bar-icon">💡</span><span class="ssb-bar-label">Sugestões</span></div></div>';

  var sidebarWaveHtml = '<div class="sidebar-wave">' +
    '<svg class="sw-back" viewBox="0 0 264 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path d="M0,100 L0,45 C 40,10 90,0 140,15 C 190,30 230,55 264,35 L264,100 Z"></path></svg>' +
    '<svg class="sw-front" viewBox="0 0 264 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path d="M0,100 L0,60 C 50,35 100,25 150,40 C 200,55 230,70 264,55 L264,100 Z"></path></svg>' +
    '<svg class="sw-spark" style="left:16%;top:8px;width:16px;height:16px;" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z"></path></svg>' +
    '<img class="sw-cloche" src="/assets/mascots/cardapinho-loja.png" alt="Cardapinho">' +
    '</div>';

  var sidebarHtml = '<div class="sidebar-logo"><img alt="CW-Rev" src="/assets/logo-menu-new-fcfaf4fe.png" /></div>' +
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
