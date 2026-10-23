class CsmarinFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setupEvents();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          all: initial;
          display: block !important;
          position: static !important; /* 追従を解除 */
          width: 100% !important;
          z-index: 999999 !important;
          box-sizing: border-box !important;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
        }

        *, *::before, *::after {
          box-sizing: border-box !important;
        }

        /* フッター全体コンテナ */
        .csmarin-footer-container {
          width: 100% !important;
          background-color: #00bcd4 !important; /* シアン背景 */
          padding: 12px 16px 0 16px !important;
          box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.15) !important;
          pointer-events: auto !important;
          position: relative !important;
        }

        /* 5x2 グリッドレイアウト */
        .csmarin-services-grid {
          display: grid !important;
          grid-template-columns: repeat(5, 1fr) !important;
          grid-template-rows: repeat(2, 1fr) !important;
          gap: 10px !important;
          max-width: 1200px !important;
          margin: 0 auto 12px auto !important;
        }

        /* 長方形ブロック共通スタイル */
        .csmarin-block {
          background-color: #ffffff !important;
          border-radius: 8px !important;
          height: 54px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          padding: 6px 10px !important;
          text-decoration: none !important;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12) !important;
          transition: transform 0.15s ease, box-shadow 0.15s ease !important;
        }

        .csmarin-block:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.18) !important;
        }

        /* 1. 大きめの横長ロゴ（Bilog用） */
        .csmarin-logo-large {
          max-height: 32px !important;
          max-width: 100% !important;
          width: auto !important;
          object-fit: contain !important;
          display: block !important;
        }

        /* 2. ストア用ロゴ */
        .csmarin-logo-store {
          max-height: 100px !important;
          max-width: 100% !important;
          width: auto !important;
          object-fit: contain !important;
          display: block !important;
        }

        /* 3. 小さめのロゴ（CSM-ID用など） */
        .csmarin-logo-small {
          max-height: 60px !important;
          max-width: 100% !important;
          width: auto !important;
          object-fit: contain !important;
          display: block !important;
        }

        /* coming soon... ブロック */
        .csmarin-block-coming {
          background-color: rgba(255, 255, 255, 0.6) !important;
          color: #555555 !important;
          font-size: 12px !important;
          font-weight: bold !important;
          font-style: italic !important;
          cursor: default !important;
        }

        .csmarin-block-coming:hover {
          transform: none !important;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12) !important;
        }

        /* 右下：メニュー用ブロックボタン */
        .csmarin-menu-block-btn {
          border: none !important;
          cursor: pointer !important;
          width: 100% !important;
          color: #00bcd4 !important;
          font-weight: bold !important;
          font-size: 13px !important;
          gap: 8px !important;
        }

        .csmarin-menu-block-btn svg {
          width: 20px !important;
          height: 20px !important;
          fill: #00bcd4 !important;
        }

        /* 最下段：横一列ブランドロゴエリア（背景白） */
        .csmarin-brand-logo-container {
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          background-color: #ffffff !important;
          margin: 0 -16px !important;
          padding: 8px 16px !important;
          border-top: 1px solid rgba(0, 0, 0, 0.08) !important;
        }

        .csmarin-horizontal-logo-img {
          height: 20px !important;
          width: auto !important;
          display: block !important;
        }

        /* 右下メニューから上へ開くポップアップ */
        .csmarin-gmo-dropdown {
          position: absolute !important;
          bottom: 86px !important;
          right: 16px !important;
          width: 280px !important;
          background-color: #ffffff !important;
          border: 1px solid #e0e0e0 !important;
          border-radius: 12px !important;
          box-shadow: 0 -8px 24px rgba(0,0,0,0.18) !important;
          padding: 16px !important;
          z-index: 100000 !important;
          text-align: left !important;
          overflow: hidden !important;
          opacity: 0 !important;
          visibility: hidden !important;
          transform: translateY(15px) scaleY(0.9) !important;
          transform-origin: bottom right !important;
          transition: transform 0.25s ease, opacity 0.2s ease, visibility 0.25s !important;
        }

        .csmarin-gmo-dropdown.is-open {
          opacity: 1 !important;
          visibility: visible !important;
          transform: translateY(0) scaleY(1) !important;
        }

        .csmarin-menu-section {
          margin-bottom: 10px !important;
          padding-bottom: 8px !important;
          border-bottom: 1px solid #eee !important;
        }

        .csmarin-menu-section:last-child {
          margin-bottom: 0 !important;
          padding-bottom: 0 !important;
          border-bottom: none !important;
        }

        .csmarin-menu-title {
          font-size: 11px !important;
          font-weight: bold !important;
          color: #888888 !important;
          margin-bottom: 4px !important;
          text-transform: uppercase !important;
        }

        .csmarin-menu-link {
          display: block !important;
          font-size: 13px !important;
          color: #333333 !important;
          text-decoration: none !important;
          padding: 4px 6px !important;
          border-radius: 4px !important;
        }

        .csmarin-menu-link:hover {
          background-color: rgba(0, 188, 212, 0.08) !important;
          color: #00bcd4 !important;
        }

        /* モバイル対応：画面幅に合わせて列数を調整 */
        @media (max-width: 768px) {
          .csmarin-services-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }

        @media (max-width: 480px) {
          .csmarin-services-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      </style>

      <div class="csmarin-footer-container">
        <!-- 5x2 サービスブロック群 -->
        <div class="csmarin-services-grid">
          <!-- 1. Bilog -->
          <a href="https://bilog.csmarin.com" class="csmarin-block" target="_blank" rel="noopener">
            <img src="https://res.cloudinary.com/oq5ci33v/image/upload/v1789803840/bilog%E3%82%8D%E3%81%93%E3%82%99.png" alt="Bilog" class="csmarin-logo-large">
          </a>

          <!-- 2. ストア -->
          <a href="https://csmarin.stores.jp" class="csmarin-block" target="_blank" rel="noopener">
            <img src="https://res.cloudinary.com/oq5ci33v/image/upload/v1792672042/csmstores.png" alt="csmストア" class="csmarin-logo-store">
          </a>

          <!-- 3. CSM-ID -->
          <a href="http://id.csmarin.com" class="csmarin-block" target="_blank" rel="noopener">
            <img src="http://id.csmarin.com/wp-content/uploads/2026/07/CSM-ID-%E9%80%8F%E9%81%8E%E3%83%AD%E3%82%B4.png" alt="CSM-ID" class="csmarin-logo-small">
          </a>

          <!-- 4. coming soon... -->
          <div class="csmarin-block csmarin-block-coming">coming soon...</div>

          <!-- 5. coming soon... -->
          <div class="csmarin-block csmarin-block-coming">coming soon...</div>

          <!-- 6. 眞凛 -->
          <a href="https://ninja-link.jp/marin_dayo_11" class="csmarin-block" target="_blank" rel="noopener">
            <img src="https://res.cloudinary.com/oq5ci33v/image/upload/v1792757071/IMG_0566.png" alt="眞凛" class="csmarin-logo-small">
          </a>


          <!-- 7. coming soon... -->
          <div class="csmarin-block csmarin-block-coming">coming soon...</div>

          <!-- 8. coming soon... -->
          <div class="csmarin-block csmarin-block-coming">coming soon...</div>

          <!-- 9. coming soon... -->
          <div class="csmarin-block csmarin-block-coming">coming soon...</div>

          <!-- 10. 右下：メニュー用ブロック -->
          <button type="button" class="csmarin-block csmarin-menu-block-btn" id="csmarinMenuToggle">
            <svg viewBox="0 0 24 24">
              <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2ZM6 4c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
            <span>他メニュー</span>
          </button>
        </div>

        <!-- 最下段：横一列ブランドロゴ（背景白） -->
        <div class="csmarin-brand-logo-container">
          <a href="https://csmarin.com" target="_blank" rel="noopener">
            <img src="https://res.cloudinary.com/oq5ci33v/image/upload/v1792672042/CS%E7%9C%9E%E5%87%9B%E6%A8%AA%E4%B8%80%E5%88%97%E3%83%AD%E3%82%B3%E3%82%99.png" alt="CSMGROUP & クリエイティブスタジオ眞凛" class="csmarin-horizontal-logo-img">
          </a>
        </div>

        <!-- ドロップダウンメニュー -->
        <div class="csmarin-gmo-dropdown" id="csmarinDropdown">
          <div class="csmarin-menu-section">
            <div class="csmarin-menu-title">メディア</div>
            <a href="https://www.youtube.com/@csmarin_kosiki" class="csmarin-menu-link" target="_blank" rel="noopener">公式YouTube</a>
            <a href="https://x.com/csmarin_kosiki" class="csmarin-menu-link" target="_blank" rel="noopener">公式X (@csmarin_kosiki)</a>
          </div>

      </div>
    `;
  }

  setupEvents() {
    const toggleBtn = this.shadowRoot.getElementById('csmarinMenuToggle');
    const dropdown = this.shadowRoot.getElementById('csmarinDropdown');

    if (toggleBtn && dropdown) {
      toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('is-open');
      });

      document.addEventListener('click', (e) => {
        if (!e.composedPath().includes(dropdown) && !e.composedPath().includes(toggleBtn)) {
          dropdown.classList.remove('is-open');
        }
      });
    }
  }
}

customElements.define('csmarin-footer', CsmarinFooter);
