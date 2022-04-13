import { BoardOption, Board } from 'johnny-five';
import { BaseComponent } from './component';

export interface InstallationOptions {
  boardOptions?: BoardOption;
}

export interface Installation {
  name: string;
  description: string;

  connect();

  start();

  stop();

  restart();
}

export class InstallationArduinoBoard<O extends InstallationOptions> {
  j5board: Board;
  components: BaseComponent[];

  constructor(private options: O) {
    this.j5board = new Board(options.boardOptions);
  }

  async connect(): Promise<void> {
    return new Promise((resolve) => this.j5board.on('ready', () => resolve()));
  }

  addComponents(...components: BaseComponent[]) {
    this.components = [...(this.components || []), ...components];

    components.forEach((component) => component.bind(this));
  }

  getComponent = <C extends BaseComponent>(name: string): C => {
    return this.components[name] as C;
  };
}
