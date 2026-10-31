import asteroidSrc from "./assets/asteroid.png";

const bossImage = new Image();
bossImage.src = asteroidSrc;

const SOURCE_SIZE = 1254;
const SOURCE_RADIUS = 482;

export const BOSS_DELAY = 45;
export const BOSS_RADIUS = 68;
export const BOSS_LIFE = 8;
export const BOSS_SPEED = 95;
export const BOSS_DAMAGE = 50;

export type Boss = {
  x: number;
  y: number;
  angle: number;
  life: number;
};

export function createBoss(width: number): Boss {
  return {
    x: width / 2,
    y: BOSS_RADIUS + 8,
    angle: 0,
    life: BOSS_LIFE,
  };
}

export function moveBoss(
  boss: Boss,
  target: { x: number; y: number },
  dt: number,
  bounds: { width: number; height: number },
): void {
  const dx = target.x - boss.x;
  const dy = target.y - boss.y;
  const distance = Math.hypot(dx, dy);
  if (distance > 1) {
    boss.x += (dx / distance) * BOSS_SPEED * dt;
    boss.y += (dy / distance) * BOSS_SPEED * dt;
    boss.angle += dt * 0.8;
  }

  boss.x = Math.min(bounds.width - BOSS_RADIUS, Math.max(BOSS_RADIUS, boss.x));
  boss.y = Math.min(
    bounds.height - BOSS_RADIUS,
    Math.max(BOSS_RADIUS, boss.y),
  );
}

export function bossHits(
  boss: Boss,
  target: { x: number; y: number; radius: number },
): boolean {
  const dx = boss.x - target.x;
  const dy = boss.y - target.y;
  const reach = BOSS_RADIUS + target.radius;
  return dx * dx + dy * dy <= reach * reach;
}

let tintedBoss: HTMLCanvasElement | null = null;

function bossSprite(): HTMLCanvasElement | null {
  if (!bossImage.complete || bossImage.naturalWidth === 0) {
    return null;
  }
  if (tintedBoss) {
    return tintedBoss;
  }

  const sprite = document.createElement("canvas");
  sprite.width = SOURCE_SIZE;
  sprite.height = SOURCE_SIZE;
  const off = sprite.getContext("2d");
  if (!off) {
    return null;
  }

  off.drawImage(bossImage, 0, 0);
  off.globalCompositeOperation = "source-atop";
  off.fillStyle = "rgba(180, 24, 24, 0.45)";
  off.fillRect(0, 0, SOURCE_SIZE, SOURCE_SIZE);
  tintedBoss = sprite;
  return tintedBoss;
}

export function drawBoss(ctx: CanvasRenderingContext2D, boss: Boss): void {
  const size = (BOSS_RADIUS * SOURCE_SIZE) / SOURCE_RADIUS;
  const sprite = bossSprite();
  if (sprite) {
    ctx.save();
    ctx.translate(boss.x, boss.y);
    ctx.rotate(boss.angle);
    ctx.drawImage(sprite, -size / 2, -size / 2, size, size);
    ctx.restore();
  }

  ctx.font = "28px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.lineWidth = 4;
  ctx.strokeStyle = "#000000";
  ctx.strokeText(String(boss.life), boss.x, boss.y);
  ctx.fillStyle = "#ffd0d0";
  ctx.fillText(String(boss.life), boss.x, boss.y);
}
