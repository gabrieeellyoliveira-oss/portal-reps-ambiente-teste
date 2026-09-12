(function () {
  // Tela de login desativada temporariamente a pedido da usuária (2026-09-12).
  // Para reativar: descomente o bloco abaixo.
  // if (sessionStorage.getItem('cw_test_authorized') !== '1') {
  //   window.location.replace('/index.html');
  //   return;
  // }

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
    ]},
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
    '<span class="sidebar-user-role" style="background:#7c3aed;">🛡 ' + USER_ROLE + '</span></div>' +
    '<button type="button" class="sidebar-user-toggle" id="sidebar-user-toggle"><svg class="sidebar-user-chevron" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg></button>' +
    '<div class="sidebar-user-menu" id="sidebar-user-menu"><a class="sum-item" href="/index.html" onclick="sessionStorage.removeItem(\'cw_test_authorized\');"><span class="sum-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg></span>Sair da conta</a></div>' +
    '</div>';

  var sidebarSuggestHtml = '<div class="sidebar-suggest"><div class="ssb-body"><div class="ssb-body-inner">' +
    '<div class="sidebar-suggest-box"><span class="ssb-mascot">💡</span><span class="ssb-text">Sua ideia molda o futuro da plataforma. Compartilhe e vote!</span>' +
    '<div class="ssb-row"><a class="ssb-link" href="#">Ver Sugestões</a><a class="ssb-btn-sm" href="#">+ Sugerir</a></div></div>' +
    '</div></div><div class="ssb-bar"><span class="ssb-bar-icon">💡</span><span class="ssb-bar-label">Ideias &amp; Produto</span></div></div>';

  var sidebarWaveHtml = '<div class="sidebar-wave"></div>';

  var sidebarHtml = '<div class="sidebar-logo"><img alt="CW-Rev" src="/assets/logo-menu-new-fcfaf4fe.png" /></div>' +
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

    var userToggle = document.getElementById('sidebar-user-toggle');
    var userMenu = document.getElementById('sidebar-user-menu');
    if (userToggle) {
      userToggle.addEventListener('click', function () { userMenu.classList.toggle('open'); });
    }
    var profileDropdown = document.getElementById('profile-dropdown');
    var profileTrigger = document.getElementById('profile-dropdown-trigger');
    if (profileTrigger) {
      profileTrigger.addEventListener('click', function () { profileDropdown.classList.toggle('open'); });
    }
    document.addEventListener('click', function (e) {
      if (userMenu && !e.target.closest('.sidebar-user')) userMenu.classList.remove('open');
      if (profileDropdown && !e.target.closest('.profile-dropdown')) profileDropdown.classList.remove('open');
    });
  });
})();
