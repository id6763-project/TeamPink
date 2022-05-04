import { Switch as J5Switch, Board as J5Board } from 'johnny-five';
import { InstallationOptions, InstallationArduinoBoard } from './board';
import { EventBasedComponent } from './component';
import { DigitalPin } from './pin';

export type ReedSwitchState = 'open' | 'close';

export interface ReedSwitchData {
  state: ReedSwitchState;
}

export interface ReedSwitchOptions {
  pin: DigitalPin;
}

export class ReedSwitch implements EventBasedComponent {
  board: J5Board;
  j5switch: J5Switch;

  constructor(private options: ReedSwitchOptions) {}

  private initComponent<O extends InstallationOptions>(
    board?: InstallationArduinoBoard<O>
  ) {
    if (!this.j5switch) {
      if (board) {
        this.j5switch = new J5Switch({
          pin: this.options.pin,
          board: board.j5board,
        });
      } else {
        this.j5switch = new J5Switch(this.options.pin);
      }
    }
  }

  bind<O extends InstallationOptions>(board: InstallationArduinoBoard<O>) {
    this.board = board;
    this.initComponent(board);
  }

  on(
    eventName: ReedSwitchState,
    callback: <ReedSwitchData>(data: ReedSwitchData) => void
  ) {
    if (this.j5switch) {
      this.j5switch.on(eventName, () =>
        callback({ state: eventName } as ReedSwitchData)
      );
    }
  }
}
