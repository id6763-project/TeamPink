import { Pin } from 'johnny-five';
import { EmptyComponent } from './component';

export interface AnalogRGBLedStripState {
  power: 'on' | 'off';
  color: string;
}

export interface AnalogRGBLedStripData {
  state: AnalogRGBLedStripState;
}

export interface AnalogRGBLedStripOptions {
  pins: {
    r: string;
    g: string;
    b: string;
  };
}

export class AnalogRGBLedStrip implements EmptyComponent {
  rPin: Pin;
  gPin: Pin;
  bPin: Pin;

  constructor(options: AnalogRGBLedStripOptions) {
    this.rPin = new Pin(options.pins.r);
    this.gPin = new Pin(options.pins.g);
    this.bPin = new Pin(options.pins.b);
  }

  setColor(r: number, g: number, b: number) {
    this.rPin.write(r);
    this.gPin.write(g);
    this.bPin.write(b);
  }

  turnOff() {
    this.setColor(0, 0, 0);
  }
}
