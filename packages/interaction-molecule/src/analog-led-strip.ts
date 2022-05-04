import { Pin } from 'johnny-five';
import { InstallationOptions, InstallationArduinoBoard } from './board';
import { BaseComponent } from './component';
import { AnalogRGBLedStripPin } from './pin';

export interface AnalogRGBLedStripState {
  power: 'on' | 'off';
  color: string;
}

export interface AnalogRGBLedStripData {
  state: AnalogRGBLedStripState;
}

export type AnalogRGBLedStripColorChannel = number;

export interface AnalogRGBLedStripOptions extends InstallationOptions {
  pins: {
    r: AnalogRGBLedStripPin;
    g: AnalogRGBLedStripPin;
    b: AnalogRGBLedStripPin;
  };
}

export class AnalogRGBLedStrip implements BaseComponent {
  private rPin: Pin;
  private gPin: Pin;
  private bPin: Pin;
  private board: InstallationArduinoBoard<InstallationOptions>;

  constructor(private options: AnalogRGBLedStripOptions) {}

  private initComponent<O extends InstallationOptions>(
    board?: InstallationArduinoBoard<O>
  ) {
    if (board) {
      this.turnOn();
    }
  }

  setColor(
    r: AnalogRGBLedStripColorChannel,
    g: AnalogRGBLedStripColorChannel,
    b: AnalogRGBLedStripColorChannel
  ) {
    if (this.board) {
      this.board.j5board.pinMode(this.rPin, Pin.ANALOG);
      this.board.j5board.analogWrite(this.rPin, 255);

      this.board.j5board.pinMode(this.gPin, Pin.ANALOG);
      this.board.j5board.analogWrite(this.gPin, 255);

      this.board.j5board.pinMode(this.bPin, Pin.ANALOG);
      this.board.j5board.analogWrite(this.bPin, 255);
    } else {
      console.error('Did not set color since board is not setup');
    }
  }

  bind<O extends InstallationOptions>(board: InstallationArduinoBoard<O>) {
    this.board = board;
    this.initComponent(board);
  }

  turnOn() {
    this.setColor(255, 255, 255);
  }

  turnOff() {
    this.setColor(0, 0, 0);
  }
}
