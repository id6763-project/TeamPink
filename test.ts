// // // const { Board } = require('johnny-five');
// // // const { Boards, Pin } = require('johnny-five');
// // // // const boards = new Boards([
// // // //   { id: 'A', port: '/dev/cu.usbmodem14101' },
// // // //   { id: 'B', port: '/dev/cu.usbmodem14201' },
// // // // ]);

// // // // Create 2 board instances with IDs "A" & "B"
// // // // boards.on('ready', () => {
// // // // Both "A" and "B" are initialized
// // // // (connected and available for communication)

// // // // Access them by their ID:

// // // // |this| is an array-like object containing references
// // // // to each initialized board.
// // // //   boards.each((board) => {
// // // //     if (board.id === 'A') {
// // // //       const led = new Led({
// // // //         board,
// // // //         pin: 4,
// // // //       });

// // // //       led.on();
// // // //     }
// // // //     if (board.id === 'B') {
// // // //       // Initialize an Led instance on pin 13 of
// // // //       // each initialized board and strobe it.
// // // //       const led = new Led({
// // // //         board,
// // // //         pin: 2,
// // // //       });

// // // //       led.on();
// // // //     }
// // // //   });
// // // // });

// // // /**
// // //  * When initializing multiple boards with only an ID string,
// // //  * the order of initialization and connection is the order
// // //  * that your OS enumerates ports.
// // //  *
// // //  * Given the above program, "A" and "B" would be assigned as:
// // //  *
// // //  * A => /dev/cu.usbmodem411
// // //  * B => /dev/cu.usbmodem621
// // //  *
// // //  *
// // //  * You may override this by providing explicit port paths:
// // //  *
// // //  * var ports = [
// // //  *   { id: "A", port: "/dev/cu.usbmodem621" },
// // //  *   { id: "B", port: "/dev/cu.usbmodem411" }
// // //  * ];
// // //  *
// // //  * new five.Boards(ports).on("ready", function() {
// // //  *
// // //  *   // Boards are initialized!
// // //  *
// // //  * });
// // //  */

// // // const board = new Board();

// // // board.on('ready', function () {
// // //   console.log('Board Ready');

// // //   // const r = new Pin({
// // //   //   pin: 3,
// // //   //   type: 'digital',
// // //   // });

// // //   // const g = new Pin({
// // //   //   pin: 4,
// // //   //   type: 'digital',
// // //   // });

// // //   // const b = new Pin({
// // //   //   pin: 5,
// // //   //   type: 'digital',
// // //   // });

// // //   this.pinMode(3, Pin.PWM);
// // //   this.analogWrite(3, 255);

// // //   this.pinMode(5, Pin.PWM);
// // //   this.analogWrite(5, 155);

// // //   this.pinMode(9, Pin.PWM);
// // //   this.analogWrite(9, 100);

// // //   // this.analogRead(3, (val) => {
// // //   //   console.log('Pin 3', val);
// // //   // });

// // //   const piulsate = (r, g, b) => {
// // //     if (r > 255 || g > 255 || b > 255) {
// // //       return;
// // //     }

// // //     // if (r === 0 || g === 0 || b === 0) {
// // //     //   return;
// // //     // }

// // //     // this.pinMode(3, Pin.ANALOG);
// // //     this.analogWrite(3, r);

// // //     // this.pinMode(5, Pin.ANALOG);
// // //     this.analogWrite(5, g);

// // //     // this.pinMode(9, Pin.ANALOG);
// // //     this.analogWrite(9, b);

// // //     setTimeout(() => {
// // //       piulsate(r + 2, g + 2, b + 2);
// // //       console.log(r, g, b);
// // //     }, 50);
// // //   };

// // //   piulsate(0, 0, 0);

// // //   // this.pinMode(5, Pin.ANALOG);
// // //   // this.analogWrite(5, 0);

// // //   // this.pinMode(9, Pin.ANALOG);
// // //   // this.analogWrite(9, 255);
// // //   console.log('lets go');
// // // });

// // import * as Player from 'play-sound';

// // // const player = require('play-sound');

// // const p = new Player();

// // p.play('./packages/audio-files/1.mp3', (err) => console.log('Success', err));

// import { InstallationArduinoBoard } from './packages/interaction-molecule/src/board';
// import { ReedSwitch } from './packages/interaction-molecule/src/reed-switch';

// const board = new InstallationArduinoBoard({});

// board.connect().then(() => {
//   console.log('Ready');
//   const r = new ReedSwitch({
//     pin: 0,
//   });

//   board.addComponents(r);
//   console.log('Comoopnent added');
//   r.on('open', (d) => {
//     console.log('Reed Switch Open', d);
//   });

//   r.on('close', (d) => {
//     console.log('Reed Switch Close', d);
//   });
// });

// import {
//   InstallationArduinoBoard,
//   Led,
//   DigitalPin,
// } from './packages/interaction-molecule/src/index';

// const board = new InstallationArduinoBoard({});

// board.connect().then(() => {
//   console.log('Connected');

//   const r = new Led({
//     pin: DigitalPin.PIN_2,
//   });

//   board.addComponents(r);

//   r.turnOn();
// });

// const board = new InstallationArduinoBoard({ boardOptions: {} });

// const setColor = ([r, g, b]: [number, number, number]) => {
//   board.j5board.pinMode(3, Pin.PWM);
//   board.j5board.analogWrite(3, r);
//   board.j5board.pinMode(5, Pin.PWM);
//   board.j5board.analogWrite(5, g);
//   board.j5board.pinMode(6, Pin.PWM);
//   board.j5board.analogWrite(6, b);
// };

// console.log('Attempting to connect');
// board.connect().then(() => {
//   console.log('Connected to board');
//   const strip = new AnalogRGBLedStrip({
//     pins: {
//       r: DigitalPin.PIN_3_PWM,
//       g: DigitalPin.PIN_5_PWM,
//       b: DigitalPin.PIN_6_PWM,
//     },
//   });

//   const animate = (
//     [r, g, b]: [number, number, number],
//     changeMode: 'red' | 'green' | 'blue' = 'red'
//   ) => {
//     if (r > 255 && g > 255 && b > 255) {
//       console.log('Done', r, g, b);
//       return;
//     }

//     console.log('Setting', r, g, b);

//     setColor([r, g, b]);

//     setTimeout(() => {
//       switch (changeMode) {
//         case 'red':
//           return animate([r + 1, g, b], 'green');

//         case 'green':
//           return animate([r, g + 1, b], 'blue');

//         case 'blue':
//           return animate([r, g, b + 1], 'red');
//       }
//     }, 100);
//   };

// setColor([0, 255, 0]);
// animate([0, 0, 0]);

//   // board.j5board.pinMode()

// const red = new Pin({
//   pin: 3,
//   type: 'digital',
// });

// red.low();
// console.log('Lowered red');
//   const green = new Pin(6);
//   green.write(100);
//   const blue = new Pin(5);

//   console.log('Done');
//   // board.addComponents(strip);
//   // strip.setColor(255, 255, 255);
//   // board.addComponents(strip);
//   //   //   const b1 = new Bone({
//   //   //     pins: {
//   //   //       g: DigitalPin.PIN_4,
//   //   //       r: DigitalPin.PIN_7,
//   //   //       reedSwitch: DigitalPin.PIN_3_PWM,
//   //   //     },
//   //   //   });
//   //   //   const b2 = new Bone({
//   //   //     pins: {
//   //   //       g: DigitalPin.PIN_9_PWM,
//   //   //       r: DigitalPin.PIN_10_PWM,
//   //   //       reedSwitch: DigitalPin.PIN_11_PWM,
//   //   //     },
//   //   //   });
//   //   //   const b3 = new Bone({
//   //   //     pins: {
//   //   //       g: DigitalPin.PIN_12,
//   //   //       r: DigitalPin.PIN_13,
//   //   //       reedSwitch: DigitalPin.PIN_8,
//   //   //     },
//   //   //   });
//   //   //   // board.addComponents(strip, b1, b2, b3);
//   //   //   board.addComponents(b1, b2, b3);
//   //   //   b1.start();
//   //   //   // strip.turnOn();
// });

// import { Strip } from 'node-pixel';
// const five = require('johnny-five');

// var board = new five.Board();
// var strip: Strip = null;

// board.on('ready', function () {
//   // Define our hardware.
//   // It's a 12px ring connected to pin 6.
//   strip = new Strip({
//     board,
//     controller: 'FIRMATA',
//     strips: [{ pin: 6, length: 12 }],
//     gamma: 2.8,
//   });

//   if (strip) {
//     // Just like DOM-ready for web developers.
//     strip.on('ready', function () {
//       // Set the entire strip to pink.
//       strip.color('#903');

//       // Send instructions to NeoPixel.
//       strip.show();
//     });

//     // Allows for command-line experimentation!
//     board.repl.inject({
//       strip: strip,
//     });
//   }
// });
