import { Button as JFButton } from 'johnny-five';
import { InstallationOptions, InstallationArduinoBoard } from './board';
import { Component } from './component';
import { DigitalPin } from './pin';

export type ButtonState = 'hold' | 'down' | 'press' | 'up' | 'release';

export interface ButtonData {
  state: ButtonState;
}

export interface ButtonOptions {
  pin: DigitalPin;
}

export class Button implements Component {
  private j5Button: JFButton;

  constructor(private options: ButtonOptions) {}

  private initComponent<O extends InstallationOptions>(
    board?: InstallationArduinoBoard<O>
  ) {
    if (!this.j5Button) {
      if (board) {
        this.j5Button = new JFButton({
          pin: this.options.pin,
          board: board.j5board,
        });
      } else {
        this.j5Button = new JFButton({
          pin: this.options.pin,
        });
      }
    }
  }

  on(event: ButtonState, callback: (data: ButtonData) => void) {
    this.initComponent(undefined);

    this.j5Button.on(event, () => callback({ state: event } as ButtonData));
  }

  bind<O extends InstallationOptions>(board: InstallationArduinoBoard<O>) {
    this.initComponent(board);
  }
}
