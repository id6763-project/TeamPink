import {
  // AnalogPin,
  EventBasedComponent,
  DigitalPin,
  Led,
  ReedSwitch,
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
    reedSwitch: DigitalPin;
  };
}
export class Bone implements EventBasedComponent {
  gLed: Led;
  rLed: Led;
  reedSwitch: ReedSwitch;

  constructor(private options: BoneOptions) {}

  private initComponent() {
    if (!this.gLed) {
      this.gLed = new Led({ pin: this.options.pins.g });
      this.rLed = new Led({ pin: this.options.pins.r });
      this.reedSwitch = new ReedSwitch({ pin: this.options.pins.reedSwitch });
    }
  }

  bind(board) {
    this.initComponent();
    this.gLed.bind(board);
    this.rLed.bind(board);
    this.reedSwitch.bind(board);
  }

  makeInactive() {
    this.initComponent();
    this.rLed.turnOff();
    this.gLed.turnOff();
  }

  start() {
    this.initComponent();
    this.rLed.turnOn();
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
      this.reedSwitch.on('close', () => {
        console.log('Reed Switch Closed');
        callback({ state: 'complete', status: 'active' });
      });
    }
  }
}
