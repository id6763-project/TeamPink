import { Sensor as JFSensor } from 'johnny-five';
import { InstallationOptions, InstallationArduinoBoard } from './board';
import { Component } from './component';
import { AnalogPin } from './pin';

export type SensorEvent = 'change' | 'data';
export type SensorData = {};
export type SensorOptions = {
  pin: AnalogPin;
};

export class Sensor implements Component {
  private j5Sensor: JFSensor;

  constructor(private options: SensorOptions) {}

  private initComponent<O extends InstallationOptions>(
    board?: InstallationArduinoBoard<O>
  ) {
    if (!this.j5Sensor) {
      if (board) {
        this.j5Sensor = new JFSensor({
          pin: this.options.pin,
          board: board.j5board,
        });
      } else {
        this.j5Sensor = new JFSensor({
          pin: this.options.pin,
        });
      }
    }
  }

  bind<O extends InstallationOptions>(board: InstallationArduinoBoard<O>) {
    this.initComponent(board);
  }

  on(event: SensorEvent, callback: (data: SensorData) => void) {
    this.initComponent(undefined);

    this.j5Sensor.on(event, () => {
      const value = this.j5Sensor.scaleTo(0, 100);
      if (value < 20) {
        callback({ value });
      }
    });
  }
}
