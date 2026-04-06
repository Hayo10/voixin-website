// ── Voxlor shared nav + footer component ────────────────────────────────────
// Usage: call initComponents('home'|'demo'|'insights'|'case') inside DOMContentLoaded,
// before setLanguage(). Requires #site-nav and #site-footer placeholder divs.

const COMMON_TEXTS = {
  sv: {
    'nav.features':  'Funktioner',
    'nav.how':       'Hur det fungerar',
    'nav.pricing':   'Priser',
    'nav.contact':   'Kontakt',
    'nav.demo':      'Demo',
    'nav.insights':  'Insikter',
    'nav.case':      'Kundcase',
    'nav.cta':       'Kontakta oss',
    'footer.tagline':'Jessica, din AI-röstassistent — powered by Voxlor.',
    'footer.links':  'Länkar',
    'footer.legal':  'Legal',
    'footer.privacy':'Integritetspolicy',
    'footer.terms':  'Användarvillkor',
    'footer.copy':   '© 2026 Voxlor. Alla rättigheter förbehållna.',
  },
  en: {
    'nav.features':  'Features',
    'nav.how':       'How it works',
    'nav.pricing':   'Pricing',
    'nav.contact':   'Contact',
    'nav.demo':      'Demo',
    'nav.insights':  'Insights',
    'nav.case':      'Case study',
    'nav.cta':       'Contact us',
    'footer.tagline':'Jessica, your AI voice assistant — powered by Voxlor.',
    'footer.links':  'Links',
    'footer.legal':  'Legal',
    'footer.privacy':'Privacy policy',
    'footer.terms':  'Terms of use',
    'footer.copy':   '© 2026 Voxlor. All rights reserved.',
  }
};

function initComponents(activePage) {
  // 1. Merge common i18n keys into each page's TEXTS object
  if (typeof TEXTS !== 'undefined') {
    for (const lang of ['sv', 'en']) {
      if (TEXTS[lang]) Object.assign(TEXTS[lang], COMMON_TEXTS[lang]);
    }
  }

  // 2. Compute hrefs — on home page use anchors, elsewhere use /#anchor
  const isHome = activePage === 'home';
  const featuresHref = isHome ? '#features' : '/#features';
  const pricingHref  = isHome ? '#pricing'  : '/#pricing';
  const contactHref  = isHome ? '#contact'  : '/#contact';

  // 3. Helper: nav link classes
  function linkCls(page, extra) {
    const isActive = activePage === page;
    return isActive
      ? `text-sm font-semibold text-cyan-600 hover:text-cyan-700 ${extra || ''}`
      : `nav-link text-sm font-medium text-gray-600 hover:text-gray-900 ${extra || ''}`;
  }
  function mobileLinkCls(page) {
    const isActive = activePage === page;
    return isActive
      ? 'py-2.5 px-3 rounded-lg text-sm font-semibold text-cyan-600 bg-cyan-50'
      : 'py-2.5 px-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50';
  }

  // 4. Render nav
  const navEl = document.getElementById('site-nav');
  if (navEl) {
    navEl.innerHTML = `
<nav class="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100 shadow-sm">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16">

      <!-- Logo -->
      <a href="/" class="flex items-center">
        <img src="/logo/Voxlor-logo-1.png" alt="Voxlor" class="h-8 w-auto"
             onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
        <span class="hidden items-center gap-2 text-xl font-black tracking-tight">
          <span class="gradient-text">Voxlor</span>
        </span>
      </a>

      <!-- Desktop nav links -->
      <div class="hidden md:flex items-center gap-8">
        <a href="${featuresHref}" class="${linkCls('home')}" data-i18n="nav.features">Funktioner</a>
        <a href="/demo"               class="${linkCls('demo')}" data-i18n="nav.demo">Demo</a>
        <a href="/insights"           class="${linkCls('insights')}" data-i18n="nav.insights">Insikter</a>
        <a href="/case/caravanhallen" class="${linkCls('case')}" data-i18n="nav.case">Kundcase</a>
      </div>

      <!-- Right: lang toggle + CTA + hamburger -->
      <div class="flex items-center gap-3">
        <div class="flex items-center bg-gray-100 rounded-full p-0.5 text-xs font-semibold">
          <button class="lang-btn px-2.5 py-1 rounded-full transition-all" data-lang="sv" onclick="setLanguage('sv')">SV</button>
          <button class="lang-btn px-2.5 py-1 rounded-full transition-all" data-lang="en" onclick="setLanguage('en')">EN</button>
        </div>
        <a href="${contactHref}" class="hidden md:inline-flex btn-gradient text-white text-sm font-semibold px-4 py-2 rounded-full shadow-sm" data-i18n="nav.cta">Kontakta oss</a>
        <button id="menu-btn" class="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Menu">
          <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
          </svg>
        </button>
      </div>
    </div>
  </div>

  <!-- Mobile menu -->
  <div id="mobile-menu" class="md:hidden border-t border-gray-100 bg-white">
    <div class="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-1">
      <a href="${featuresHref}"       class="${mobileLinkCls('home')}" data-i18n="nav.features">Funktioner</a>
      <a href="/demo"                 class="${mobileLinkCls('demo')}" data-i18n="nav.demo">Demo</a>
      <a href="/insights"             class="${mobileLinkCls('insights')}" data-i18n="nav.insights">Insikter</a>
      <a href="/case/caravanhallen"   class="${mobileLinkCls('case')}" data-i18n="nav.case">Kundcase</a>
      <a href="${contactHref}" class="mt-2 py-2.5 px-3 rounded-full btn-gradient text-white text-sm font-semibold text-center" data-i18n="nav.cta">Kontakta oss</a>
    </div>
  </div>
</nav>`;
  }

  // 5. Render footer
  const footerEl = document.getElementById('site-footer');
  if (footerEl) {
    footerEl.innerHTML = `
<footer class="bg-gray-950 text-gray-400 py-12 px-4">
  <div class="max-w-6xl mx-auto grid sm:grid-cols-3 gap-8">

    <!-- Brand -->
    <div>
      <a href="/" class="inline-flex items-center mb-3">
        <img src="/logo/Voxlor-logo-3.png" alt="Voxlor" class="h-8 w-auto"
             onerror="this.style.display='none';this.nextElementSibling.style.display='block'">
        <span class="hidden text-xl font-black gradient-text">Voxlor</span>
      </a>
      <p class="text-sm leading-relaxed" data-i18n="footer.tagline">Jessica, din AI-röstassistent — powered by Voxlor.</p>
    </div>

    <!-- Links -->
    <div>
      <div class="text-white font-semibold text-sm mb-3" data-i18n="footer.links">Länkar</div>
      <ul class="space-y-2 text-sm">
        <li><a href="/#features"           class="hover:text-white transition-colors" data-i18n="nav.features">Funktioner</a></li>
        <li><a href="/#how"                class="hover:text-white transition-colors" data-i18n="nav.how">Hur det fungerar</a></li>
        <li><a href="/#pricing"            class="hover:text-white transition-colors" data-i18n="nav.pricing">Priser</a></li>
        <li><a href="/demo"                class="hover:text-white transition-colors" data-i18n="nav.demo">Demo</a></li>
        <li><a href="/insights"            class="hover:text-white transition-colors" data-i18n="nav.insights">Insikter</a></li>
        <li><a href="/case/caravanhallen"  class="hover:text-white transition-colors" data-i18n="nav.case">Kundcase</a></li>
      </ul>
    </div>

    <!-- Legal -->
    <div>
      <div class="text-white font-semibold text-sm mb-3" data-i18n="footer.legal">Legal</div>
      <ul class="space-y-2 text-sm">
        <li><a href="#" class="hover:text-white transition-colors" data-i18n="footer.privacy">Integritetspolicy</a></li>
        <li><a href="#" class="hover:text-white transition-colors" data-i18n="footer.terms">Användarvillkor</a></li>
      </ul>
    </div>
  </div>

  <div class="max-w-6xl mx-auto mt-10 pt-6 border-t border-gray-800 text-xs text-center" data-i18n="footer.copy">
    © 2026 Voxlor. Alla rättigheter förbehållna.
  </div>
</footer>`;
  }

  // 6. Setup mobile menu toggle
  const menuBtn    = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('open'));
    mobileMenu.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => mobileMenu.classList.remove('open'))
    );
  }
}
