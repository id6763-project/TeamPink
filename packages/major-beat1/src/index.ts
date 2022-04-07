import {
  AnalogRGBLedStrip,
  Button,
  Component,
  connectToArduinoBoard,
  InstallationOptions,
  Led,
  Sensor,
} from '@teampink/interaction-molecule';

/**
 * Button on the heart. Everytime button is clicked, the destination of the puzzle changes (The user would see a different broken).
 * Components:
 * 1. Proximity Sensor
 * 2. LED Strip
 * 3. Push Button
 *
 * (LED Strip on the whole time) Push Heart Button ) -> Trigger Audio + LED on bone turns on -> Person moves peg -> Proximity sensor on bone -> Trigger Audio + LED turns green. -> LED disappears and the next broken bone tuens on.
 */

interface MajorBeat1Options extends InstallationOptions {}

export type BoneState = 'complete' | 'incomplete' | 'n/a';
export type BoneData = {
  status: 'active' | 'inactive';
  state: BoneState;
};

export interface BoneOptions {
  pins: {
    r: number;
    g: number;
    proximitySensor: number;
  };
}
export class Bone implements Component {
  gLed: Led;
  rLed: Led;
  proximitySensor: Sensor;

  constructor(options: BoneOptions) {
    this.gLed = new Led({ pin: options.pins.g });
    this.rLed = new Led({ pin: options.pins.r });
    this.proximitySensor = new Sensor({ pin: options.pins.proximitySensor });
  }

  makeInactive() {
    this.rLed.turnOff();
    this.gLed.turnOff();
  }

  green() {
    this.rLed.turnOff();
    this.gLed.turnOn();
  }

  red() {
    this.gLed.turnOff();
    this.rLed.turnOn();
  }

  on(event: BoneState, callback: (data: BoneData) => void) {
    if (event === 'complete') {
      this.proximitySensor.on('data', () =>
        callback({ state: 'complete', status: 'active' })
      );
    }
  }
}

const options: MajorBeat1Options = {
  boardOptions: {},
  components: {
    heartButton: new Button({
      pin: 6,
    }),
    ledStrip: new AnalogRGBLedStrip({
      pins: {
        r: 'A0',
        g: 'A1',
        b: 'A2',
      },
    }),
    bone1: new Bone({ pins: { g: 2, r: 3, proximitySensor: 4 } }),
    bone2: new Bone({ pins: { g: 5, r: 6, proximitySensor: 7 } }),
    bone3: new Bone({ pins: { g: 8, r: 9, proximitySensor: 10 } }),
  },
};

const board = connectToArduinoBoard(options);

board.getComponent<AnalogRGBLedStrip>('ledStrip').setColor(255, 255, 255);

const bones = [
  board.getComponent<Bone>('bone1'),
  board.getComponent<Bone>('bone2'),
  board.getComponent<Bone>('bone3'),
];

board.getComponent<Button>('heartButton').on('press', () => {
  console.log('Button Pressed');
  // Trigger Audio

  // Select Random Bone.
  function resetBones() {
    bones.forEach((bone) => bone.makeInactive());

    const randomBone = (Math.random() * 10) % bones.length;

    bones[randomBone].red();
    bones[randomBone].on('complete', () => {
      bones[randomBone].green();

      setTimeout(() => resetBones(), 2000);
    });
  }

  resetBones();
});
