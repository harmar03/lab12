import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './warning-badge.js';

describe('WarningBadge', () => {
  let el;

  beforeEach(() => {
    el = document.createElement('warning-badge');
    document.body.appendChild(el);
  });

  afterEach(() => {
    document.body.removeChild(el);
  });

  it('muestra el mensaje por defecto', () => {
    const msg = el.shadowRoot.querySelector('.message');
    expect(msg.textContent.trim()).toBe('Sesión por expirar');
  });

  it('setMessage actualiza el texto en el DOM', () => {
    el.setMessage('¡Hola, Profesor Alonso!', true);
    const msg = el.shadowRoot.querySelector('.message');
    expect(msg.textContent.trim()).toBe('¡Hola, Profesor Alonso!');
  });

  it('setMessage con isGreeting=true cambia el ícono a 👋', () => {
    el.setMessage('¡Hola!', true);
    const icon = el.shadowRoot.querySelector('.icon');
    expect(icon.textContent.trim()).toBe('👋');
  });

  it('setMessage con isGreeting=false mantiene el ícono ⚠️', () => {
    el.setMessage('Error de red', false);
    const icon = el.shadowRoot.querySelector('.icon');
    expect(icon.textContent.trim()).toBe('⚠️');
  });

  it('atributo pulsing agrega la clase pulsing al badge', () => {
    el.setAttribute('pulsing', '');
    const badge = el.shadowRoot.querySelector('.badge');
    expect(badge.classList.contains('pulsing')).toBe(true);
  });

  it('remover atributo pulsing quita la clase pulsing', () => {
    el.setAttribute('pulsing', '');
    el.removeAttribute('pulsing');
    const badge = el.shadowRoot.querySelector('.badge');
    expect(badge.classList.contains('pulsing')).toBe(false);
  });
});
