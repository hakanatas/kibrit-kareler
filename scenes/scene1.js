/* SAHNE 1 — KİBRİTLER (0–10 s)  Squares side by side.
   The whole film's drawing lives in LI.world(t); each scene only sets the camera. */
(function (LI) {
  'use strict';
  const { seg, outBack } = LI.E;
  const KD = LI.KD, F = () => LI.Film, A = LI.Ang, Ink = LI.Ink;
  const END = (t) => 1 - seg(t, 90.4, 91.4);

  function win(t, a, b, fi = 0.4, fo = 0.4) { return seg(t, a, a + fi) * (1 - seg(t, b - fo, b)); }
  function exprs(ctx, t, P, list, sz) {
    const f = F();
    list.forEach(([a, b, items, hot]) => {
      const al = win(t, a, b); if (al <= 0) return;
      f.expr(ctx, typeof items === 'string' ? [items] : items, P.x, P.y, sz ?? P.s, { alpha: al, w: P.w, halo: true, color: hot ? A.amber : undefined });
    });
  }
  const at = (P, k, y) => ({ x: P.x, y: y ?? P.y[k], s: P.s, w: P.w });
  const COUNT = (n) => 3 * n + 1;

  function context(ctx, env, t) {
    exprs(ctx, t, KD.L(env).CX, [
      [4.4, 10.2, 'Kibritlerle yan yana kareler yapalım'],
      [10.6, 21.2, 'Adım adım büyüyen bir şekil örüntüsü'],
      [21.4, 29.8, 'Her yeni kare 3 çöp ekliyor', true],
      [30.4, 45.8, 'Tabloyla ve sözle gösterelim'],
      [46.4, 55.6, 'Grafikle gösterelim'],
      [55.8, 61.8, 'Noktalar bir doğru üzerinde: her adımda 3 yukarı', true],
      [62.4, 79.8, 'Cebirsel olarak yazalım'],
    ]);
  }

  /* ── 0–10 s: one square, then two ── */
  function intro(ctx, env, t) {
    const L = KD.L(env), P = L.FIG1, f = F(), a = win(t, 4.4, 10.4);
    if (a > 0) f.figure(ctx, 2, P.x, P.y, P.L, seg(t, 4.6, 8.8), a, (sq) => sq === 2 && t > 7.0);
    exprs(ctx, t, at(L.E, 1), [[7.0, 10.2, '1 kare 4 çöp. Peki 2 kare kaç çöp?']]);
  }

  /* ── 10–30 s: four steps ── */
  function steps(ctx, env, t) {
    const L = KD.L(env), P = L.FIG, f = F(), a = win(t, 10.6, 29.9);
    if (a > 0) for (let i = 0; i < 4; i++) {
      const t0 = 10.8 + i * 2.4, n = i + 1; if (t < t0) continue;
      f.figure(ctx, n, P.x[i], P.y[i], P.L, seg(t, t0, t0 + 2.0), a, (sq) => n > 1 && sq === n);
      const ka = seg(t, t0 + 2.0, t0 + 2.4) * a; if (ka <= 0) continue;
      const cx = P.x[i] + n * P.L / 2;
      f.T(ctx, `${n}. adım`, cx, P.y[i] - 36, { size: P.s * 0.75, alpha: ka });
      f.T(ctx, `${COUNT(n)} çöp`, cx, P.cy, Object.assign({ size: P.s, alpha: ka }, n > 1 ? f.AMB : {}));
    }
    exprs(ctx, t, at(L.E, 1), [[23.0, 29.8, '4, 7, 10, 13, ... her adımda 3 artıyor', true]]);
  }

  /* ── 30–46 s: a table and a sentence ── */
  function table(ctx, env, t) {
    const L = KD.L(env), P = L.TB, f = F(), a = win(t, 30.4, 45.8); if (a <= 0) return;
    const X = (i) => P.x0 + i * P.dx;
    f.T(ctx, 'Adım', P.lx, P.y[0], { size: P.s * 0.8, alpha: a });
    f.T(ctx, 'Çöp', P.lx, P.y[1], { size: P.s * 0.8, alpha: a });
    Ink.path(ctx, [[P.lx - 80, (P.y[0] + P.y[1]) / 2], [X(4) + P.dx / 2, (P.y[0] + P.y[1]) / 2]], { w: 3, alpha: a * 0.5, seed: 960, taper: [0, 0] });
    for (let i = 0; i < 5; i++) {
      const t0 = 30.8 + i * 0.7, k = seg(t, t0, t0 + 0.4) * a; if (k <= 0) continue;
      f.T(ctx, String(i + 1), X(i), P.y[0] - 12 * (1 - outBack(seg(t, t0, t0 + 0.4))), { size: P.s, alpha: k });
      f.T(ctx, i < 4 ? String(COUNT(i + 1)) : '...', X(i), P.y[1], { size: P.s, alpha: k });
      if (i < 3) { const p = seg(t, 34.0 + i * 0.4, 34.5 + i * 0.4); if (p > 0) {
        A.arc(ctx, [X(i) + P.dx / 2, P.arc - 20], P.dx * 0.42, 200, 340, { p, alpha: a, w: 3.5, seed: 970 + i });
        f.T(ctx, '+3', X(i) + P.dx / 2, P.arc + P.dx * 0.42 - 2, Object.assign({ size: P.s * 0.7, alpha: a * p }, f.AMB)); } }
    }
    exprs(ctx, t, at(L.E, 1), [[36.0, 45.8, 'Sözle: ilk karede 4 çöp, sonra her karede 3 çöp daha']]);
    exprs(ctx, t, at(L.E, 2), [[38.4, 45.8, 'Adım 1 artınca çöp sayısı 3 artar', true]]);
  }

  /* ── 46–62 s: a graph ── */
  function graph(ctx, env, t) {
    const L = KD.L(env), G = L.GR, f = F(), a = win(t, 46.4, 61.8); if (a <= 0) return;
    const X = (v) => G.ox + v * G.ux, Y = (v) => G.oy - v * G.uy, ax = seg(t, 46.6, 47.4);
    Ink.path(ctx, [[G.ox, G.oy], [X(G.n + 0.4), G.oy]], { w: 4, p: ax, alpha: a, seed: 1100, taper: [0, 0.2] });
    Ink.path(ctx, [[G.ox, G.oy], [G.ox, Y(G.m + 1.5)]], { w: 4, p: ax, alpha: a, seed: 1101, taper: [0, 0.2] });
    if (ax > 0.9) {
      for (let v = 1; v <= G.n; v++) { Ink.path(ctx, [[X(v), G.oy - 6], [X(v), G.oy + 6]], { w: 3, alpha: a, seed: 1110 + v, taper: [0, 0] }); f.T(ctx, String(v), X(v), G.oy + 30, { size: G.s, alpha: a }); }
      for (let v = 4; v <= G.m; v += 4) { Ink.path(ctx, [[G.ox - 6, Y(v)], [G.ox + 6, Y(v)]], { w: 3, alpha: a, seed: 1120 + v, taper: [0, 0] }); f.T(ctx, String(v), G.ox - 16, Y(v), { size: G.s, alpha: a, align: 'right' }); }
      f.T(ctx, 'adım', X(G.n + 0.4), G.oy + 30, { size: G.s, alpha: a, align: 'left' });
      f.T(ctx, 'çöp', G.ox, Y(G.m + 1.5) - 22, { size: G.s, alpha: a });
    }
    const ln = seg(t, 51.0, 52.0);
    if (ln > 0) Ink.path(ctx, [[X(0.6), Y(COUNT(0.6))], [X(G.n + 0.2), Y(COUNT(G.n + 0.2))]], { w: 2.5, p: ln, alpha: a * 0.45, seed: 1130, taper: [0, 0] });
    for (let i = 1; i <= 4; i++) {
      const k = seg(t, 47.4 + i * 0.8, 47.8 + i * 0.8); if (k <= 0) continue;
      ctx.fillStyle = `rgba(${LI.AMBER_RGB},${a})`; ctx.beginPath(); ctx.arc(X(i), Y(COUNT(i)), 10 * outBack(k), 0, Math.PI * 2); ctx.fill();
    }
    const st = seg(t, 53.0, 53.8);
    if (st > 0) { // one step: 1 right, 3 up
      Ink.path(ctx, [[X(2), Y(7)], [X(3), Y(7)], [X(3), Y(10)]], { w: 4, p: st, alpha: a, color: LI.AMBER_RGB, seed: 1140, taper: [0, 0] });
      f.T(ctx, '+1', X(2.5), Y(7) + 24, Object.assign({ size: G.s, alpha: a * st }, f.AMB));
      f.T(ctx, '+3', X(3) + 30, Y(8.5), Object.assign({ size: G.s, alpha: a * st, align: 'left' }, f.AMB));
    }
    const p5 = seg(t, 55.0, 55.6);
    if (p5 > 0) { A.arc(ctx, [X(5), Y(16)], 18, 90, 450, { p: p5, alpha: a, w: 4, seed: 1150 }); ctx.fillStyle = `rgba(${LI.INK_RGB},${0.8 * a * p5})`; ctx.beginPath(); ctx.arc(X(5), Y(16), 7, 0, Math.PI * 2); ctx.fill(); }
    const GT = env.V ? { x: 0, y: [-10, 70], w: 960 } : { x: 580, y: [-110, -20], w: 560 };
    exprs(ctx, t, { x: GT.x, y: GT.y[0], s: L.E.s, w: GT.w }, [[52.0, 61.8, '1 adım sağa, 3 çöp yukarı']]);
    exprs(ctx, t, { x: GT.x, y: GT.y[1], s: L.E.s, w: GT.w }, [[55.0, 61.8, '5. adım: 13 + 3 = 16 çöp', true]]);
  }

  /* ── 62–80 s: the expression ── */
  function algebra(ctx, env, t) {
    const L = KD.L(env), P = L.FIG1, E = L.E5, f = F(), a = win(t, 62.6, 79.8);
    if (a > 0) {
      f.figure(ctx, 4, P.x, P.y, P.L, seg(t, 62.8, 63.4), a, (sq) => sq > 0 && t > 63.6);
      const la = seg(t, 63.6, 64.0) * a;
      if (la > 0) { f.T(ctx, '1', P.x, P.y + P.L + 34, { size: 40, alpha: la });
        for (let i = 0; i < 4; i++) f.T(ctx, '3', P.x + (i + 0.5) * P.L, P.y + P.L + 34, Object.assign({ size: 40, alpha: la }, f.AMB)); }
    }
    exprs(ctx, t, at(E, 0), [[64.0, 79.8, '4. adım: 1 + 3 × 4 = 13']]);
    exprs(ctx, t, at(E, 1), [[66.0, 79.8, 'n. adım: 1 + 3 × n = 3n + 1', true]]);
    exprs(ctx, t, at(E, 2), [[68.6, 79.8, '10. adım: 3 × 10 + 1 = 31 çöp']]);
    exprs(ctx, t, at(E, 3), [[70.6, 79.8, '100. adım: 3 × 100 + 1 = 301 çöp']]);
    exprs(ctx, t, at(E, 4), [[73.4, 79.8, 'Sayı örüntüsü de olur: 2, 6, 10, 14, ... = 4n − 2', true]]);
  }

  function summary(ctx, env, t) {
    if (t < 80.4) return;
    const S = KD.L(env).SUM, f = F(), a = END(t);
    [['Şekil: her yeni kare 3 çöp ekler', 80.6], ['Tablo: 4, 7, 10, 13, ...', 81.6], ['Grafik: noktalar bir doğru üzerinde', 82.6], ['Cebir: 3n + 1', 83.6, true]].forEach(([s, t0, hot], i) => {
      const al = seg(t, t0, t0 + 0.4) * a; if (al <= 0) return;
      f.expr(ctx, [s], S.x, S.y[i], S.s * (i === 3 ? 1.3 : 1), { alpha: al, w: S.w, halo: true, color: hot ? A.amber : undefined });
    });
  }

  LI.fireworks = function (ctx, env, t) {
    const k = seg(t, 84.4, 86.4);
    if (k <= 0 || t >= 91) return;
    const n = F().nokta(t, env), C = [n.x, n.y - 170];
    [30, 60, 90, 120, 150].forEach((d, i) => {
      const r = 150 + 30 * Math.sin(t * 2 + i);
      A.arc(ctx, C, r, d - 12, d + 12, { p: seg(k, i * 0.12, i * 0.12 + 0.4), alpha: 0.8 * (1 - seg(t, 90.2, 91)), w: 6, seed: 80 + i });
    });
  };

  LI.world = function (ctx, env, t) { context(ctx, env, t); intro(ctx, env, t); steps(ctx, env, t); table(ctx, env, t); graph(ctx, env, t); algebra(ctx, env, t); summary(ctx, env, t); };

  function camera(t, env) {
    const L = KD.L(env);
    return LI.Camera.breathe(LI.Camera.track([
      [0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [3.0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [4.8, KD.cam(env, { zoom: 1 })],
    ], t), t, 0.5);
  }
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.world(ctx, env, t)); }
  LI.registerScene({ id: 1, start: 0, end: 10, name: 'Matchsticks', nameTr: 'Kibritler', concept: 'Squares side by side', conceptTr: 'Yan yana kareler', render });
})(window.LI = window.LI || {});
