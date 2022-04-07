import { Led as JFLed } from 'johnny-five';
import { EmptyComponent } from './component';

export interface LedState {
  power: 'on' | 'off';
}

export interface LedData {
  state: LedState;
}

export interface LedOptions {
  pin: number;
}

export class Led implements EmptyComponent {
  private j5Led: JFLed;

  constructor(options: LedOptions) {
    this.j5Led = new JFLed(options.pin);
  }

  turnOn() {
    this.j5Led.on();
  }

  turnOff() {
    this.j5Led.off();
  }
}
