import "./style.css";
import {
  asteroidIsGone,
  createAsteroid,
  drawAsteroid,
  moveAsteroid,
  type Asteroid,
  type AsteroidSize,
} from "./asteroid.ts";
import { createShip, drawShip, moveShip, SHIP_NOSE, type Ship } from "./ship.ts";
import {
  createShot,
  drawShot,
  moveShot,
  shotHits,
  shotIsGone,
  type Shot,
} from "./shot.ts";

const ARROWS = new Set(["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"]);
const SPAWN_EVERY = 0.85;
const MAX_ASTEROIDS = 6;
const LANES = [0.18, 0.36, 0.3, 0.74];

const canvas = document.querySelector<HTMLCanvasElement>("#game");

if (!canvas) {
  throw new Error("Canvas #game não encontrado");
}

const ctx = canvas.getContext("2d");

if (!ctx) {
  throw new Error("Canvas 2D não disponível");
}

start(canvas, ctx);

type State = {
  ship: Ship;
  asteroids: Asteroid[];
  shots: Shot[];
  held: Set<string>;
  spawnIn: number;
  spawnIndex: number;
};

function start(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
): void {
  fit(canvas);
  const state: State = {
    ship: createShip(canvas.width / 2, canvas.height / 2),
    asteroids: [],
    shots: [],
    held: new Set<string>(),
    spawnIn: 0,
    spawnIndex: 0,
  };

  window.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
      event.preventDefault();
      if (!event.repeat) {
        state.shots.push(
          createShot(state.ship.x, state.ship.y - SHIP_NOSE),
        );
      }
      return;
    }
    if (!ARROWS.has(event.key)) {
      return;
    }
    event.preventDefault();
    state.held.add(event.key);
  });

  window.addEventListener("keyup", (event) => {
    state.held.delete(event.key);
  });

  window.addEventListener("blur", () => {
    state.held.clear();
  });

  let last = 0;

  const tick = (now: number): void => {
    if (last === 0) {
      last = now;
    }
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    frame(canvas, ctx, state, dt);
    requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}

function frame(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  state: State,
  dt: number,
): void {
  fit(canvas);
  moveShip(state.ship, direction(state.held), dt, {
    width: canvas.width,
    height: canvas.height,
  });
  updateAsteroids(state, dt, canvas.width, canvas.height);
  updateShots(state, dt);

  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (const asteroid of state.asteroids) {
    drawAsteroid(ctx, asteroid);
  }
  for (const shot of state.shots) {
    drawShot(ctx, shot);
  }
  drawShip(ctx, state.ship);
}

function updateAsteroids(
  state: State,
  dt: number,
  width: number,
  height: number,
): void {
  for (const asteroid of state.asteroids) {
    moveAsteroid(asteroid, dt);
  }
  state.asteroids = state.asteroids.filter(
    (asteroid) => !asteroidIsGone(asteroid, width),
  );

  if (state.asteroids.length >= MAX_ASTEROIDS) {
    state.spawnIn = SPAWN_EVERY;
    return;
  }

  state.spawnIn -= dt;
  while (state.spawnIn <= 0 && state.asteroids.length < MAX_ASTEROIDS) {
    state.asteroids.push(spawnAsteroid(state.spawnIndex, width, height));
    state.spawnIndex += 1;
    state.spawnIn += SPAWN_EVERY;
  }
}

function spawnAsteroid(
  index: number,
  width: number,
  height: number,
): Asteroid {
  const cycle = index % 4;
  const side = cycle % 2 === 0 ? "left" : "right";
  const size: AsteroidSize = cycle < 2 ? "large" : "small";
  const y = height * (LANES[cycle] ?? 0.5);
  return createAsteroid(size, side, y, width);
}

function updateShots(state: State, dt: number): void {
  for (const shot of state.shots) {
    moveShot(shot, dt);
  }

  const shotsLeft: Shot[] = [];
  for (const shot of state.shots) {
    if (shotIsGone(shot)) {
      continue;
    }
    const hitIndex = state.asteroids.findIndex((asteroid) =>
      shotHits(shot, asteroid),
    );
    if (hitIndex === -1) {
      shotsLeft.push(shot);
      continue;
    }
    const asteroid = state.asteroids[hitIndex];
    if (!asteroid) {
      continue;
    }
    asteroid.life -= 1;
    if (asteroid.life <= 0) {
      state.asteroids.splice(hitIndex, 1);
    }
  }
  state.shots = shotsLeft;
}

function direction(held: ReadonlySet<string>): { x: number; y: number } {
  let x = 0;
  let y = 0;
  if (held.has("ArrowLeft")) {
    x -= 1;
  }
  if (held.has("ArrowRight")) {
    x += 1;
  }
  if (held.has("ArrowUp")) {
    y -= 1;
  }
  if (held.has("ArrowDown")) {
    y += 1;
  }
  return { x, y };
}

function fit(canvas: HTMLCanvasElement): void {
  const width = window.innerWidth;
  const height = window.innerHeight;
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
}
