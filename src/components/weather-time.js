class WeatherTime extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._timer = null;
  }

  connectedCallback() {
    this.render();
    this._startClock();
  }

  disconnectedCallback() {
    clearInterval(this._timer);
  }

  _startClock() {
    const tick = () => {
      const el = this.shadowRoot.querySelector('.time');
      if (el) el.textContent = new Date().toLocaleTimeString('es-CR');
    };
    tick();
    this._timer = setInterval(tick, 1000);
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; }

        .card {
          background: #4caf70;
          border-radius: 12px;
          padding: 20px 16px;
          color: #fff;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }

        .city        { font-size: 16px; font-weight: 700; letter-spacing: 0.5px; }
        .sun         { font-size: 44px; line-height: 1; }
        .temp        { font-size: 36px; font-weight: 700; }
        .condition   { font-size: 13px; opacity: 0.9; letter-spacing: 0.5px; }
        .time        { font-size: 19px; font-family: monospace; margin-top: 4px; }
      </style>

      <div class="card" part="card">
        <div class="city"      part="city">📍 Liberia</div>
        <div class="sun"       part="sun">☀️</div>
        <div class="temp"      part="temp">31°C</div>
        <div class="condition" part="condition">Sunny</div>
        <div class="time"      part="time"></div>
      </div>
    `;
  }
}

customElements.define('weather-time', WeatherTime);
