import shipSrc from "./assets/ship.png";

const shipImage = new Image();
shipImage.src = shipSrc;

const SOURCE_WIDTH = 1292;
const SOURCE_HEIGHT = 1217;
const SOURCE_NOSE_Y = 109;
const SOURCE_HALF_WIDTH = (1151 - 139) / 2;
const DRAW_WIDTH = 112;
const DRAW_SCALE = DRAW_WIDTH / SOURCE_WIDTH;

export const SHIP_DRAW_WIDTH = DRAW_WIDTH;
export const SHIP_DRAW_HEIGHT = SOURCE_HEIGHT * DRAW_SCALE;
export const SHIP_NOSE = (SOURCE_HEIGHT / 2 - SOURCE_NOSE_Y) * DRAW_SCALE;
export const SHIP_SIZE = Math.ceil(
  Math.max(SHIP_NOSE, SOURCE_HALF_WIDTH * DRAW_SCALE),
);
export const SHIP_HULL = 28;
export const SHIP_LIFE_MAX = 100;

const TURN_SPEED = 2.8;
const ACCEL = 420;
const BRAKE = 360;
const MAX_SPEED = 380;
const TAIL_BAR = 46;

export type Ship = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
};

export type ShipControl = {
  turn: number;
  thrust: boolean;
  brake: boolean;
};

export function createShip(x: number, y: number): Ship {
  return { x, y, vx: 0, vy: 0, angle: 0 };
}

export function shipForward(angle: number): { x: number; y: number } {
  return { x: Math.sin(angle), y: -Math.cos(angle) };
}

export function moveShip(
  ship: Ship,
  control: ShipControl,
  dt: number,
  bounds: { width: number; height: number },
): void {
  ship.angle += control.turn * TURN_SPEED * dt;

  if (control.thrust) {
    const forward = shipForward(ship.angle);
    ship.vx += forward.x * ACCEL * dt;
    ship.vy += forward.y * ACCEL * dt;
  }

  let speed = Math.hypot(ship.vx, ship.vy);
  if (control.brake && speed > 0) {
    const next = Math.max(0, speed - BRAKE * dt);
    const scale = next / speed;
    ship.vx *= scale;
    ship.vy *= scale;
    speed = next;
  }

  if (speed > MAX_SPEED) {
    const scale = MAX_SPEED / speed;
    ship.vx *= scale;
    ship.vy *= scale;
  }

  ship.x += ship.vx * dt;
  ship.y += ship.vy * dt;

  if (ship.x < SHIP_SIZE) {
    ship.x = SHIP_SIZE;
    ship.vx = Math.max(0, ship.vx);
  } else if (ship.x > bounds.width - SHIP_SIZE) {
    ship.x = bounds.width - SHIP_SIZE;
    ship.vx = Math.min(0, ship.vx);
  }

  if (ship.y < SHIP_SIZE) {
    ship.y = SHIP_SIZE;
    ship.vy = Math.max(0, ship.vy);
  } else if (ship.y > bounds.height - SHIP_SIZE) {
    ship.y = bounds.height - SHIP_SIZE;
    ship.vy = Math.min(0, ship.vy);
  }
}

export function shipHitsAsteroid(
  ship: Ship,
  asteroid: { x: number; y: number; radius: number },
): boolean {
  const dx = ship.x - asteroid.x;
  const dy = ship.y - asteroid.y;
  const reach = SHIP_HULL + asteroid.radius;
  return dx * dx + dy * dy <= reach * reach;
}

export function drawShip(ctx: CanvasRenderingContext2D, ship: Ship): void {
  if (!shipImage.complete || shipImage.naturalWidth === 0) {
    return;
  }

  ctx.save();
  ctx.translate(ship.x, ship.y);
  ctx.rotate(ship.angle);
  ctx.drawImage(
    shipImage,
    -SHIP_DRAW_WIDTH / 2,
    -SHIP_DRAW_HEIGHT / 2,
    SHIP_DRAW_WIDTH,
    SHIP_DRAW_HEIGHT,
  );
  ctx.restore();
}

export function drawLifeBar(
  ctx: CanvasRenderingContext2D,
  ship: Ship,
  life: number,
): void {
  const x = ship.x - Math.sin(ship.angle) * TAIL_BAR;
  const y = ship.y + Math.cos(ship.angle) * TAIL_BAR;
  const width = 46;
  const height = 6;
  const left = x - width / 2;
  const top = y - height / 2;
  const ratio = Math.max(0, Math.min(1, life / SHIP_LIFE_MAX));

  ctx.fillStyle = "#1b1b1b";
  ctx.fillRect(left, top, width, height);
  ctx.fillStyle = ratio > 0.3 ? "#3ec6ff" : "#ff4455";
  ctx.fillRect(left, top, width * ratio, height);
}
