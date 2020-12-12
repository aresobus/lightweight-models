/**
 * Testing Utilities for Browser Audio Feature Extraction.
 */

export class FakeAudioContext {
  readonly sampleRate = 44100;

  static createInstance() {
    return new FakeAudioContext();
  }

  createMediaStreamSource() {
    return new FakeMediaStreamAudioSourceNode();
  }

  createAnalyser() {
    return new FakeAnalyser();
  }

  close(): void {}
}

export class FakeAudioMediaStream {
  constructor() {}
  getTracks(): Array<{}> {
    return [];
  }
}

class FakeMediaStreamAudioSourceNode {
  constructor() {}
  connect(node: {}): void {}
}

class FakeAnalyser {
  fftSize: number;
  smoothingTimeConstant: number;
  private x: number;
  constructor() {
    this.x = 0;
  }

  getFloatFrequencyData(data: Float32Array): void {
    const xs: number[] = [];
    for (let i = 0; i < this.fftSize / 2; ++i) {
      xs.push(this.x++);
    }
    data.set(new Float32Array(xs));
  }

  getFloatTimeDomainData(data: Float32Array): void {
    const xs: number[] = [];
    for (let i = 0; i < this.fftSize / 2; ++i) {
      xs.push(-this.x++);
    }
    data.set(new Float32Array(xs));
  }

  disconnect(): void {}
}
