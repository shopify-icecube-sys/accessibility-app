(function () {
  console.log("Ultimate Brute-Force Accessibility v15.0 🚀");

  if (document.getElementById("accessibility-app-vault")) return;

  const state = {
    contrast: parseInt(localStorage.getItem('acc-contrast') || '0'),
    fontSize: parseInt(localStorage.getItem('acc-fontSize') || '0'),
    textAlign: parseInt(localStorage.getItem('acc-textAlign') || '0'),
    highlightLinks: localStorage.getItem('acc-highlightLinks') === 'true',
    hideImages: localStorage.getItem('acc-hideImages') === 'true',
    saturation: parseInt(localStorage.getItem('acc-saturation') || '0'),
    lang: localStorage.getItem('acc-lang') || 'en',
    showStatement: false
  };

  const i18n = {
    en: { title: "Accessibility Settings", reset: "Reset All", selectLang: "Select a Language", statement: "Statement", hideStatement: "Close", fontSize: "Size", hideImages: "Media", highlightLinks: "Links", textAlign: "Align", contrast: "Contrast", sat: "Saturation", c0: "Contrast", c1: "Inverted", c2: "Low Con", c3: "High Con", s0: "Saturation", s1: "Low Sat", s2: "High Sat", s3: "Grayscale", a0: "Align", a1: "Left", a2: "Center", a3: "Right", a4: "Justify", st: "Native Shopify extension built with Liquid, CSS3, and JS. Includes Surgical Scaling, Universal Alignment, Media Blackout, and Contrast Control." },
    de: { title: "Barrierefreiheit", reset: "Zurücksetzen", selectLang: "Sprache", statement: "Aussage", hideStatement: "Schließen", fontSize: "Größe", hideImages: "Multimedia", highlightLinks: "Markierung", textAlign: "Zeilen", contrast: "Kontrast", sat: "Farben", c0: "Kontrast", c1: "Invertiert", c2: "Niedrig", c3: "Hoch", s0: "Farben", s1: "Blass", s2: "Stark", s3: "Grau", a0: "Zeilen", a1: "Links", a2: "Mitte", a3: "Rechts", a4: "Blocksatz", st: "Extension für Shopify mit Liquid & JS. Funktionen: Textzoom, Layout-Ausrichtung, Medien-Hide, Link-Hervorhebung und Kontrast." },
    es: { title: "Accesibilidad", reset: "Reiniciar", selectLang: "Idioma", statement: "Declaración", hideStatement: "Cerrar", fontSize: "Tamaño", hideImages: "Multimedia", highlightLinks: "Enlaces", textAlign: "Alinear", contrast: "Contraste", sat: "Saturación", c0: "Contraste", c1: "Invertido", c2: "Bajo", c3: "Alto", s0: "Saturación", s1: "Baja", s2: "Alta", s3: "Gris", a0: "Alinear", a1: "Izquierda", a2: "Centro", a3: "Derecha", a4: "Justificado", st: "Accesibilidad nativa. Incluye: Contraste, escalado de fuente, alineación universal, resaltado de enlaces y ocultación multimedia." },
    fr: { title: "Accessibilité", reset: "Réinitialiser", selectLang: "Langue", statement: "Déclaration", hideStatement: "Fermer", fontSize: "Taille", hideImages: "Médias", highlightLinks: "Repères", textAlign: "Aligner", contrast: "Contraste", sat: "Intensité", c0: "Contraste", c1: "Inversé", c2: "Bas", c3: "Haut", s0: "Intensité", s1: "Basse", s2: "Haute", s3: "Gris", a0: "Aligner", a1: "Gauche", a2: "Centre", a3: "Droite", a4: "Justifié", st: "Extension native Shopify. Caractéristiques : Zoom, Alignement global, Masquage médias, Repères et Contraste." },
    it: { title: "Accessibilità", reset: "Ripristina", selectLang: "Lingua", statement: "Dichiarazione", hideStatement: "Chiudi", fontSize: "Carattere", hideImages: "Multimedia", highlightLinks: "Evidenzia", textAlign: "Allinea", contrast: "Contrasto", sat: "Colori", c0: "Contrasto", c1: "Invertito", c2: "Basso", c3: "Alto", s0: "Colori", s1: "Bassa", s2: "Alta", s3: "Grigio", a0: "Allinea", a1: "Sinistra", a2: "Centro", a3: "Destra", a4: "Giustifica", st: "Migliora la navigazione tramite Liquid, CSS3 e JS. Funzioni: Zoom carattere, Allineamento universale, Multimedia hide e Contrasto." },
    pt: { title: "Acessibilidade", reset: "Recomeçar", selectLang: "Idioma", statement: "Declaração", hideStatement: "Fechar", fontSize: "Fonte", hideImages: "Multimídia", highlightLinks: "Destaque", textAlign: "Alinhamento", contrast: "Contraste", sat: "Saturação", c0: "Contraste", c1: "Invertido", c2: "Baixo", c3: "Alto", s0: "Saturação", s1: "Baixa", s2: "Alta", s3: "Cinza", a0: "Alinhamento", a1: "Esquerda", a2: "Centro", a3: "Direita", a4: "Justificado", st: "Acessibilidade Shopify. Inclui: Modos de contraste, zoom cirúrgico, alinhamento universal, realce de links e ocultação de mídia." }
  };

  const t = (k) => i18n[state.lang]?.[k] || i18n['en'][k] || k;

  const vault = document.createElement("div");
  vault.id = "accessibility-app-vault";
  vault.style.cssText = "position: fixed !important; top: 0 !important; left: 0 !important; width: 0 !important; height: 0 !important; z-index: 2147483647 !important; display: block !important;";
  document.body.appendChild(vault);
  const shadow = vault.attachShadow({ mode: "open" });

  const styles = `
    * { box-sizing: border-box; }
    :host { --primary: #3b5998; --bg: #fff; --text: #333; --border: #ccd0d5; --active: #4a90e2; all: initial; }
    .accessibility-widget { position: fixed; bottom: 20px; right: 20px; background: var(--primary) !important; color: #fff !important; width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer !important; z-index: 2147483647 !important; box-shadow: 0 4px 15px rgba(0,0,0,0.3); visibility: visible !important; }
    .accessibility-widget svg { width: 32px; height: 32px; fill: white !important; color: white !important; pointer-events: none; }
    .accessibility-popup { position: fixed; bottom: 90px; right: 20px; width: 360px; max-width: 90vw; height: 530px; max-height: 85vh; background: #fff !important; border-radius: 12px; box-shadow: 0 10px 40px rgba(0,0,0,0.25); display: none; flex-direction: column; z-index: 2147483647 !important; overflow: hidden; font-family: system-ui, sans-serif; border: 1px solid var(--primary); text-align: left; }
    .p-head { display: flex; justify-content: space-between; padding: 15px 20px; background: var(--primary); color: white !important; align-items: center; }
    .p-head span { font-size: 18px; font-weight: 600; color: white !important; }
    #close-p { background: none; border: none; color: white !important; cursor: pointer; font-size: 24px; padding: 0; }
    .p-sub { display: grid; grid-template-columns: 1fr 1fr; border-bottom: 1px solid var(--border); }
    .sub-btn { padding: 12px; background: #fff !important; border: none; border-right: 1px solid var(--border); cursor: pointer; font-size: 15px; font-weight: 600; color: #333 !important; }
    .p-body { flex: 1; padding: 15px; overflow-y: auto; background: #fff !important; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
    .feat-btn { background: #fff !important; border: 2px solid var(--primary) !important; border-radius: 8px; padding: 15px 5px; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; min-height: 105px; position: relative; }
    .feat-btn.active { border-color: var(--active) !important; background: #f0f7ff !important; }
    .feat-btn svg { width: 32px; height: 32px; margin-bottom: 8px; color: #333 !important; stroke: currentColor; fill: none; stroke-width: 2; pointer-events: none; }
    .feat-btn span { font-size: 13px; font-weight: 600; color: #333 !important; text-align: center; }
    .active-check { position: absolute; top: 5px; right: 5px; background: var(--active); color: white; width: 18px; height: 18px; border-radius: 50%; display: none; align-items: center; justify-content: center; font-size: 11px; }
    .feat-btn.active .active-check { display: flex; }
    .prog { width: 85%; height: 6px; background: #eee; border-radius: 3px; margin-top: 10px; display: flex; overflow: hidden; }
    .prog-seg { flex: 1; border-right: 1px solid #fff; }
    .prog-seg.filled { background: var(--primary); }
    .lang-area { padding: 8px 15px; border-bottom: 1px solid #eee; background: #f9f9f9; }
    .lang-label { font-size: 12px; color: #666; margin-bottom: 4px; display: block; font-weight: 600; }
    select { width: 100%; padding: 8px; border-radius: 4px; border: 1px solid #ccc; font-size: 14px; outline: none; }
    .s-box h4 { margin-top: 0; color: var(--primary); }
    .s-box p { line-height: 1.5; color: #333; font-size: 14px; }
  `;

  shadow.innerHTML = `
    <style>${styles}</style>
    <div class="accessibility-widget" id="main-trigger"><svg viewBox="0 0 512 512"><path d="M256,112a56,56,0,1,1,56-56A56.06,56.06,0,0,1,256,112Z"></path><path d="M432,112.8c-20,6-110,32-176,32s-150-26-176-32c-19-5-32,14-32,32s16,26,32,32l95,30c10,4,13,8,14,11,4,11,1,32,0,39l-6,45-32,176c-3,16,10,32,32,32,22,0,28-14,32-32,0,0,28-158,42-158s43,158,43,158c4,18,12,32,32,32,22,0,35-16,32-32l-33-175-6-45c-4-26-1-35,0-37,1-2,6-6,17-11l89-31c16-6,32-14,32-32s-13-37-32-32Z"></path></svg></div>
    <div class="accessibility-popup" id="main-popup">
      <div class="p-head"><span id="p-title"></span><button id="close-p">✕</button></div>
      <div class="p-sub"><button class="sub-btn" id="p-reset"></button><button class="sub-btn" id="p-stmt"></button></div>
      <div class="lang-area">
         <span class="lang-label" id="p-lbl"></span>
         <select id="p-lang">
            <option value="en" hidden>Select a Language</option>
            <option value="en" ${state.lang === 'en' ? 'selected' : ''}>English</option>
            <option value="de" ${state.lang === 'de' ? 'selected' : ''}>Deutsch (German)</option>
            <option value="es" ${state.lang === 'es' ? 'selected' : ''}>Español (Spanish)</option>
            <option value="fr" ${state.lang === 'fr' ? 'selected' : ''}>Français (French)</option>
            <option value="it" ${state.lang === 'it' ? 'selected' : ''}>Italiano (Italian)</option>
            <option value="pt" ${state.lang === 'pt' ? 'selected' : ''}>Português (Portuguese)</option>
         </select>
      </div>
      <div class="p-body" id="p-body"></div>
    </div>
  `;

  const render = () => {
    shadow.getElementById('p-title').innerText = t('title');
    shadow.getElementById('p-reset').innerText = t('reset');
    shadow.getElementById('p-stmt').innerText = state.showStatement ? t('hideStatement') : t('statement');
    shadow.getElementById('p-lbl').innerText = t('selectLang');
    const b = shadow.getElementById('p-body');
    if (state.showStatement) {
      b.innerHTML = `<div class="s-box"><h4>${t('statement')}</h4><p>${t('st')}</p></div>`;
      return;
    }
    b.innerHTML = `
      <div class="grid">
        <div class="feat-btn ${state.contrast > 0 ? 'active' : ''}" data-ax="contrast"><div class="active-check">✓</div><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="M12 2v20c5.523 0 10-4.477 10-10S17.523 2 12 2z" fill="currentColor"></path></svg><span>${t('c'+state.contrast)}</span><div class="prog">${[1,2,3].map(i => `<div class="prog-seg ${state.contrast >= i ? 'filled' : ''}"></div>`).join('')}</div></div>
        <div class="feat-btn ${state.fontSize > 0 ? 'active' : ''}" data-ax="fontSize"><div class="active-check">✓</div><svg viewBox="0 0 24 24"><path d="M4 7V4h16v3M9 20h6M12 4v16"></path></svg><span>${t('fontSize')} +${state.fontSize * 25}%</span><div class="prog">${[1,2,3,4].map(i => `<div class="prog-seg ${state.fontSize >= i ? 'filled' : ''}"></div>`).join('')}</div></div>
        <div class="feat-btn ${state.textAlign > 0 ? 'active' : ''}" data-ax="textAlign"><div class="active-check">✓</div><svg viewBox="0 0 24 24"><line x1="2" y1="12" x2="22" y2="12"></line><line x1="2" y1="6" x2="22" y2="6"></line><line x1="2" y1="18" x2="22" y2="18"></line></svg><span>${t('a'+state.textAlign)}</span><div class="prog">${[1,2,3,4].map(i => `<div class="prog-seg ${state.textAlign >= i ? 'filled' : ''}"></div>`).join('')}</div></div>
        <div class="feat-btn ${state.highlightLinks ? 'active' : ''}" data-ax="highlightLinks"><div class="active-check">✓</div><svg viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path></svg><span>${t('highlightLinks')}</span></div>
        <div class="feat-btn ${state.hideImages ? 'active' : ''}" data-ax="hideImages"><div class="active-check">✓</div><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="3" x2="21" y2="21"></line></svg><span>${t('hideImages')}</span></div>
        <div class="feat-btn ${state.saturation > 0 ? 'active' : ''}" data-ax="saturation"><div class="active-check">✓</div><svg viewBox="0 0 24 24"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5C11.5 5.5 10 7.9 8 9.5 6 11.1 5 13 5 15a7 7 0 0 0 7 7z"></path></svg><span>${t('s'+state.saturation)}</span><div class="prog">${[1,2,3].map(i => `<div class="prog-seg ${state.saturation >= i ? 'filled' : ''}"></div>`).join('')}</div></div>
      </div>
    `;
    shadow.querySelectorAll('.feat-btn').forEach(btn => {
      btn.onclick = (e) => { e.stopPropagation(); const ax = btn.getAttribute('data-ax');
        if (ax === 'contrast') state.contrast = (state.contrast + 1) % 4;
        if (ax === 'fontSize') state.fontSize = (state.fontSize + 1) % 5;
        if (ax === 'textAlign') state.textAlign = (state.textAlign + 1) % 5;
        if (ax === 'highlightLinks') state.highlightLinks = !state.highlightLinks;
        if (ax === 'hideImages') state.hideImages = !state.hideImages;
        if (ax === 'saturation') state.saturation = (state.saturation + 1) % 4;
        apply();
      };
    });
  };

  const applyParams = () => {
    const h = document.documentElement;
    h.className = h.className.replace(/\bacc-\S+/g, '').trim();
    if (state.contrast > 0) h.classList.add(['','acc-inverted','acc-low-contrast','acc-high-contrast'][state.contrast]);
    if (state.saturation > 0) h.classList.add(['','acc-low-saturation','acc-high-saturation','acc-grayscale'][state.saturation]);
    if (state.highlightLinks) h.classList.add('acc-highlight-links');
    if (state.hideImages) h.classList.add('acc-hide-images');
    if (state.textAlign > 0) h.classList.add(`acc-text-align-${['','left','center','right','justify'][state.textAlign]}`);
    if (state.fontSize > 0) h.classList.add(`acc-font-size-${state.fontSize}`);
  };

  const apply = () => {
    Object.keys(state).forEach(k => localStorage.setItem(`acc-${k}`, state[k]));
    applyParams();
    render();
  };

  // Keep observing HTML class to ensure Shopify Themes don't remove our classes dynamically (e.g., during page navigations)
  const observer = new MutationObserver(() => {
     let missing = false;
     if (state.highlightLinks && !document.documentElement.classList.contains('acc-highlight-links')) missing = true;
     if (state.hideImages && !document.documentElement.classList.contains('acc-hide-images')) missing = true;
     if (state.contrast > 0 && !document.documentElement.className.includes('contrast') && !document.documentElement.className.includes('inverted')) missing = true;
     if (state.saturation > 0 && !document.documentElement.className.includes('saturation') && !document.documentElement.className.includes('grayscale')) missing = true;
     if (missing) applyParams();
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

  const p = shadow.getElementById('main-popup');
  shadow.getElementById('main-trigger').onclick = (e) => { e.stopPropagation(); p.style.display = p.style.display === 'flex' ? 'none' : 'flex'; };
  shadow.getElementById('close-p').onclick = (e) => { e.stopPropagation(); p.style.display = 'none'; };
  shadow.getElementById('p-lang').onchange = (e) => { e.stopPropagation(); state.lang = e.target.value; apply(); };
  shadow.getElementById('p-reset').onclick = (e) => { e.stopPropagation(); 
     Object.assign(state, {contrast:0,fontSize:0,textAlign:0,highlightLinks:false,hideImages:false,saturation:0,lang:'en'}); 
     shadow.getElementById('p-lang').value = 'en';
     apply(); 
  };
  shadow.getElementById('p-stmt').onclick = (e) => { e.stopPropagation(); state.showStatement = !state.showStatement; render(); };
  document.addEventListener('click', (e) => { if(!e.composedPath().includes(vault)) p.style.display = 'none'; });
  
  applyParams();
  apply();
})();