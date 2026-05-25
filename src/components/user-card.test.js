import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import './user-card.js';

describe('UserCard', () => {
  let el;

  beforeEach(() => {
    el = document.createElement('user-card');
    document.body.appendChild(el);
  });

  afterEach(() => {
    document.body.removeChild(el);
  });

  it('crea shadow DOM al conectarse', () => {
    expect(el.shadowRoot).not.toBeNull();
  });

  it('muestra el avatar con la letra A', () => {
    const avatar = el.shadowRoot.querySelector('.avatar');
    expect(avatar).not.toBeNull();
    expect(avatar.textContent.trim()).toBe('A');
  });

  it('muestra el nombre Alonso', () => {
    const name = el.shadowRoot.querySelector('.name');
    expect(name.textContent.trim()).toBe('Alonso');
  });

  it('muestra el rol Profesor', () => {
    const role = el.shadowRoot.querySelector('.role');
    expect(role.textContent.trim()).toBe('Profesor');
  });

  it('tiene un botón con texto Saludar', () => {
    const btn = el.shadowRoot.querySelector('button');
    expect(btn).not.toBeNull();
    expect(btn.textContent.trim()).toBe('Saludar');
  });

  it('dispara el evento saludar al hacer clic', () => {
    const handler = vi.fn();
    el.addEventListener('saludar', handler);

    el.shadowRoot.querySelector('button').click();

    expect(handler).toHaveBeenCalledOnce();
  });

  it('el evento saludar incluye name y role en detail', () => {
    const handler = vi.fn();
    el.addEventListener('saludar', handler);

    el.shadowRoot.querySelector('button').click();

    const detail = handler.mock.calls[0][0].detail;
    expect(detail).toEqual({ name: 'Alonso', role: 'Profesor' });
  });
});
