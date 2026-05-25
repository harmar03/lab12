import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './user-dashboard.js';

describe('UserDashboard — integración', () => {
  let el;

  beforeEach(() => {
    el = document.createElement('user-dashboard');
    document.body.appendChild(el);
  });

  afterEach(() => {
    document.body.removeChild(el);
  });

  it('renderiza user-card, weather-time y warning-badge', () => {
    const shadow = el.shadowRoot;
    expect(shadow.querySelector('user-card')).not.toBeNull();
    expect(shadow.querySelector('weather-time')).not.toBeNull();
    expect(shadow.querySelector('warning-badge')).not.toBeNull();
  });

  it('warning-badge inicia con atributo pulsing', () => {
    const badge = el.shadowRoot.querySelector('warning-badge');
    expect(badge.hasAttribute('pulsing')).toBe(true);
  });

  it('cuando user-card dispara saludar, warning-badge actualiza su mensaje', () => {
    const userCard = el.shadowRoot.querySelector('user-card');
    const warningBadge = el.shadowRoot.querySelector('warning-badge');

    // Simula el evento que dispara el botón de user-card
    userCard.dispatchEvent(new CustomEvent('saludar', {
      bubbles: true,
      composed: true,
      detail: { name: 'Alonso', role: 'Profesor' },
    }));

    const msg = warningBadge.shadowRoot.querySelector('.message');
    expect(msg.textContent.trim()).toBe('¡Hola, Profesor Alonso!');
  });
});
