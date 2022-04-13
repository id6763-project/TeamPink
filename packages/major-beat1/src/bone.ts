import {
  AnalogPin,
  Component,
  DigitalPin,
  Led,
  Sensor,
} from '@teampink/interaction-molecule';

export type BoneState = 'complete' | 'incomplete' | 'n/a';
export type BoneData = {
  status: 'active' | 'inactive';
  state: BoneState;
};

export interface BoneOptions {
  pins: {
    r: DigitalPin;
    g: DigitalPin;
    proximitySensor: AnalogPin;
  };
}
export class Bone implements Component {
  gLed: Led;
  rLed: Led;
  proximitySensor: Sensor;

  constructor(private options: BoneOptions) {}

  private initComponent() {
    if (!this.gLed) {
      this.gLed = new Led({ pin: this.options.pins.g });
      this.rLed = new Led({ pin: this.options.pins.r });
      this.proximitySensor = new Sensor({
        pin: this.options.pins.proximitySensor,
      });
    }
  }

  bind(board) {
    this.initComponent();
    this.gLed.bind(board);
    this.rLed.bind(board);
    this.proximitySensor.bind(board);
  }

  makeInactive() {
    this.initComponent();
    this.rLed.turnOff();
    this.gLed.turnOff();
  }

  green() {
    this.initComponent();
    this.rLed.turnOff();
    this.gLed.turnOn();
  }

  red() {
    this.initComponent();
    this.gLed.turnOff();
    this.rLed.turnOn();
  }

  on(event: BoneState, callback: (data: BoneData) => void) {
    this.initComponent();
    if (event === 'complete') {
      this.proximitySensor.on('data', () =>
        callback({ state: 'complete', status: 'active' })
      );
    }
  }
}
