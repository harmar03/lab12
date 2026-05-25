(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:`open`})}connectedCallback(){this.render(),this.shadowRoot.querySelector(`button`).addEventListener(`click`,()=>{this.dispatchEvent(new CustomEvent(`saludar`,{bubbles:!0,composed:!0,detail:{name:`Alonso`,role:`Profesor`}}))})}render(){this.shadowRoot.innerHTML=`
      <style>
        :host { display: block; }

        .card {
          background: #4a90d9;
          border-radius: 12px;
          padding: 20px 16px;
          color: #fff;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .avatar {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: #1c5a8a;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          font-weight: 700;
          border: 3px solid rgba(255,255,255,0.4);
        }

        .name  { font-size: 18px; font-weight: 700; }
        .role  { font-size: 13px; opacity: 0.85; letter-spacing: 0.5px; }

        button {
          margin-top: 6px;
          padding: 7px 22px;
          background: #fff;
          color: #4a90d9;
          border: none;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: transform 0.1s, box-shadow 0.1s;
          box-shadow: 0 2px 6px rgba(0,0,0,0.15);
        }
        button:hover  { transform: scale(1.06); box-shadow: 0 4px 10px rgba(0,0,0,0.2); }
        button:active { transform: scale(0.97); }
      </style>

      <div class="card" part="card">
        <div class="avatar" part="avatar">A</div>
        <div class="name"  part="name">Alonso</div>
        <div class="role"  part="role">Profesor</div>
        <button part="btn">Saludar</button>
      </div>
    `}};customElements.define(`user-card`,e);var t=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:`open`}),this._timer=null}connectedCallback(){this.render(),this._startClock()}disconnectedCallback(){clearInterval(this._timer)}_startClock(){let e=()=>{let e=this.shadowRoot.querySelector(`.time`);e&&(e.textContent=new Date().toLocaleTimeString(`es-CR`))};e(),this._timer=setInterval(e,1e3)}render(){this.shadowRoot.innerHTML=`
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
    `}};customElements.define(`weather-time`,t);var n=class extends HTMLElement{static get observedAttributes(){return[`pulsing`]}constructor(){super(),this.attachShadow({mode:`open`}),this._message=`Sesión por expirar`,this._pulsing=!1,this._greeting=!1}connectedCallback(){this._pulsing=this.hasAttribute(`pulsing`),this.render()}attributeChangedCallback(e,t,n){e===`pulsing`&&(this._pulsing=n!==null,this._update())}setMessage(e,t=!1){this._message=e,this._pulsing=!1,this._greeting=t,this._update()}_update(){let e=this.shadowRoot.querySelector(`.badge`),t=this.shadowRoot.querySelector(`.message`),n=this.shadowRoot.querySelector(`.icon`);e&&(t.textContent=this._message,n.textContent=this._greeting?`👋`:`⚠️`,e.classList.toggle(`pulsing`,this._pulsing),e.classList.toggle(`greeting`,this._greeting))}render(){this.shadowRoot.innerHTML=`
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

      <div class="badge ${this._pulsing?`pulsing`:``}" part="badge">
        <span class="icon"    part="icon">⚠️</span>
        <span class="message" part="message">${this._message}</span>
      </div>
    `}};customElements.define(`warning-badge`,n);var r=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:`open`})}connectedCallback(){this.render(),this.shadowRoot.addEventListener(`saludar`,e=>{let{name:t,role:n}=e.detail,r=this.shadowRoot.querySelector(`warning-badge`);r&&r.setMessage(`¡Hola, ${n} ${t}!`,!0)})}render(){this.shadowRoot.innerHTML=`
      <style>
        :host { display: block; }

        .dashboard {
          background: #e8b4b8;
          border-radius: 18px;
          padding: 24px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto auto auto;
          gap: 16px;
          width: min(580px, 92vw);
          box-shadow: 0 6px 28px rgba(0,0,0,0.18);
        }

        h2 {
          grid-column: 1 / -1;
          margin: 0;
          text-align: center;
          color: #6b2030;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
        }

        user-card    { grid-column: 1; grid-row: 2; }
        weather-time { grid-column: 2; grid-row: 2; }
        warning-badge {
          grid-column: 1 / -1;
          grid-row: 3;
        }
      </style>

      <div class="dashboard" part="dashboard">
        <h2>Dashboard</h2>
        <user-card></user-card>
        <weather-time></weather-time>
        <warning-badge pulsing></warning-badge>
      </div>
    `}};customElements.define(`user-dashboard`,r);