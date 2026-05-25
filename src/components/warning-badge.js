class WarningBadge extends HTMLElement {
  static get observedAttributes() { return ['pulsing']; }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._message  = 'Sesión por expirar';
    this._pulsing  = false;
    this._greeting = false;
  }

  connectedCallback() {
    this._pulsing = this.hasAttribute('pulsing');
    this.render();
  }

  attributeChangedCallback(name, _, newVal) {
    if (name === 'pulsing') {
      this._pulsing = newVal !== null;
      this._update();
    }
  }

  /* Llamado desde user-dashboard cuando llega el evento saludar */
  setMessage(msg, isGreeting = false) {
    this._message  = msg;
    this._pulsing  = false;
    this._greeting = isGreeting;
    this._update();
  }

  _update() {
    const badge = this.shadowRoot.querySelector('.badge');
    const msg   = this.shadowRoot.querySelector('.message');
    const icon  = this.shadowRoot.querySelector('.icon');
    if (!badge) return;

    msg.textContent = this._message;
    icon.textContent = this._greeting ? '👋' : '⚠️';
    badge.classList.toggle('pulsing',  this._pulsing);
    badge.classList.toggle('greeting', this._greeting);
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; }

        .badge {
          background: #f5e97a;
          border-radius: 12px;
          padding: 18px 20px;
          color: #7a5f00;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          font-size: 17px;
          font-weight: 700;
          transition: background 0.5s, color 0.5s;
        }

        .badge.pulsing {
          animation: pulse 1.4s ease-in-out infinite;
        }

        .badge.greeting {
          background: #a8f0b0;
          color: #1a5e2a;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1;   transform: scale(1);    }
          50%       { opacity: 0.6; transform: scale(0.97); }
        }

        .icon    { font-size: 26px; flex-shrink: 0; }
        .message { flex: 1; text-align: center; }
      </style>

      <div class="badge ${this._pulsing ? 'pulsing' : ''}" part="badge">
        <span class="icon"    part="icon">⚠️</span>
        <span class="message" part="message">${this._message}</span>
      </div>
    `;
  }
}

customElements.define('warning-badge', WarningBadge);
