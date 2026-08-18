/**
 * Quick smoke tests — run: node scripts/smoke-test.js
 * Requires: frontend dev server on :5173, backend + MongoDB for API tests
 */

const FRONTEND = 'http://localhost:5173';
const API = 'http://localhost:5000/api';

const results = [];

const check = async (name, fn) => {
  try {
    await fn();
    results.push({ name, ok: true });
    console.log(`✓ ${name}`);
  } catch (err) {
    results.push({ name, ok: false, error: err.message });
    console.log(`✗ ${name} — ${err.message}`);
  }
};

const fetchOk = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} returned ${res.status}`);
  return res;
};

const run = async () => {
  console.log('\n--- Frontend tests ---\n');

  await check('Homepage loads', () => fetchOk(`${FRONTEND}/`));
  await check('Feature clarity image', () => fetchOk(`${FRONTEND}/images/feature-clarity.jpg`));
  await check('Feature goals image', () => fetchOk(`${FRONTEND}/images/feature-goals.jpg`));
  await check('Feature journal image', () => fetchOk(`${FRONTEND}/images/feature-journal.jpg`));
  await check('Hero main image', () => fetchOk(`${FRONTEND}/images/hero-main.jpg`));

  console.log('\n--- Backend API tests ---\n');

  await check('API health', () => fetchOk(`${API}/health`));

  await check('Admin login returns role=admin', async () => {
    const res = await fetch(`${API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@personality.dev',
        password: 'admin123456',
      }),
    });
    if (!res.ok) throw new Error(`Login failed: ${res.status}`);
    const data = await res.json();
    if (data.role !== 'admin') throw new Error(`Expected admin role, got ${data.role}`);
  });

  const passed = results.filter((r) => r.ok).length;
  const failed = results.filter((r) => !r.ok).length;
  console.log(`\n--- Summary: ${passed} passed, ${failed} failed ---\n`);
  process.exit(failed > 0 ? 1 : 0);
};

run();
