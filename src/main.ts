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
  BOSS_DAMAGE,
  BOSS_DELAY,
  BOSS_RADIUS,
  bossHits,
  createBoss,
  drawBoss,
  moveBoss,
  type Boss,
} from "./boss.ts";
import {
  createShip,
  drawLifeBar,
  drawShip,
  moveShip,
  shipForward,
  shipHitsAsteroid,
  SHIP_HULL,
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

const canvas = document.querySelector<HTMLCanvasElement>("#game");

if (!canvas) {
  throw new Error("Canvas #game não encontrado");
}

const ctx = canvas.getContext("2d");

if (!ctx) {
  throw new Error("Canvas 2D não disponível");
}

const gameOver = document.querySelector<HTMLElement>("#game-over");
const restart = document.querySelector<HTMLButtonElement>("#restart");

if (!gameOver || !restart) {
  throw new Error("Tela de game over não encontrada");
}

const overlay = gameOver;
const restartButton = restart;

start(canvas, ctx, overlay, restartButton);

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
};

type State = {
  ship: Ship;
  life: number;
  asteroids: Asteroid[];
  shots: Shot[];
  held: Set<string>;
  contacts: Set<Asteroid>;
  boss: Boss | null;
  bossDefeated: boolean;
  bossTouch: boolean;
  spawnIn: number;
  spawnIndex: number;
  elapsed: number;
  over: boolean;
  particles: Particle[];
};

function start(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  gameOver: HTMLElement,
  restart: HTMLButtonElement,
): void {
  fit(canvas);
  const state = freshState(canvas);

  restart.addEventListener("click", () => {
    const next = freshState(canvas);
    Object.assign(state, next);
    state.held = next.held;
    state.contacts = next.contacts;
    state.particles = next.particles;
    gameOver.hidden = true;
  });

  window.addEventListener("keydown", (event) => {
    if (state.over) {
      return;
    }
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

function freshState(canvas: HTMLCanvasElement): State {
  return {
    ship: createShip(canvas.width / 2, canvas.height / 2),
    life: SHIP_LIFE_MAX,
    asteroids: [],
    shots: [],
    held: new Set<string>(),
    contacts: new Set<Asteroid>(),
    boss: null,
    bossDefeated: false,
    bossTouch: false,
    spawnIn: 0,
    spawnIndex: 0,
    elapsed: 0,
    over: false,
    particles: [],
  };
}

function frame(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  state: State,
  dt: number,
): void {
  fit(canvas);
  if (!state.over) {
    state.elapsed += dt;
    moveShip(state.ship, control(state.held), dt, {
      width: canvas.width,
      height: canvas.height,
    });
    updateAsteroids(state, dt, canvas.width, canvas.height);
    updateBoss(state, dt, canvas.width, canvas.height);
    updateShots(state, dt, canvas.width, canvas.height);
    hitShip(state);
    if (state.life <= 0) {
      defeat(state);
    }
  }
  updateParticles(state, dt);
  drawWorld(canvas, ctx, state);
}

function defeat(state: State): void {
  if (state.over) {
    return;
  }
  state.over = true;
  state.life = 0;
  state.held.clear();
  burst(state, state.ship.x, state.ship.y);
  playExplosion();
  overlay.hidden = false;
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
  const side = SIDES[Math.floor(Math.random() * SIDES.length)] ?? "left";
  const size: AsteroidSize = index % 2 === 0 ? "large" : "small";
  const span = side === "left" || side === "right" ? height : width;
  const along = span * (0.08 + Math.random() * 0.84);
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
    if (
      state.boss &&
      shotHits(shot, { x: state.boss.x, y: state.boss.y, radius: BOSS_RADIUS })
    ) {
      state.boss.life -= 1;
      if (state.boss.life <= 0) {
        burst(state, state.boss.x, state.boss.y);
        state.boss = null;
        state.bossDefeated = true;
        playExplosion();
      }
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

function updateBoss(
  state: State,
  dt: number,
  width: number,
  height: number,
): void {
  if (!state.boss && !state.bossDefeated && state.elapsed >= BOSS_DELAY) {
    state.boss = createBoss(width);
  }
  const boss = state.boss;
  if (!boss) {
    return;
  }

  moveBoss(boss, state.ship, dt, { width, height });
  const survivors: Asteroid[] = [];
  for (const asteroid of state.asteroids) {
    if (bossHits(boss, asteroid)) {
      playExplosion();
      continue;
    }
    survivors.push(asteroid);
  }
  state.asteroids = survivors;

  const touching = bossHits(boss, {
    x: state.ship.x,
    y: state.ship.y,
    radius: SHIP_HULL,
  });
  if (touching && !state.bossTouch) {
    state.life = Math.max(0, state.life - BOSS_DAMAGE);
  }
  state.bossTouch = touching;
}

function burst(state: State, x: number, y: number): void {
  for (let i = 0; i < 28; i += 1) {
    const angle = (i / 28) * Math.PI * 2;
    const speed = 70 + (i % 6) * 28;
    state.particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 0.8,
    });
  }
}

function updateParticles(state: State, dt: number): void {
  for (const particle of state.particles) {
    particle.x += particle.vx * dt;
    particle.y += particle.vy * dt;
    particle.life -= dt;
  }
  state.particles = state.particles.filter((particle) => particle.life > 0);
}

function drawWorld(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  state: State,
): void {
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (const asteroid of state.asteroids) {
    drawAsteroid(ctx, asteroid);
  }
  if (state.boss) {
    drawBoss(ctx, state.boss);
  }
  for (const shot of state.shots) {
    drawShot(ctx, shot);
  }
  if (!state.over) {
    drawShip(ctx, state.ship);
    drawLifeBar(ctx, state.ship, state.life);
  }
  for (const particle of state.particles) {
    ctx.globalAlpha = Math.max(0, particle.life / 0.8);
    ctx.fillStyle = "#ff7a2f";
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, 4, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  if (!state.boss && !state.bossDefeated && state.elapsed < BOSS_DELAY) {
    const left = Math.ceil(BOSS_DELAY - state.elapsed);
    ctx.fillStyle = "#ffffff";
    ctx.font = "20px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText(`Chefe ${left}`, canvas.width / 2, 16);
  }
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
