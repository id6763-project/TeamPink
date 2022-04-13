/**
 * Button on the heart. Everytime button is clicked, the destination of the puzzle changes (The user would see a different broken).
 * Components:
 * 1. Proximity Sensor
 * 2. LED Strip
 * 3. Push Button
 *
 * Step 1: (LED Strip on the whole time)
 * Step 2: Wait for Push Heart Button
 * Step 3: Trigger Audio
 * Step 4: LED on bone turns on
 * Step 5: Wait for Person to move peg
 * Step 6: Wait for Proximity sensor on bone to activate
 * Step 7: Trigger Audio + LED turns green
 * Step 8: Wait some time + LED disappears and the next broken bone turns on.
 */

import {
  AnalogPin,
  AnalogRGBLedStrip,
  Button,
  DigitalPin,
  Installation,
  InstallationArduinoBoard,
  InstallationOptions,
} from '@teampink/interaction-molecule';
import { Bone } from './bone';

interface MajorBeat1Options extends InstallationOptions {}

class MajorBeat1 implements Installation {
  name: 'Major Beat 1';
  description: 'In this installation, the participant drags a peg to a broken bone to fix it.';

  options: MajorBeat1Options = {
    boardOptions: {
      port: '/dev/cu.usbmodem14101',
    },
  };
  board: InstallationArduinoBoard<MajorBeat1Options>;

  // ledStz
  heartButton = new Button({
    pin: DigitalPin.PIN_5_PWM,
  });
  bone1 = new Bone({
    pins: {
      g: DigitalPin.PIN_2,
      r: DigitalPin.PIN_3_PWM,
      proximitySensor: AnalogPin.A0,
    },
  });
  bone2 = new Bone({
    pins: {
      g: DigitalPin.PIN_5_PWM,
      r: DigitalPin.PIN_6_PWM,
      proximitySensor: AnalogPin.A1,
    },
  });
  bone3 = new Bone({
    pins: {
      g: DigitalPin.PIN_8,
      r: DigitalPin.PIN_9_PWM,
      proximitySensor: AnalogPin.A2,
    },
  });

  constructor() {
    this.board = new InstallationArduinoBoard(this.options);
  }

  async connect() {
    return this.board.connect().then(() => {
      this.board.addComponents(
        // this.ledStrip,
        this.heartButton,
        this.bone1,
        this.bone2,
        this.bone3
      );
    });
  }

  async start() {
    let inId;

    console.log('Starting');
    this.heartButton.on('press', () => {
      console.log('HeartButton Pressed');

      if (inId) {
        clearInterval(inId);
        this.bone1.makeInactive();
        return;
      }

      let flag = true;

      inId = setInterval(() => {
        console.log('interval');
        if (flag) {
          console.log('red');
          this.bone1.red();
        } else {
          console.log('green');
          this.bone1.green();
        }

        flag = !flag;
      }, 500);
    });
  }

  async stop() {}

  async restart() {}
}

export const installation = new MajorBeat1();

installation
  .connect()
  .then(() => installation.start())
  .then(() => console.log('Started'));

// async function start() {
// const board = await connectToArduinoBoard(options);
// const components = {
// }

// board.addComponents(components);
//

// console.log('Board Ready');

// const sensor = new Sensor({ pin: 0 });
// sensor.on('change', (data) => console.log('Sensor Change', data));
// sensor.on('data', (data) => console.log('Sensor Data', data));

// const l = new Led({ pin: 5 });
// l.turnOn();

// const l2 = new Led({ pin: 2 });
// l2.turnOn();

// board.getComponent<AnalogRGBLedStrip>('ledStrip').setColor(255, 255, 255);

// const bones = [
//   board.getComponent<Bone>('bone1'),
//   board.getComponent<Bone>('bone2'),
//   board.getComponent<Bone>('bone3'),
// ];

// board.getComponent<Button>('heartButton').on('press', () => {
//   console.log('Button Pressed');
// Trigger Audio

// Select Random Bone.
// function resetBones() {
//   bones.forEach((bone) => bone.makeInactive());

//   const randomBone = (Math.random() * 10) % bones.length;

//   bones[randomBone].red();
//   bones[randomBone].on('complete', () => {
//     bones[randomBone].green();

//     setTimeout(() => resetBones(), 2000);
//   });
// }

// resetBones();

//     components.bone1.red();

//     components.bone1.proximitySensor.on('change', () =>
//       components.bone1.green()
//     );
//   });
// }

// start();

// import {
//   InstallationArduinoBoard,
//   Led,
//   DigitalPin,
//   Button,
//   AnalogPin,
// } from '@teampink/interaction-molecule';

// const board1 = new InstallationArduinoBoard({
//   boardOptions: {
//     port: '/dev/cu.usbmodem14101',
//   },
// });

// board1.connect().then(() => {
//   console.log('Board 1 Connected');

//   const greenLed = new Led({ pin: DigitalPin.PIN_4 });
//   const button = new Button({ pin: DigitalPin.PIN_5_PWM });
//   board1.addComponents(greenLed, button);

//   button.on('press', () => console.log('Board 1 Button Pressed'));

//   greenLed.turnOn();

//   setTimeout(() => {
//     greenLed.turnOff();
//   }, 2000);
// });

// // setTimeout(() => {
// const board2 = new InstallationArduinoBoard({
//   boardOptions: {
//     port: '/dev/cu.usbmodem14201',
//   },
// });

// board2.connect().then(() => {
//   console.log('Board 2 Connected');

//   const redLed = new Led({ pin: DigitalPin.PIN_2 });
//   const button = new Button({ pin: DigitalPin.PIN_3_PWM });

//   board2.addComponents(redLed, button);

//   button.on('press', () => console.log('Board 2 Button Pressed'));

//   redLed.turnOn();

//   setTimeout(() => {
//     redLed.turnOff();
//   }, 2000);
// });
// // }, 3000);
