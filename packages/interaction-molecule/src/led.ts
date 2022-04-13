import { Led as JFLed } from 'johnny-five';
import { InstallationOptions, InstallationArduinoBoard } from './board';
import { BaseComponent } from './component';
import { DigitalPin } from './pin';

export interface LedState {
  power: 'on' | 'off';
}

export interface LedData {
  state: LedState;
}

export interface LedOptions {
  pin: DigitalPin;
}

export class Led implements BaseComponent {
  private j5Led: JFLed;

  constructor(private options: LedOptions) {}

  private initComponent<O extends InstallationOptions>(
    board?: InstallationArduinoBoard<O>
  ) {
    if (!this.j5Led) {
      if (board) {
        this.j5Led = new JFLed({
          pin: this.options.pin,
          board: board.j5board,
        });
      } else {
        this.j5Led = new JFLed({
          pin: this.options.pin,
        });
      }
    }
  }

  bind<O extends InstallationOptions>(board: InstallationArduinoBoard<O>) {
    this.initComponent(board);
  }

  turnOn() {
    this.initComponent(undefined);

    this.j5Led.on();
  }

  turnOff() {
    this.initComponent(undefined);

    this.j5Led.off();
  }
}
