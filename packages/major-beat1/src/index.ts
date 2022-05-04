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
  AnalogRGBLedStrip,
  Button,
  DigitalPin,
  Installation,
  InstallationArduinoBoard,
  InstallationOptions,
} from '@teampink/interaction-molecule';
import { Bone } from './bone';
import Player from 'play-sound';
import { Pin } from 'johnny-five';

import fs from 'fs';

console.log('Player', Player);
export interface MajorBeat1Options extends InstallationOptions {}

class MajorBeat1 implements Installation {
  name: 'Major Beat 1';
  description: 'In this installation, the participant drags a peg to a broken bone to fix it.';
  selectedBone = 0;
  player = new Player();
  currentBone: Bone;

  options: MajorBeat1Options = {
    boardOptions: {
      // port: '/dev/cu.usbmodem14101',
    },
  };
  board: InstallationArduinoBoard<MajorBeat1Options>;

  // ledStrip = new AnalogRGBLedStrip({
  //   pins: {
  //     r: DigitalPin.PIN_3_PWM,
  //     g: DigitalPin.PIN_5_PWM,
  //     b: DigitalPin.PIN_6_PWM,
  //   },
  // });
  heartButton = new Button({
    pin: DigitalPin.PIN_2,
  });
  bones = [
    new Bone({
      pins: {
        g: DigitalPin.PIN_4,
        r: DigitalPin.PIN_7,
        reedSwitch: DigitalPin.PIN_3_PWM,
      },
    }),
    new Bone({
      pins: {
        g: DigitalPin.PIN_9_PWM,
        r: DigitalPin.PIN_10_PWM,
        reedSwitch: DigitalPin.PIN_11_PWM,
      },
    }),
    new Bone({
      pins: {
        g: DigitalPin.PIN_12,
        r: DigitalPin.PIN_13,
        reedSwitch: DigitalPin.PIN_8,
      },
    }),
  ];

  constructor() {
    this.board = new InstallationArduinoBoard(this.options);
  }

  async connect() {
    console.log('Attempting to connect');
    return this.board.connect().then(() => {
      console.log('Connected');
      // this.board.addComponents(this.ledStrip, this.heartButton, ...this.bones);
      this.board.addComponents(this.heartButton, ...this.bones);
    });
  }

  private activateNextBone() {
    this.selectedBone = Math.round(Math.random() * 10) % this.bones.length;
    this.currentBone = this.bones[this.selectedBone];
    this.currentBone.start();
  }

  private makeCurrentBoneActive() {
    const activateNextBone = () => {
      this.currentBone.on('complete', () => {
        console.log('Completed');
        this.currentBone.green();

        this.player.play('./packages/audio-files/7.mp3', (err) => {
          this.player.play('./packages/audio-files/8.mp3', (err) => {
            console.log('Finished Playing', err);

            setTimeout(() => {
              this.currentBone.makeInactive();
            }, 1000);
          });
        });
      });

      this.selectedBone = (this.selectedBone + 1) % this.bones.length;
    };

    activateNextBone();
  }

  async start() {
    // this.ledStrip.turnOn();
    // this.ledStrip.setColor(255, 255, 255);

    this.player.play('./packages/audio-files/1.mp3', (err) => {
      this.player.play('./packages/audio-files/2.mp3', (err) => {
        // Turn on LED strip
        this.player.play('./packages/audio-files/3.mp3', (err) => {
          this.player.play('./packages/audio-files/4.mp3', (err) => {
            this.heartButton.on('press', () => {
              console.log('Heart Button pressed');

              this.activateNextBone();

              // const files = fs.readdirSync('./');

              // console.log('Curr FIles', files);
              // setTimeout(() => this.startBones(), 2000);
              this.player.play('./packages/audio-files/5.mp3', (err) => {
                this.player.play('./packages/audio-files/6.mp3', (err) => {
                  this.makeCurrentBoneActive();
                });
              });
            });
          });
        });
      });
    });
  }

  async stop() {
    this.bones.forEach((bone) => bone.makeInactive());
    // this.ledStrip.turnOff();
  }

  async restart() {}
}

const mb1 = new MajorBeat1();

mb1.connect().then(() => {
  console.log('Connected outer');
  mb1.start().then(() => {
    console.log('Installation Started');
  });
});

export default mb1;
