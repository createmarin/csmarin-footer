class CsmarinFooter extends HTMLElement { constructor() { super(); this.attachShadow({ mode: 'open' });

this.handleDocumentClick = this.handleDocumentClick.bind(this);
this.handleKeydown = this.handleKeydown.bind(this);


}

connectedCallback() { this.render(); this.setupEvents(); }

disconnectedCallback() { document.removeEventListener('click', this.handleDocumentClick); document.removeEventListener('keydown', this.handleKeydown); }

render() { this.shadowRoot.innerHTML = ` <style> :host { all: initial; display: block !important; position: static !important; width: 100% !important; max-width: 100% !important; box-sizing: border-box !important; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important; }

    *, *::before, *::after {
      box-sizing: border-box !important;
    }

    .csmarin-footer-container {
      position: relative !important;
      isolation: isolate;
      width: 100% !important;
      background-color: #00bcd4 !important;
      padding: 12px 16px 0 !important;
      box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.15) !important;
      pointer-events: auto !important;
    }

    /* PC：必ず5列。各ブロックの高さも統一 */
    .csmarin-services-grid {
      display: grid !important;
      grid-template-columns: repeat(5, minmax(0, 1fr)) !important;
      grid-auto-flow: row !important;
      grid-auto-rows: 54px !important;
      gap: 10px !important;
      width: 100% !important;
      max-width: 1200px !important;
      margin: 0 auto 12px !important;
      padding: 0 !important;
      align-items: stretch !important;
    }

    .csmarin-block {
      min-width: 0 !important;
      width: 100% !important;
      height: 54px !important;
      margin: 0 !important;
      padding: 6px 10px !important;
      border: none;
      border-radius: 8px !important;
      background-color: #ffffff !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      text-decoration: none !important;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12) !important;
      transition: transform 0.15s ease, box-shadow 0.15s ease !important;
      overflow: hidden !important;
    }

    a.csmarin-block:hover,
    button.csmarin-block:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.18) !important;
    }

    .csmarin-block img {
      display: block !important;
      width: auto !important;
      height: auto !important;
      max-width: 100% !important;
      max-height: 42px !important;
      object-fit: contain !important;
      flex: 0 1 auto !important;
    }

    
    /* CSMストアのロゴを個別に拡大 */
    .csmarin-block img.csmarin-logo-store {
      max-width: 100% !important;
      max-height: 48px !important;
      width: 100% !important;
      height: auto !important;
      object-fit: contain !important;
    }


    .csmarin-block-coming {
      background-color: rgba(255, 255, 255, 0.6) !important;
      color: #555555 !important;
      font-size: 12px !important;
      font-weight: bold !important;
      font-style: italic !important;
      cursor: default !important;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12) !important;
    }

    .csmarin-block-coming:hover {
      transform: none !important;
    }

    .csmarin-menu-block-btn {
      cursor: pointer !important;
      color: #00bcd4 !important;
      font-family: inherit !important;
      font-size: 13px !important;
      font-weight: bold !important;
      gap: 8px !important;
    }

    .csmarin-menu-block-btn svg {
      display: block !important;
      flex: 0 0 20px !important;
      width: 20px !important;
      height: 20px !important;
      fill: #00bcd4 !important;
    }

    .csmarin-menu-block-btn span {
      min-width: 0;
      white-space: nowrap;
    }

    .csmarin-brand-logo-container {
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      width: auto !important;
      min-height: 36px;
      background-color: #ffffff !important;
      margin: 0 -16px !important;
      padding: 8px 16px !important;
      border-top: 1px solid rgba(0, 0, 0, 0.08) !important;
    }

    .csmarin-brand-logo-container a {
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
      max-width: 100% !important;
    }

    .csmarin-horizontal-logo-img {
      display: block !important;
      width: auto !important;
      height: 20px !important;
      max-width: 100% !important;
      object-fit: contain !important;
    }

    /* メニューはグリッドの配置に影響しない独立したポップアップ */
    .csmarin-gmo-dropdown {
      position: absolute !important;
      bottom: 86px !important;
      right: 16px !important;
      z-index: 100000 !important;
      width: 280px !important;
      max-width: calc(100% - 32px) !important;
      max-height: min(70vh, 500px) !important;
      overflow-y: auto !important;
      padding: 16px !important;
      border: 1px solid #e0e0e0 !important;
      border-radius: 12px !important;
      background-color: #ffffff !important;
      box-shadow: 0 -8px 24px rgba(0, 0, 0, 0.18) !important;
      text-align: left !important;
      opacity: 0 !important;
      visibility: hidden !important;
      pointer-events: none !important;
      transform: translateY(10px) !important;
      transform-origin: bottom right !important;
      transition:
        transform 0.2s ease,
        opacity 0.2s ease,
        visibility 0.2s ease !important;
    }

    .csmarin-gmo-dropdown.is-open {
      opacity: 1 !important;
      visibility: visible !important;
      pointer-events: auto !important;
      transform: translateY(0) !important;
    }

    .csmarin-menu-section {
      margin-bottom: 10px !important;
      padding-bottom: 8px !important;
      border-bottom: 1px solid #eeeeee !important;
    }

    .csmarin-menu-section:last-child {
      margin-bottom: 0 !important;
      padding-bottom: 0 !important;
      border-bottom: none !important;
    }

    .csmarin-menu-title {
      margin-bottom: 4px !important;
      color: #888888 !important;
      font-size: 11px !important;
      font-weight: bold !important;
      text-transform: uppercase !important;
    }

    .csmarin-menu-link {
      display: block !important;
      padding: 6px !important;
      border-radius: 4px !important;
      color: #333333 !important;
      font-size: 13px !important;
      text-decoration: none !important;
    }

    .csmarin-menu-link:hover {
      background-color: rgba(0, 188, 212, 0.08) !important;
      color: #00bcd4 !important;
    }

    @media (max-width: 768px) {
      .csmarin-services-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
      }
    }

    @media (max-width: 480px) {
      .csmarin-services-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
        gap: 8px !important;
      }

      .csmarin-footer-container {
        padding-right: 10px !important;
        padding-left: 10px !important;
      }

      .csmarin-brand-logo-container {
        margin-right: -10px !important;
        margin-left: -10px !important;
      }

      .csmarin-gmo-dropdown {
        right: 10px !important;
        max-width: calc(100% - 20px) !important;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .csmarin-block,
      .csmarin-gmo-dropdown {
        transition: none !important;
      }
    }
  </style>

  <div class="csmarin-footer-container">

    <div class="csmarin-services-grid">

      <!-- 1. Bilog -->
      <a href="https://bilog.csmarin.com"
         class="csmarin-block"
         target="_blank" rel="noopener noreferrer">
        <img
          src="https://res.cloudinary.com/oq5ci33v/image/upload/v1789803840/bilog%E3%82%8D%E3%81%93%E3%82%99.png"
          alt="Bilog"
          class="csmarin-logo-large">
      </a>

      <!-- 2. CSMストア -->
      <a href="https://csmarin.stores.jp"
         class="csmarin-block"
         target="_blank" rel="noopener noreferrer">
        <img
          src="https://res.cloudinary.com/oq5ci33v/image/upload/v1792672042/csmstores.png"
          alt="CSMストア"
          class="csmarin-logo-store">
      </a>

      <!-- 3. CSMグッズ -->
      <a href="http://goods.csmarin.com"
         class="csmarin-block"
         target="_blank" rel="noopener noreferrer">
        <img
          src="https://res.cloudinary.com/oq5ci33v/image/upload/v1792672042/csm%E3%82%AF%E3%82%99%E3%83%83%E3%82%B9%E3%82%99.png"
          alt="CSMグッズ"
          class="csmarin-logo-small">
      </a>

      <!-- 4. 眞凛 -->
      <a href="https://ninja-link.jp/marin_dayo_11"
         class="csmarin-block"
         target="_blank" rel="noopener noreferrer">
        <img
          src="https://res.cloudinary.com/oq5ci33v/image/upload/v1792757071/IMG_0566.png"
          alt="眞凛"
          class="csmarin-logo-large">
      </a>

      <!-- 5. coming soon -->
      <div class="csmarin-block csmarin-block-coming">coming soon...</div>

      <!-- 6. coming soon -->
      <div class="csmarin-block csmarin-block-coming">coming soon...</div>

      <!-- 7. coming soon -->
      <div class="csmarin-block csmarin-block-coming">coming soon...</div>

      <!-- 8. coming soon -->
      <div class="csmarin-block csmarin-block-coming">coming soon...</div>

      <!-- 9. coming soon -->
      <div class="csmarin-block csmarin-block-coming">coming soon...</div>

      <!-- 10. 右下：他メニュー -->
      <button
        type="button"
        class="csmarin-block csmarin-menu-block-btn"
        id="csmarinMenuToggle"
        aria-expanded="false"
        aria-controls="csmarinDropdown">

<svg
  viewBox="0 0 24 24"
  aria-hidden="true"
  focusable="false">
  <circle cx="5" cy="5" r="2.2" />
  <circle cx="12" cy="5" r="2.2" />
  <circle cx="19" cy="5" r="2.2" />
  <circle cx="5" cy="12" r="2.2" />
  <circle cx="12" cy="12" r="2.2" />
  <circle cx="19" cy="12" r="2.2" />
  <circle cx="5" cy="19" r="2.2" />
  <circle cx="12" cy="19" r="2.2" />
  <circle cx="19" cy="19" r="2.2" />
</svg>

        <span>他メニュー</span>
      </button>

    </div>

    <!-- 最下段：ブランドロゴ -->
    <div class="csmarin-brand-logo-container">
      <a href="https://csmarin.com"
         target="_blank" rel="noopener noreferrer">
        <img
          src="https://res.cloudinary.com/oq5ci33v/image/upload/v1792672042/CS%E7%9C%9E%E5%87%9B%E6%A8%AA%E4%B8%80%E5%88%97%E3%83%AD%E3%82%B3%E3%82%99.png"
          alt="CSMGROUP & クリエイティブスタジオ眞凛"
          class="csmarin-horizontal-logo-img">
      </a>
    </div>

    <!-- グリッド外のポップアップ -->
    <div
      class="csmarin-gmo-dropdown"
      id="csmarinDropdown"
      role="region"
      aria-label="他メニュー"
      aria-hidden="true">

      <div class="csmarin-menu-section">
        <div class="csmarin-menu-title">メディア</div>
        <a href="https://www.youtube.com/@csmarin_kosiki"
           class="csmarin-menu-link"
           target="_blank" rel="noopener noreferrer">
          公式YouTube
        </a>
        <a href="https://x.com/csmarin_kosiki"
           class="csmarin-menu-link"
           target="_blank" rel="noopener noreferrer">
          公式Twitter (@csmarin_kosiki)
        </a>
      </div>

    </div>

  </div>
`;


}

setupEvents() { const toggleBtn = this.shadowRoot.getElementById('csmarinMenuToggle');

if (!toggleBtn) return;

toggleBtn.addEventListener('click', (event) => {
  event.stopPropagation();
  this.toggleMenu();
});

// 再接続時のイベント重複を防止
document.removeEventListener('click', this.handleDocumentClick);
document.removeEventListener('keydown', this.handleKeydown);

document.addEventListener('click', this.handleDocumentClick);
document.addEventListener('keydown', this.handleKeydown);


}

toggleMenu(force) { const toggleBtn = this.shadowRoot.getElementById('csmarinMenuToggle'); const dropdown = this.shadowRoot.getElementById('csmarinDropdown');

if (!toggleBtn || !dropdown) return;

const shouldOpen =
  typeof force === 'boolean'
    ? force
    : !dropdown.classList.contains('is-open');

dropdown.classList.toggle('is-open', shouldOpen);
toggleBtn.setAttribute('aria-expanded', String(shouldOpen));
dropdown.setAttribute('aria-hidden', String(!shouldOpen));


}

handleDocumentClick(event) { const path = event.composedPath();

const toggleBtn = this.shadowRoot.getElementById('csmarinMenuToggle');
const dropdown = this.shadowRoot.getElementById('csmarinDropdown');

if (!toggleBtn || !dropdown) return;

if (!path.includes(toggleBtn) && !path.includes(dropdown)) {
  this.toggleMenu(false);
}


}

handleKeydown(event) { if (event.key === 'Escape') { this.toggleMenu(false); } } }

if (!customElements.get('csmarin-footer')) { customElements.define('csmarin-footer', CsmarinFooter); }
