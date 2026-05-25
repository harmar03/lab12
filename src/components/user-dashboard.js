import './user-card.js';
import './weather-time.js';
import './warning-badge.js';

class UserDashboard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();

    /*
     * El evento 'saludar' se dispara desde user-card con composed:true y bubbles:true,
     * por lo que atraviesa el shadow boundary y llega al shadowRoot del dashboard.
     */
    this.shadowRoot.addEventListener('saludar', (e) => {
      const { name, role } = e.detail;
      const warning = this.shadowRoot.querySelector('warning-badge');
      if (warning) {
        warning.setMessage(`¡Hola, ${role} ${name}!`, true);
      }
    });
  }

  render() {
    this.shadowRoot.innerHTML = `
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
    `;
  }
}

customElements.define('user-dashboard', UserDashboard);
