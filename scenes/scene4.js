/* SAHNE 4 — GRAFİK (46–62 s) */
(function (LI) {
  'use strict';
  const KD = LI.KD, F = () => LI.Film;
  function camera(t, env) { return LI.Camera.breathe(KD.cam(env, { zoom: 1 }), t, 0.4); }
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.world(ctx, env, t)); }
  LI.registerScene({ id: 4, start: 46, end: 62, name: 'A graph', nameTr: 'Grafik', concept: 'Points on a line', conceptTr: 'Bir doğru üzerinde noktalar', render });
})(window.LI = window.LI || {});
