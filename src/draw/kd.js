/* Shared layout + Nokta helpers for "Kibrit Kareler". */
(function (LI) {
  'use strict';
  const { clamp } = LI.E;
  LI.KD = {
    /** positions for 16:9 and 9:16 */
    L(env) {
      return env.V
        ? {
          CX: { x: 0, y: -780, s: 42, w: 980 },
          FIG: { x: [-330, -150, 60, 300], y: [-600, -600, -600, -600], L: 44, cy: -520, s: 40 },
          FIG1: { x: -170, y: -600, L: 70 },
          TB: { lx: -370, x0: -210, dx: 120, nx: 400, y: [-620, -520], s: 44, arc: -455 },
          GR: { ox: -380, oy: -120, ux: 150, uy: 22, n: 5, m: 16, s: 30 },
          E: { x: 0, y: [-370, -280, -190, -100], s: 44, w: 980 },
          E5: { x: 0, y: [-420, -330, -240, -150, -60], s: 42, w: 980 },
          SUM: { x: 0, y: [-560, -450, -340, -230], s: 46, w: 980 },
          nx: -360, gy: 560, s: 1.15 }
        : {
          CX: { x: 60, y: -445, s: 48, w: 1300 },
          FIG: { x: [-440, -270, -40, 250], y: [-240, -240, -240, -240], L: 64, cy: -130, s: 46 },
          FIG1: { x: -180, y: -290, L: 80 },
          TB: { lx: -330, x0: -160, dx: 140, nx: 620, y: [-300, -205], s: 50, arc: -135 },
          GR: { ox: -380, oy: 170, ux: 130, uy: 21, n: 5, m: 16, s: 30 },
          E: { x: 120, y: [-40, 50, 140, 225], s: 52, w: 1250 },
          E5: { x: 120, y: [-110, -20, 70, 160, 245], s: 50, w: 1250 },
          SUM: { x: 100, y: [-240, -140, -40, 80], s: 54, w: 1250 },
          nx: -800, gy: 262, s: 1.15 };
    },
    cam(env, o = {}) { return Object.assign({ x: env.V ? 0 : -60, y: env.V ? 60 : 0, zoom: 1, rot: 0, tilt: 1 }, o); },
    /** pupils + face toward a world point */
    look(p, target) {
      const e = LI.Nokta.eyes(p)[0];
      const dx = target[0] - e[0], dy = target[1] - e[1], d = Math.hypot(dx, dy) || 1;
      p.lookX = clamp(dx / d * 1.1, -1, 1); p.lookY = clamp(dy / d * 1.1, -1, 1);
      p.turn = clamp(dx / 900, -0.5, 0.5);
      return p;
    },
    /** a short ground stroke under Nokta */
    ground(ctx, env, x, gy) { LI.Ambient.ground(ctx, x - 360, x + 360, gy + 6, { alpha: 0.32 }); },
  };
})(window.LI = window.LI || {});
