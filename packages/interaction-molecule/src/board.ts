import { BoardOption, Board } from 'johnny-five';
import { EmptyComponent } from './component';

export interface InstallationOptions {
  boardOptions?: BoardOption;
  components: {
    [name: string]: EmptyComponent;
  };
}

class InteractiveInstallationBoard<O extends InstallationOptions> {
  j5board: Board;

  constructor(private options: O) {
    this.j5board = new Board(options.boardOptions);
  }

  getComponent = <C extends EmptyComponent>(name: string): C => {
    return this.options.components[name] as C;
  };
}

export const connectToArduinoBoard = <O extends InstallationOptions>(
  options: O
) => {
  return new InteractiveInstallationBoard(options);
};
