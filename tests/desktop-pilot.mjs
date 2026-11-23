import test from 'node:test';
import assert from 'node:assert/strict';
import {deviceFamily, browserFamily, installGuide, withTimeout} from '../frontend/desktop.js';

test('Edge selects its own guide even when its agent also advertises Chrome and Safari', () => {
  const ua='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0';
  assert.equal(deviceFamily(ua), 'windows');
  assert.equal(browserFamily(ua), 'edge');
  assert.match(installGuide(deviceFamily(ua), browserFamily(ua)).title, /Windows con Edge/);
});

test('Mac and desktop-mode iPad have different installation requirements', () => {
  const ua='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) AppleWebKit/605.1.15 Version/26.0 Safari/605.1.15';
  assert.equal(browserFamily(ua), 'safari');
  assert.equal(deviceFamily(ua, 0), 'mac');
  assert.equal(deviceFamily(ua, 5), 'ios');
  assert.match(installGuide('mac','safari').steps.join(' '), /Dock/);
  assert.match(installGuide('ios','safari').steps.join(' '), /Agregar a Inicio/);
  assert.doesNotMatch(installGuide('mac','edge').steps.join(' '), /barra de tareas/);
});

test('Chrome on iPhone is not misidentified as desktop Safari', () => {
  const ua='Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 CriOS/142.0 Mobile/15E148 Safari/604.1';
  assert.equal(deviceFamily(ua), 'ios');
  assert.equal(browserFamily(ua), 'other');
});

test('a service worker that never becomes ready produces actionable feedback', async () => {
  await assert.rejects(withTimeout(new Promise(()=>{}), 15, 'Vuelve a abrir PoetisA.'), /Vuelve a abrir/);
});

test('ready and failed service workers preserve their result and clear the deadline', async () => {
  assert.equal(await withTimeout(Promise.resolve('ready'), 100, 'timeout'), 'ready');
  await assert.rejects(withTimeout(Promise.reject(new Error('registration failed')), 100, 'timeout'), /registration failed/);
});
