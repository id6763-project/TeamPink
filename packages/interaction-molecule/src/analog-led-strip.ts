import { Pin } from 'johnny-five';
import { InstallationOptions, InstallationArduinoBoard } from './board';
import { BaseComponent } from './component';
import { AnalogPin } from './pin';

export interface AnalogRGBLedStripState {
  power: 'on' | 'off';
  color: string;
}

export interface AnalogRGBLedStripData {
  state: AnalogRGBLedStripState;
}

export interface AnalogRGBLedStripOptions {
  pins: {
    r: AnalogPin;
    g: AnalogPin;
    b: AnalogPin;
  };
}

export class AnalogRGBLedStrip implements BaseComponent {
  private rPin: Pin;
  private gPin: Pin;
  private bPin: Pin;

  constructor(private options: AnalogRGBLedStripOptions) {}

  private initComponent<O extends InstallationOptions>(
    board?: InstallationArduinoBoard<O>
  ) {
    if (!this.rPin) {
      if (board) {
        this.rPin = new Pin({
          pin: this.options.pins.r,
          board: board.j5board,
        });
        this.gPin = new Pin({
          pin: this.options.pins.g,
          board: board.j5board,
        });
        this.bPin = new Pin({
          pin: this.options.pins.b,
          board: board.j5board,
        });
      } else {
        this.rPin = new Pin({
          pin: this.options.pins.r,
        });
        this.gPin = new Pin({
          pin: this.options.pins.g,
        });
        this.bPin = new Pin({
          pin: this.options.pins.b,
        });
      }
    }
  }

  bind<O extends InstallationOptions>(board: InstallationArduinoBoard<O>) {
    this.initComponent(board);
  }

  setColor(r: number, g: number, b: number) {
    this.initComponent(undefined);

    this.rPin.write(r);
    this.gPin.write(g);
    this.bPin.write(b);
  }

  turnOff() {
    this.initComponent(undefined);

    this.setColor(0, 0, 0);
  }
}
