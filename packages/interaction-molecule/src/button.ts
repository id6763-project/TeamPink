import { Button as JFButton, ButtonOption } from 'johnny-five';
import { Component } from './component';

export type ButtonState = 'hold' | 'down' | 'press' | 'up' | 'release';

export interface ButtonData {
  state: ButtonState;
}

export class Button implements Component {
  private j5Button: JFButton;

  constructor(options: ButtonOption) {
    this.j5Button = new JFButton(options);
  }

  on(event: ButtonState, callback: (data: ButtonData) => void) {
    this.j5Button.on(event, () => callback({ state: event } as ButtonData));
  }
}
