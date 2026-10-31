export const SHOT_SPEED = 520;
export const SHOT_RADIUS = 2;

export type Shot = {
  x: number;
  y: number;
};

export function createShot(x: number, y: number): Shot {
  return { x, y };
}

export function moveShot(shot: Shot, dt: number): void {
  shot.y -= SHOT_SPEED * dt;
}

export function shotIsGone(shot: Shot): boolean {
  return shot.y < -18;
}

export function drawShot(ctx: CanvasRenderingContext2D, shot: Shot): void {
  ctx.beginPath();
  ctx.moveTo(shot.x, shot.y);
  ctx.lineTo(shot.x, shot.y + 18);
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
