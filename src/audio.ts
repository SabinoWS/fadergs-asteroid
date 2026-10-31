let audioContext: AudioContext | null = null;

function context(): AudioContext {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  if (audioContext.state === "suspended") {
    void audioContext.resume();
  }
  return audioContext;
}

export function playShot(): void {
  const current = context();
  const time = current.currentTime;
  const tone = current.createOscillator();
  const gain = current.createGain();
  tone.type = "square";
  tone.frequency.setValueAtTime(880, time);
  tone.frequency.exponentialRampToValueAtTime(220, time + 0.08);
  gain.gain.setValueAtTime(0.06, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.09);
  tone.connect(gain);
  gain.connect(current.destination);
  tone.start(time);
  tone.stop(time + 0.1);
}

export function playExplosion(): void {
  const current = context();
  const time = current.currentTime;
  const duration = 0.28;
  const length = Math.floor(current.sampleRate * duration);
  const buffer = current.createBuffer(1, length, current.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i += 1) {
    const fade = 1 - i / length;
    data[i] = (Math.random() * 2 - 1) * fade * fade;
  }
  const source = current.createBufferSource();
  source.buffer = buffer;
  const filter = current.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(900, time);
  filter.frequency.exponentialRampToValueAtTime(160, time + duration);
  const gain = current.createGain();
  gain.gain.setValueAtTime(0.18, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + duration);
  source.connect(filter);
  filter.connect(gain);
  gain.connect(current.destination);
  source.start(time);
}
