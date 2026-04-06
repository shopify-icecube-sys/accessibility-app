(function () {
  console.log("Widget JS Loaded 🚀");

  // Prevent duplicate
  if (document.getElementById("accessibility-widget")) return;

  /* ===============================
     STATE MANAGEMENT
  =============================== */
  const state = {
    contrast: parseInt(localStorage.getItem('acc-contrast') || '0'),
    showStatement: false,
    highlightLinks: localStorage.getItem('acc-highlight-links') === 'true',
    hideImages: localStorage.getItem('acc-hide-images') === 'true',
    fontSize: parseInt(localStorage.getItem('acc-font-size') || '0'),
    letterSpacing: parseInt(localStorage.getItem('acc-letter-spacing') || '0'),
    saturation: parseInt(localStorage.getItem('acc-saturation') || '0'),
    textAlign: parseInt(localStorage.getItem('acc-text-align') || '0'),
    lang: localStorage.getItem('acc-lang') || ''
  };

  const contrastModes = [
    { class: '', bars: 0 },
    { class: 'acc-inverted', bars: 1 },
    { class: 'acc-low-contrast', bars: 2 },
    { class: 'acc-high-contrast', bars: 3 }
  ];

  const saturationModes = [
    { class: '', bars: 0 },
    { class: 'acc-low-saturation', bars: 1 },
    { class: 'acc-high-saturation', bars: 2 },
    { class: 'acc-grayscale', bars: 3 }
  ];

  const i18n = {
    en: { title: "Accessibility Widget", reset: "Reset All", statement: "Statement", hideStatement: "Hide Statement", selectLanguage: "Select a Language", fontSize: "Font Size", hideImages: "Hide Images", highlightLinks: "Highlight Links", letterSpacing: "Letter Spacing", contrast0: "Contrast", contrast1: "Inverted", contrast2: "Low Contrast", contrast3: "High Contrast", sat0: "Saturation", sat1: "Low Saturation", sat2: "High Saturation", sat3: "Grayscale", statementTitle: "Accessibility Statement", statementDesc1: "This statement describes the accessibility features of the App.", statementDesc2: "We utilize various technologies meant to make it accessible.", statementF1: "Select between different visual modes.", statementF2: "Increase overall text size seamlessly.", statementF3: "Eliminate media distractions.", statementF4: "Keep interactive elements clearly visible.", statementF5: "Support dyslexia reading speeds.", statementF6: "Adjust color intensity across the page.", textAlign: "Text Align", textAlign1: "Left Align", textAlign2: "Center Align", textAlign3: "Right Align", textAlign4: "Justify Align" },
    es: { title: "Widget de Accesibilidad", reset: "Reiniciar todo", statement: "Declaración", hideStatement: "Ocultar", selectLanguage: "Seleccione un idioma", fontSize: "Tamaño de fuente", hideImages: "Ocultar imágenes", highlightLinks: "Resaltar enlaces", letterSpacing: "Espaciado de letras", contrast0: "Contraste", contrast1: "Invertido", contrast2: "Bajo Contraste", contrast3: "Alto Contraste", sat0: "Saturación", sat1: "Baja Saturación", sat2: "Alta Saturación", sat3: "Escala de grises", statementTitle: "Declaración de Accesibilidad", statementDesc1: "Describe las características de accesibilidad.", statementDesc2: "Utilizamos varias tecnologías.", statementF1: "Diferentes modos visuales.", statementF2: "Aumente el tamaño del texto.", statementF3: "Elimina distracciones.", statementF4: "Mantiene elementos visibles.", statementF5: "Apoya la lectura.", statementF6: "Ajusta la intensidad.", textAlign: "Alinear texto", textAlign1: "Alinear Izquierda", textAlign2: "Alinear Centro", textAlign3: "Alinear Derecha", textAlign4: "Justificar" },
    fr: { title: "Accessibilité", reset: "Réinitialiser", statement: "Déclaration", hideStatement: "Masquer", selectLanguage: "Choisir la langue", fontSize: "Taille de police", hideImages: "Masquer images", highlightLinks: "Souligner les liens", letterSpacing: "Espacement", contrast0: "Contraste", contrast1: "Inversé", contrast2: "Contraste Faible", contrast3: "Contraste Élevé", sat0: "Saturation", sat1: "Basse Saturation", sat2: "Haute Saturation", sat3: "Niveaux de gris", statementTitle: "Déclaration d'Accessibilité", statementDesc1: "Caractéristiques de l'app.", statementDesc2: "Technologies utilisées.", statementF1: "Trouvez le bon contraste.", statementF2: "Taille du texte agrandie.", statementF3: "Masquer les médias.", statementF4: "Souligner interactif.", statementF5: "Aide pour lire.", statementF6: "Gérer l'intensité." },
    de: { title: "Barrierefreiheit", reset: "Zurücksetzen", statement: "Erklärung", hideStatement: "Ausblenden", selectLanguage: "Sprache wählen", fontSize: "Schriftgröße", hideImages: "Bilder verbergen", highlightLinks: "Links markieren", letterSpacing: "Abstand", contrast0: "Kontrast", contrast1: "Invertiert", contrast2: "Niedriger Kontrast", contrast3: "Hoher Kontrast", sat0: "Sättigung", sat1: "Niedrige Sättigung", sat2: "Hohe Sättigung", sat3: "Graustufen", statementTitle: "Ba-Erklärung", statementDesc1: "Funktionen.", statementDesc2: "Unsere Tech.", statementF1: "Kontrast+", statementF2: "Schrift+", statementF3: "Bilder-", statementF4: "Links+", statementF5: "Lücke+", statementF6: "Sättigung+" },
    it: { title: "Accessibilità", reset: "Ripristina", statement: "Dichiarazione", hideStatement: "Nascondi", selectLanguage: "Seleziona", fontSize: "Carattere", hideImages: "Nascondi", highlightLinks: "Evidenzia Link", letterSpacing: "Spaziatura", contrast0: "Contrasto", contrast1: "Invertito", contrast2: "Basso Contrasto", contrast3: "Alto Contrasto", sat0: "Saturazione", sat1: "Bassa", sat2: "Alta", sat3: "Grigio", statementTitle: "Dichiarazione Accessibilità", statementDesc1: "Caratteristiche accessibili.", statementDesc2: "Tecnologie in uso.", statementF1: "Modalità Visive", statementF2: "Font più grandi", statementF3: "No Media", statementF4: "Navigazione", statementF5: "Lettura facile", statementF6: "Intensità colori" },
    pt: { title: "Acessibilidade", reset: "Redefinir", statement: "Declaração", hideStatement: "Ocultar", selectLanguage: "Escolha o idioma", fontSize: "Tamanho", hideImages: "Ocultar Imagens", highlightLinks: "Destacar Links", letterSpacing: "Espaçamento", contrast0: "Contraste", contrast1: "Invertido", contrast2: "Baixo", contrast3: "Alto", sat0: "Saturação", sat1: "Baixa", sat2: "Alta", sat3: "Cinza", statementTitle: "Declaração de Acessibilidade", statementDesc1: "Recursos do app.", statementDesc2: "Tecnologias web.", statementF1: "Modos de cor", statementF2: "Fontes", statementF3: "Sem distracts", statementF4: "Foco", statementF5: "Distância letras", statementF6: "Saturação ajustada" },
    zh: { title: "无障碍环境", reset: "重置", statement: "声明", hideStatement: "隐藏", selectLanguage: "选择语言", fontSize: "字体大小", hideImages: "隐藏图片", highlightLinks: "高亮链接", letterSpacing: "字母间距", contrast0: "对比度", contrast1: "反转", contrast2: "低对比度", contrast3: "高对比度", sat0: "饱和度", sat1: "低保和度", sat2: "高饱和度", sat3: "灰度", statementTitle: "无障碍声明", statementDesc1: "无障碍特征描述。", statementDesc2: "技术。", statementF1: "视觉模式", statementF2: "增大字号", statementF3: "隐藏媒体", statementF4: "强调交互", statementF5: "间距加大", statementF6: "色彩调整" },
    ja: { title: "アクセシビリティ", reset: "リセット", statement: "声明", hideStatement: "隠す", selectLanguage: "言語を選択", fontSize: "フォント", hideImages: "画像を隠す", highlightLinks: "強調", letterSpacing: "文字間隔", contrast0: "コントラスト", contrast1: "反転", contrast2: "低対比", contrast3: "高対比", sat0: "彩度", sat1: "低", sat2: "高", sat3: "灰色", statementTitle: "声明", statementDesc1: "特徴。", statementDesc2: "技術。", statementF1: "視覚モド", statementF2: "文字サイズ", statementF3: "メディア無", statementF4: "強調リンク", statementF5: "文字の隙", statementF6: "色調" },
    ar: { title: "إمكانية الوصول", reset: "إعادة ضبط", statement: "إفادة", hideStatement: "إخفاء", selectLanguage: "اختر لغة", fontSize: "الخط", hideImages: "إخفاء الصور", highlightLinks: "تظليل", letterSpacing: "تباعد", contrast0: "التباين", contrast1: "معكوس", contrast2: "منخفض", contrast3: "عالي", sat0: "تشبع", sat1: "منخفض", sat2: "عالي", sat3: "رمادي", statementTitle: "البيان", statementDesc1: "خيارات إمكانية.", statementDesc2: "تقنيات.", statementF1: "ألوان", statementF2: "تكبير خط", statementF3: "إخفاء إعلام", statementF4: "تظليل الروابط", statementF5: "حروف", statementF6: "تشبع ألوان" },
    he: { title: "נגישות", reset: "איפוס", statement: "הצהרה", hideStatement: "הסתר", selectLanguage: "בחר שפה", fontSize: "גודל", hideImages: "הסתר", highlightLinks: "הדגש", letterSpacing: "מרווח", contrast0: "ניגודיות", contrast1: "הפוך", contrast2: "נמוך", contrast3: "גבוה", sat0: "רוויה", sat1: "נמוכה", sat2: "גבוהה", sat3: "אפור", statementTitle: "הצהרה", statementDesc1: "תכונות נגישות", statementDesc2: "טכנולוגיות", statementF1: "ויזואלי", statementF2: "גודל טקסט", statementF3: "מדיה", statementF4: "קישורים", statementF5: "מרווח", statementF6: "רוויה" },
    fa: { title: "دسترسی", reset: "بازنشانی", statement: "بیانیه", hideStatement: "پنهان", selectLanguage: "انتخاب زبان", fontSize: "قلم", hideImages: "پنهان", highlightLinks: "برجسته", letterSpacing: "فاصله", contrast0: "کنتراست", contrast1: "معکوس", contrast2: "پایین", contrast3: "بالا", sat0: "اشباع", sat1: "پایین", sat2: "بالا", sat3: "خاکستری", statementTitle: "بیانیه", statementDesc1: "دسترسی.", statementDesc2: "فناوری.", statementF1: "رنگ", statementF2: "متن", statementF3: "مخفی کردن", statementF4: "پیوند", statementF5: "فاصله", statementF6: "اشباع" },
    nl: { title: "Toegankelijkheid", reset: "Reset", statement: "Verklaring", hideStatement: "Verberg", selectLanguage: "Kies taal", fontSize: "Lettergrootte", hideImages: "Verberg Foto's", highlightLinks: "Markeer", letterSpacing: "Afstand", contrast0: "Contrast", contrast1: "Omgekeerd", contrast2: "Laag", contrast3: "Hoog", sat0: "Verzadiging", sat1: "Laag", sat2: "Hoog", sat3: "Grijs", statementTitle: "Verklaring", statementDesc1: "Functies", statementDesc2: "Tech", statementF1: "Modi", statementF2: "Grootte", statementF3: "Foto's", statementF4: "Links", statementF5: "Afstand", statementF6: "Intensiteit" }
  };

  /* ===============================
     BUTTON CREATE
  =============================== */
  const button = document.createElement("div");
  button.id = "accessibility-widget";
  button.className = "accessibility-widget";

  button.innerHTML = `
    <svg width="28" height="28" viewBox="0 0 512 512" fill="currentColor">
      <path d="M256,112a56,56,0,1,1,56-56A56.06,56.06,0,0,1,256,112Z"></path>
      <path d="M432,112.8c-20,6-110,32-176,32s-150-26-176-32c-19-5-32,14-32,32s16,26,32,32l95,30c10,4,13,8,14,11,4,11,1,32,0,39l-6,45-32,176c-3,16,10,32,32,32,20,0,28-14,32-32,0,0,28-158,42-158s43,158,43,158c4,18,12,32,32,32,22,0,35-16,32-32l-33-175-6-45c-4-26-1-35,0-37,1-2,6-6,17-11l89-31c16-6,32-14,32-32s-13-37-32-32Z"></path>
    </svg>
  `;

  document.body.appendChild(button);

  /* ===============================
     POPUP CREATE
  =============================== */
  const popup = document.createElement("div");
  popup.id = "accessibility-popup";
  popup.className = "accessibility-popup";

  const t = (key) => {
    const lang = state.lang || 'en';
    if (i18n[lang] && i18n[lang][key]) return i18n[lang][key];
    if (i18n['en'][key]) return i18n['en'][key];
    return key;
  };

  const renderPopup = () => {
    const currentMode = contrastModes[state.contrast];
    const currentSatMode = saturationModes[state.saturation];
    
    // STATEMENT HTML
    const statementHtml = `
      <div class="statement-content" style="font-size: 14px; line-height: 1.6; color: #333; padding-bottom: 20px;">
        <h3 style="margin-top: 0; font-size: 16px;">Accessibility Statement</h3>
        <p>This statement describes the accessibility features of the Accessibility App.</p>
        <p>Accessibility widget is committed to making sites accessible for all, including people with disabilities. We are continuously improving the service we provide through our app to comply with increased accessibility standards, guidelines, and to make the browsing experience better for everyone.</p>

        <h4 style="font-size: 15px; margin-top: 15px; margin-bottom: 5px;">Conformance status</h4>
        <p>We firmly believe that the internet should be available and accessible to anyone and are committed to providing a website that is accessible to the broadest possible audience, regardless of ability.</p>
        <p>To fulfill this, we aim to adhere as strictly as possible to the World Wide Web Consortium’s (W3C) Web Content Accessibility Guidelines 2.1 (WCAG 2.1) at the AA level. These guidelines explain how to make web content accessible to people with a wide array of disabilities. Complying with those guidelines helps us ensure that the website is accessible to blind people, people with motor impairments, visual impairment, cognitive disabilities, and more.</p>
        <p>This website utilizes various technologies that are meant to make it as accessible as possible at all times. We utilize an accessibility interface that allows persons with specific disabilities to adjust the website’s UI (user interface) and design it to their personal needs.</p>

        <h4 style="font-size: 15px; margin-top: 15px; margin-bottom: 5px;">Technical information</h4>
        <p>This Accessibility widget is a natively supported app within the Shopify environment. The app relies on the following fundamental web technologies:</p>
        <ul style="padding-left: 20px;">
          <li>HTML5 & CSS3</li>
          <li>Modern JavaScript (ES6+)</li>
          <li>Remix & React (App Dashboard)</li>
          <li>Shopify Liquid</li>
          <li>DOM Parsing & Scaling APIs</li>
        </ul>

        <h4 style="font-size: 15px; margin-top: 15px; margin-bottom: 5px;">Accessibility widget features</h4>
        <p>The app provides the following features:</p>
        <ul style="padding-left: 20px; margin-bottom: 15px;">
          <li style="margin-bottom: 10px;"><strong>${t('contrast0')}</strong><br>The app allows the user to select between different contrast modes including Inverted, Low Contrast, and High Contrast, significantly improving readability for people with visual impairments or color blindness.</li>
          <li style="margin-bottom: 10px;"><strong>${t('fontSize')}</strong><br>The app allows the user to increase the overall font size of the website's text by up to 100% without breaking the structural layout, ensuring content is comfortably readable.</li>
          <li style="margin-bottom: 10px;"><strong>${t('hideImages')}</strong><br>The app allows the user to instantly hide all visual media including images and videos. This eliminates distractions and assists those with cognitive or focus-related disabilities.</li>
          <li style="margin-bottom: 10px;"><strong>${t('highlightLinks')}</strong><br>The app ensures navigational links are prominently highlighted with high contrast colors, giving users a clearer view of interactive elements.</li>
          <li style="margin-bottom: 10px;"><strong>${t('letterSpacing')}</strong><br>The app allows the user to increase the space between letters in text content sequentially up to four levels, making text easier to process for individuals with dyslexia.</li>
          <li style="margin-bottom: 10px;"><strong>${t('sat0')}</strong><br>The app allows the user to adjust the color intensity of the website. Options include Low Saturation, High Saturation, and Grayscale, assisting users with color processing difficulties.</li>
          <li style="margin-bottom: 10px;"><strong>${t('textAlign')}</strong><br>The app allows the user to individually align text to the left, right, or center, providing an organized reading experience.</li>
          <li style="margin-bottom: 10px;"><strong>Language translation</strong><br>The app allows the user to change the native language within the widget interface natively, expanding support and understanding intuitively.</li>
        </ul>

        <h4 style="font-size: 15px; margin-top: 15px; margin-bottom: 5px;">Notes & Feedback</h4>
        <p>We always try to update our services and operate in the best possible manner to benefit all of our clients and their site visitors. If you experience any issues with the Accessibility widget provided service, however, please email our developer codeinspire.io. He respond within 3 business days.</p>
        <p>We cannot control or correct problems with third-party sites, but please let us know if you encounter difficulty with any sites we link to so we can pass the information along to the site owners. You may also want to address your concerns directly to these third parties.</p>
      </div>
    `;

    // GRID HTML
    const gridHtml = `
      <div class="widget-grid">
        <!-- Contrast Button -->
        <div class="feature-btn ${state.contrast > 0 ? 'active' : ''}" id="btn-contrast">
          <div class="active-check">✓</div>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 2v20c5.523 0 10-4.477 10-10S17.523 2 12 2z" fill="currentColor"></path>
          </svg>
          <span id="label-contrast">${t('contrast' + state.contrast)}</span>
          <div class="progress-container">
            <div class="progress-segment ${currentMode.bars >= 1 ? 'filled' : ''}"></div>
            <div class="progress-segment ${currentMode.bars >= 2 ? 'filled' : ''}"></div>
            <div class="progress-segment ${currentMode.bars >= 3 ? 'filled' : ''}"></div>
          </div>
        </div>

        <!-- Other Buttons -->
        <div class="feature-btn ${state.fontSize > 0 ? 'active' : ''}" id="btn-font-size">
          <div class="active-check">✓</div>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 7V4h16v3M9 20h6M12 4v16"></path>
          </svg>
          <span id="label-font-size">${t('fontSize')}</span>
          <div class="progress-container">
            <div class="progress-segment ${state.fontSize >= 1 ? 'filled' : ''}"></div>
            <div class="progress-segment ${state.fontSize >= 2 ? 'filled' : ''}"></div>
            <div class="progress-segment ${state.fontSize >= 3 ? 'filled' : ''}"></div>
            <div class="progress-segment ${state.fontSize >= 4 ? 'filled' : ''}"></div>
          </div>
        </div>
        <div class="feature-btn ${state.hideImages ? 'active' : ''}" id="btn-hide-images">
          <div class="active-check">✓</div>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <polyline points="21 15 16 10 5 21"></polyline>
            <line x1="3" y1="3" x2="21" y2="21"></line>
          </svg>
          <span>${t('hideImages')}</span>
        </div>
        <div class="feature-btn ${state.highlightLinks ? 'active' : ''}" id="btn-highlight-links">
          <div class="active-check">✓</div>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
          </svg>
          <span>${t('highlightLinks')}</span>
        </div>
        <div class="feature-btn ${state.letterSpacing > 0 ? 'active' : ''}" id="btn-letter-spacing">
          <div class="active-check">✓</div>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="5 15 2 18 5 21"></polyline>
            <line x1="2" y1="18" x2="22" y2="18"></line>
            <polyline points="19 15 22 18 19 21"></polyline>
            <path d="M12 4v10"></path>
            <path d="M8 4h8"></path>
          </svg>
          <span id="label-letter-spacing">${t('letterSpacing')}</span>
          <div class="progress-container">
            <div class="progress-segment ${state.letterSpacing >= 1 ? 'filled' : ''}"></div>
            <div class="progress-segment ${state.letterSpacing >= 2 ? 'filled' : ''}"></div>
            <div class="progress-segment ${state.letterSpacing >= 3 ? 'filled' : ''}"></div>
            <div class="progress-segment ${state.letterSpacing >= 4 ? 'filled' : ''}"></div>
          </div>
        </div>
        <div class="feature-btn ${state.saturation > 0 ? 'active' : ''}" id="btn-saturation">
          <div class="active-check">✓</div>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"></path>
          </svg>
          <span id="label-saturation">${t('sat' + state.saturation)}</span>
          <div class="progress-container">
            <div class="progress-segment ${currentSatMode.bars >= 1 ? 'filled' : ''}"></div>
            <div class="progress-segment ${currentSatMode.bars >= 2 ? 'filled' : ''}"></div>
            <div class="progress-segment ${currentSatMode.bars >= 3 ? 'filled' : ''}"></div>
          </div>
        </div>

        <div class="feature-btn ${state.textAlign > 0 ? 'active' : ''}" id="btn-text-align">
          <div class="active-check">✓</div>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="2" y1="6" x2="22" y2="6"></line>
            <line x1="2" y1="12" x2="16" y2="12"></line>
            <line x1="2" y1="18" x2="22" y2="18"></line>
          </svg>
          <span id="label-text-align">${state.textAlign === 0 ? t('textAlign') : t('textAlign' + state.textAlign)}</span>
          <div class="progress-container">
            <div class="progress-segment ${state.textAlign >= 1 ? 'filled' : ''}"></div>
            <div class="progress-segment ${state.textAlign >= 2 ? 'filled' : ''}"></div>
            <div class="progress-segment ${state.textAlign >= 3 ? 'filled' : ''}"></div>
            <div class="progress-segment ${state.textAlign >= 4 ? 'filled' : ''}"></div>
          </div>
        </div>

      </div>
    `;

    popup.innerHTML = `
      <div class="popup-header">
        <span>Accessibility Widget</span>
        <button id="close-popup">✕</button>
      </div>
      <div class="popup-sub-header">
        <button class="sub-header-btn" id="acc-reset">Reset All</button>
        <button class="sub-header-btn" id="acc-statement">${state.showStatement ? 'Hide Statement' : 'Statement'}</button>
      </div>
      <div class="popup-lang-selector" style="padding: 10px 15px; border-bottom: 1px solid #eee; background: #fafafa;">
        <select id="acc-lang-select" style="width: 100%; padding: 8px; border-radius: 4px; border: 1px solid #ccc; font-family: inherit; font-size: 14px; outline: none; background: #fff;">
          <option value="" ${state.lang === '' ? 'selected' : ''}>Select a Language</option>
          <option value="en" ${state.lang === 'en' ? 'selected' : ''}>English</option>
          <option value="fr" ${state.lang === 'fr' ? 'selected' : ''}>French</option>
          <option value="es" ${state.lang === 'es' ? 'selected' : ''}>Spanish</option>
          <option value="de" ${state.lang === 'de' ? 'selected' : ''}>German</option>
          <option value="it" ${state.lang === 'it' ? 'selected' : ''}>Italian</option>
          <option value="pt" ${state.lang === 'pt' ? 'selected' : ''}>Portuguese</option>
          <option value="zh" ${state.lang === 'zh' ? 'selected' : ''}>Chinese</option>
          <option value="ja" ${state.lang === 'ja' ? 'selected' : ''}>Japanese</option>
          <option value="ar" ${state.lang === 'ar' ? 'selected' : ''}>Arabic</option>
          <option value="he" ${state.lang === 'he' ? 'selected' : ''}>Hebrew</option>
          <option value="fa" ${state.lang === 'fa' ? 'selected' : ''}>Persian</option>
          <option value="nl" ${state.lang === 'nl' ? 'selected' : ''}>Dutch</option>
        </select>
      </div>
      <div class="popup-body">
        ${state.showStatement ? statementHtml : gridHtml}
      </div>
    `;

    // Hook select event
    const langSelect = popup.querySelector('#acc-lang-select');
    if (langSelect) {
      langSelect.addEventListener('change', (e) => {
        state.lang = e.target.value;
        applySettings();
      });
    }
  };

  renderPopup();
  document.body.appendChild(popup);

  /* ===============================
     LOGIC
  =============================== */
  const applySettings = () => {
    // Save scroll position
    let scrollPos = 0;
    const bodyEl = popup.querySelector('.popup-body');
    if (bodyEl) scrollPos = bodyEl.scrollTop;

    // Remove all contrast classes
    contrastModes.forEach(mode => {
      if (mode.class) document.documentElement.classList.remove(mode.class);
    });

    // Apply current mode class
    const currentMode = contrastModes[state.contrast];
    if (currentMode.class) {
      document.documentElement.classList.add(currentMode.class);
    }

    // Save to local storage
    localStorage.setItem('acc-contrast', state.contrast);
    localStorage.setItem('acc-highlight-links', state.highlightLinks);
    localStorage.setItem('acc-hide-images', state.hideImages);
    localStorage.setItem('acc-font-size', state.fontSize);
    localStorage.setItem('acc-letter-spacing', state.letterSpacing);
    localStorage.setItem('acc-saturation', state.saturation);
    localStorage.setItem('acc-text-align', state.textAlign);
    localStorage.setItem('acc-lang', state.lang);
    
    // Highlight Links apply
    if (state.highlightLinks) {
      document.documentElement.classList.add('acc-highlight-links');
    } else {
      document.documentElement.classList.remove('acc-highlight-links');
    }

    // Hide Images apply
    if (state.hideImages) {
      document.documentElement.classList.add('acc-hide-images');
    } else {
      document.documentElement.classList.remove('acc-hide-images');
    }

    // Font Size apply
    const scaleMap = [1, 1.25, 1.50, 1.75, 2.0];
    const targetScale = scaleMap[state.fontSize];
    
    // Store original sizes once
    if (!window.accOriginalFontSizes) {
      window.accOriginalFontSizes = new WeakMap();
    }

    // Process fonts efficiently without layout thrashing
    const elementsToScale = document.querySelectorAll('body *:not(.accessibility-widget, .accessibility-widget *, .accessibility-popup, .accessibility-popup *, script, style)');
    
    // Phase 1: READ ONLY (Prevents forced synchronous layouts/reflows)
    const elementsToUpdate = [];
    elementsToScale.forEach(el => {
      // Save original sizes only if not saved yet
      if (!window.accOriginalFontSizes.has(el)) {
        // Optimization: only read computed style if we have text content
        if (el.innerText && el.innerText.trim() !== '') {
          const computed = window.getComputedStyle(el).fontSize;
          if (computed && computed.endsWith('px')) {
            window.accOriginalFontSizes.set(el, parseFloat(computed));
          } else {
            window.accOriginalFontSizes.set(el, null); // Ignore this element
          }
        } else {
          window.accOriginalFontSizes.set(el, null); // No text, ignore
        }
      }
      
      const origSize = window.accOriginalFontSizes.get(el);
      if (origSize) {
        elementsToUpdate.push({ el, origSize });
      }
    });

    // Phase 2: WRITE ONLY (Applies the styles incredibly fast in one go)
    elementsToUpdate.forEach(({ el, origSize }) => {
      if (state.fontSize === 0) {
        el.style.fontSize = ''; // return to original external styles
      } else {
        el.style.fontSize = (origSize * targetScale) + 'px';
      }
    });

    [1, 2, 3, 4].forEach(level => document.documentElement.classList.remove(`acc-font-size-${level}`));
    if (state.fontSize > 0) {
      document.documentElement.classList.add(`acc-font-size-${state.fontSize}`);
    }

    // Letter Spacing apply
    [1, 2, 3, 4].forEach(level => document.documentElement.classList.remove(`acc-letter-spacing-${level}`));
    if (state.letterSpacing > 0) {
      document.documentElement.classList.add(`acc-letter-spacing-${state.letterSpacing}`);
    }

    // Text Align apply
    ['left', 'center', 'right', 'justify'].forEach(dir => document.documentElement.classList.remove(`acc-text-align-${dir}`));
    if (state.textAlign === 1) document.documentElement.classList.add('acc-text-align-left');
    else if (state.textAlign === 2) document.documentElement.classList.add('acc-text-align-center');
    else if (state.textAlign === 3) document.documentElement.classList.add('acc-text-align-right');
    else if (state.textAlign === 4) document.documentElement.classList.add('acc-text-align-justify');

    // Saturation apply
    saturationModes.forEach(mode => {
      if (mode.class) document.documentElement.classList.remove(mode.class);
    });
    const currentSatMode = saturationModes[state.saturation];
    if (currentSatMode.class) {
      document.documentElement.classList.add(currentSatMode.class);
    }

    // Combined CSS Variables Filtering Manager
    if (state.contrast > 0 || state.saturation > 0 || state.hideImages) {
      // hideImages actually uses purely standard styles not a dynamic filter combining but it doesn't hurt.
      document.documentElement.classList.add('acc-filtering');
    } else {
      document.documentElement.classList.remove('acc-filtering');
    }
    // Update UI
    renderPopup();
    
    // Restore scroll position
    const newBodyEl = popup.querySelector('.popup-body');
    if (newBodyEl && scrollPos > 0) {
      // Must be slightly delayed to allow DOM insertion painting
      requestAnimationFrame(() => {
        newBodyEl.scrollTop = scrollPos;
      });
    }
  };

  // Run on load
  applySettings();

  /* ===============================
     EVENT LISTENERS
  =============================== */
  let isOpen = false;

  // Toggle Popup
  button.addEventListener("click", (e) => {
    e.stopPropagation();
    isOpen = !isOpen;
    popup.style.display = isOpen ? "flex" : "none";
  });

  // Handle Clicks inside document
  document.addEventListener("click", (e) => {
    const target = e.target;

    // Toggle Statement
    if (target.id === "acc-statement") {
      state.showStatement = !state.showStatement;
      renderPopup();
      return;
    }

    // Toggle Font Size
    const fontSizeBtn = target.closest("#btn-font-size");
    if (fontSizeBtn && !state.showStatement) {
      state.fontSize = (state.fontSize + 1) % 5;
      applySettings();
      return;
    }

    // Toggle Contrast
    const contrastBtn = target.closest("#btn-contrast");
    if (contrastBtn && !state.showStatement) {
      state.contrast = (state.contrast + 1) % contrastModes.length;
      applySettings();
      return;
    }

    // Toggle Highlight Links
    const highlightLinksBtn = target.closest("#btn-highlight-links");
    if (highlightLinksBtn && !state.showStatement) {
      state.highlightLinks = !state.highlightLinks;
      applySettings();
      return;
    }

    // Toggle Letter Spacing
    const letterSpacingBtn = target.closest("#btn-letter-spacing");
    if (letterSpacingBtn && !state.showStatement) {
      state.letterSpacing = (state.letterSpacing + 1) % 5;
      applySettings();
      return;
    }

    // Toggle Saturation
    const saturationBtn = target.closest("#btn-saturation");
    if (saturationBtn && !state.showStatement) {
      state.saturation = (state.saturation + 1) % saturationModes.length;
      applySettings();
      return;
    }

    // Toggle Hide Images
    const hideImagesBtn = target.closest("#btn-hide-images");
    if (hideImagesBtn && !state.showStatement) {
      state.hideImages = !state.hideImages;
      applySettings();
      return;
    }

    // Toggle Text Align
    const textAlignBtn = target.closest("#btn-text-align");
    if (textAlignBtn && !state.showStatement) {
      state.textAlign = (state.textAlign + 1) % 5;
      applySettings();
      return;
    }

    // Reset All
    if (target.id === "acc-reset") {
      // 1. Reset all state properties to default
      state.contrast = 0;
      state.highlightLinks = false;
      state.hideImages = false;
      state.fontSize = 0;
      state.letterSpacing = 0;
      state.saturation = 0;
      state.textAlign = 0;
      state.lang = '';
      // Add other state resets here as more features are added
      
      // 2. Clear localStorage for accessibility settings
      Object.keys(state).forEach(key => {
        localStorage.removeItem('acc-' + key);
      });

      // 3. Remove all potential accessibility classes from HTML as a safety measure
      const accClasses = [
        ...contrastModes.map(m => m.class).filter(c => c),
        ...saturationModes.map(m => m.class).filter(c => c),
        'acc-highlight-links',
        'acc-hide-images',
        'acc-filtering',
        'acc-font-size-1', 'acc-font-size-2', 'acc-font-size-3', 'acc-font-size-4',
        'acc-letter-spacing-1', 'acc-letter-spacing-2', 'acc-letter-spacing-3', 'acc-letter-spacing-4',
        'acc-text-align-left', 'acc-text-align-center', 'acc-text-align-right', 'acc-text-align-justify'
        // Add other feature classes here
      ];
      accClasses.forEach(c => document.documentElement.classList.remove(c));

      // 4. Re-apply settings (which will now be default) and update UI
      applySettings();
      console.log("All accessibility settings reset 🧹");
      return;
    }

    // Close button
    if (target.id === "close-popup") {
      popup.style.display = "none";
      isOpen = false;
      return;
    }

    // Close if clicking outside popup and button
    if (isOpen && !popup.contains(target) && !button.contains(target)) {
      popup.style.display = "none";
      isOpen = false;
    }
  });

})();