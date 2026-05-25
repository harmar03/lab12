class UserCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.shadowRoot.querySelector('button').addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('saludar', {
        bubbles: true,
        composed: true,
        detail: { name: 'Alonso', role: 'Profesor' }
      }));
    });
  }

  render() {
    this.shadowRoot.innerHTML = `
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
    `;
  }
}

customElements.define('user-card', UserCard);
