import { InstallationArduinoBoard, InstallationOptions } from './board';

export interface BaseComponent {
  bind<O extends InstallationOptions>(board: InstallationArduinoBoard<O>);
}

export interface Component extends BaseComponent {
  on(eventName: string, callback: <D>(data: D) => void);
}

export interface IsResettable {
  reset();
}
