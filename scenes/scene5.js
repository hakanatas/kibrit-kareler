/* SAHNE 5 — CEBİR (62–80 s) */
(function (LI) {
  'use strict';
  const KD = LI.KD, F = () => LI.Film;
  function camera(t, env) { return LI.Camera.breathe(KD.cam(env, { zoom: 1 }), t, 0.4); }
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.world(ctx, env, t)); }
  LI.registerScene({ id: 5, start: 62, end: 80, name: 'Algebra', nameTr: 'Cebir', concept: '3n + 1', conceptTr: '3n + 1', render });
})(window.LI = window.LI || {});
