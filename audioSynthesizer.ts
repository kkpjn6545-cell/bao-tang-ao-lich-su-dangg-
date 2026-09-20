/**
 * Web Audio API Synthesizer for Museum Ambient & Sound Effects
 * Provides gentle, dignified, historic atmosphere without external network audio dependencies.
 * Also supports custom user uploaded audio files if provided!
 */

export interface TrackMeta {
  id: string;
  name: string;
  roomDesc: string;
  mood: string;
}

export const ROOM_TRACK_INFO: Record<string, TrackMeta> = {
  hall: {
    id: 'hall',
    name: 'Khúc Nguyện Non Sông (Sảnh Đại Triển Lãm)',
    roomDesc: 'Âm sắc trang trọng, trầm hùng mở đầu hành trình',
    mood: 'Trang trọng & Khoáng đạt'
  },
  room1: {
    id: 'room1',
    name: 'Ký Ức Sau Cuộc Chiến (Bối Cảnh 1975)',
    roomDesc: 'Giai điệu hoài niệm, sâu lắng về những vết thương chiến tranh và khát vọng hòa bình',
    mood: 'Suy tư & Sâu lắng'
  },
  room2: {
    id: 'room2',
    name: 'Quyết Sách Lịch Sử (Hội Nghị Trung Ương 24)',
    roomDesc: 'Âm hưởng dứt khoát, vững chãi mở lối cho vận mệnh non sông',
    mood: 'Quyết đoán & Trang nghiêm'
  },
  room3: {
    id: 'room3',
    name: 'Bắc Nam Sum Họp (Hội Nghị Hiệp Thương)',
    roomDesc: 'Âm điệu hòa quyện, nồng ấm tình ruột thịt hai miền',
    mood: 'Đoàn kết & Nồng ấm'
  },
  room4: {
    id: 'room4',
    name: 'Ngày Hội Non Sông (Tổng Tuyển Cử 25/4/1976)',
    roomDesc: 'Nhịp điệu rộn ràng, hân hoan của hơn 23 triệu lá phiếu công dân',
    mood: 'Tươi sáng & Rạng rỡ'
  },
  room5: {
    id: 'room5',
    name: 'Khải Hoàn Lập Quốc (Kỳ Họp Quốc Hội Khóa VI)',
    roomDesc: 'Âm vang hùng tráng mừng ngày khai sinh thể chế non sông thống nhất',
    mood: 'Hào sảng & Hùng tráng'
  },
  room6: {
    id: 'room6',
    name: 'Khúc Ca Thống Nhất (Tầm Vóc & Tương Lai)',
    roomDesc: 'Giai điệu cao trào, hy vọng và tự hào dân tộc',
    mood: 'Vinh quang & Hướng tương lai'
  }
};

class MuseumAudioService {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private isMuted: boolean = false;
  private volume: number = 0.25; // default gentle volume
  private currentRoomKey: string = 'hall';
  private loopTimer: number | null = null;
  private activeNodes: Array<OscillatorNode | GainNode> = [];
  private customAudioEl: HTMLAudioElement | null = null;
  private customAudioUrl: string | null = null;
  private listeners: Array<() => void> = [];

  constructor() {
    // Lazy init audio context on user gesture
  }

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public subscribe(fn: () => void) {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter(l => l !== fn);
    };
  }

  private notify() {
    this.listeners.forEach(fn => fn());
  }

  public getStatus() {
    return {
      isPlaying: this.isPlaying,
      isMuted: this.isMuted,
      volume: this.volume,
      currentRoomKey: this.currentRoomKey,
      trackInfo: ROOM_TRACK_INFO[this.currentRoomKey] || ROOM_TRACK_INFO.hall,
      hasCustomAudio: !!this.customAudioUrl
    };
  }

  public setRoom(roomKey: string) {
    if (this.currentRoomKey !== roomKey) {
      this.currentRoomKey = roomKey;
      if (this.isPlaying && !this.customAudioUrl) {
        this.stopCurrentSynth();
        this.scheduleNextPhrase();
      }
      this.notify();
    }
  }

  public togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  public play() {
    this.initContext();
    this.isPlaying = true;

    if (this.customAudioUrl && this.customAudioEl) {
      this.customAudioEl.play().catch(() => {});
    } else {
      this.stopCurrentSynth();
      this.scheduleNextPhrase();
    }
    this.notify();
  }

  public pause() {
    this.isPlaying = false;
    if (this.customAudioEl) {
      this.customAudioEl.pause();
    }
    this.stopCurrentSynth();
    if (this.loopTimer !== null) {
      window.clearTimeout(this.loopTimer);
      this.loopTimer = null;
    }
    this.notify();
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.customAudioEl) {
      this.customAudioEl.volume = this.isMuted ? 0 : this.volume;
    }
    this.notify();
  }

  public toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.customAudioEl) {
      this.customAudioEl.volume = this.isMuted ? 0 : this.volume;
    }
    this.notify();
  }

  public loadCustomAudio(file: File) {
    if (this.customAudioUrl) {
      URL.revokeObjectURL(this.customAudioUrl);
    }
    this.customAudioUrl = URL.createObjectURL(file);
    if (!this.customAudioEl) {
      this.customAudioEl = new Audio();
      this.customAudioEl.loop = true;
    }
    this.customAudioEl.src = this.customAudioUrl;
    this.customAudioEl.volume = this.isMuted ? 0 : this.volume;

    if (this.isPlaying) {
      this.stopCurrentSynth();
      this.customAudioEl.play().catch(() => {});
    }
    this.notify();
  }

  public clearCustomAudio() {
    if (this.customAudioEl) {
      this.customAudioEl.pause();
      this.customAudioEl = null;
    }
    if (this.customAudioUrl) {
      URL.revokeObjectURL(this.customAudioUrl);
      this.customAudioUrl = null;
    }
    if (this.isPlaying) {
      this.scheduleNextPhrase();
    }
    this.notify();
  }

  private stopCurrentSynth() {
    this.activeNodes.forEach(node => {
      try {
        if ('stop' in node) {
          (node as OscillatorNode).stop();
        }
        node.disconnect();
      } catch {
        // ignore
      }
    });
    this.activeNodes = [];
  }

  /**
   * Generates a warm, ambient Vietnamese pentatonic chords and bells sequence
   */
  private scheduleNextPhrase() {
    if (!this.isPlaying || !this.ctx || this.customAudioUrl) return;

    const ctx = this.ctx;
    const now = ctx.currentTime;
    const effectiveVol = this.isMuted ? 0 : this.volume * 0.18;

    // Room-specific frequency base (Pentatonic scales: C - D - F - G - A)
    let baseFreqs: number[] = [130.81, 164.81, 196.00, 220.00, 261.63]; // C3, E3, G3, A3, C4
    let phraseDuration = 7.5;

    if (this.currentRoomKey === 'room1') {
      // Minor meditative: D3, F3, G3, A3, C4
      baseFreqs = [146.83, 174.61, 196.00, 220.00, 261.63];
      phraseDuration = 8.5;
    } else if (this.currentRoomKey === 'room2') {
      // Solemn: A2, C3, D3, E3, G3
      baseFreqs = [110.00, 130.81, 146.83, 164.81, 196.00];
      phraseDuration = 7.0;
    } else if (this.currentRoomKey === 'room3') {
      // Warm harmony: F3, A3, C4, D4, F4
      baseFreqs = [174.61, 220.00, 261.63, 293.66, 349.23];
      phraseDuration = 7.0;
    } else if (this.currentRoomKey === 'room4') {
      // Joyful bright: G3, A3, B3, D4, E4
      baseFreqs = [196.00, 220.00, 246.94, 293.66, 329.63];
      phraseDuration = 6.0;
    } else if (this.currentRoomKey === 'room5') {
      // Grand celebratory: C3, G3, C4, E4, G4
      baseFreqs = [130.81, 196.00, 261.63, 329.63, 392.00];
      phraseDuration = 6.5;
    } else if (this.currentRoomKey === 'room6') {
      // Hopeful ascending: D3, G3, A3, C4, D4
      baseFreqs = [146.83, 196.00, 220.00, 261.63, 293.66];
      phraseDuration = 8.0;
    }

    // Master filter for softness
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(900, now);
    filter.Q.setValueAtTime(1.5, now);
    filter.connect(ctx.destination);

    // Play 3 gentle chord notes
    const chordNotes = [baseFreqs[0], baseFreqs[2], baseFreqs[3]];
    chordNotes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = idx === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      // Gentle attack and slow fade
      const noteDelay = idx * 0.4;
      gain.gain.setValueAtTime(0.0001, now + noteDelay);
      gain.gain.exponentialRampToValueAtTime(effectiveVol * 0.35, now + noteDelay + 2.0);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + phraseDuration - 0.5);

      osc.connect(gain);
      gain.connect(filter);

      osc.start(now + noteDelay);
      osc.stop(now + phraseDuration);

      this.activeNodes.push(osc, gain);
    });

    // Single delicate chime/bell
    const chimeFreq = baseFreqs[Math.floor(Math.random() * baseFreqs.length)] * 2;
    const chimeOsc = ctx.createOscillator();
    const chimeGain = ctx.createGain();

    chimeOsc.type = 'sine';
    chimeOsc.frequency.setValueAtTime(chimeFreq, now + 1.2);
    chimeGain.gain.setValueAtTime(0.0001, now + 1.2);
    chimeGain.gain.exponentialRampToValueAtTime(effectiveVol * 0.4, now + 1.3);
    chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 4.5);

    chimeOsc.connect(chimeGain);
    chimeGain.connect(filter);

    chimeOsc.start(now + 1.2);
    chimeOsc.stop(now + 4.6);
    this.activeNodes.push(chimeOsc, chimeGain);

    // Schedule next seamless loop
    this.loopTimer = window.setTimeout(() => {
      this.scheduleNextPhrase();
    }, (phraseDuration - 1.2) * 1000);
  }

  // SOUND EFFECTS
  public playFootstepSound() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const ctx = this.ctx;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(80, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.08);

      gain.gain.setValueAtTime(this.volume * 0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.09);
    } catch {
      // ignore
    }
  }

  public playPageFlipSound() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const ctx = this.ctx;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.12);

      gain.gain.setValueAtTime(this.volume * 0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.13);
    } catch {
      // ignore
    }
  }

  public playArtifactClickSound() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const ctx = this.ctx;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.05); // E5

      gain.gain.setValueAtTime(this.volume * 0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.26);
    } catch {
      // ignore
    }
  }

  public playQuizSuccessSound() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const ctx = this.ctx;
      const now = ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.09);

        gain.gain.setValueAtTime(0.0001, now + i * 0.09);
        gain.gain.exponentialRampToValueAtTime(this.volume * 0.2, now + i * 0.09 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.09 + 0.4);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.09);
        osc.stop(now + i * 0.09 + 0.42);
      });
    } catch {
      // ignore
    }
  }
}

export const museumAudio = new MuseumAudioService();
