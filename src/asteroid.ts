import asteroidSrc from "./assets/asteroid.png";

const asteroidImage = new Image();
asteroidImage.src = asteroidSrc;

const SOURCE_SIZE = 1254;
const SOURCE_RADIUS = 482;

export const ASTEROID_STATS = {
  large: { radius: 42, speed: 55, life: 3 },
  small: { radius: 16, speed: 160, life: 1 },
} as const;

export function asteroidDrawSize(radius: number): number {
  return (radius * SOURCE_SIZE) / SOURCE_RADIUS;
}

export function asteroidDamage(size: AsteroidSize): number {
  return size === "large" ? 25 : 10;
}

export type AsteroidSize = keyof typeof ASTEROID_STATS;
export type AsteroidSide = "left" | "right" | "top" | "bottom";

export type Asteroid = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  spin: number;
  radius: number;
  life: number;
  size: AsteroidSize;
};

export function createAsteroid(
  size: AsteroidSize,
  side: AsteroidSide,
  along: number,
  width: number,
  height: number,
  spin: number,
): Asteroid {
  const stats = ASTEROID_STATS[size];
  let x = along;
  let y = along;
  let vx = 0;
  let vy = 0;

  if (side === "left") {
    x = -stats.radius;
    y = along;
    vx = stats.speed;
  } else if (side === "right") {
    x = width + stats.radius;
    y = along;
    vx = -stats.speed;
  } else if (side === "top") {
    x = along;
    y = -stats.radius;
    vy = stats.speed;
  } else {
    x = along;
    y = height + stats.radius;
    vy = -stats.speed;
  }

  return {
    x,
    y,
    vx,
    vy,
    angle: 0,
    spin,
    radius: stats.radius,
    life: stats.life,
    size,
  };
}

export function moveAsteroid(asteroid: Asteroid, dt: number): void {
  asteroid.x += asteroid.vx * dt;
  asteroid.y += asteroid.vy * dt;
  asteroid.angle += asteroid.spin * dt;
}

export function asteroidIsGone(
  asteroid: Asteroid,
  width: number,
  height: number,
): boolean {
  if (asteroid.vx > 0 && asteroid.x - asteroid.radius > width) {
    return true;
  }
  if (asteroid.vx < 0 && asteroid.x + asteroid.radius < 0) {
    return true;
  }
  if (asteroid.vy > 0 && asteroid.y - asteroid.radius > height) {
    return true;
  }
  if (asteroid.vy < 0 && asteroid.y + asteroid.radius < 0) {
    return true;
  }
  return false;
}

export function drawAsteroid(
  ctx: CanvasRenderingContext2D,
  asteroid: Asteroid,
): void {
  if (asteroidImage.complete && asteroidImage.naturalWidth > 0) {
    const size = asteroidDrawSize(asteroid.radius);
    ctx.save();
    ctx.translate(asteroid.x, asteroid.y);
    ctx.rotate(asteroid.angle);
    ctx.drawImage(asteroidImage, -size / 2, -size / 2, size, size);
    ctx.restore();
  }

  const label = String(asteroid.life);
  ctx.font = `${Math.max(14, asteroid.radius * 0.55)}px sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.lineWidth = 4;
  ctx.strokeStyle = "#000000";
  ctx.strokeText(label, asteroid.x, asteroid.y);
  ctx.fillStyle = "#ffffff";
  ctx.fillText(label, asteroid.x, asteroid.y);
}
