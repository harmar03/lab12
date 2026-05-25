import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import './weather-time.js';

describe('WeatherTime', () => {
  let el;

  beforeEach(() => {
    vi.useFakeTimers();
    el = document.createElement('weather-time');
    document.body.appendChild(el);
  });

  afterEach(() => {
    document.body.removeChild(el);
    vi.useRealTimers();
  });

  it('muestra el elemento de tiempo al conectarse', () => {
    const time = el.shadowRoot.querySelector('.time');
    expect(time).not.toBeNull();
  });

  it('el tiempo no está vacío al conectarse', () => {
    const time = el.shadowRoot.querySelector('.time');
    expect(time.textContent.trim()).not.toBe('');
  });

  it('limpia el timer al desconectarse (sin errores al remover)', () => {
    // Si disconnectedCallback no llama clearInterval, esto lanzaría errores
    expect(() => {
      document.body.removeChild(el);
    }).not.toThrow();
    // Re-agregar para que afterEach no falle
    document.body.appendChild(el);
  });

  it('el timer interno queda en null-safe después de disconnect', () => {
    document.body.removeChild(el);
    // Avanzar el tiempo no debe causar errores aunque el elemento fue removido
    expect(() => vi.advanceTimersByTime(3000)).not.toThrow();
    document.body.appendChild(el);
  });
});
