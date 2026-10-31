export const ASTEROID_STATS = {
  large: { radius: 42, speed: 55, life: 3 },
  small: { radius: 16, speed: 160, life: 1 },
} as const;

export type AsteroidSize = keyof typeof ASTEROID_STATS;

export type Asteroid = {
  x: number;
  y: number;
  vx: number;
  radius: number;
  life: number;
  size: AsteroidSize;
};

export function createAsteroid(
  size: AsteroidSize,
  side: "left" | "right",
  y: number,
  width: number,
): Asteroid {
  const stats = ASTEROID_STATS[size];
  const fromLeft = side === "left";

  return {
    x: fromLeft ? -stats.radius : width + stats.radius,
    y,
    vx: fromLeft ? stats.speed : -stats.speed,
    radius: stats.radius,
    life: stats.life,
    size,
  };
}

export function moveAsteroid(asteroid: Asteroid, dt: number): void {
  asteroid.x += asteroid.vx * dt;
}

export function asteroidIsGone(asteroid: Asteroid, width: number): boolean {
  if (asteroid.vx > 0) {
    return asteroid.x - asteroid.radius > width;
  }
  return asteroid.x + asteroid.radius < 0;
}

export function drawAsteroid(
  ctx: CanvasRenderingContext2D,
  asteroid: Asteroid,
): void {
  ctx.beginPath();
  const points = 8;
  for (let i = 0; i < points; i += 1) {
    const angle = (i / points) * Math.PI * 2 - Math.PI / 2;
    const wobble = i % 2 === 0 ? 1 : 0.72;
    const radius = asteroid.radius * wobble;
    const x = asteroid.x + Math.cos(angle) * radius;
    const y = asteroid.y + Math.sin(angle) * radius;
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.closePath();
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = "#ffffff";
  ctx.font = `${Math.max(14, asteroid.radius * 0.55)}px sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(String(asteroid.life), asteroid.x, asteroid.y);
}
