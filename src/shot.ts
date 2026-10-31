export const SHOT_SPEED = 520;
export const SHOT_RADIUS = 2;

export type Shot = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

export function createShot(x: number, y: number, angle: number): Shot {
  return {
    x,
    y,
    vx: Math.sin(angle) * SHOT_SPEED,
    vy: -Math.cos(angle) * SHOT_SPEED,
  };
}

export function moveShot(shot: Shot, dt: number): void {
  shot.x += shot.vx * dt;
  shot.y += shot.vy * dt;
}

export function shotIsGone(
  shot: Shot,
  width: number,
  height: number,
): boolean {
  return (
    shot.x < -18 ||
    shot.y < -18 ||
    shot.x > width + 18 ||
    shot.y > height + 18
  );
}

export function drawShot(ctx: CanvasRenderingContext2D, shot: Shot): void {
  const mag = Math.hypot(shot.vx, shot.vy) || 1;
  ctx.beginPath();
  ctx.moveTo(shot.x, shot.y);
  ctx.lineTo(shot.x - (shot.vx / mag) * 18, shot.y - (shot.vy / mag) * 18);
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 2;
  ctx.stroke();
}

export function shotHits(
  shot: Shot,
  target: { x: number; y: number; radius: number },
): boolean {
  const dx = shot.x - target.x;
  const dy = shot.y - target.y;
  const reach = target.radius + SHOT_RADIUS;
  return dx * dx + dy * dy <= reach * reach;
}
