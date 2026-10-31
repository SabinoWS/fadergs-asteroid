import "./style.css";
import { playExplosion, playShot } from "./audio.ts";
import {
  asteroidDamage,
  asteroidIsGone,
  createAsteroid,
  drawAsteroid,
  moveAsteroid,
  type Asteroid,
  type AsteroidSide,
  type AsteroidSize,
} from "./asteroid.ts";
import {
  createShip,
  drawLifeBar,
  drawShip,
  moveShip,
  shipForward,
  shipHitsAsteroid,
  SHIP_LIFE_MAX,
  SHIP_NOSE,
  type Ship,
  type ShipControl,
} from "./ship.ts";
import {
  createShot,
  drawShot,
  moveShot,
  shotHits,
  shotIsGone,
  type Shot,
} from "./shot.ts";

const PILOT_KEYS = new Set([
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "KeyW",
  "KeyA",
  "KeyS",
  "KeyD",
]);
const SIDES: readonly AsteroidSide[] = ["left", "right", "top", "bottom"];
const SPINS = [1.1, -0.8, 1.5, -1.3];
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
  life: number;
  asteroids: Asteroid[];
  shots: Shot[];
  held: Set<string>;
  contacts: Set<Asteroid>;
  spawnIn: number;
  spawnIndex: number;
  elapsed: number;
};

function start(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
): void {
  fit(canvas);
  const state: State = {
    ship: createShip(canvas.width / 2, canvas.height / 2),
    life: SHIP_LIFE_MAX,
    asteroids: [],
    shots: [],
    held: new Set<string>(),
    contacts: new Set<Asteroid>(),
    spawnIn: 0,
    spawnIndex: 0,
    elapsed: 0,
  };

  window.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
      event.preventDefault();
      if (!event.repeat) {
        const nose = shipForward(state.ship.angle);
        state.shots.push(
          createShot(
            state.ship.x + nose.x * SHIP_NOSE,
            state.ship.y + nose.y * SHIP_NOSE,
            state.ship.angle,
          ),
        );
        playShot();
      }
      return;
    }
    if (!PILOT_KEYS.has(event.code)) {
      return;
    }
    event.preventDefault();
    state.held.add(event.code);
  });

  window.addEventListener("keyup", (event) => {
    state.held.delete(event.code);
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
  state.elapsed += dt;
  moveShip(state.ship, control(state.held), dt, {
    width: canvas.width,
    height: canvas.height,
  });
  updateAsteroids(state, dt, canvas.width, canvas.height);
  updateShots(state, dt, canvas.width, canvas.height);
  hitShip(state);

  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (const asteroid of state.asteroids) {
    drawAsteroid(ctx, asteroid);
  }
  for (const shot of state.shots) {
    drawShot(ctx, shot);
  }
  drawShip(ctx, state.ship);
  drawLifeBar(ctx, state.ship, state.life);
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
    (asteroid) => !asteroidIsGone(asteroid, width, height),
  );

  const cap = asteroidCap(state.elapsed);
  const every = spawnInterval(state.elapsed);
  if (state.asteroids.length >= cap) {
    state.spawnIn = every;
    return;
  }

  state.spawnIn -= dt;
  while (state.spawnIn <= 0 && state.asteroids.length < cap) {
    state.asteroids.push(spawnAsteroid(state.spawnIndex, width, height));
    state.spawnIndex += 1;
    state.spawnIn += every;
  }
}

function spawnInterval(elapsed: number): number {
  return Math.max(0.32, 0.9 - elapsed * 0.02);
}

function asteroidCap(elapsed: number): number {
  return Math.min(14, 5 + Math.floor(elapsed / 10));
}

function spawnAsteroid(
  index: number,
  width: number,
  height: number,
): Asteroid {
  const side = SIDES[index % SIDES.length] ?? "left";
  const size: AsteroidSize = index % 2 === 0 ? "large" : "small";
  const lane = LANES[index % LANES.length] ?? 0.5;
  const along = (side === "left" || side === "right" ? height : width) * lane;
  const spin = SPINS[index % SPINS.length] ?? 1;
  return createAsteroid(size, side, along, width, height, spin);
}

function updateShots(
  state: State,
  dt: number,
  width: number,
  height: number,
): void {
  for (const shot of state.shots) {
    moveShot(shot, dt);
  }

  const shotsLeft: Shot[] = [];
  for (const shot of state.shots) {
    if (shotIsGone(shot, width, height)) {
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
      playExplosion();
    }
  }
  state.shots = shotsLeft;
}

function hitShip(state: State): void {
  const still = new Set<Asteroid>();
  for (const asteroid of state.asteroids) {
    if (!shipHitsAsteroid(state.ship, asteroid)) {
      continue;
    }
    if (!state.contacts.has(asteroid)) {
      state.life = Math.max(0, state.life - asteroidDamage(asteroid.size));
    }
    still.add(asteroid);
  }
  state.contacts = still;
}

function control(held: ReadonlySet<string>): ShipControl {
  let turn = 0;
  if (held.has("ArrowLeft") || held.has("KeyA")) {
    turn -= 1;
  }
  if (held.has("ArrowRight") || held.has("KeyD")) {
    turn += 1;
  }
  return {
    turn,
    thrust: held.has("ArrowUp") || held.has("KeyW"),
    brake: held.has("ArrowDown") || held.has("KeyS"),
  };
}

function fit(canvas: HTMLCanvasElement): void {
  const width = window.innerWidth;
  const height = window.innerHeight;
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
}
