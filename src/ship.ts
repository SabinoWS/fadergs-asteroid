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
export const SHIP_SIZE = Math.ceil(Math.max(SHIP_NOSE, SOURCE_HALF_WIDTH * DRAW_SCALE));

const SPEED = 280;

export type Ship = {
  x: number;
  y: number;
};

export function createShip(x: number, y: number): Ship {
  return { x, y };
}

export function moveShip(
  ship: Ship,
  direction: { x: number; y: number },
  dt: number,
  bounds: { width: number; height: number },
): void {
  ship.x += direction.x * SPEED * dt;
  ship.y += direction.y * SPEED * dt;
  ship.x = Math.min(bounds.width - SHIP_SIZE, Math.max(SHIP_SIZE, ship.x));
  ship.y = Math.min(bounds.height - SHIP_SIZE, Math.max(SHIP_SIZE, ship.y));
}

export function drawShip(ctx: CanvasRenderingContext2D, ship: Ship): void {
  if (!shipImage.complete || shipImage.naturalWidth === 0) {
    return;
  }

  ctx.drawImage(
    shipImage,
    ship.x - SHIP_DRAW_WIDTH / 2,
    ship.y - SHIP_DRAW_HEIGHT / 2,
    SHIP_DRAW_WIDTH,
    SHIP_DRAW_HEIGHT,
  );
}
